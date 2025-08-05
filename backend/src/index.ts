import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserSchema, SignInSchema } from "./validators/zodSchema.js";
import jwt from "jsonwebtoken";
import { middleware, type AuthenticatedRequest } from "./middleware.js";
import OpenAI from "openai";
import uploadRouter from "./routes/upload.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();
const JWT_SECRET: string = process.env.JWT_SECRET || "";

// Type alias for OpenAI chat messages
type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

app.post("/sign-up", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  console.log("Sign up hit");
  
  if (!parsedData.success) {
    return res.status(409).json({ message: "Incorrect inputs" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.data.email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 5);

    const user = await prisma.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ userid: user.id });
  } catch (error) {
    console.log("Error from signup: ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

app.post("/sign-in", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(404).json({ message: "Invalid Inputs!" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: parsedData.data.email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    const validUser = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!validUser) {
      return res.status(404).json({ message: "Incorrect Email or Password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "Signed in successfully!", token });
  } catch (error) {
    console.log("Error from signin: ", error);
    res
      .status(404)
      .json({ message: "Something went wrong. Please try again!" });
  }
});

app.post("/api/agents", middleware, async (req: AuthenticatedRequest, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
      throw new Error(
        "OPENAI_API_KEY is not defined in environment variables."
      );

    const client = new OpenAI({ apiKey });
    const { question, soilData } = req.body;
    const userId = req.userId as string;

    if (!question || !soilData) {
      return res
        .status(400)
        .json({ message: "Question and soilData are required" });
    }

    let previousChats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // Reverse for chronological order for OpenAI
    previousChats = previousChats.reverse();

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: `
          You are a soil analysis assistant.
          You are given the following soil data:
          ${JSON.stringify(soilData, null, 2)}
          Use this data to answer the user's questions about soil health,
          nutrients, and recommendations in a clear and concise manner.
        `,
      },
      ...previousChats.map((chat) => ({
        role: chat.role as "user" | "assistant",
        content: chat.message,
      })),
      { role: "user", content: question },
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
    });

    const answer =
      response.choices[0]?.message?.content || "No answer generated.";

    await prisma.chat.createMany({
      data: [
        { userId, role: "user", message: question },
        { userId, role: "assistant", message: answer },
      ],
    });

    res.status(200).json({ message: "Answer generated successfully", answer });
  } catch (error: any) {
    console.error("Error generating answer:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/chat", middleware, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId as string;

    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({ message: "Chats fetched successfully", chats });
  } catch (error: any) {
    console.error("Error fetching chats:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch chats", error: error.message });
  }
});

app.use("/upload", middleware, uploadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
