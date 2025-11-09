import React from "react";
import "../index.css";
import { motion } from "framer-motion";
import apple from "../assets/apple.png";
import butterfly from "../assets/butterfly.png";
import flower from "../assets/flower.png";

interface NavbarIconsProps {
  onNavigate?: (to: "home" | "about") => void;
  entered?: boolean;
}

const NavbarIcons: React.FC<NavbarIconsProps> = ({ onNavigate, entered = false }) => {
  const icons = [
    { src: apple, label: "WORK", delay: 0.2 },
    { src: butterfly, label: "TECH", delay: 0.4 },
    { src: flower, label: "ABOUT", delay: 0.6 },
  ];

  // Motion animation states
  const itemVariants = {
    scattered: (custom: any) => ({
      opacity: 1,
      x: custom.startX,
      y: custom.startY,
      rotate: custom.rotate,
      scale: 1,
      transition: { delay: custom.delay, duration: 0.8, ease: "easeOut" },
    }),
    stacked: (custom: any) => ({
      opacity: 1,
      x: 0,
      y: custom.stackY,
      rotate: 0,
      scale: 1.1,
      transition: { delay: custom.delay, type: "spring", stiffness: 120, damping: 15 },
    }),
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Container ensures items stay centered */}
      <div className="relative w-full h-full flex items-center justify-center">
        {icons.map((item, i) => {

          const startPositions = [
            { x: -180, y: -240 }, // apple
            { x: 0, y: -130 },   // butterfly 
            { x: 160, y: -240 },  // flower 
          ];

          const stackPositions = [
            { y: -180 }, // apple top
            { y: 0 },    // butterfly middle
            { y: 180 },  // flower bottom
          ];

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="scattered"
              animate={entered ? "stacked" : "scattered"}
              custom={{
                startX: startPositions[i].x,
                startY: startPositions[i].y,
                stackY: stackPositions[i].y,
                rotate: -6 + i * 6,
                delay: item.delay,
              }}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                if (item.label === "ABOUT") onNavigate?.("about");
                else if (item.label === "WORK") onNavigate?.("home");
              }}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-20 h-20 md:w-24 md:h-24 hover:scale-110 transition-transform duration-300"
              />
              {entered && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: item.delay + 0.1 } }}
                  className="mt-2 text-xs md:text-sm text-white tracking-wider uppercase"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarIcons;
