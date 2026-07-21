import {
HeartHandshake,
ShieldCheck,
Users,
Trees,
Sparkles,
UtensilsCrossed,
Sun,
Footprints,
Leaf,
Flower2,
House,
Mountain,
} from "lucide-react";
const features = [
  {
    icon: House,
    title: "Community-Based Senior Living",
  },
  {
    icon: ShieldCheck,
    title: "Safe and Secure Environment",
  },
  {
    icon: HeartHandshake,
    title: "Mutual Care and Social Support",
  },
  {
    icon: Flower2,
    title: "Yoga and Meditation",
  },
  {
    icon: Sparkles,
    title: "Wellness and Preventive Health Activities",
  },
  {
    icon: UtensilsCrossed,
    title: "Community Kitchen and Shared Dining",
  },
  {
    icon: Leaf,
    title: "Organic Farming",
  },
  {
    icon: Footprints,
    title: "Walking Tracks and Green Spaces",
  },
  {
    icon: Users,
    title: "Cultural and Recreational Activities",
  },
  {
    icon: Mountain,
    title: "Rural Tourism and Homestay Experience",
  },{
    icon: Trees,
    title: "Eco-friendly Development",
  },
  {
    icon: Sun,
    title: "Solar Energy and Sustainable Living",
  },
];
const solution = {
    image:"/brochure/page4.jpg",

    title:"Community Without Walls",

    content:
`This means every resident is not merely a neighbour but part of an extended family where people care for, encourage and support one another.

The project aims to provide an environment where senior citizens can continue to live independently while enjoying the comfort of a caring community.
`
}
export default function SolutionSection() {

  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background Image */}

      <img
        src={solution.image}
        alt={solution.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="max-w-3xl">

          <div className="inline-flex px-5 py-2 rounded-full bg-green-600/20 border border-green-400 text-green-300 uppercase tracking-[4px] text-sm font-semibold">

            Surya Nikunjam is a Community-Based Senior Living Initiative built on the philosophy of:

          </div>

         <p className="text-green-300 text-2xl italic mt-6">

"Community Without Walls"

</p>

          <div className="w-28 h-1 bg-green-500 rounded-full mt-8 mb-10"></div>

          <p className="text-gray-200 text-xl leading-10">

            {solution.content}

          </p>

        </div>

        {/* Feature Badges */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="
group
bg-white/10
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
hover:bg-green-600/70
transition-all
duration-500
hover:-translate-y-2
"
              >

                <div className="
w-14
h-14
mx-auto
rounded-2xl
bg-green-500
flex
items-center
justify-center
group-hover:scale-110
transition
">

                  <Icon className="text-white" size={28} />

                </div>

                <h3 className="text-white font-bold text-base mt-5 leading-7">

                  {item.title}

                </h3>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}