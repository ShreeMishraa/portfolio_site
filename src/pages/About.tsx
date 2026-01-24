import React from "react";

const About: React.FC = () => {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/hero-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      {/* GRID CONTAINER */}
      <div className="relative z-10 max-w-7xl w-full h-[85vh] grid grid-cols-4 grid-rows-3 gap-6 p-10">
        
        {/* Top row (4 small) */}
        <div className="bg-white rounded-3xl" />
        <div className="bg-white rounded-3xl" />
        <div className="bg-white rounded-3xl" />
        <div className="bg-white rounded-3xl" />

        {/* Bottom left big */}
        <div className="bg-white rounded-3xl col-span-2 row-span-2" />

        {/* Right side blocks */}
        <div className="bg-white rounded-3xl col-span-2" />
        <div className="bg-white rounded-3xl col-span-2" />
        <div className="bg-white rounded-3xl col-span-2" />
      </div>
    </section>
  );
};

export default About;
