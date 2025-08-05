import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const prisma = new PrismaClient();
const router = express.Router();
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

router.post("/image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const localFilePath = req.file.path;

    // 1️⃣ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "soil-buddy",
    });

    // 2️⃣ Send to Streamlit ML backend
    const form = new FormData();
    form.append("file", fs.createReadStream(localFilePath));

    const mlResponse = await axios.post(
      "https://your-streamlit-backend.onrender.com/predict", // Replace with actual endpoint
      form,
      {
        headers: form.getHeaders(),
      }
    );

    // ❌ Skip deleting the file

    // 3️⃣ Save to database
    const chat = await prisma.chat.create({
      data: {
        role: "user",
        message: "",
        image: [result.secure_url],
        // @ts-ignore
        userId: req.userId as string,
      },
    });

    res.status(200).json({
      cloudinaryUrl: result.secure_url,
      mlPrediction: mlResponse.data,
      localFilePath: localFilePath, // optionally return this
      chat,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
