import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import AdminLayout from "../../../layouts/AdminLayout";
import GalleryTable from "../../../components/admin/gallery/GalleryTable";

import {
  getGallery,
  deleteGallery,
  toggleGalleryStatus,
} from "../../../services/galleryService";

import type { Gallery } from "../../../types/gallery";

export default function GalleryList() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);

      const response = await getGallery();

      if (response.success) {
        setGallery(response.gallery || []);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Failed to load gallery",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredGallery = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return gallery.filter(
      (item) =>
        (item.title || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.category || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.mediaType || "")
          .toLowerCase()
          .includes(keyword)
    );
  }, [gallery, search]);

  const totalPages = Math.ceil(
    filteredGallery.length / itemsPerPage
  );

  const paginatedGallery = filteredGallery.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasData = filteredGallery.length > 0;

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Media?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteGallery(id);

      await Swal.fire({
        icon: "success",
        title: "Media Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      await loadGallery();

      const keyword = search.toLowerCase().trim();

      const updatedFiltered = gallery.filter(
        (item) =>
          (item.title || "")
            .toLowerCase()
            .includes(keyword) ||
          (item.category || "")
            .toLowerCase()
            .includes(keyword) ||
          (item.mediaType || "")
            .toLowerCase()
            .includes(keyword)
      );

      const newTotalPages = Math.max(
        1,
        Math.ceil(
          updatedFiltered.length / itemsPerPage
        )
      );

      setCurrentPage((prev) =>
        Math.min(prev, newTotalPages)
      );
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Failed to delete media",
      });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleGalleryStatus(id);

      await loadGallery();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data?.message ||
          "Status update failed",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-500">
            Loading Gallery Media...
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Gallery Management
            </h1>

            <p className="text-gray-500 mt-1">
              Upload and manage images,
              uploaded videos, and YouTube
              videos.
            </p>
          </div>

          <Link
            to="/admin/gallery/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Media
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title, category or media type..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 border rounded-lg p-3"
        />

        {/* Table */}
        {hasData ? (
          <GalleryTable
            gallery={paginatedGallery}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ) : (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No gallery media found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or add
              a new image, uploaded video, or
              YouTube video.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`px-4 py-2 rounded ${
                    currentPage ===
                    index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}