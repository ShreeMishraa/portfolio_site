import { useState, useEffect } from "react";

import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.jpg";
import card5 from "../assets/card5.jpg";
import card6 from "../assets/card6.jpg";

type Work = {
  id: number;
  title: string;
  techStack: string;
  description: string;
  gradient: string;
  image: string;
  link: string;
};

const worksData: Work[] = [
  {
    id: 1,
    title: "Vajra : Next Gen Firewall",
    techStack: "C++ • Python • DPDK • Suricata IDS • Scikit-learn • Linux • JSON • shared memory",
    description:
      "Smart india hackathon winner project - high-performance network security system designed to monitor, analyze, and filter network traffic in real time, combining high-speed packet processing with intrusion detection and machine learning–based threat detection.",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    image: card1,
    link: "https://github.com/ShreeMishraa/Vajra_SIH",
  },
  {
    id: 2,
    title: "Vanvaas",
    techStack: "LIVE PROJECT (ongoing)",
    description:
      "a web application that serves as your base for wild escapes and provides users with the ability to manage their camping experiences effectively.",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    image: card2,
    link: "https://github.com/bkanishka004/Vanvaas",
  },
  {
    id: 3,
    title: "Virtual DJ",
    techStack: "Javascript • Tailwind CSS",
    description:
      "A beginner-friendly web application that enables users to mix and control upto 5 music tracks through an intuitive digital DJ interface, making music mixing accessible to anyone.",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    image: card3,
    link: "https://virtualdj-status-200-edur.vercel.app/",
  },
  {
    id: 4,
    title: "Escape Room",
    techStack: "React • Framer Motion • GSAP • TailwindCSS",
    description:
      "A browser-based interactive puzzle game built using React, featuring animated transitions and interactive elements powered by Framer Motion and GSAP..",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    image: card4,
    link: "https://escape-room-byshree.netlify.app/",
  },
  {
    id: 5,
    title: "Arogyam",
    techStack: "React • Node.js • Express.js • MongoDB • JWT",
    description:
      "A full-stack Hospital management system with robust authentication & data encryption for upto 1000+ concurrent users",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)",
    image: card5,
    link: "https://arogyam-hms.vercel.app/",
  },
  {
    id: 6,
    title: "GoSnap",
    techStack: "React • Node.js • Express.js • Sharp.js • Docker",
    description:
      "A web-based image processing platform that enables users to perform operations such as cropping, flipping, applying filters, and other image editing functionalities through an intuitive interface.",
    gradient: "linear-gradient(135deg, #30cfd0, #330867)",
    image: card6,
    link: "https://gosnap-dss.vercel.app/",
  },
];

const CARD_W = 340;
const H_CARD = 450;
const H_CARD_OPEN = 500;
const OVERLAP = 190;

export default function WorksSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[#294045]" />
      

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

        <div className="relative w-[92%] h-[760px] bg-white/80 flex items-center justify-center overflow-hidden rounded-[36px]">
          
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
                  className="relative shrink-0"
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
                    className="w-full rounded-[28px] shadow-2xl overflow-hidden cursor-pointer bg-[#487078]"
                    style={{
                      height: isExpanded ? H_CARD_OPEN : H_CARD,
                      transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="absolute top-10 font-serif w-full text-center text-white/40 text-xs tracking-widest uppercase pointer-events-none z-50">
                      Hover the card & scroll to open
                    </div>

                    <div className="relative w-full h-full">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      {!isExpanded && (
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-white text-xl font-light tracking-wide">
                            {work.title}
                          </h3>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="absolute inset-0 bg-black/92 p-8 pt-16 flex flex-col">
                          
                          <h2 className="text-white text-2xl font-light">
                            {work.title}
                          </h2>

                          <p className="text-zinc-400 text-sm mt-4 leading-relaxed flex-1">
                            {work.description}
                          </p>

                          <div className="text-[11px] uppercase tracking-widest text-zinc-400 mt-2">
                            {work.techStack}
                          </div>

                          <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 px-6 py-3 bg-white text-black text-xs uppercase tracking-wider rounded-lg hover:bg-zinc-200 transition-colors text-center"
                          >
                            View Project →
                          </a>

                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}