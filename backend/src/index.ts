import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserSchema, SignInSchema } from "./validators/zodSchema.js";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware.js";
import OpenAI from "openai";
import uploadRouter from "./routes/upload.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.post("/sign-up", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(409).json({
      message: "Incorrect inputs",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!!existingUser) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 5);

    const user = await prisma.user.create({
      data: {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    if (user) {
      return res.status(200).json({
        userid: user.id,
      });
    }
  } catch (error) {
    console.log("Error from signup: ", error);
    res.status(404).json({
      message: "Something went wrong. Please try again!",
    });
  }
});

app.post("/sign-in", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(404).json({
      message: "Invalid Inputs!",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user does not exists!",
      });
    }

    const validUser = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!validUser) {
      return res.status(404).json({
        message: "Incorrect Email or Password",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "";

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "Signed in successfully!",
      token: token,
    });
  } catch (error) {
    console.log("Error from signup: ", error);
    res.status(404).json({
      message: "Something went wrong. Please try again!",
    });
  }
});

app.post("/api/agents", middleware, async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not defined in environment variables.");
  }

  const client = new OpenAI();

  res.status(200).json({
    message: "Open ai called!",
  });
});

app.use("/upload", middleware, uploadRouter);

app.post("/chat", middleware, (req, res) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
