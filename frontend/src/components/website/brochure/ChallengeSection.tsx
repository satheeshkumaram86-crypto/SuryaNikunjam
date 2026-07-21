import {
  Users,
  Heart,
  Globe,
  Home,
  ShieldCheck,
} from "lucide-react";

const challenges = [
  {
    icon: Heart,
    title: "Elderly women living alone after the loss of their spouse.",
  },
  {
    icon: Globe,
    title: "Parents whose children are settled in other States or abroad.",
  },
  {
    icon: Users,
    title: "Childless couples entering old age without family support.",
  },
  {
    icon: Home,
    title: "Senior citizens experiencing loneliness, depression and social isolation.",
  },
  {
    icon: ShieldCheck,
    title: "Elderly people who need companionship more than institutional care.",
  },
];

export default function ChallengeSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
      
<div className="absolute inset-0 opacity-5">

<div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-green-500 blur-3xl"></div>

<div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-green-400 blur-3xl"></div>

</div>
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGE */}

          <div className="relative">

            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-green-200 rounded-3xl"></div>

            <div className="overflow-hidden rounded-3xl shadow-2xl">

              <img
  src="/brochure/page3.jpg"
  alt="The Social Challenge"
  className="w-full h-[750px] object-cover transition duration-1000 hover:scale-105"
/>

            </div>

            {/* Floating Card */}

           <div className="absolute bottom-10 left-10 right-10 backdrop-blur-xl bg-white/15 border border-white/30 rounded-3xl p-8">

              <h4 className="text-2xl font-bold text-white">
  Why This Matters
</h4>

<p className="text-gray-100 mt-4 leading-8">

                Many of these citizens are financially independent, yet emotionally vulnerable. They seek a safe and caring community rather than living in isolation.

              </p>

            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div>

            <div className="inline-flex px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold uppercase tracking-[4px]">

              Today's Reality

            </div>

            <h2 className="text-5xl lg:text-6xl font-black mt-5 leading-tight">

              The Social
              <br />

              <span className="text-green-700">

                Challenge

              </span>

            </h2>

            <div className="w-24 h-1 bg-green-600 rounded-full my-8"></div>

            <p className="text-lg leading-9 text-gray-600 mb-12">

              Today, India is witnessing a significant increase in:

            </p>

            <div className="space-y-6">

              {challenges.map((item, index) => {

                const Icon = item.icon;

                return (

                  <div
                    key={index}
                    className="
group
flex
gap-5
p-6
bg-white
rounded-3xl
border
border-gray-100
hover:border-green-500
hover:shadow-2xl
hover:-translate-y-1
transition-all
duration-500
"
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
group-hover:bg-green-600
transition
duration-500
">

                      <Icon
                        className="text-green-700"
                        size={28}
                      />

                    </div>

                    <div>

                      <h3 className="text-lg lg:text-xl font-semibold leading-8 text-gray-900">

                        {item.title}

                      </h3>

                      

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}