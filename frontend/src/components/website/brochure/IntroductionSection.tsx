import {
  Home,
  Users,
  Trees,
} from "lucide-react";

export default function IntroductionSection() {
  return (
    <section
      id="intro"
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Background Shapes */}

      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-50 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Image */}

          <div className="relative">

            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-green-300 rounded-3xl"></div>

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <img
                src="/brochure/page2.jpg"
                alt="Introduction"
                className="w-full h-[650px] object-cover transition duration-700 hover:scale-110"
              />

            </div>

            {/* Floating Badge */}

            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">

              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider">

                Community Living

              </p>

              <h3 className="text-3xl font-black mt-2">

                20+

              </h3>

              <p className="text-gray-600">

                Premium Residential Units

              </p>

            </div>

          </div>

          {/* Content */}

          <div>

            <span className="uppercase tracking-[5px] text-green-700 font-semibold">

              Introduction

            </span>

            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mt-6 leading-tight">

              A New Way of
              <br />

              <span className="text-green-700">

                Senior Living

              </span>

            </h2>

            <div className="w-24 h-1 bg-green-600 rounded-full my-8"></div>

            <p className="text-lg leading-9 text-gray-600">

              India is entering a new social era. Life expectancy is increasing, families are becoming smaller, and millions of young people are migrating to cities and foreign countries for education and employment. While this has created new opportunities, it has also given rise to a serious social challenge—elderly people living alone.

            </p>

            <p className="text-lg leading-9 text-gray-600 mt-6">

              Across the country, many senior citizens spend their later years without the daily companionship, emotional support and sense of security that every human being deserves.

            </p>
            <p className="text-lg leading-9 text-gray-600 mt-6">
              Surya Nikunjam Residential Association was established as a response to this growing reality. As a registered Society, our objective is not merely to create houses, but to build a compassionate community where people can age with dignity, friendship and mutual support.
            </p>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-12">

              <div className="text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                  <Home className="text-green-700" />

                </div>

                <h4 className="font-bold text-2xl mt-4">

                  20+

                </h4>

                <p className="text-gray-500 text-sm">

                  Villas

                </p>

              </div>

              <div className="text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                  <Users className="text-green-700" />

                </div>

                <h4 className="font-bold text-2xl mt-4">

                  Community

                </h4>

                <p className="text-gray-500 text-sm">

                  Living

                </p>

              </div>

              <div className="text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                  <Trees className="text-green-700" />

                </div>

                <h4 className="font-bold text-2xl mt-4">

                  Eco

                </h4>

                <p className="text-gray-500 text-sm">

                  Friendly

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}