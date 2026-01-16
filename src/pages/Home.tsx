import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import type { Section } from "../types";
import Work from "./Work";
import Tech from "./Tech";
import About from "./About";

interface HomeProps {
  section: Section | null;
}

const Home: React.FC<HomeProps> = ({ section }) => {
  const [activeSection, setActiveSection] = useState<Section | null>(section);
  const workRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "tech", ref: techRef, label: "Tech" },
    { id: "work", ref: workRef, label: "Work" },
    { id: "about", ref: aboutRef, label: "About" },
  ];

  const handleSectionClick = (sec: Section) => {
    const ref = sections.find(s => s.id === sec)?.ref;
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2; // middle of viewport
      let current: Section | null = null;
      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          if (scrollY >= top && scrollY < bottom) {
            current = id as Section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (section) {
      handleSectionClick(section);
    }
  }, [section]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50">
        <div className="flex justify-end space-x-4 py-2 pr-4">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSectionClick(id as Section)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                activeSection === id ? "bg-white text-black" : "text-white hover:bg-white/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <div className="pt-20">
        <section ref={techRef} id="tech">
          <Tech />
        </section>
        <section ref={workRef} id="work">
          <Work />
        </section>
        <section ref={aboutRef} id="about">
          <About />
        </section>
      </div>
    </div>
  );
};

export default Home;
