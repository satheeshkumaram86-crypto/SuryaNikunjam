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
      <p className="text-lg text-gray-700 leading-8 text-center max-w-4xl mx-auto mb-8">Today, India is witnessing a significant increase in:</p>
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
<p className="text-lg text-gray-700 leading-8 max-w-5xl mx-auto mb-20 text-center">Many of these citizens are financially independent, yet emotionally vulnerable. They seek a safe and caring community rather than living in isolation.</p>
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
        This means every resident is not merely a neighbour but part of an extended family where people care for, encourage and support one another.
      </p>
      <p className="mt-6 text-green-100 leading-8 text-lg">The project aims to provide an environment where senior citizens can continue to live independently while enjoying the comfort of a caring community.</p>
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
          "Wellness and Preventive Health Activities",
          "Community Kitchen and Shared Dining",
          "Organic Farming",
          "Walking Tracks",
          "Green Spaces",
          "Cultural and Recreational Activities",
          "Rural Tourism and Homestay Experience",
          "Eco-friendly Development",
          "Solar Energy and Sustainable Living"
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
<div className="bg-green-50 rounded-2xl p-10 mb-20">
  <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
    Why This Model is Important
  </h2>

  <p className="text-lg text-gray-700 leading-8 mb-8 text-center">
    Surya Nikunjam addresses several national priorities simultaneously:
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[
      "Healthy Ageing",
      "Mental Well-being",
      "Social Inclusion",
      "Community Participation",
      "Rural Development",
      "Employment Generation",
      "Sustainable Tourism",
      "Women's Safety and Social Security",
      "Environmental Sustainability",
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600"
      >
        {item}
      </div>
    ))}
  </div>
</div>
    {/* Benefits */}

    <div className="grid lg:grid-cols-3 gap-8 mb-20">

      <div className="bg-gray-50 rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-green-700 mb-5">
          Elderly Women Living Alone
        </h3>

        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>A safe and secure living environment.</li>
          <li>A caring community instead of loneliness.</li>
          <li>Daily social interaction and companionship.</li>
          <li>Access to wellness activities.</li>
          <li>Emotional support during illness and emergencies.</li>
          <li>Opportunities to participate in cultural and community programmes.</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-green-700 mb-5">
          Parents Without Children
        </h3>

        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>A trusted community network.</li>
          <li>Emotional security and companionship.</li>
          <li>A sense of belonging.</li>
          <li>Independent living with community support.</li>
          <li>Dignity and peace of mind in later life.</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-green-700 mb-5">
          Society
        </h3>

        <ul className="space-y-3 list-disc list-inside text-gray-700">
          <li>Reducing loneliness among senior citizens.</li>
          <li>Strengthening community values.</li>
          <li>Creating rural employment.</li>
          <li>Promoting responsible tourism.</li>
          <li>Supporting local farmers and small businesses.</li>
          <li>Encouraging healthy lifestyles.</li>
          <li>Building a compassionate society.</li>
        </ul>
      </div>

    </div>
<div className="bg-white border border-green-200 rounded-2xl p-10 mb-20 shadow-sm">
  <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
    Our Request
  </h2>

  <div className="space-y-5 text-lg text-gray-700 leading-8">
    <p>
      We respectfully seek the guidance and support of the Government of India,
      the Government of Kerala, public representatives, CSR partners and
      philanthropic organisations to develop Surya Nikunjam as a model
      Community-Based Senior Living initiative.
    </p>

    <p>
      We also seek guidance regarding eligible Government programmes,
      institutional support and partnerships that can help strengthen this
      social initiative.
    </p>
  </div>
</div>
    {/* Conclusion */}

    <div className="bg-green-50 rounded-2xl p-12 text-center">

      <h2 className="text-3xl font-bold mb-6">
        A House Gives Shelter... A Community Gives Life.
      </h2>

      <p className="text-lg text-gray-700 leading-8 max-w-4xl mx-auto">
        Surya Nikunjam is not simply about constructing homes. It is about
        rebuilding human relationships, ensuring that no elderly woman feels abandoned, giving hope to parents who have no children to care for them and creating a society where ageing is experienced with dignity, friendship, safety and happiness.
      </p>
        <p className="text-lg text-gray-700 leading-8 max-w-4xl mx-auto pt-5">If successful, Surya Nikunjam can become a model for similar community-based senior living initiatives across India.</p>
      <div className="mt-10">
        <h3 className="text-2xl font-bold">
          Founder
        </h3>

        <p className="text-xl mt-2">
          Satheesh Kaimal
        </p>

        <p className="mt-4 text-gray-700">
  <strong>Surya Nikunjam Residential Association</strong>
</p>

<p className="mt-2 text-gray-700">
  📍 West Kodikulam,<br />
  Near Thodupuzha,<br />
  Idukki, Kerala, India
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