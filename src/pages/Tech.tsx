import React, { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// ============ SKILLS CLOUD ============
// ⚠️ DO NOT TOUCH THIS PART (UNCHANGED)
interface Skill {
  name: string;
  size: "sm" | "md" | "xl" | "2xl" | "lg";
}

const skills: Skill[] = [
  { name: "Node.js", size: "2xl" },
  { name: "CSS", size: "sm" },
  { name: "React", size: "xl" },
  { name: "Git", size: "md" },
  { name: "Express", size: "2xl" },
  { name: "HTML", size: "sm" },
  { name: "Figma", size: "2xl" },
  { name: "Redux", size: "lg" },
  { name: "REST API", size: "2xl" },
  { name: "TypeScript", size: "lg" },
  { name: "Vue", size: "sm" },
  { name: "JavaScript", size: "xl" },
  { name: "Sass", size: "md" },
  { name: "Framer Motion", size: "xl" },
  { name: "Python", size: "xl" },
  { name: "Next.js", size: "lg" },
  { name: "Docker", size: "xl" },
  { name: "MongoDB", size: "lg" },
  { name: "AWS", size: "2xl" },
  { name: "Tailwind", size: "lg" },
  { name: "Three.js", size: "xl" },
  { name: "Firebase", size: "lg" },
  { name: "PostgreSQL", size: "2xl" },
  { name: "Vite", size: "lg" },
  { name: "GraphQL", size: "xl" },
];

const sizeClasses = {
  sm: "text-[8px] opacity-60",
  md: "text-xs opacity-70",
  lg: "text-sm opacity-80",
  xl: "text-xl font-semibold opacity-95",
  "2xl": "text-3xl font-bold opacity-100",
};

const SkillsCloud = () => {
  return (
    <div className="relative w-3xl max-w-3xl mx-auto py-10 scale-90">
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 px-8">
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

// ============ MAIN TECH COMPONENT ============
const Tech = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dragDistance = useTransform([x, y], ([lx, ly]) => {
    return Math.sqrt((lx as number) ** 2 + (ly as number) ** 2);
  });

  const handleDrag = () => {
    if (dragDistance.get() > 80 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const handleDragEnd = () => {
    if (!isRevealed) {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden font-sans">

      {/* ================= HERO SECTION ================= */}
      <div className="min-h-screen flex items-center justify-center relative">

        <div className="relative">

          {/* NAME STATE */}
          <motion.div
            className="flex items-end justify-center relative"
            animate={{ opacity: isRevealed ? 0 : 1, y: isRevealed ? -40 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white select-none">
              SHREE MISHR
            </h1>

            {/* DRAGGABLE A */}
            <motion.span
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white cursor-grab active:cursor-grabbing select-none absolute -right-10 md:-right-14"
              style={{ x, y, top: "62%" }}
              drag
              dragElastic={0.1}
              dragMomentum={false}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              A
            </motion.span>
          </motion.div>

          {/* REVEAL STATE */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* HI */}
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              HI
            </span>

            {/* HAND CURSOR (ANIMATED) */}
            <motion.img
              src="/src/assets/hand.png"  // 👈 replace with your actual file if needed
              alt="hand cursor"
              className="w-10 md:w-12 lg:w-14 select-none pointer-events-none"
              animate={{
                rotate: [0, 20, -10, 20, -10, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />

            {/* HELLO */}
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              HELLO
            </span>
          </motion.div>

        </div>
      </div>

      {/* ================= SKILLS SECTION (UNCHANGED) ================= */}
      <div className="relative z-10 w-full px-6 py-28 flex items-center justify-center overflow-hidden">
        <SkillsCloud />

        <motion.div
          drag
          dragElastic={0.18}
          dragMomentum={true}
          whileDrag={{ scale: 1.02 }}
          className="absolute z-10 w-[420px] h-[260px] md:w-[560px] md:h-[340px]
                     rounded-3xl bg-zinc-900/90 backdrop-blur-md border border-white/10
                     flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl"
        >
          <p className="text-white text-xl font-medium mb-2">Drag me around</p>
          <p className="text-zinc-400 text-sm">and discover my skills</p>
        </motion.div>
      </div>

    </section>
  );
};

export default Tech;
