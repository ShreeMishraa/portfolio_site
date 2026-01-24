import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Work = {
  id: number;
  title: string;
  color: string;
};

const worksData: Work[] = [
  { id: 1, title: "Brand", color: "#1f7a63" },
  { id: 2, title: "Social", color: "#7aa2ff" },
  { id: 3, title: "Activations", color: "#ff6a2c" },
  { id: 4, title: "Video Production", color: "#7a1f3d" },
  { id: 5, title: "With Partners", color: "#f2b7ff" },
];

// 🎯 This controls the fan shape
const transforms = [
  { rotate: -12, x: -120, y: 20, scale: 0.95, z: 1 },
  { rotate: -6, x: -60, y: 0, scale: 0.98, z: 2 },
  { rotate: 0, x: 0, y: -10, scale: 1, z: 3 }, // center
  { rotate: 6, x: 60, y: 0, scale: 0.98, z: 2 },
  { rotate: 12, x: 120, y: 20, scale: 0.95, z: 1 },
];

export default function WorksSection() {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    swipe: true,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-[#f4efe9] overflow-hidden">
      <div className="w-[900px] relative">
        <Slider {...settings}>
          {worksData.map((work, index) => (
            <div key={work.id}>
              <FanStack cards={worksData} activeIndex={index} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

/* ---------------- FAN STACK RENDERER ---------------- */

function FanStack({
  cards,
  activeIndex,
}: {
  cards: Work[];
  activeIndex: number;
}) {
  return (
    <div className="relative h-[420px] flex items-center justify-center">
      {cards.map((card, i) => {
        const total = cards.length;

        // compute relative position
        let offset = i - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const t = transforms[offset + 2]; // center = index 2

        if (!t) return null;

        return (
          <div
            key={card.id}
            className="absolute w-[240px] h-[340px] rounded-2xl shadow-2xl text-white font-bold text-xl flex items-center justify-center"
            style={{
              background: card.color,
              transform: `
                translate(${t.x}px, ${t.y}px)
                rotate(${t.rotate}deg)
                scale(${t.scale})
              `,
              zIndex: t.z,
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {card.title}
          </div>
        );
      })}
    </div>
  );
}
