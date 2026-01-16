import React from "react";

type Work = {
  id: number;
  title: string;
  technique: string;
  year: string;
  description: string;
  image: string;
};

const works: Work[] = [
  {
    id: 1,
    title: "Fragments of Memory",
    technique: "Digital Art / Mixed Media",
    year: "2025",
    description:
      "This piece explores layered memories, emotions, and time. The textures represent chaos, while the soft transitions show acceptance and calm.",
    image: "/works/work1.jpg",
  },
  {
    id: 2,
    title: "Bloom in Silence",
    technique: "3D / Generative Art",
    year: "2025",
    description:
      "A quiet explosion of colors and forms. This work represents growth even in isolation and the beauty of silent transformation.",
    image: "/works/work2.jpg",
  },
  {
    id: 3,
    title: "Echoes of Time",
    technique: "Concept Art",
    year: "2024",
    description:
      "A study of light, shadow and forgotten spaces. This artwork represents memories fading into architecture.",
    image: "/works/work3.jpg",
  },
  {
    id: 4,
    title: "Synthetic Dreams",
    technique: "3D / AI Art",
    year: "2025",
    description:
      "Exploring the boundary between human imagination and machine-generated realities.",
    image: "/works/work4.jpg",
  },
];

const WorksSection: React.FC = () => {
  return (
    <section className="bg-[#0b0b0b] text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {works.map((work) => (
            <div
              key={work.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Image */}
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition duration-500" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-2xl font-light tracking-wide mb-2">
                  {work.title}
                </h3>

                <div className="text-xs text-zinc-400 mb-3">
                  <p>TECHNIQUE — {work.technique}</p>
                  <p>YEAR — {work.year}</p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-5 max-w-md">
                  {work.description}
                </p>

                <div className="flex gap-4">
                  <button className="px-5 py-2 border border-zinc-400 text-xs tracking-wide hover:bg-white hover:text-black transition">
                    VIEW PROJECT
                  </button>
                  <button className="px-5 py-2 bg-white text-black text-xs tracking-wide hover:bg-zinc-200 transition">
                    SEE DETAILS
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WorksSection;
