import React from "react";
import Slider from "react-slick";

import { Github, Instagram, Linkedin, Mail } from "lucide-react";

// Replace these with your real school images
import school1 from "../assets/school1.avif";
import school2 from "../assets/school2.jpg";
import school3 from "../assets/school3.jpg";

const About: React.FC = () => {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">

      {/* BACKGROUND COLOR */}
      <div className="absolute inset-0 bg-[#487078]" />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {/* GRID CONTAINER */}
        <div className="max-w-7xl w-full h-[85vh] grid grid-cols-4 grid-rows-3 gap-6 p-10">
          
          {/* ========== TOP ROW ========== */}

          {/* 1️⃣ MAP CARD */}
          <div className="relative bg-[#0b1220] rounded-3xl overflow-hidden">

            <div className="absolute inset-0 overflow-hidden">
              <iframe
                title="Shahjahanpur Map"
                className="absolute left-0 top-[-80px] w-full h-[calc(100%+160px)] border-0 brightness-[0.85] contrast-[1.15] saturate-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.85%2C27.83%2C80.05%2C28.03&layer=mapnik&marker=27.88%2C79.91"
              />
            </div>

            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />

            <div className="absolute left-4 right-4 bottom-4">
              <div className="backdrop-blur-md bg-gradient-to-r from-white/35 to-white/20 border border-white/40 rounded-2xl px-4 py-[6px] flex items-center gap-3 shadow-lg">

                <div className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center">
                  <div className="w-[2px] h-4 bg-red-400 rounded-full" />
                </div>

                <div className="flex-1 leading-tight">
                  <div className="text-white text-[13px] font-semibold">
                    Shahjahanpur
                  </div>
                  <div className="text-white/80 text-[11px]">
                    Uttar Pradesh, India
                  </div>
                </div>

                <div className="text-white text-[16px] font-semibold">
                  28°
                </div>

              </div>
            </div>
          </div>

          {/* 2️⃣ SOCIAL MEDIA CARD (YOUR CODE) */}
          <div className="bg-white rounded-3xl flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] bg-white rounded-3xl border-[3px] border-foreground overflow-hidden">
              
              {/* Social accounts pill */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                <div className="px-5 py-2 bg-gray-200 rounded-full">
                  <span className="text-sm font-medium text-foreground">
                    Social accounts
                  </span>
                </div>
              </div>

              {/* Icons clustered at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-28">

                <div
                  className="absolute text-foreground"
                  style={{
                    left: "5px",
                    bottom: "8px",
                    transform: "rotate(-25deg)",
                  }}
                >
                  <Instagram size={58} strokeWidth={1.5} />
                </div>

                <div
                  className="absolute text-foreground"
                  style={{
                    left: "55px",
                    bottom: "18px",
                    transform: "rotate(-12deg)",
                  }}
                >
                  <Github size={52} strokeWidth={1.5} />
                </div>

                <div
                  className="absolute text-foreground"
                  style={{
                    left: "115px",
                    bottom: "4px",
                    transform: "rotate(8deg)",
                  }}
                >
                  <Mail size={50} strokeWidth={1.5} />
                </div>

                <div
                  className="absolute text-foreground"
                  style={{
                    right: "8px",
                    bottom: "10px",
                    transform: "rotate(22deg)",
                  }}
                >
                  <Linkedin size={54} strokeWidth={1.5} />
                </div>

              </div>
            </div>
          </div>

          {/* 3️⃣ EMPTY */}
          <div className="bg-white rounded-3xl" />

          {/* 4️⃣ SCHOOL CAROUSEL */}
          <div className="bg-white rounded-3xl overflow-hidden">
            <Slider {...sliderSettings} className="h-full">
              {[school1, school2, school3].map((img, i) => (
                <div key={i} className="w-full h-[100%]">
                  <img
                    src={img}
                    alt={`School ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* ========== LEFT BIG ========== */}
          <div className="bg-white rounded-3xl col-span-2 row-span-2" />

          {/* ========== RIGHT STACK ========== */}
          <div className="bg-white rounded-3xl col-span-2" />
          <div className="bg-white rounded-3xl col-span-2" />
          <div className="bg-white rounded-3xl col-span-2" />

        </div>
      </div>
    </section>
  );
};

export default About;
