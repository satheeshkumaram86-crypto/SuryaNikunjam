import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import type { Gallery } from "../../../types/gallery";

interface GalleryFormProps {
  initialData?: Gallery;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitText?: string;
}

type MediaType = "image" | "video" | "youtube";

export default function GalleryForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Gallery",
}: GalleryFormProps) {
  

  const [preview, setPreview] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    mediaType: "image" as MediaType,
    youtubeUrl: "",
    order: 1,
    isActive: true,
  });
const MAX_FILE_SIZE = 80 * 1024 * 1024; // 80 MB
  useEffect(() => {
    if (!initialData) return;

    setForm({
      title: initialData.title || "",
      category:
        initialData.category || "",
      mediaType:
        initialData.mediaType ||
        "image",
      youtubeUrl:
        initialData.youtubeUrl || "",
      order: initialData.order || 1,
      isActive:
        initialData.isActive,
    });

    if (
      initialData.mediaType ===
      "image"
    ) {
      setPreview(
        initialData.image
          ? `${initialData.image}`
          : ""
      );
    }

    if (
      initialData.mediaType ===
      "video"
    ) {
      setPreview(
        initialData.video
          ? `${initialData.video}`
          : ""
      );
    }

    if (
      initialData.mediaType ===
      "youtube"
    ) {
      setPreview(
        initialData.youtubeUrl || ""
      );
    }
  }, [initialData]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

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

  const changeHandler = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  if (name === "mediaType") {
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");

    setForm((prev) => ({
      ...prev,
      mediaType: value as MediaType,
      youtubeUrl: "",
    }));

    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "order"
        ? Number(value)
        : value,
  }));
};

  const fileHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files?.length) return;

  const selected = e.target.files[0];

  // Validate file type
  if (
    form.mediaType === "image" &&
    !selected.type.startsWith("image/")
  ) {
    Swal.fire({
      icon: "warning",
      title: "Please select an image file.",
    });

    e.target.value = "";
    return;
  }

  if (
    form.mediaType === "video" &&
    !selected.type.startsWith("video/")
  ) {
    Swal.fire({
      icon: "warning",
      title: "Please select a video file.",
    });

    e.target.value = "";
    return;
  }

  // Validate size
  if (selected.size > MAX_FILE_SIZE) {
  Swal.fire({
    icon: "warning",
    title: "Maximum upload size is 80 MB.",
  });

  setFile(null);
  e.target.value = "";
  return;
}

  // Remove previous preview
  if (preview.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
  }

  setFile(selected);
  setPreview(URL.createObjectURL(selected));
};
  const submitHandler = async (
  e: React.FormEvent
) => {
  e.preventDefault();

if (loading) return;

  if (!form.title.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Gallery title is required.",
    });

    return;
  }

  if (form.mediaType === "youtube") {
    const youtubeRegex =
/^(https?:\/\/)?((www|m)\.)?(youtube\.com|youtu\.be)\//;

    if (
      !form.youtubeUrl.trim() ||
      !youtubeRegex.test(form.youtubeUrl)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a valid YouTube URL.",
      });

      return;
    }
  } else {
    if (
      !file &&
      !initialData?.image &&
      !initialData?.video
    ) {
      Swal.fire({
        icon: "warning",
        title:
          form.mediaType === "image"
            ? "Please select an image."
            : "Please select a video.",
      });

      return;
    }
  }

  const formData = new FormData();

  formData.append(
    "title",
    form.title.trim()
  );

  formData.append(
    "category",
    form.category.trim()
  );

  formData.append(
    "mediaType",
    form.mediaType
  );

  formData.append(
    "youtubeUrl",
    form.youtubeUrl.trim()
  );

  formData.append(
    "order",
    String(form.order)
  );

  formData.append(
    "isActive",
    String(form.isActive)
  );

  if (
    file &&
    form.mediaType !== "youtube"
  ) {
    formData.append("file", file);
  }

  await onSubmit(formData);
};

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-6"
    >
      {/* Title */}

      <div>
        <label className="block mb-2 font-medium">
          Gallery Title *
        </label>

        <input
          type="text"
          name="title"
          required
          value={form.title}
          onChange={
            changeHandler
          }
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Category */}

      <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={
            form.category
          }
          onChange={
            changeHandler
          }
          placeholder="Example: Villas"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Media Type */}

      <div>
        <label className="block mb-2 font-medium">
          Media Type
        </label>

        <select
          name="mediaType"
          value={
            form.mediaType
          }
          onChange={
            changeHandler
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="image">
            Image
          </option>

          <option value="video">
            Uploaded Video
          </option>

          <option value="youtube">
            YouTube Video
          </option>
        </select>
      </div>

      {/* Upload */}

      {form.mediaType !==
        "youtube" && (
        <div>
          <label className="block mb-2 font-medium">
            {form.mediaType ===
            "image"
              ? "Upload Image"
              : "Upload Video"}
          </label>

          <input
  type="file"
  accept={
    form.mediaType === "image"
      ? "image/jpeg,image/png,image/webp"
      : "video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-matroska"
  }
  onChange={fileHandler}
  className="w-full"
/>

<p className="text-sm text-gray-500 mt-2">
  Maximum upload size: 500 MB
</p>

{file && (
  <p className="text-sm text-green-600 mt-2">
    Selected: {file.name}
  </p>
)}
        </div>
      )}

      {/* Youtube */}

      {form.mediaType ===
        "youtube" && (
        <div>
          <label className="block mb-2 font-medium">
            YouTube URL
          </label>

          <input
            type="url"
            name="youtubeUrl"
            value={
              form.youtubeUrl
            }
            onChange={
              changeHandler
            }
            placeholder="Paste YouTube link (Watch, Shorts or youtu.be)"
            className="w-full border rounded-lg p-3"
          />
        </div>
      )}

      {/* Order & Status */}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Display Order
          </label>

          <input
            type="number"
            min={1}
            name="order"
            value={form.order}
            onChange={
              changeHandler
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={String(
              form.isActive
            )}
            onChange={(
              e
            ) =>
              setForm(
                (
                  prev
                ) => ({
                  ...prev,
                  isActive:
                    e.target
                      .value ===
                    "true",
                })
              )
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>
          </select>
        </div>
      </div>

      {/* Preview */}

      {form.mediaType ===
        "image" &&
        preview && (
          <div>
            <label className="block mb-2 font-medium">
              Image Preview
            </label>

            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-md h-64 rounded-lg border object-cover"
            />
          </div>
        )}

      {form.mediaType ===
        "video" &&
        preview && (
          <div>
            <label className="block mb-2 font-medium">
              Video Preview
            </label>

            <video
              controls
              className="w-full max-w-md h-64 rounded-lg border"
            >
              <source
                src={preview}
              />
            </video>
          </div>
        )}

      {form.mediaType ===
        "youtube" &&
        form.youtubeUrl && (
          <div>
            <label className="block mb-2 font-medium">
              YouTube Preview
            </label>

            <iframe
              className="w-full max-w-md h-60 rounded-lg border"
              src={getYoutubeEmbedUrl(
                form.youtubeUrl
              )}
              allowFullScreen
            />
          </div>
        )}

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : submitText}
      </button>
    </form>
  );
}