import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";


export default function ContactSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-black text-white py-28 overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-600/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-4xl mx-auto">

          <span className="inline-block px-5 py-2 rounded-full bg-green-600/20 border border-green-500 text-green-300 uppercase tracking-[4px] text-sm font-semibold">

            Conclusion

          </span>

          <h2 className="text-5xl lg:text-6xl font-black mt-8">

            Surya Nikunjam

          </h2>

          <div className="w-24 h-1 bg-green-500 rounded-full mx-auto my-8"></div>

        </div>

        {/* Client Content */}

        <div className="max-w-5xl mx-auto space-y-6">

          <div className="bg-white/5 backdrop-blur-md border-l-4 border-green-500 rounded-r-2xl p-6">

            <p className="text-xl leading-9 text-gray-100">
              It is not simply about constructing homes.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border-l-4 border-green-500 rounded-r-2xl p-6">

            <p className="text-xl leading-9 text-gray-100">
              It is about rebuilding human relationships.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border-l-4 border-green-500 rounded-r-2xl p-6">

            <p className="text-xl leading-9 text-gray-100">
              It is about ensuring that no elderly woman feels abandoned.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border-l-4 border-green-500 rounded-r-2xl p-6">

            <p className="text-xl leading-9 text-gray-100">
              It is about giving hope to parents who have no children to care for them.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border-l-4 border-green-500 rounded-r-2xl p-6">

            <p className="text-xl leading-9 text-gray-100">
              It is about creating a society where ageing is experienced with dignity,
              friendship, safety and happiness.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-md border-l-4 border-green-500 rounded-r-2xl p-6">

            <p className="text-xl leading-9 text-gray-100">
              If successful, Surya Nikunjam can become a model for similar
              community-based senior living initiatives across India.
            </p>

          </div>

        </div>

        {/* Contact Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/10 hover:bg-white/15 transition">

            <MapPin className="mx-auto text-green-300" size={36} />

            <h3 className="text-2xl font-bold mt-5">

              Address

            </h3>

            <p className="mt-5 text-green-100 leading-8">

              Surya Nikunjam Residential Association
              <br />
              West Kodikulam
              <br />
              Thodupuzha
              <br />
              Idukki, Kerala

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/10 hover:bg-white/15 transition">

            <Phone className="mx-auto text-green-300" size={36} />

            <h3 className="text-2xl font-bold mt-5">

              Contact

            </h3>

            <p className="mt-5 text-green-100 leading-8">

              +91 9207979677
              <br />
              +91 9447479677

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/10 hover:bg-white/15 transition">

            <Mail className="mx-auto text-green-300" size={36} />

            <h3 className="text-2xl font-bold mt-5">

              Email

            </h3>

            <p className="mt-5 text-green-100 break-all">

              amskaimal@gmail.com

            </p>

          </div>

        </div>

        {/* CTA */}

        <div className="text-center mt-20">

         

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

    </section>
  );
}