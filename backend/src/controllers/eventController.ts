import { Request, Response } from "express";
import Event from "../models/Event";
import cloudinary from "../config/cloudinary";

export const getEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const events = await Event.find().sort({
      eventDate: -1,
      order: 1,
    });

    res.json({
      success: true,
      events,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events.",
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    let image = "";

if (req.file) {
  const file = req.file as Express.Multer.File;

  const result = await cloudinary.uploader.upload(
    file.path,
    {
      folder: "surya-nikunjam/events",
    }
  );

  image = result.secure_url;
}

const event = await Event.create({
  ...req.body,
  image,
});

    res.status(201).json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
      });
    }

    if (req.file) {

  // Delete old Cloudinary image
  if (event.image) {
    try {
      const parts = event.image.split("/");
      const filename = parts[parts.length - 1];

      const publicId =
        "surya-nikunjam/events/" +
        filename.split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.log("Old image delete failed");
    }
  }

  const file = req.file as Express.Multer.File;

  const result =
    await cloudinary.uploader.upload(file.path, {
      folder: "surya-nikunjam/events",
    });

  event.image = result.secure_url;
}

    event.title = req.body.title;
    event.shortDescription =
      req.body.shortDescription;
    event.description =
      req.body.description;
    event.eventDate = req.body.eventDate;
    event.eventTime = req.body.eventTime;
    event.location = req.body.location;
    event.featured =
      req.body.featured === "true";
    event.order = Number(req.body.order);
    event.isActive =
      req.body.isActive === "true";

    await event.save();

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (event.image) {
      try {
        const parts = event.image.split("/");
        const filename =
          parts[parts.length - 1];

        const publicId =
          "surya-nikunjam/events/" +
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

    await event.deleteOne();

    res.json({
      success: true,
      message:
        "Event deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete event.",
    });
  }
};

export const toggleEventStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
      });
    }

    event.isActive = !event.isActive;

    await event.save();

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};