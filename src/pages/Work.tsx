import React, { useEffect, useRef, useState } from "react";
import { motion, Reorder } from "framer-motion";

type Work = {
  id: number;
  title: string;
  technique: string;
  year: string;
  description: string;
  image: string;
};

const worksData: Work[] = [
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
  const [items, setItems] = useState<Work[]>(worksData);
  const [showHint, setShowHint] = useState(false);
  const [startFall, setStartFall] = useState(false);
  const [spread, setSpread] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  // Random pile positions
  const pilePositions = useRef(
    worksData.map(() => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 120 - 60,
      rotate: Math.random() * 20 - 10,
    }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;

          setShowHint(true);

          setTimeout(() => {
            setShowHint(false);
            setStartFall(true);

            // After falling + bounce, spread into grid
            setTimeout(() => {
              setSpread(true);
            }, 1800);
          }, 3000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="text-white py-24 px-6 md:px-16 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative" ref={boundsRef}>

        {/* Hint */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="text-center">
              <p className="text-zinc-300 text-lg md:text-xl font-light">
                wait for my projects,
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                arrange them in the order you like
              </p>
            </div>
          </motion.div>
        )}

        {/* Grid / Pile Container */}
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 relative"
        >
          {items.map((work, index) => {
            const pile = pilePositions.current[index];

            return (
              <Reorder.Item key={work.id} value={work} className="list-none">
                <motion.div
                  layout
                  drag
                  dragConstraints={boundsRef}   // ✅ THIS FIXES THE BUG
                  dragElastic={0.2}
                  initial={{
                    y: -600,
                    opacity: 0,
                    rotate: pile.rotate,
                  }}
                  animate={
                    startFall
                      ? spread
                        ? { x: 0, y: 0, rotate: 0, opacity: 1 }
                        : {
                            x: pile.x,
                            y: pile.y,
                            rotate: pile.rotate,
                            opacity: 1,
                          }
                      : { y: -600, opacity: 0 }
                  }
                  transition={
                    spread
                      ? {
                          type: "spring",
                          stiffness: 120,
                          damping: 18,
                        }
                      : {
                          type: "spring",
                          stiffness: 160,
                          damping: 12,
                          mass: 1.2,
                          delay: index * 0.4,
                        }
                  }
                  className="group relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
                  style={{
                    pointerEvents: spread ? "auto" : "none",
                  }}
                >
                  {/* Image */}
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 transition duration-500" />

                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
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
                </motion.div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    </section>
  );
};

export default WorksSection;
