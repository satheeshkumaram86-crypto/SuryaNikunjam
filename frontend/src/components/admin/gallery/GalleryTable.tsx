import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import type { Gallery } from "../../../types/gallery";

interface GalleryTableProps {
  gallery: Gallery[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function GalleryTable({
  gallery,
  onDelete,
  onToggle,
}: GalleryTableProps) {
  
const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
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

  if (gallery.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <p className="text-gray-500 text-lg">
          No gallery items found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full table-auto">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">
              Preview
            </th>

            <th className="px-4 py-3 text-left">
              Title
            </th>

            <th className="px-4 py-3 text-center">
              Type
            </th>

            <th className="px-4 py-3 text-center">
              Order
            </th>

            <th className="px-4 py-3 text-center">
              Status
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {gallery.map((item) => (
            <tr
              key={item._id}
              className="border-t hover:bg-gray-50"
            >
              {/* Preview */}

             <td className="px-4 py-3">

  {/* Image */}
  {item.mediaType === "image" && (
    item.image ? (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-28 h-20 rounded-lg border object-cover"
      />
    ) : (
      <span className="text-gray-400 text-sm">
        No Image
      </span>
    )
  )}

  {/* Uploaded Video */}
  {item.mediaType === "video" && (
    item.video ? (
      <video
        muted
        playsInline
        preload="metadata"
        className="w-28 h-20 rounded-lg border object-cover"
      >
        <source src={item.video} />
      </video>
    ) : (
      <span className="text-gray-400 text-sm">
        No Video
      </span>
    )
  )}

  {/* YouTube */}
 {item.mediaType === "youtube" && (
  item.youtubeUrl ? (
    <iframe
      className="w-28 h-20 rounded-lg border"
      src={getYoutubeEmbedUrl(item.youtubeUrl)}
      title={item.title}
      allowFullScreen
    />
  ) : (
    <span className="text-gray-400 text-sm">
      No YouTube Video
    </span>
  )
)}

</td>
              {/* Title */}

              <td className="px-4 py-3 font-medium max-w-xs">
  <div className="truncate">
    {item.title}
  </div>
</td>

              {/* Type */}

              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.mediaType === "image"
                      ? "bg-blue-100 text-blue-700"
                      : item.mediaType === "video"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.mediaType === "image"
                    ? "Image"
                    : item.mediaType === "video"
                    ? "Video"
                    : "YouTube"}
                </span>
              </td>

              {/* Order */}

              <td className="px-4 py-3 text-center">
                {item.order}
              </td>

              {/* Status */}

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() =>
                    onToggle(item._id!)
                  }
                  className={`px-4 py-1 rounded-full text-white text-sm transition ${
                    item.isActive
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {item.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </td>

              {/* Actions */}

              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">

                  <Link
                    aria-label="Edit Gallery" to={`/admin/gallery/edit/${item._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button aria-label="Delete Gallery"
                    onClick={() =>
                      onDelete(item._id!)
                    }
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}