import { ArrowRight } from "lucide-react";

const images = [

{
image:"/brochure/page6.jpg",
title:"Community Living",
large:true,
},

{
image:"/brochure/page2.jpg",
title:"Premium Villas",
},

{
image:"/brochure/page5.jpg",
title:"Nature",
},

{
image:"/brochure/page4.jpg",
title:"Landscape",
},

];

export default function GalleryShowcase() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="uppercase tracking-[5px] text-green-600 font-semibold">

            Project Gallery

          </span>

          <h2 className="text-5xl font-black mt-4">

            Discover Surya Nikunjam

          </h2>

          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mt-6"></div>

          <p className="text-gray-600 mt-8 text-lg max-w-3xl mx-auto">

            Experience peaceful living surrounded by greenery,
            beautiful villas and a caring community.

          </p>

        </div>

        {/* Masonry Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((item, index) => (

            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl shadow-xl
              ${item.large ? "lg:row-span-2 h-[700px]" : "h-[330px]"}`}
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

<div className="absolute bottom-0 left-0 p-8 translate-y-12 group-hover:translate-y-0 transition duration-500">

    <h3 className="text-white text-3xl font-bold">

        {item.title}

    </h3>

</div>

            </div>

          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-20">

          <a
            href="/gallery"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full transition"
          >

            View Full Gallery

            <ArrowRight size={20} />

          </a>

        </div>

      </div>

    </section>
  );
}