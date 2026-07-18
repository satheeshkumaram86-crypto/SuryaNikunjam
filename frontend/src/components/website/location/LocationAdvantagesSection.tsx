import { useEffect, useState } from "react";
import { CheckCircle, MapPin } from "lucide-react";

import {
  getLocationAdvantage,
} from "../../../services/locationAdvantageService";

import type {
  LocationAdvantage,
} from "../../../types/locationAdvantage";

export default function LocationAdvantagesSection() {
  const [data, setData] =
    useState<LocationAdvantage | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response =
        await getLocationAdvantage();

      if (
        response.success &&
        response.locationAdvantage &&
        response.locationAdvantage.isActive
      ) {
        setData(
          response.locationAdvantage
        );
      }
    } catch (error) {
      console.error(
        "Failed to load Location Advantages",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">
            Loading...
          </p>
        </div>
      </section>
    );
  }

  if (!data) {
  return (
    <section className="py-24 pt-32 bg-white">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="inline-flex items-center gap-2 text-green-700 font-semibold uppercase tracking-wider">
            <MapPin size={18} />
            Prime Location
          </span>

          <h2 className="text-4xl font-bold mt-4 text-gray-900">
            Location Advantages
          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

          <p className="mt-6 text-lg text-gray-600">
            Location details will be available soon.
          </p>

        </div>

        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center">

          <MapPin
            size={60}
            className="mx-auto text-green-600 mb-6"
          />

          <h3 className="text-2xl font-semibold text-gray-800">
            Coming Soon
          </h3>

          <p className="mt-4 text-gray-500">
            Nearby schools, hospitals, shopping centres,
            transport hubs and other location advantages
            will be updated soon.
          </p>

        </div>

      </div>

    </section>
  );
}

  return (
    <section className="pt-32 py-20 bg-gray-50">
<div className="max-w-7xl mx-auto px-4">

  {/* Heading */}

  <div className="text-center mb-16">

    <span className="inline-flex items-center gap-2 text-green-700 font-semibold uppercase tracking-wider">
      <MapPin size={18} />
      Prime Location
    </span>

    <h2 className="text-4xl font-bold mt-4 text-gray-900">
      Location Advantages
    </h2>

    <div className="w-24 h-1 bg-green-600 mx-auto mt-5 rounded-full"></div>

    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
      Surya Nikunjam enjoys a strategic location with easy access to schools,
      hospitals, shopping centres, banks and other essential facilities.
    </p>

  </div>

  {/* Content */}

  <div className="grid lg:grid-cols-2 gap-12 items-start">

  {/* Left Image */}

  {/* Left Map */}

<div>

  <div className="rounded-3xl overflow-hidden shadow-xl h-[500px]">
    <iframe
      title="Surya Nikunjam Location"
      src="https://www.google.com/maps?q=West+Kodikulam+Thodupuzha+Kerala&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>

  <div className="mt-5 flex justify-center">
   <a
  href="https://maps.google.com/?q=West+Kodikulam+Thodupuzha+Kerala"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
>
  <MapPin size={18} className="mr-2" />
  Open in Google Maps
</a>
  </div>
</div>
  {/* Right */}

  <div>

    <h3 className="text-3xl font-bold text-gray-900 mb-8">
      Everything Within Easy Reach
    </h3>

    <div className="space-y-5">

      {data.nearby.map((item, index) => (

        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition"
        >

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">

            <CheckCircle
              size={24}
              className="text-green-600"
            />

          </div>

          <div>

            <h4 className="font-semibold text-gray-800">
              {item}
            </h4>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
<div className="mt-16 text-center">

  <a
    href="/site-visit"
    className="inline-flex items-center rounded-xl bg-green-600 px-8 py-4 font-semibold text-white shadow-lg hover:bg-green-700 transition"
  >
    Book a Site Visit
  </a>

</div>

      </div>

    </section>
  );
}