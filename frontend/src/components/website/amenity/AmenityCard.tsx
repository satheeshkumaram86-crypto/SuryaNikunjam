import type { Amenity } from "../../../types/amenity";

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({
  amenity,
}: AmenityCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">
      {/* Image */}

      {amenity.image && (
        <div className="overflow-hidden">
          <img
            src={amenity.image}
            alt={amenity.title}
            loading="lazy"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {amenity.title}
        </h3>

        <p className="text-gray-600 leading-7">
          {amenity.description}
        </p>
      </div>
    </div>
  );
}