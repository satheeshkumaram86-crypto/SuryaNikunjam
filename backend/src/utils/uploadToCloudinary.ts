import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import { compressVideo } from "./compressVideo";

export const uploadToCloudinary = async (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  let uploadPath = file.path;

  try {
    // Compress only videos larger than 80 MB
    if (
      file.mimetype.startsWith("video") &&
      file.size > 80 * 1024 * 1024
    ) {
      const compressedPath = path.join(
        "uploads",
        "temp",
        `compressed-${Date.now()}.mp4`
      );

      // Log original file size
      const originalStats = await fs.stat(file.path);

      console.log(
        "Original Size:",
        (originalStats.size / 1024 / 1024).toFixed(2),
        "MB"
      );

      console.log("Compressing video...");

      await compressVideo(file.path, compressedPath);

      uploadPath = compressedPath;

      // Log compressed file size
      const compressedStats = await fs.stat(uploadPath);

      console.log(
        "Compressed Size:",
        (compressedStats.size / 1024 / 1024).toFixed(2),
        "MB"
      );

      // Prevent Cloudinary upload if still larger than 100 MB
      if (compressedStats.size > 100 * 1024 * 1024) {
        throw new Error(
          "Compressed video is still larger than 100 MB. Please upload a shorter video or reduce its resolution."
        );
      }
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(uploadPath, {
      folder: "surya-nikunjam/gallery",
      resource_type: "auto",
    });

    return result;
  } finally {
    // Delete original uploaded file
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.error("Failed to delete original file:", err);
    }

    // Delete compressed file
    if (uploadPath !== file.path) {
      try {
        await fs.unlink(uploadPath);
      } catch (err) {
        console.error("Failed to delete compressed file:", err);
      }
    }
  }
};