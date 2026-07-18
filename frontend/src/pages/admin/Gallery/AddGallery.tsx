import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import AdminLayout from "../../../layouts/AdminLayout";
import GalleryForm from "../../../components/admin/gallery/GalleryForm";
import { createGallery } from "../../../services/galleryService";

export default function AddGallery() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);

      const response = await createGallery(formData);

      if (response.success) {
        await Swal.fire({
          icon: "success",
          title: "Gallery media added successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/admin/gallery");
      }
    } catch (error) {
      let message = "Failed to add gallery media.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Add Gallery Media
        </h1>

        <p className="text-gray-500 mb-8">
          Upload images or videos that will be displayed in the public gallery.
        </p>

        <GalleryForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Save Gallery"
        />
      </div>
    </AdminLayout>
  );
}