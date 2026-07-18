import { useEffect, useState } from "react";

import TestimonialCard from "./TestimonialCard";

import { getTestimonials } from "../../../services/testimonialService";

import type { Testimonial } from "../../../types/testimonial";
import { Link } from "react-router-dom";

interface TestimonialSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function TestimonialSection({
  limit,
  showViewAll = false,
}: TestimonialSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    try {
      setLoading(true);

      const response = await getTestimonials();

      if (response.success) {
        const testimonialList = (
          response.testimonials ||
          response.testimonial ||
          response.data ||
          []
        )
          .filter(
            (item: Testimonial) => item.isActive
          )
          .sort(
            (a: Testimonial, b: Testimonial) =>
              a.order - b.order
          );

        setTestimonials(
  limit
    ? testimonialList.slice(0, limit)
    : testimonialList
);
      }
    } catch (error) {
      console.error(
        "Failed to load testimonials",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadTestimonials();
}, [limit]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading testimonials...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            What Our Residents Say
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
            Hear from residents who have chosen
            Surya Nikunjam as their home and
            experienced a peaceful lifestyle,
            quality construction, and a welcoming
            community.
          </p>

        </div>

        {/* Empty State */}

        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-xl text-gray-500">
              No testimonials available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}

          </div>
        )}

      </div>
{showViewAll && testimonials.length > 0 && (
  <div className="mt-10 text-center">
    <Link
      to="/testimonials"
      className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
    >
      View All Testimonials
    </Link>
  </div>
)}
    </section>
  );
}