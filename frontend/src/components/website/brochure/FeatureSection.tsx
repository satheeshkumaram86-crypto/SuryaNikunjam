import {
  Home,
  ShieldCheck,
  HeartHandshake,
  Trees,
  UtensilsCrossed,
  Footprints,
  Dumbbell,
  Bike,
  PartyPopper,
} from "lucide-react";
import { ArrowUpRight } from "lucide-react";
const features = [
  {
    icon: Home,
    title: "Healthy Ageing",
  },
  {
    icon: ShieldCheck,
    title: "Mental Well-being",
  },
  {
    icon: HeartHandshake,
    title: "Social Inclusion",
  },
  {
    icon: Dumbbell,
    title: "Community Participation",
  },
  {
    icon: UtensilsCrossed,
    title: "Rural Development",
  },
  {
    icon: Trees,
    title: "Employment Generation",
  },
  {
    icon: Footprints,
    title: "Sustainable Tourism",
  },
  {
    icon: PartyPopper,
    title: "Women's Safety and Social Security",
  },
  {
    icon: Bike,
    title: "Environmental Sustainability",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-green-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-green-600 font-semibold">

            Why This Model is Important

          </span>

          <h2 className="text-5xl font-black mt-4 text-gray-900">
  Why This Model Matters
</h2>

          <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mt-6"></div>

          <p className="text-gray-600 mt-8 text-xl leading-9 max-w-3xl mx-auto">

            Surya Nikunjam addresses several national priorities simultaneously:

          </p>

        </div>
<div className="overflow-hidden rounded-3xl shadow-xl mb-20">

<img
src="/brochure/page5.jpg"
className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
/>

</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-20">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={index}
                className="group rounded-[28px] bg-white border border-gray-200 p-8 hover:bg-gradient-to-br
hover:from-green-700
hover:to-green-900 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >

                <div
className="
w-16
h-16
rounded-2xl
bg-green-100
flex
items-center
justify-center
group-hover:bg-white
group-hover:scale-110
transition-all
duration-500
">

                  <Icon
                    size={30}
                    className="text-green-700"
                  />

                </div>

                <div className="flex justify-between items-center mt-8">

<h3 className="text-xl font-bold group-hover:text-white">

{feature.title}

</h3>

<ArrowUpRight
className="text-green-700 group-hover:text-white"
/>

</div>

                <div className="w-10 h-1 bg-green-500 rounded-full mt-6 group-hover:bg-white"></div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}