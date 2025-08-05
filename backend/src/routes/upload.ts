import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary folder

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// POST /upload/image
router.post("/image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "soil-buddy",
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
