import { Request, Response } from "express";
import About from "../models/About";
import cloudinary from "../config/cloudinary";

/**
 * GET About
 */
export const getAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const about = await About.findOne();

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch About content.",
    });
  }
};

/**
 * Create / Update About
 */
export const saveAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    let welcomeImage: string | undefined;
    let aboutImage: string | undefined;

    // Upload Welcome Image
    if (files?.welcomeImage?.[0]) {
      const result =
        await cloudinary.uploader.upload(
          files.welcomeImage[0].path,
          {
            folder: "surya-nikunjam/about",
          }
        );

      welcomeImage = result.secure_url;
    }

    // Upload About Image
    if (files?.aboutImage?.[0]) {
      const result =
        await cloudinary.uploader.upload(
          files.aboutImage[0].path,
          {
            folder: "surya-nikunjam/about",
          }
        );

      aboutImage = result.secure_url;
    }

    const {
      welcomeTitle,
      welcomeSubtitle,
      welcomeDescription,

      aboutTitle,
      aboutDescription,

      visionTitle,
      visionDescription,

      missionTitle,
      missionDescription,

      buttonText,
      buttonLink,

      isActive,
    } = req.body;

    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        welcomeTitle,
        welcomeSubtitle,
        welcomeDescription,
        welcomeImage: welcomeImage || "",

        aboutTitle,
        aboutDescription,
        aboutImage: aboutImage || "",

        visionTitle,
        visionDescription,

        missionTitle,
        missionDescription,

        buttonText,
        buttonLink,

        isActive:
          isActive === "true" ||
          isActive === true,
      });
    } else {
      about.welcomeTitle = welcomeTitle;
      about.welcomeSubtitle = welcomeSubtitle;
      about.welcomeDescription =
        welcomeDescription;

      // Replace Welcome Image
      if (welcomeImage) {
        if (about.welcomeImage) {
          try {
            const publicId =
              about.welcomeImage
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

            await cloudinary.uploader.destroy(
              publicId
            );
          } catch (err) {
            console.log(
              "Old welcome image delete failed"
            );
          }
        }

        about.welcomeImage = welcomeImage;
      }

      about.aboutTitle = aboutTitle;
      about.aboutDescription =
        aboutDescription;

      // Replace About Image
      if (aboutImage) {
        if (about.aboutImage) {
          try {
            const publicId =
              about.aboutImage
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];

            await cloudinary.uploader.destroy(
              publicId
            );
          } catch (err) {
            console.log(
              "Old about image delete failed"
            );
          }
        }

        about.aboutImage = aboutImage;
      }

      about.visionTitle = visionTitle;
      about.visionDescription =
        visionDescription;

      about.missionTitle = missionTitle;
      about.missionDescription =
        missionDescription;

      about.buttonText = buttonText;
      about.buttonLink = buttonLink;

      about.isActive =
        isActive === "true" ||
        isActive === true;

      await about.save();
    }

    res.status(200).json({
      success: true,
      message:
        "About content saved successfully.",
      about,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to save About content.",
    });
  }
};