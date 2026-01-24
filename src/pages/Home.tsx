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
      const scrollY = window.scrollY + window.innerHeight / 2;
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (section) {
      handleSectionClick(section);
    }
  }, [section]);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Navbar - Fixed at bottom center */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center bg-[#1a1a1a]/90 backdrop-blur-md rounded-full px-2 py-2 shadow-lg">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSectionClick(id as Section)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeSection === id 
                  ? "bg-white text-[#1a1a1a] shadow-md" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <div className="pt-10">
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
