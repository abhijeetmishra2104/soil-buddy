import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

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

    // 1️⃣ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "soil-buddy",
    });

    // 2️⃣ Delete temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    // 3️⃣ Create chat with image
    const chat = await prisma.chat.create({
      data: {
        role: "user", // ✅ lowercase to match Prisma enum
        message: "",
        image: [result.secure_url],
        // @ts-ignore - added by middleware
        userId: req.userId as string,
      },
    });

    res.status(200).json({
      url: result.secure_url,
      chat,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
