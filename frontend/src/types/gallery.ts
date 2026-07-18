export interface Gallery {
  _id?: string;

  title: string;

  category: string;

  mediaType:
    | "image"
    | "video"
    | "youtube";

  image: string;

  video: string;

  youtubeUrl: string;

  order: number;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}