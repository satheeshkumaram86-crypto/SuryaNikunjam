import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import GalleryCard from "./GalleryCard";
import GalleryModal from "./GalleryModal";

import { getGallery } from "../../../services/galleryService";

import type { Gallery } from "../../../types/gallery";

interface GallerySectionProps {
  limit?: number;
  showViewAll?: boolean;
  showFeaturedVideo?: boolean;
}

export default function GallerySection({
  limit,
  showViewAll = false,
  showFeaturedVideo = false,
}: GallerySectionProps) {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] =
    useState<Gallery | null>(null);

  const [loading, setLoading] = useState(true);

  const loadGallery = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getGallery();

      if (response.success) {
        const galleryData: Gallery[] = Array.isArray(response.gallery)
          ? response.gallery
          : Array.isArray(response.galleries)
          ? response.galleries
          : Array.isArray(response.data)
          ? response.data
          : [];

        const galleryList = galleryData
          .filter((item) => item.isActive)
          .sort((a, b) => a.order - b.order);

        setGalleries(
          limit
            ? galleryList.slice(0, limit)
            : galleryList
        );
      } else {
        setGalleries([]);
      }
    } catch (error) {
      console.error("Failed to load gallery:", error);
      setGalleries([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const featuredVideo = galleries.find(
  (item) =>
    item.mediaType === "video" &&
    item.isActive
);

const galleryItems = showFeaturedVideo
  ? galleries.filter(
      (item) => item._id !== featuredVideo?._id
    )
  : galleries;

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading gallery...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-32 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}

          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold uppercase tracking-widest">
              Our Gallery
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Explore Surya Nikunjam
            </h2>

            <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

            <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8 text-lg">
              Explore beautiful images, uploaded videos and YouTube
              videos showcasing Surya Nikunjam Community.
            </p>
          </div>
 {showFeaturedVideo && featuredVideo && (
  <section className="mb-16">
    <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-100 bg-white">

      {/* Badge */}

      <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
        Surya Nikunjam
      </div>

      <video
        controls
        preload="metadata"
        className="w-full aspect-video object-cover"
      >
        <source
          src={featuredVideo.video}
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </video>

    </div>
  </section>
)}
          {/* Empty State */}

          {galleries.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-700">
                Gallery Coming Soon
              </h3>

              <p className="text-gray-500 mt-3">
                Images and videos will appear here soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((gallery) => (
                <GalleryCard
                  key={gallery._id || gallery.title}
                  gallery={gallery}
                  onClick={setSelectedGallery}
                />
              ))}
            </div>
          )}
        </div>

        {showViewAll && galleries.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
            >
              View All Gallery →
            </Link>
          </div>
        )}
      </section>

      <GalleryModal
        gallery={selectedGallery}
        onClose={() => setSelectedGallery(null)}
      />
    </>
  );
}