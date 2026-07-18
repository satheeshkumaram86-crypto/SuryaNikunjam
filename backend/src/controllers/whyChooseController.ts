import { Request, Response } from "express";
import WhyChoose from "../models/WhyChoose";
import cloudinary from "../config/cloudinary";

// ===============================
// Get All
// ===============================
export const getWhyChoose = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await WhyChoose.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to fetch data",
    });
  }
};

// ===============================
// Get By Id
// ===============================
export const getWhyChooseById = async (
  req: Request,
  res: Response
) => {
  try {
    const item = await WhyChoose.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Why Choose item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to fetch item",
    });
  }
};

// ===============================
// Create
// ===============================
export const createWhyChoose = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    let icon = "";

    if (req.file) {
      const file =
        req.file as Express.Multer.File;

      const result =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder:
              "surya-nikunjam/whychoose",
          }
        );

      icon = result.secure_url;
    }

    const data =
      await WhyChoose.create({
        title,
        description,
        icon,
      });

    res.status(201).json({
      success: true,
      message:
        "Created successfully.",
      data,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to create",
    });
  }
};

// ===============================
// Update
// ===============================
export const updateWhyChoose = async (
  req: Request,
  res: Response
) => {
  try {
    const item =
      await WhyChoose.findById(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Item not found",
      });
    }

    item.title = req.body.title;
    item.description =
      req.body.description;
    item.isActive =
      req.body.isActive === "true" ||
      req.body.isActive === true;

    if (req.file) {
      // Delete old Cloudinary image
      if (item.icon) {
        try {
          const parts =
            item.icon.split("/");

          const filename =
            parts[parts.length - 1];

          const publicId =
            "surya-nikunjam/whychoose/" +
            filename.split(".")[0];

          await cloudinary.uploader.destroy(
            publicId
          );
        } catch (err) {
          console.log(
            "Old icon delete failed"
          );
        }
      }

      const file =
        req.file as Express.Multer.File;

      const result =
        await cloudinary.uploader.upload(
          file.path,
          {
            folder:
              "surya-nikunjam/whychoose",
          }
        );

      item.icon =
        result.secure_url;
    }

    await item.save();

    res.json({
      success: true,
      message:
        "Updated successfully.",
      data: item,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Update failed",
    });
  }
};

// ===============================
// Delete
// ===============================
export const deleteWhyChoose = async (
  req: Request,
  res: Response
) => {
  try {
    const item =
      await WhyChoose.findById(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Item not found",
      });
    }

    if (item.icon) {
      try {
        const parts =
          item.icon.split("/");

        const filename =
          parts[parts.length - 1];

        const publicId =
          "surya-nikunjam/whychoose/" +
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

    await item.deleteOne();

    res.json({
      success: true,
      message:
        "Deleted successfully",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Delete failed",
    });
  }
};

// ===============================
// Toggle Status
// ===============================
export const toggleWhyChooseStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const item =
        await WhyChoose.findById(
          req.params.id
        );

      if (!item) {
        return res.status(404).json({
          success: false,
          message:
            "Item not found",
        });
      }

      item.isActive =
        !item.isActive;

      await item.save();

      res.json({
        success: true,
        message:
          "Status updated successfully",
        data: item,
      });
    } catch (error: any) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error?.message ||
          "Toggle failed",
      });
    }
  };