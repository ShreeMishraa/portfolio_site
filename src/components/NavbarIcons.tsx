import React from "react";
import "../index.css";
import {
  motion,
  useTransform,
  MotionValue,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import type { Page } from "../types";

const apple = "/apple.png";
const butterfly = "/butterfly.png";
const flower = "/flower.png";

interface NavbarIconsProps {
  onNavigate?: (to: Page) => void;
  scrollYProgress: MotionValue<number>;
  entered?: boolean;
}

const NavbarIcons: React.FC<NavbarIconsProps> = ({
  onNavigate,
  scrollYProgress,
  entered = false,
}) => {
  // 🦋 Idle butterfly float (gentle up-down)
  const butterflyFloat = useMotionValue(0);
  useAnimationFrame((t) => {
    butterflyFloat.set(Math.sin(t / 800) * 5); // slow floating motion
  });

  // 🍎 Apple motion
  const appleX = useTransform(scrollYProgress, [0, 0.4], [-140, 0]);
  const appleY = useTransform(scrollYProgress, [0, 0.4], [-200, -120]);
  const appleScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  // 🦋 Butterfly motion (combine base Y with floating offset)
  const butterflyX = useTransform(scrollYProgress, [0, 0.4], [0, 0]);
  const butterflyYBase = useTransform(scrollYProgress, [0, 0.4], [-120, 30]);
  const butterflyScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);

  // Combine butterfly base Y + float
  const butterflyY = useMotionValue(0);
  useAnimationFrame(() => {
    butterflyY.set(butterflyYBase.get() + butterflyFloat.get());
  });

  // 🌸 Flower motion
  const flowerX = useTransform(scrollYProgress, [0, 0.4], [110, 0]);
  const flowerY = useTransform(scrollYProgress, [0, 0.4], [-200, 200]);
  const flowerScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* 🍎 Apple */}
      <motion.div
        style={{ x: appleX, y: appleY, scale: appleScale }}
        className="absolute flex flex-col items-center"
        onClick={() => onNavigate?.("tech")}
      >
        <img
          src={apple}
          alt="TECH"
          className="w-24 h-20 md:w-24 md:h-20 hover:scale-110 transition-transform duration-300"
        />
        {entered && (
          <span className="text-xs mt-2 uppercase tracking-widest text-white">
            Tech
          </span>
        )}
      </motion.div>

      {/* 🦋 Butterfly */}
      <motion.div
        style={{ x: butterflyX, y: butterflyY, scale: butterflyScale }}
        className="absolute flex flex-col items-center"
        onClick={() => onNavigate?.("work")}
      >
        <img
          src={butterfly}
          alt="WORK"
          className="w-28 h-20 md:w-28 md:h-20 hover:scale-110 transition-transform duration-300"
        />
        {entered && (
          <span className="text-xs mt-2 uppercase tracking-widest text-white">
            Work
          </span>
        )}
      </motion.div>

      {/* 🌸 Flower */}
      <motion.div
        style={{ x: flowerX, y: flowerY, scale: flowerScale }}
        className="absolute flex flex-col items-center"
        onClick={() => onNavigate?.("about")}
      >
        <img
          src={flower}
          alt="ABOUT"
          className="w-20 h-20 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300"
        />
        {entered && (
          <span className="text-xs mt-2 uppercase tracking-widest text-white">
            About
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default NavbarIcons;
