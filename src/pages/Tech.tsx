import React from "react";
import { motion } from "framer-motion";

// ============ SKILLS CLOUD ============
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

// Slightly reduced cloud sizes
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
            className={`text-foreground ${sizeClasses[skill.size]} 
              transition-all duration-300 hover:text-primary hover:opacity-100 cursor-default select-none`}
            style={{
              transform: `translateY(${(index % 4) * 5}px)`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.03,
              type: "spring",
              stiffness: 80,
            }}
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
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Hero Section */}
      <div className="relative z-10 w-full h-full grid lg:grid-cols-2">

        {/* Text Side */}
        <div className="flex items-center lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-zinc-400 text-sm tracking-widest uppercase mb-4">
              hello I'm
            </p>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-6xl leading-none mb-6">
              <span className="text-white">Shree Mishra</span>
            </h1>

            <div className="space-y-5 text-zinc-400 text-sm leading-relaxed max-w-md">
              <p>
                A CS undergrad currently based in Patiala, I’m in my pre-final year
                at Thapar Institute of Engineering & Technology.
              </p>

              <p>
                I’m deeply interested in frontend, creative development, and the
                way visuals, motion, and small details can change how something
                feels.
              </p>

              <p>
                Outside of coding, I’m into public speaking and content creation. I
  love expressing ideas and stories in ways that connect with people.
              </p>
            </div>

            <motion.button
              className="mt-10 px-6 py-3 rounded-lg border border-foreground/30 text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Scroll to know more!
            </motion.button>
          </motion.div>
        </div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-screen"
        >
          <img
            src="/src/assets/mishree.png"
            alt="Your portrait"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="relative z-10 w-full px-6 py-28 flex items-center justify-center overflow-hidden">

        {/* Skills Cloud */}
        <div className="relative z-0">
          <SkillsCloud />
        </div>

        {/* Big Draggable Cover */}
        <motion.div
          drag
          dragElastic={0.18}
          dragMomentum={true}
          whileDrag={{ scale: 1.02 }}
          className="absolute z-10 w-[420px] h-[260px] md:w-[560px] md:h-[340px]
                     rounded-3xl bg-zinc-900/90 backdrop-blur-md border border-white/10
                     flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl"
        >
          <p className="text-white text-xl font-medium mb-2">
            Drag me around
          </p>
          <p className="text-zinc-400 text-sm">
            and discover my skills
          </p>
        </motion.div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-transparent to-transparent pointer-events-none" />
    </section>
  );
};

export default Tech;
