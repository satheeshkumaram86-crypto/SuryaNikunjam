import { useEffect, useState } from "react";
import { getAbout } from "../../services/websiteAboutService";

export default function About() {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const res = await getAbout();
      if (res.success) {
        setAbout(res.about);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!about) {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg text-center px-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
            />
          </svg>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-800">
          About Surya Nikunjam
        </h2>

        <p className="mt-4 text-gray-600">
          The About section hasn't been published yet.
        </p>

        <p className="mt-2 text-gray-500">
          Please check back later for more information about our community.
        </p>

        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Back to Home
        </a>
      </div>
    </section>
  );
}

  return (
    <>
      {/* HEADER */}
      <section className="bg-green-700 pt-32 py-20 text-center text-white">
        <h1 className="text-5xl font-bold">
          About Surya Nikunjam
        </h1>
        <p className="mt-4 text-green-100 max-w-3xl mx-auto">
          Discover the story behind our community living project
        </p>
      </section>

      {/* ABOUT CONTENT ONLY */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Introduction */}
    <div className="grid lg:grid-cols-2 gap-14 items-start mb-20">

      <div>
       <img
  src={about.aboutImage}
  alt="About"
  className="w-full rounded-2xl shadow-xl"
/>
      </div>

      <div>
        <span className="text-green-600 font-semibold uppercase tracking-wider">
          About Us
        </span>

         <h2 className="text-4xl font-bold mt-3 text-gray-900">
    {about.aboutTitle}
  </h2>

  <p className="mt-3 text-lg font-medium text-green-700">
    Concept Note on Surya Nikunjam Residential Association
  </p>

  <blockquote className="mt-4 border-l-4 border-green-600 pl-4 italic text-xl text-gray-700">
    "No Elder Should Grow Old in Loneliness."
  </blockquote>

  <div className="mt-8 text-gray-700 leading-8 whitespace-pre-line">
    {about.aboutDescription}
  </div>
      </div>

    </div>

    {/* Social Challenge */}

    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        The Social Challenge
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {[
          "Elderly women living alone after losing their spouse.",
          "Parents whose children live abroad or in other states.",
          "Childless couples entering old age without family support.",
          "Senior citizens experiencing loneliness and depression.",
          "People who need companionship more than institutional care."
        ].map((item, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600"
          >
            {item}
          </div>
        ))}

      </div>
    </div>

    {/* Our Solution */}

    <div className="bg-green-700 rounded-2xl text-white p-12 mb-20">

      <h2 className="text-3xl font-bold mb-6">
        Our Solution – Surya Nikunjam
      </h2>

      <p className="text-lg leading-8">
        Surya Nikunjam is a Community-Based Senior Living Initiative built on
        the philosophy of <strong>"Community Without Walls."</strong>
      </p>

      <p className="mt-6 text-green-100 leading-8">
        Every resident becomes part of an extended family where people care,
        encourage and support one another while maintaining independent living.
      </p>

    </div>

    {/* Major Features */}

    <div className="mb-20">

      <h2 className="text-3xl font-bold text-center mb-10">
        Major Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[
          "Community-Based Senior Living",
          "Safe & Secure Environment",
          "Mutual Care & Social Support",
          "Yoga & Meditation",
          "Wellness Activities",
          "Community Kitchen",
          "Organic Farming",
          "Walking Tracks",
          "Green Spaces",
          "Cultural Activities",
          "Rural Tourism",
          "Eco-friendly Development",
          "Solar Energy"
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-green-700">
              {feature}
            </h3>
          </div>
        ))}

      </div>

    </div>

    {/* Benefits */}

    <div className="grid lg:grid-cols-3 gap-8 mb-20">

      <div className="bg-gray-50 rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-green-700 mb-5">
          Elderly Women
        </h3>

        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>Safe and secure living</li>
          <li>Caring community</li>
          <li>Daily companionship</li>
          <li>Wellness activities</li>
          <li>Support during emergencies</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-green-700 mb-5">
          Parents Without Children
        </h3>

        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>Trusted community network</li>
          <li>Emotional security</li>
          <li>Independent living</li>
          <li>Peace of mind</li>
          <li>Sense of belonging</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-green-700 mb-5">
          Society
        </h3>

        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>Reduce loneliness</li>
          <li>Strengthen community values</li>
          <li>Create rural employment</li>
          <li>Support local businesses</li>
          <li>Promote sustainable living</li>
        </ul>
      </div>

    </div>

    {/* Conclusion */}

    <div className="bg-green-50 rounded-2xl p-12 text-center">

      <h2 className="text-3xl font-bold mb-6">
        A House Gives Shelter... A Community Gives Life.
      </h2>

      <p className="text-lg text-gray-700 leading-8 max-w-4xl mx-auto">
        Surya Nikunjam is not simply about constructing homes. It is about
        rebuilding human relationships and ensuring every senior citizen can
        experience ageing with dignity, friendship, safety and happiness.
      </p>

      <div className="mt-10">
        <h3 className="text-2xl font-bold">
          Founder
        </h3>

        <p className="text-xl mt-2">
          Satheesh Kaimal
        </p>

        <p className="mt-4 text-gray-700">
          📍 West Kodikulam, Thodupuzha, Idukki, Kerala
        </p>

        <p className="text-gray-700">
          📞 +91 9207979677 / +91 9447479677
        </p>

        <p className="text-gray-700">
          ✉️ amskaimal@gmail.com
        </p>

      </div>

    </div>

  </div>
</section>
    </>
  );
}