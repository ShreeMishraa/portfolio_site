import React, { useEffect, useState } from "react";
import "../index.css";
import { motion, useScroll, useTransform } from "framer-motion";
import NavbarIcons from "./NavbarIcons";
import bgImage from "../assets/loaderbg.png";
import type { Page } from "../types";

const LoaderScene: React.FC<{ onNavigate?: (to: Page) => void }> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const [entered, setEntered] = useState(false);

  // Background zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 3]); // zooms in more gradually

  // Detect scroll threshold for switching layout
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.25 && !entered) setEntered(true);
      if (v < 0.15 && entered) setEntered(false);
    });
    return () => unsubscribe();
  }, [entered, scrollYProgress]);

  // Fallback scroll handling for non-scrollable screens
  useEffect(() => {
    const isScrollable = () => document.documentElement.scrollHeight > window.innerHeight;
    if (isScrollable()) return;

    let raf = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => window.scrollBy({ top: dy, behavior: "smooth" }));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[200vh] bg-black overflow-hidden">
      {/* Background zooms with scroll */}
      <motion.img
        src={bgImage}
        alt="Loader background"
        style={{ scale }}
        className="fixed top-1/2 left-1/2 w-[110vw] h-[110vh] object-cover -translate-x-1/2 -translate-y-1/2 origin-center z-0"
      />

      {/* Scroll to Enter prompt */}
      {!entered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 1, 0.8, 1, 0],
            y: [10, 0, 10],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed top-[18%] right-[29%] text-[#EC008C] text-center text-xs tracking-widest uppercase z-20 leading-tight"
        >
          <p>Scroll To</p>
          <p>Enter ↓</p>
        </motion.div>
      )}

      {/* Navbar icons */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <NavbarIcons onNavigate={onNavigate} scrollYProgress={scrollYProgress} entered={entered} />
      </div>
    </div>
  );
};

export default LoaderScene;
