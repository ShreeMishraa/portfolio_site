import React, { useEffect, useState } from "react";
import "../index.css";
import { motion, useScroll, useTransform } from "framer-motion";
import NavbarIcons from "./NavbarIcons";
import bgImage from "../assets/loaderbg.png";

type Page = "home" | "about";

const LoaderScene: React.FC<{ onNavigate?: (to: Page) => void }> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const [entered, setEntered] = useState(false);

  // 🔹 Zoom effect for background
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 3.5]); // zooms up to 350%

  // 🔹 Detect when icons should rearrange (scroll threshold)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.2 && !entered) setEntered(true);
      if (v < 0.1 && entered) setEntered(false);
    });
    return () => unsubscribe();
  }, [entered, scrollYProgress]);

  // 🔹 Scroll fallback for non-scrollable devices
  useEffect(() => {
    const isScrollable = () => document.documentElement.scrollHeight > window.innerHeight;
    if (isScrollable()) return;

    let raf = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        window.scrollBy({ top: dy, behavior: "smooth" });
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      window.scrollBy({ top: -touch.clientY * 0.02, behavior: "smooth" });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[180vh] bg-black">
      {/* 🔹 Background image zooms with scroll */}
      <motion.img
        src={bgImage}
        alt="Loader background"
        style={{ scale }}
        className="fixed top-1/2 left-1/2 w-[110vw] h-[110vh] object-cover -translate-x-1/2 -translate-y-1/2 origin-center"
      />

      {/* 🔹 Scroll to Enter prompt */}
      {!entered && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 1, 0.8, 1, 0],
            y: [10, 0, 10],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed top-[15%] right-[22%] text-black text-sm tracking-widest uppercase z-20"
        >
          Scroll to enter ↓
        </motion.p>
      )}

      {/* 🔹 Icons transition */}
      <div className="fixed inset-0 flex items-center justify-center">
        <NavbarIcons onNavigate={onNavigate} entered={entered} />
      </div>
    </div>
  );
};

export default LoaderScene;
