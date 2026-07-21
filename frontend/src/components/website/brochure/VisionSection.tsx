import {
  HeartHandshake,
  Users,
  Leaf,
  Home,
} from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "20+",
    label: "Residential Units",
  },
  {
    icon: Users,
    value: "100%",
    label: "Community Living",
  },
  {
    icon: Leaf,
    value: "Eco",
    label: "Friendly Lifestyle",
  },
  {
    icon: HeartHandshake,
    value: "24/7",
    label: "Care & Support",
  },
];

export default function VisionSection() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background */}

     <img
src="/brochure/page10.jpg"
className="absolute inset-0 w-full h-full object-cover"
/>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-black/75 to-green-900/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Quote */}

        <div className="max-w-4xl">

          <div className="inline-flex items-center bg-green-600/20 border border-green-400 text-green-300 px-5 py-2 rounded-full text-sm uppercase tracking-[4px] font-semibold">

  Our Request

</div>

          <h2 className="text-5xl lg:text-7xl font-black text-white mt-8 leading-tight">

  <span className="text-green-300 text-7xl">“</span>

  A House Gives Shelter...

  <br />

  <span className="text-green-300">
    A Community Gives Life.
  </span>

  <span className="text-green-300 text-7xl">”</span>

</h2>

          <div className="w-28 h-1 bg-green-400 rounded-full my-10"></div>

          <div className="mt-10 max-w-4xl space-y-8">

  <p className="text-lg md:text-xl leading-9 text-gray-100 bg-white/5 backdrop-blur-sm border-l-4 border-green-400 p-6 rounded-r-2xl">

            We respectfully seek the guidance and support of the Government of India, the Government of Kerala, public representatives, CSR partners and philanthropic organisations to develop Surya Nikunjam as a model Community-Based Senior Living initiative.

          </p>
          <p className="text-lg md:text-xl leading-9 text-gray-100 bg-white/5 backdrop-blur-sm border-l-4 border-green-400 p-6 rounded-r-2xl">We also seek guidance regarding eligible Government programmes, institutional support and partnerships that can help strengthen this social initiative.</p>
          </div>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:bg-green-600/60 transition duration-500"
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center">

                  <Icon className="text-white" size={28} />

                </div>

                <h3 className="text-5xl font-black text-white mt-8">

                  {item.value}

                </h3>

                <p className="text-green-100 mt-3">

                  {item.label}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}