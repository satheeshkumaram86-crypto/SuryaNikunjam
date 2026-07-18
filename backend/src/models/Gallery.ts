import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IGallery extends Document {
  title: string;
  category: string;

  mediaType: "image" | "video" | "youtube";

  image?: string;
  video?: string;
  youtubeUrl?: string;

  order: number;
  isActive: boolean;
}

const gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "",
    },

    mediaType: {
      type: String,
      enum: [
        "image",
        "video",
        "youtube",
      ],
      default: "image",
    },

    // Image Upload
    image: {
      type: String,
      default: "",
    },

    // Uploaded Video
    video: {
      type: String,
      default: "",
    },

    // YouTube Link
    youtubeUrl: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGallery>(
  "Gallery",
  gallerySchema
);