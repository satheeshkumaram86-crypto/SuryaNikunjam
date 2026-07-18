import { Request, Response } from "express";
import Villa from "../models/Villa";
import cloudinary from "../config/cloudinary";

// Get All
export const getVillas = async (
  req: Request,
  res: Response
) => {
  try {
    const villas = await Villa.find().sort({
      order: 1,
    });

    res.json({
      success: true,
      villas,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch villas.",
    });
  }
};

// Get One
export const getVilla = async (
  req: Request,
  res: Response
) => {
  try {
    const villa = await Villa.findById(
      req.params.id
    );

    if (!villa) {
      return res.status(404).json({
        success: false,
        message: "Villa not found.",
      });
    }

    res.json({
      success: true,
      villa,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Create
export const createVilla = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      plotSize,
      builtUpArea,
      bedrooms,
      bathrooms,
      description,
      order,
      isActive,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Villa image is required.",
      });
    }
    let image = "";

if (req.file) {
  const file = req.file as Express.Multer.File;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "surya-nikunjam/villas",
  });

  image = result.secure_url;
}
    const villa = await Villa.create({
      title,
      plotSize,
      builtUpArea,
      bedrooms,
      bathrooms,
      description,
      order,
      isActive,
      image
    });

    res.status(201).json({
      success: true,
      message:
        "Villa created successfully.",
      villa,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Failed to create villa.",
    });
  }
};

// Update
export const updateVilla = async (
  req: Request,
  res: Response
) => {
  try {
    const villa = await Villa.findById(
      req.params.id
    );

    if (!villa) {
      return res.status(404).json({
        success: false,
        message: "Villa not found.",
      });
    }

    villa.title = req.body.title;
    villa.plotSize = req.body.plotSize;
    villa.builtUpArea =
      req.body.builtUpArea;
    villa.bedrooms = req.body.bedrooms;
    villa.bathrooms = req.body.bathrooms;
    villa.description =
      req.body.description;
    villa.order = req.body.order;
    villa.isActive = req.body.isActive;

    if (req.file) {

  if (villa.image) {
    try {
      const parts = villa.image.split("/");
      const filename = parts[parts.length - 1];

      const publicId =
        "surya-nikunjam/villas/" +
        filename.split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.log("Old image delete failed");
    }
  }

  const file = req.file as Express.Multer.File;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "surya-nikunjam/villas",
  });

  villa.image = result.secure_url;
}

    await villa.save();

    res.json({
      success: true,
      message:
        "Villa updated successfully.",
      villa,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Failed to update villa.",
    });
  }
};

// Delete
export const deleteVilla = async (
  req: Request,
  res: Response
) => {
  try {
    const villa = await Villa.findById(
      req.params.id
    );

    if (!villa) {
      return res.status(404).json({
        success: false,
        message: "Villa not found.",
      });
    }

    // Delete image from Cloudinary
    if (villa.image) {
      try {
        const parts = villa.image.split("/");
        const filename =
          parts[parts.length - 1];

        const publicId =
          "surya-nikunjam/villas/" +
          filename.split(".")[0];

        await cloudinary.uploader.destroy(
          publicId
        );
      } catch (err) {
        console.log(
          "Cloudinary delete failed"
        );
      }
    }

    await villa.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Villa deleted successfully.",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete villa.",
    });
  }
};

// Toggle Status
export const toggleVillaStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const villa =
        await Villa.findById(
          req.params.id
        );

      if (!villa) {
        return res.status(404).json({
          success: false,
          message: "Villa not found.",
        });
      }

      villa.isActive =
        !villa.isActive;

      await villa.save();

      res.json({
        success: true,
        villa,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Status update failed.",
      });
    }
  };