import { Request, Response } from "express";
import Lifestyle from "../models/Lifestyle";
import cloudinary from "../config/cloudinary";
// Get All

export const getLifestyles = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyles =
      await Lifestyle.find().sort({
        order: 1,
      });

    res.json({
      success: true,
      lifestyles,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lifestyle.",
    });
  }
};

// Get One

export const getLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyle =
      await Lifestyle.findById(
        req.params.id
      );

    if (!lifestyle) {
      return res.status(404).json({
        success: false,
        message: "Lifestyle not found.",
      });
    }

    res.json({
      success: true,
      lifestyle,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Create

export const createLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      order,
      isActive,
    } = req.body;

    /*if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }*/
   let image = "";

if (req.file) {
  const file = req.file as Express.Multer.File;

  const result = await cloudinary.uploader.upload(
    file.path,
    {
      folder: "surya-nikunjam/lifestyle",
    }
  );

  image = result.secure_url;
}

   const lifestyle = await Lifestyle.create({
  title,
  description,
  order,
  image,
  isActive:
    isActive === "true" ||
    isActive === true,
});

    res.status(201).json({
      success: true,
      message:
        "Lifestyle created successfully.",
      lifestyle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to create lifestyle.",
    });
  }
};

// Update

export const updateLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyle =
      await Lifestyle.findById(
        req.params.id
      );

    if (!lifestyle) {
      return res.status(404).json({
        success: false,
        message: "Lifestyle not found.",
      });
    }

    lifestyle.title =
      req.body.title;

    lifestyle.description =
      req.body.description;

    lifestyle.order = Number(req.body.order);

lifestyle.isActive =
  req.body.isActive === "true" ||
  req.body.isActive === true;

    if (req.file) {
  // Delete old image
  if (lifestyle.image) {
    try {
      const parts = lifestyle.image.split("/");
      const filename = parts[parts.length - 1];

      const publicId =
        "surya-nikunjam/lifestyle/" +
        filename.split(".")[0];

      await cloudinary.uploader.destroy(
        publicId
      );
    } catch (err) {
      console.log(
        "Old image delete failed"
      );
    }
  }

  const file = req.file as Express.Multer.File;

  const result =
    await cloudinary.uploader.upload(
      file.path,
      {
        folder:
          "surya-nikunjam/lifestyle",
      }
    );

  lifestyle.image =
    result.secure_url;
}

    await lifestyle.save();

    res.json({
      success: true,
      message:
        "Lifestyle updated successfully.",
      lifestyle,
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Failed to update lifestyle.",
    });
  }
};

// Delete

export const deleteLifestyle = async (
  req: Request,
  res: Response
) => {
  try {
    const lifestyle =
  await Lifestyle.findById(
    req.params.id
  );

if (!lifestyle) {
  return res.status(404).json({
    success: false,
    message: "Lifestyle not found.",
  });
}

if (lifestyle.image) {
  try {
    const parts =
      lifestyle.image.split("/");

    const filename =
      parts[parts.length - 1];

    const publicId =
      "surya-nikunjam/lifestyle/" +
      filename.split(".")[0];

    await cloudinary.uploader.destroy(
      publicId
    );
  } catch (error: any) {
    console.error(error);
  }
}

await lifestyle.deleteOne();

    res.json({
      success: true,
      message:
        "Lifestyle deleted successfully.",
    });
  } catch {
    res.status(500).json({
      success: false,
      message:
        "Delete failed.",
    });
  }
};

// Toggle Status

export const toggleLifestyleStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lifestyle =
        await Lifestyle.findById(
          req.params.id
        );

      if (!lifestyle) {
        return res.status(404).json({
          success: false,
          message:
            "Lifestyle not found.",
        });
      }

      lifestyle.isActive =
        !lifestyle.isActive;

      await lifestyle.save();

      res.json({
        success: true,
        lifestyle,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Status update failed.",
      });
    }
  };