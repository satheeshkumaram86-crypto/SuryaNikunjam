import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeSectionProps {
  data: any;
}

export default function WelcomeSection({
  data,
}: WelcomeSectionProps) {
  if (!data) return null;

  return (
    <section className="py-24 pt-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Image */}

          <div className="relative">

            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-green-200 rounded-3xl"></div>

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              {data.welcomeImage ? (
                <img
                  src={data.welcomeImage}
                  alt={data.welcomeTitle}
                  className="w-full h-[550px] object-cover transition duration-700 hover:scale-110"
                />
              ) : (
                <div className="w-full h-[550px] rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">
                    Welcome Image
                  </span>
                </div>
              )}

            </div>


          </div>

          {/* Right Content */}

          <div>

           

            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mt-6 leading-tight">

              {data.welcomeTitle}

            </h2>

            <div className="w-24 h-1 bg-green-600 rounded-full my-8"></div>

            <p className="text-2xl italic text-green-700 font-medium leading-relaxed">

              "A Community Where Life Blossoms Together"

            </p>

            <p className="mt-8 text-lg text-gray-600 leading-9 whitespace-pre-line">

              {data.welcomeDescription}

            </p>

          

            <Link
              to="/about"
              className="inline-flex items-center gap-3 mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full transition"
            >
              Learn More

              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}