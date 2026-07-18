import type { Gallery } from "../../../types/gallery";

interface GalleryCardProps {
  gallery: Gallery;
  onClick: (gallery: Gallery) => void;
}

export default function GalleryCard({
  gallery,
  onClick,
}: GalleryCardProps) {
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
      const id =
        url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("/shorts/")) {
      const id =
        url.split("/shorts/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(gallery)}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          onClick(gallery);
        }
      }}
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {/* Image */}

      {gallery.mediaType ===
        "image" &&
        (gallery.image ? (
          <img
            src={gallery.image}
            alt={gallery.title}
            loading="lazy"
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        ))}

      {/* Uploaded Video */}

      {gallery.mediaType ===
        "video" &&
        (gallery.video ? (
          <video
            src={gallery.video}
            muted
            playsInline
            preload="metadata"
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500">
            No Video
          </div>
        ))}

      {/* YouTube */}

      {gallery.mediaType ===
        "youtube" &&
        gallery.youtubeUrl && (
          <iframe
            src={getYoutubeEmbedUrl(
              gallery.youtubeUrl
            )}
            title={gallery.title}
            className="w-full h-72 pointer-events-none"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />

      {/* Media Badge */}

      <div className="absolute top-3 right-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            gallery.mediaType ===
            "image"
              ? "bg-blue-600"
              : gallery.mediaType ===
                "video"
              ? "bg-purple-600"
              : "bg-red-600"
          }`}
        >
          {gallery.mediaType ===
          "image"
            ? "Image"
            : gallery.mediaType ===
              "video"
            ? "Video"
            : "YouTube"}
        </span>
      </div>

      {/* Title */}

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-xl font-semibold drop-shadow-md truncate">
          {gallery.title}
        </h3>

        {gallery.category && (
          <p className="text-sm opacity-90 mt-1 truncate">
            {gallery.category}
          </p>
        )}
      </div>
    </div>
  );
}