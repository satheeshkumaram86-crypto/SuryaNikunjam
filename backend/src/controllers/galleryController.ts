import { Request, Response } from "express";
import Gallery from "../models/Gallery";
import cloudinary from "../config/cloudinary";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

/* ---------------- GET ALL ---------------- */

export const getGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery = await Gallery.find().sort({
      order: 1,
    });

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery.",
    });
  }
};

/* ---------------- GET BY ID ---------------- */

export const getGalleryById = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery = await Gallery.findById(
      req.params.id
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    res.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

/* ---------------- DELETE CLOUDINARY FILE ---------------- */

const deleteCloudinaryFile = async (
  url: string,
  resourceType: "image" | "video"
) => {
  if (!url) return;

  try {
    const uploadIndex = url.indexOf("/upload/");

    if (uploadIndex === -1) return;

    let publicId = url.substring(uploadIndex + 8);

    publicId = publicId.replace(/^v\d+\//, "");

    publicId = publicId.replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Deleted:", publicId);
  } catch (err) {
    console.error("Cloudinary Delete Error:", err);
  }
};

/* ---------------- CREATE ---------------- */

export const createGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const mediaType = req.body.mediaType || "image";

    // Validation
    if (
      (mediaType === "image" || mediaType === "video") &&
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a file.",
      });
    }

    if (
      mediaType === "youtube" &&
      !req.body.youtubeUrl
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a YouTube URL.",
      });
    }

    let fileUrl = "";

    if (
      req.file &&
      (mediaType === "image" ||
        mediaType === "video")
    ) {
      const uploaded =
        await uploadToCloudinary(req.file);

      fileUrl = uploaded.secure_url;
    }

    const gallery = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      mediaType,

      image:
        mediaType === "image"
          ? fileUrl
          : "",

      video:
        mediaType === "video"
          ? fileUrl
          : "",

      youtubeUrl:
        mediaType === "youtube"
          ? req.body.youtubeUrl
          : "",

      order: Number(req.body.order),

      isActive:
        req.body.isActive === "true" ||
        req.body.isActive === true,
    });

    res.status(201).json({
      success: true,
      gallery,
    });

  } catch (error: any) {

    console.error(error);

    if (error.http_code === 413) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum upload size is 100 MB.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create gallery.",
    });
  }
};

/* ---------------- UPDATE ---------------- */

export const updateGallery = async (
  req: Request,
  res: Response
) => {
  try {

    const gallery =
      await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    const mediaType = req.body.mediaType;

    // Validation
    if (
      mediaType === "youtube" &&
      !req.body.youtubeUrl
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a YouTube URL.",
      });
    }

    gallery.title = req.body.title;
    gallery.category = req.body.category;
    gallery.order = Number(req.body.order);

    gallery.isActive =
      req.body.isActive === "true" ||
      req.body.isActive === true;

    const oldImage = gallery.image;
    const oldVideo = gallery.video;

    gallery.mediaType = mediaType;

    /* ---------------- Switch to YouTube ---------------- */

    if (mediaType === "youtube") {

      if (oldImage) {
        await deleteCloudinaryFile(
          oldImage,
          "image"
        );
      }

      if (oldVideo) {
        await deleteCloudinaryFile(
          oldVideo,
          "video"
        );
      }

      gallery.image = "";
      gallery.video = "";
      gallery.youtubeUrl =
        req.body.youtubeUrl;
    }

    /* ---------------- Upload New Image / Video ---------------- */

    if (
      req.file &&
      (mediaType === "image" ||
        mediaType === "video")
    ) {

      if (oldImage) {
        await deleteCloudinaryFile(
          oldImage,
          "image"
        );
      }

      if (oldVideo) {
        await deleteCloudinaryFile(
          oldVideo,
          "video"
        );
      }

      const uploaded =
        await uploadToCloudinary(
          req.file
        );

      gallery.youtubeUrl = "";

      if (mediaType === "image") {
        gallery.image =
          uploaded.secure_url;
        gallery.video = "";
      }

      if (mediaType === "video") {
        gallery.video =
          uploaded.secure_url;
        gallery.image = "";
      }
    }

    // If no new file is uploaded,
    // existing image/video remains unchanged.

    await gallery.save();

    res.json({
      success: true,
      gallery,
    });

  } catch (error: any) {

    console.error(error);

    if (error.http_code === 413) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum upload size is 100 MB.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update gallery.",
    });
  }
};
/* ---------------- DELETE ---------------- */

export const deleteGallery = async (
  req: Request,
  res: Response
) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    // Delete image from Cloudinary
    if (gallery.image) {
      try {
        await deleteCloudinaryFile(
          gallery.image,
          "image"
        );
      } catch (err) {
        console.error(
          "Failed to delete image from Cloudinary:",
          err
        );
      }
    }

    // Delete video from Cloudinary
    if (gallery.video) {
      try {
        await deleteCloudinaryFile(
          gallery.video,
          "video"
        );
      } catch (err) {
        console.error(
          "Failed to delete video from Cloudinary:",
          err
        );
      }
    }

    // Delete MongoDB document
    await gallery.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Gallery deleted successfully.",
    });

  } catch (error: any) {
    console.error("DELETE GALLERY ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete gallery.",
    });
  }
};

/* ---------------- TOGGLE STATUS ---------------- */

export const toggleGalleryStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const gallery =
        await Gallery.findById(
          req.params.id
        );

      if (!gallery) {
        return res.status(404).json({
          success: false,
        });
      }

      gallery.isActive =
        !gallery.isActive;

      await gallery.save();

      res.json({
        success: true,
        gallery,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };