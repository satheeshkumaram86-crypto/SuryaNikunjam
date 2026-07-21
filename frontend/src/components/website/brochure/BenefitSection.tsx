import {
  Heart,
  Users,
  Globe,
} from "lucide-react";

const benefits = [
  {
    title: "For Elderly Women Living Alone",
    icon: Heart,
    image: "/brochure/page7.jpg",
    points: [
      "A safe and secure living environment",
      "A caring community instead of loneliness.",
      "Daily social interaction and companionship.",
      "Access to wellness activities",
      "Emotional support during illness and emergencies",
      "Opportunities to participate in cultural and community programmes",
    ],
  },
  {
    title: "For Parents Without Children",
    icon: Users,
    image: "/brochure/page8.jpg",
    points: [
      "A trusted community network",
      "Emotional security and companionship.",
      "A sense of belonging",
      "Independent living with community support",
      "Dignity and peace of mind in later life",
    ],
  },
  {
    title: "For Society",
    icon: Globe,
    image: "/brochure/page9.jpg",
    points: [
      "Reducing loneliness among senior citizens.",
      "Strengthening community values",
      "Creating rural employment",
      "Promoting responsible tourism",
      "Supporting local farmers and small businesses",
      "Encouraging healthy lifestyles",
      "Building a compassionate society",
    ],
  },
];

export default function BenefitSection() {
  return (
    <section className="py-28 bg-gradient-to-b from-green-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[5px] text-green-600 font-semibold">

            Who Benefits?

          </span>

          <h2 className="text-5xl font-black mt-4">

            Built For People,
            <br />
            Designed For Life

          </h2>

          <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mt-6"></div>

          <p className="text-gray-600 mt-8 text-lg leading-8">

            Surya Nikunjam creates a supportive environment where senior
            citizens enjoy independence, companionship and peace of mind.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-20">

          {benefits.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="group overflow-hidden rounded-3xl shadow-xl bg-white hover:border-green-600
border
border-transparent transition duration-500"
              >

                <div className="relative h-[380px] overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                 <div className="absolute bottom-6 left-6 right-6">

<div className="backdrop-blur-md bg-white/10 rounded-2xl p-5 border border-white/20">

<div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">

<Icon className="text-white" size={24} />

</div>

<h3 className="text-2xl font-bold text-white mt-4">

{item.title}

</h3>

</div>

</div>

                </div>

                <div className="p-10">

                  <ul className="space-y-4">

                    {item.points.map((point, i) => (
<li
                        key={i}
                        className="
flex
items-start
gap-4
text-gray-700
leading-7">
                      
                        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">

✓

</div>


                        {point}

                      </li>

                    ))}

                  </ul>

                  

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}