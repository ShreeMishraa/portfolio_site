import React, { useEffect, useState } from "react";
import LoaderScene from "./components/LoaderScene";
import Home from "./pages/Home";
import type { Page, Section } from "./types";
import "./index.css";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("loader");
  const [section, setSection] = useState<Section | null>(null);

  // 🌗 Theme control
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!hasScrolled && window.scrollY > 10) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  // 🎯 Custom round cursor
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleNavigate = (to: Page) => {
    if (to === "work" || to === "tech" || to === "about") {
      setPage("home");
      setSection(to);
    } else {
      setPage(to);
      setSection(null);
    }
  };

  return (
    <div
      className={`
        min-h-screen w-full
        transition-colors duration-[1200ms] ease-in-out
        ${hasScrolled ? "theme-deep" : "theme-alive"}
      `}
      style={{
        backgroundColor: "var(--bg-main)",
        color: "var(--text-main)",
      }}
    >
      {/* custom cursor */}
      <div className="custom-cursor"></div>

      {page === "loader" && <LoaderScene onNavigate={handleNavigate} />}
      {page === "home" && <Home section={section} />}
    </div>
  );
};

export default App;