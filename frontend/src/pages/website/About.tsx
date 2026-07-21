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

 

  <div className="mt-8 text-gray-700 leading-8 whitespace-pre-line">
    {about.aboutDescription}
  </div>
      </div>

    </div>

   
  </div>
</section>
    </>
  );
}