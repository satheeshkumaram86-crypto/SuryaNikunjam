import { useEffect } from "react";
import { X } from "lucide-react";

import type { Gallery } from "../../../types/gallery";

interface GalleryModalProps {
  gallery: Gallery | null;
  onClose: () => void;
}

export default function GalleryModal({
  gallery,
  onClose,
}: GalleryModalProps) {
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!gallery) return null;

  const getYoutubeEmbedUrl = (
    url: string
  ) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.replace(
        "watch?v=",
        "embed/"
      );
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("/shorts/")) {
      const id = url.split("/shorts/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full"
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          aria-label="Close Gallery"
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
        >
          <X size={32} />
        </button>

        {/* Image */}

        {gallery.mediaType === "image" &&
          gallery.image && (
            <img
              src={gallery.image}
              alt={gallery.title}
              loading="lazy"
              className="w-full max-h-[80vh] object-contain rounded-xl bg-white"
            />
          )}

        {/* Uploaded Video */}

        {gallery.mediaType === "video" &&
          gallery.video && (
            <video
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] rounded-xl bg-black"
            >
              <source src={gallery.video} />
              Your browser does not support the video tag.
            </video>
          )}

        {/* YouTube */}

        {gallery.mediaType === "youtube" &&
          gallery.youtubeUrl && (
            <iframe
              src={getYoutubeEmbedUrl(
                gallery.youtubeUrl
              )}
              title={gallery.title}
              className="w-full h-[80vh] rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}

        {/* Caption */}

        <div className="mt-5 text-center">
          <h3 className="text-white text-2xl font-bold">
            {gallery.title}
          </h3>

          {gallery.category && (
            <p className="text-gray-300 mt-2">
              {gallery.category}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}