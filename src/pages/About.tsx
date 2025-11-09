import React, { useState, useEffect } from "react";
import "../index.css";
import me1 from "../assets/me1.jpg";
import me2 from "../assets/me2.jpg";
//import me3 from "../assets/me3.jpg";

const About: React.FC = () => {
  const images = [me1, me2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Top Navigation */}
      <nav className="w-full flex justify-between items-center px-8 md:px-16 py-8 text-xs tracking-wider uppercase">
        <h1 className="font-normal text-sm">MAITREYI CHAVAN</h1>
        <div className="flex gap-8 text-gray-400">
          <a href="#work" className="hover:text-white transition-colors">
            WORK
          </a>
          <a href="#play" className="hover:text-white transition-colors">
            PLAY
          </a>
          <a href="#about" className="text-white transition-colors">
            ABOUT
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>↗</span> CONTACT
          </a>
        </div>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 px-8 md:px-16 py-12 md:py-16 items-start">
        {/* Left side - Image */}
        <div className="relative w-full flex justify-start">
          <img
            src={images[currentImageIndex]}
            alt="Maitreyi Chavan"
            className="w-full max-w-[600px] h-auto object-cover"
          />
        </div>

        {/* Right side - Text */}
        <div className="space-y-8 text-left leading-relaxed max-w-xl">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-light text-gray-300">
              Hello! I'm Maitreyi Chavan.
            </h2>
            <p className="text-base md:text-lg text-gray-400">
              Currently based in Pune, I'm in my final year at MIT Institute of Design.
            </p>
          </div>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            I create work that sits at the intersection of storytelling, visual culture, and
            emotion. I work across illustration, branding, publication & beyond.
          </p>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            My approach is driven by curiosity and intuition. Shaped by a love for music,
            everyday observations, and the subtle patterns that connect people to
            stories. I love making visuals that feel alive, layered, and personal.
          </p>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Outside of design, I'm into music and sushi, and I'm always on the hunt for
            places that pair them perfectly ;)
          </p>

          <div className="border-t border-gray-800 pt-8 mt-12">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-wide">
              Previously at
            </p>
            <a 
              href="#studio" 
              className="flex items-center gap-2 text-sm md:text-base text-gray-300 hover:text-white transition-colors group"
            >
              <span>↗</span>
              <span className="group-hover:underline">STUDIO BOOMRANG</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;