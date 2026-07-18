import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import GalleryForm from "../../../components/admin/gallery/GalleryForm";

import {
  getGalleryById,
  updateGallery,
} from "../../../services/galleryService";

import type { Gallery } from "../../../types/gallery";
import axios from "axios";

export default function EditGallery() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [gallery, setGallery] =
    useState<Gallery>();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const loadGallery = async () => {
    try {
      setPageLoading(true);

      const response =
        await getGalleryById(id!);

      if (response.success) {
        setGallery(response.gallery);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load gallery media",
      });

      navigate("/admin/gallery");
    } finally {
      setPageLoading(false);
    }
  };
 useEffect(() => {
  if (id) {
    loadGallery();
  }
}, [id]);

  const handleSubmit = async (
  formData: FormData
) => {
  try {
    setLoading(true);

    const response = await updateGallery(
      id!,
      formData
    );

    if (response.success) {
      await Swal.fire({
        icon: "success",
        title: "Gallery updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/gallery");
    }
  } catch (error) {
    let message = "Update failed.";

    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: message,
    });
  } finally {
    setLoading(false);
  }
};

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">
            Loading Gallery...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

    <h1 className="text-3xl font-bold mb-8">
      Edit Gallery Media
    </h1>

    {gallery && (
      <GalleryForm
        initialData={gallery}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Update Gallery"
      />
    )}

  </div>
</AdminLayout>
  );
}