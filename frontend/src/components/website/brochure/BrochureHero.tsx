import { brochureHero } from "./brochureData";
import {
  ChevronDown,
  MapPin,
  Phone,
} from "lucide-react";

export default function BrochureHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background Image */}

      <img
        src={brochureHero.image}
        alt={brochureHero.title}
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[zoomHero_20s_linear_infinite_alternate]"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

      {/* Content */}

      <div className="relative z-10 flex items-center min-h-screen">

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">

          <div className="max-w-3xl">

            {/* Badge */}

            <span className="inline-flex items-center rounded-full bg-green-600/90 backdrop-blur-md px-5 py-2 text-sm uppercase tracking-[4px] text-white font-semibold">

              {brochureHero.subtitle}

            </span>

            {/* Heading */}

            <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">

              {brochureHero.title}

            </h1>

            {/* Line */}

            <div className="w-28 h-1 bg-green-500 rounded-full mt-8 mb-8"></div>

            {/* Tagline */}

            <h2 className="text-2xl md:text-3xl font-semibold text-green-200 leading-relaxed">

              {brochureHero.tagline}

            </h2>

            {/* Description */}

           <div className="mt-8 max-w-2xl">

  <p className="uppercase tracking-[4px] text-green-300 text-sm font-semibold">

    Concept Note

  </p>

  <h3 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight">

    Surya Nikunjam Residential Association

  </h3>

  <div className="w-20 h-1 bg-green-500 rounded-full my-6"></div>

  <blockquote className="border-l-4 border-green-500 pl-6">

    <p className="text-2xl md:text-3xl italic font-light text-gray-100 leading-relaxed">

      “No Elder Should Grow Old in Loneliness.”

    </p>

  </blockquote>

</div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-12">

              <button
                onClick={() =>
                  document
                    .getElementById("intro")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full transition duration-300"
              >
                Explore Brochure

                <ChevronDown size={20} />
              </button>

             {/*<a
  href="/brochure/brochure.pdf"
  download="Surya-Nikunjam-Brochure.pdf"
  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
>
  <Download
    size={22}
    className="group-hover:-translate-y-1 transition-transform duration-300"
  />

  Download Brochure
</a>*/}

            </div>

          </div>

        </div>

      </div>

      {/* Floating Info Card */}

      <div className="absolute bottom-10 right-10 hidden lg:block">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-80">

          <div className="flex items-center gap-3 text-green-300">

            <MapPin size={20} />

            <span className="font-semibold">

              West Kodikulam, Thodupuzha

            </span>

          </div>

          <div className="mt-5 flex items-center gap-3 text-white">

            <Phone size={18} />

            <span>

              +91 9207979677

            </span>

          </div>

          <div className="mt-2 flex items-center gap-3 text-white">

            <Phone size={18} />

            <span>

              +91 9447479677

            </span>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white">

        <ChevronDown size={36} />

      </div>

    </section>
  );
}