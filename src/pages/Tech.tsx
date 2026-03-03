import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useScroll } from "framer-motion";

// ============ SKILLS CLOUD ============
interface Skill {
  name: string;
  size: "sm" | "md" | "xl" | "2xl" | "lg";
}

const skills: Skill[] = [
  { name: "Node.js", size: "2xl" },
  { name: "Tailwind CSS", size: "lg" },
  { name: "React", size: "xl" },
  { name: "Git/Github", size: "md" },
  { name: "Express", size: "2xl" },
  { name: "C/C++", size: "lg" },
  { name: "Figma", size: "2xl" },
  { name: "Redux", size: "lg" },
  { name: "REST API", size: "2xl" },
  { name: "TypeScript", size: "lg" },
  { name: "Power BI", size: "sm" },
  { name: "JavaScript", size: "xl" },
  { name: "GSAP", size: "md" },
  { name: "Framer Motion", size: "xl" },
  { name: "Python", size: "xl" },
  { name: "Next.js", size: "lg" },
  { name: "Docker", size: "xl" },
  { name: "MongoDB", size: "lg" },
  { name: "AWS", size: "2xl" },
  { name: "Scikit-learn", size: "lg" },
  { name: "Three.js", size: "xl" },
  { name: "Firebase", size: "lg" },
  { name: "PostgreSQL", size: "2xl" },
  { name: "Vite", size: "lg" },
  { name: "JWT", size: "xl" },
];

const sizeClasses = {
  sm: "text-[6px] opacity-60",
  md: "text-xs opacity-70",
  lg: "text-sm opacity-80",
  xl: "text-xl font-semibold opacity-95",
  "2xl": "text-3xl font-bold opacity-100",
};

const SkillsCloud = () => {
  return (
    <div className="relative w-2xl max-w-2xl mx-auto scale-90">
      <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 px-4">
        {skills.map((skill, index) => (
          <motion.span
            key={skill.name}
            className={`text-foreground ${sizeClasses[skill.size]}`}
            style={{ transform: `translateY(${(index % 4) * 5}px)` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.03, type: "spring", stiffness: 80 }}
            whileHover={{ scale: 1.1 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

// ============ HAND IMAGE COMPONENT ============
const HandCursor = () => {
  return (
    <motion.img
      src="/hand.png"
      alt="hand"
      className="w-10 h-10 select-none"
      animate={{ rotate: [0, 18, -10, 18, -10, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
      style={{ originX: 0.2, originY: 0.8 }}
    />
  );
};

// ============ MOUSE FOLLOWER  ============
const MouseFollower = ({ children, speed = 0.05 }: { children: React.ReactNode; speed?: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePosition({
        x: (e.clientX - centerX) * speed,
        y: (e.clientY - centerY) * speed,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [speed]);

  useEffect(() => {
    let raf: number;

    const animateLoop = () => {
      setPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
      raf = requestAnimationFrame(animateLoop);
    };

    raf = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(raf);
  }, [mousePosition]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============ MAIN TECH COMPONENT ============
const Tech = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const heroRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });


  const dragDistance = useTransform([x, y], ([lx, ly]) => {
    return Math.sqrt((lx as number) ** 2 + (ly as number) ** 2);
  });

  const handleDrag = () => {};

  const handleDragEnd = () => {
    if (dragDistance.get() > 80 && !isRevealed) {
      setIsRevealed(true);
      setTimeout(() => setIsRevealed(false), 3000);
    } else if (!isRevealed) {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  const handleEmailClick = () => {
    window.open("/mishreeResume.pdf", "_blank");
  };

  const nameLetters = ["S", "H", "R", "E", "E", " ", " ", "M", "I", "S", "H", "R", "A"];

  return (
    <section className="relative font-sans">

      {/* ================= HERO ================= */}
      <motion.div
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" } as any}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10">
          {!isRevealed && (
            <div className="flex items-end justify-center relative">
              {nameLetters.map((letter, i) => {
                const isLastA = letter === "A" && i === nameLetters.length - 1;
                const isSpace = letter === " ";

                return (
                  <motion.span
                    key={i}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.08 * i, duration: 0.1 }}
                    style={{
                      display: "inline-block",
                      transform: isLastA ? "translateY(15px)" : "translateY(0)",
                    }}
                  >
                    {isSpace ? (
                      "\u00A0"
                    ) : isLastA ? (
                      <motion.span
                        style={{ x, y, display: "inline-block" }}
                        drag
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        {letter}
                      </motion.span>
                    ) : (
                      letter
                    )}
                  </motion.span>
                );
              })}

              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <p className="text-white/70 text-xs whitespace-nowrap">drag "A" anywhere on screen →</p>
              </div>
            </div>
          )}

          {isRevealed && (
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">HI</span>
              <HandCursor />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">HELLO</span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="h-screen" />

      {/* ================= SKILLS ================= */}
     <div
  className="relative z-20 w-full px-4 py-20 flex items-stretch justify-between gap-4 bg-[#294045] overflow-hidden" 
>  

        {/* LEFT */}
        <div className="w-[30%] flex items-center justify-center h-80">
          <motion.div
            onClick={handleEmailClick}
            className="w-[320px] h-full rounded-3xl bg-white/80 backdrop-blur-md border border-white/20
                       flex flex-col items-center justify-center cursor-pointer shadow-2xl"
          >
            <div className="mb-4 text-sm p-2 font-serif text-zinc-700 bg-zinc-200/70 px-4 py-2 rounded-full">
              click to see my resume
            </div>

            <MouseFollower speed={0.08}>
              <img src="/resume.png" alt="envelope" className="w-12 h-12 object-contain" />
            </MouseFollower>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="w-[70%] relative flex items-center justify-center h-80">
          <SkillsCloud />

          <motion.div
            drag
            dragElastic={0.18}
            dragMomentum={true}
            whileDrag={{ scale: 1.02 }}
            className="absolute z-10 w-[700px] h-full md:w-[800px]
                       rounded-3xl bg-white/80 backdrop-blur-md border border-white/20
                       flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl"
          >
            <div className="mb-6 text-sm p-2 font-serif text-zinc-700 bg-zinc-200/70 px-4 py-2 rounded-full">
              Drag to see my skills
            </div>

            <MouseFollower speed={0.05}>
              <img src="/closed-hand.png" alt="cursor hand" className="w-12 h-12 object-contain" />
            </MouseFollower>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
