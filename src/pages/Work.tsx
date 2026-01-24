import React, { useState, useEffect } from "react";

import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.jpg";
import card5 from "../assets/card5.jpg";
import card6 from "../assets/card6.jpg";

type Work = {
  id: number;
  title: string;
  technique: string;
  year: string;
  description: string;
  gradient: string;
  image: string;
};

const worksData: Work[] = [
  { id: 1, title: "Fragments of Memory", technique: "", year: "", description: "Layered memories exploring the fragmentation of digital consciousness and human recollection.", gradient: "linear-gradient(135deg, #667eea, #764ba2)", image: card1 },
  { id: 2, title: "Bloom in Silence", technique: "", year: "", description: "Organic forms emerging from digital void, celebrating growth in unexpected places.", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", image: card2 },
  { id: 3, title: "Echoes of Time", technique: "", year: "", description: "Architecture dissolving into temporal fragments, questioning permanence in the digital age.", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", image: card3 },
  { id: 4, title: "Synthetic Dreams", technique: "", year: "", description: "Human vs machine consciousness explored through generative visual narratives.", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", image: card4 },
  { id: 5, title: "Digital Horizons", technique: "", year: "", description: "Digital landscapes that blur the boundary between screen and reality.", gradient: "linear-gradient(135deg, #fa709a, #fee140)", image: card5 },
  { id: 6, title: "Neon Pulse", technique: "", year: "", description: "Rhythmic visual compositions driven by light, speed, and digital energy.", gradient: "linear-gradient(135deg, #30cfd0, #330867)", image: card6 },
];

// 🔧 TUNABLE CONSTANTS
const CARD_W = 340;
const H_CARD = 450;
const H_CARD_OPEN = 500;
const OVERLAP = 190;

export default function WorksSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to open
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (hoveredIndex !== null) {
        e.preventDefault();
        setScrollProgress((p) =>
          Math.max(0, Math.min(100, p + e.deltaY * 0.12))
        );
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [hoveredIndex]);

  useEffect(() => {
    setScrollProgress(0);
  }, [hoveredIndex]);

  return (
    <section className="w-full h-screen bg-[#1a1a1a]/90 overflow-hidden flex flex-col items-center justify-center">

      {/* WHITE CONTAINER */}
      <div className="relative w-[92%] h-[760px] bg-white/90 flex items-center justify-center overflow-hidden rounded-[36px]">
        {/* Static Fan */}
        <div className="flex items-center justify-center">
          {worksData.map((work, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = isHovered && scrollProgress > 15;

            let rotateZ = index % 2 === 0 ? -7 : 7;
            if (index === Math.floor(worksData.length / 2)) rotateZ = 0;
            if (isHovered) rotateZ = 0;

            const scale = isHovered ? 1.12 + scrollProgress * 0.002 : 1;

            return (
              <div
              
                key={work.id}
                className="relative flex-shrink-0"
                style={{
                  width: CARD_W,
                  marginLeft: index === 0 ? 0 : -OVERLAP,
                  transform: `rotate(${rotateZ}deg) scale(${scale})`,
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: isHovered ? 100 : 10 + index,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="w-full rounded-[28px] shadow-2xl overflow-hidden cursor-pointer bg-black"
                  style={{
                    height: isExpanded ? H_CARD_OPEN : H_CARD,
                    transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="absolute top-10 w-full text-center text-white/40 text-xs tracking-widest uppercase pointer-events-none z-50">
        Hover the card & scroll to open
      </div>

                  {/* IMAGE */}
                  <div className="relative w-full h-full">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* CLOSED TITLE */}
                    {!isExpanded && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white text-xl font-light tracking-wide">
                          {work.title}
                        </h3>
                      </div>
                    )}

                    {/* OPEN STATE */}
                    {isExpanded && (
                      <div className="absolute inset-0 bg-black/92 p-8 flex flex-col">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-400">
                          {work.technique} • {work.year}
                        </div>
                        <h2 className="text-white text-2xl mt-3 font-light">
                          {work.title}
                        </h2>
                        <p className="text-zinc-400 text-sm mt-3 leading-relaxed flex-1">
                          {work.description}
                        </p>
                        <button className="mt-4 px-6 py-3 bg-white text-black text-xs uppercase tracking-wider rounded-lg hover:bg-zinc-200 transition-colors">
                          View Project →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
