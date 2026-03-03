import React, { useState, useRef, useEffect, useCallback } from "react";
import Slider from "react-slick";

import favSongImg from "../assets/favsong.jpg";

import ach1 from "../assets/ach1.jpeg";
import ach2 from "../assets/ach2.jpeg";
import ach3 from "../assets/ach3.jpeg";

import instagramImg from "../assets/instagram.png";
import githubImg from "../assets/github.jpg";
import mailImg from "../assets/resume.png";
import linkedinImg from "../assets/linkedin.png";
import leetcodeImg from "../assets/leetcode.png";

import handImg from "../assets/hand.png";

type CardId = "map" | "social" | "doodle" | "song" | "about" | "drag" | "achiev";

const INITIAL_ORDER: CardId[] = ["map", "social", "doodle", "song", "about", "drag", "achiev"];


const SLOT_CLASSES: string[] = [
  "col-span-1 row-span-1", // 0 map
  "col-span-1 row-span-1", // 1 social
  "col-span-1 row-span-1", // 2 doodle
  "col-span-1 row-span-1", // 3 song
  "col-span-2 row-span-2", // 4 about
  "col-span-1 row-span-2", // 5 drag
  "col-span-1 row-span-2", // 6 achievements
];

const About: React.FC = () => {
  // slotOrder[slotIndex] = cardId currently in that slot
  const [slotOrder, setSlotOrder] = useState<CardId[]>([...INITIAL_ORDER]);

  // cardId → current translate offset (while dragging only)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [draggingCard, setDraggingCard] = useState<CardId | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  // refs for each slot's DOM element so we can read their rects
  const slotRefs = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));

  const dragState = useRef<{
    cardId: CardId;
    fromSlot: number;
    startMouseX: number;
    startMouseY: number;
    cardLeft: number;
    cardTop: number;
    cardW: number;
    cardH: number;
  } | null>(null);

  // ── Find which slot a cardId currently lives in ────────────────────────────
  const slotOfCard = useCallback((id: CardId) => slotOrder.indexOf(id), [slotOrder]);

  // ── Find which slot index the mouse is currently hovering ─────────────────
  const getHoveredSlot = useCallback((mouseX: number, mouseY: number): number | null => {
    let best: number | null = null;
    let bestArea = 0;

    slotRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      // overlap of card center with slot rect
      if (mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom) {
        const area = r.width * r.height;
        if (area > bestArea) { bestArea = area; best = i; }
      }
    });
    return best;
  }, []);

  // ── Mouse down on a card ──────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent, cardId: CardId) => {
    if ((e.target as HTMLElement).closest("button,a,input,select,textarea")) return;
    e.preventDefault();

    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const fromSlot = slotOfCard(cardId);

    setDraggingCard(cardId);
    setDragOffset({ x: 0, y: 0 });

    dragState.current = {
      cardId,
      fromSlot,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      cardLeft: rect.left,
      cardTop: rect.top,
      cardW: rect.width,
      cardH: rect.height,
    };
  }, [slotOfCard]);

  const onTouchStart = useCallback((e: React.TouchEvent, cardId: CardId) => {
    const touch = e.touches[0];
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const fromSlot = slotOfCard(cardId);

    setDraggingCard(cardId);
    setDragOffset({ x: 0, y: 0 });

    dragState.current = {
      cardId,
      fromSlot,
      startMouseX: touch.clientX,
      startMouseY: touch.clientY,
      cardLeft: rect.left,
      cardTop: rect.top,
      cardW: rect.width,
      cardH: rect.height,
    };
  }, [slotOfCard]);

  // ── Global mouse move ────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragState.current) return;
      const d = dragState.current;
      const dx = e.clientX - d.startMouseX;
      const dy = e.clientY - d.startMouseY;
      setDragOffset({ x: dx, y: dy });

      // highlight target slot based on card center
      const cx = d.cardLeft + d.cardW / 2 + dx;
      const cy = d.cardTop  + d.cardH / 2 + dy;
      setHoveredSlot(getHoveredSlot(cx, cy));
    };

    const onUp = (e: MouseEvent) => {
      if (!dragState.current) return;
      const d = dragState.current;
      const dx = e.clientX - d.startMouseX;
      const dy = e.clientY - d.startMouseY;

      const cx = d.cardLeft + d.cardW / 2 + dx;
      const cy = d.cardTop  + d.cardH / 2 + dy;
      const targetSlot = getHoveredSlot(cx, cy);

      if (targetSlot !== null && targetSlot !== d.fromSlot) {
        // swap the two cards
        setSlotOrder(prev => {
          const next = [...prev];
          const fromCard  = next[d.fromSlot];
          const toCard    = next[targetSlot];
          next[d.fromSlot]  = toCard;
          next[targetSlot]  = fromCard;
          return next;
        });
      }

      dragState.current = null;
      setDraggingCard(null);
      setDragOffset(null);
      setHoveredSlot(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [getHoveredSlot]);

  // ── Global touch move / end ──────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!dragState.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const d = dragState.current;
      const dx = touch.clientX - d.startMouseX;
      const dy = touch.clientY - d.startMouseY;
      setDragOffset({ x: dx, y: dy });

      const cx = d.cardLeft + d.cardW / 2 + dx;
      const cy = d.cardTop  + d.cardH / 2 + dy;
      setHoveredSlot(getHoveredSlot(cx, cy));
    };

    const onEnd = (e: TouchEvent) => {
      if (!dragState.current) return;
      const touch = e.changedTouches[0];
      const d = dragState.current;
      const dx = touch.clientX - d.startMouseX;
      const dy = touch.clientY - d.startMouseY;

      const cx = d.cardLeft + d.cardW / 2 + dx;
      const cy = d.cardTop  + d.cardH / 2 + dy;
      const targetSlot = getHoveredSlot(cx, cy);

      if (targetSlot !== null && targetSlot !== d.fromSlot) {
        setSlotOrder(prev => {
          const next = [...prev];
          const fromCard = next[d.fromSlot];
          const toCard   = next[targetSlot];
          next[d.fromSlot] = toCard;
          next[targetSlot] = fromCard;
          return next;
        });
      }

      dragState.current = null;
      setDraggingCard(null);
      setDragOffset(null);
      setHoveredSlot(null);
    };

    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend",  onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend",  onEnd);
    };
  }, [getHoveredSlot]);

  const sliderSettings = {
    dots: false, arrows: false, infinite: true, speed: 800,
    autoplay: true, autoplaySpeed: 3000, slidesToShow: 1,
    slidesToScroll: 1, pauseOnHover: false,
  };

  // ── Card content renderer ────────────────────────────────────────────────
  const renderCard = (cardId: CardId) => {
    switch (cardId) {
      case "map":
        return (
          <div className="absolute inset-0 bg-[#0b1220] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                title="Shahjahanpur Map"
                className="absolute left-0 -top-20 w-full h-[calc(100%+160px)] border-0 brightness-[0.90] contrast-[1.15] saturate-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.85%2C27.83%2C80.05%2C28.03&layer=mapnik&marker=27.88%2C79.91"
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
          </div>
        );

case "social":
  return (
    <div className="absolute inset-0 bg-white/80 rounded-3xl overflow-hidden">
      <div className="text-sm p-2 font-serif text-zinc-700 bg-zinc-200/70 px-4 py-2 rounded-full w-fit m-3">
        Social accounts
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40">

        <a
          href="https://instagram.com/its_mishree__"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1 -bottom-1 rotate-[25deg]"
        >
          <img src={instagramImg} className="w-16 hover:scale-110 transition" draggable={false} />
        </a>

        <a
          href="https://github.com/ShreeMishraa"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-14 bottom-0 rotate-[-12deg]"
        >
          <img src={githubImg} className="w-10 hover:scale-110 transition" draggable={false} />
        </a>

        <a
          href="mailto:shreemishra58@gmail.com"
          className="absolute left-28 bottom-0 rotate-[10deg]"
        >
          <img src={mailImg} className="w-14 hover:scale-110 transition" draggable={false} />
        </a>

        <a
          href="https://www.linkedin.com/in/shreemishraa/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 bottom-0"
        >
          <img src={linkedinImg} className="w-16 hover:scale-110 transition" draggable={false} />
        </a>

        <a
          href="https://leetcode.com/Shree_mishra/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-40 bottom-0 rotate-[-23deg]"
        >
          <img src={leetcodeImg} className="w-16 hover:scale-110 transition" draggable={false} />
        </a>

      </div>
    </div>
  );

      case "doodle":
        return (
          <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden">
            <img src="/src/assets/shree.png" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          </div>
        );

      case "song":
        return (
          <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden">
            <img src={favSongImg} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          </div>
        );

      case "about":
        return (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl p-3 overflow-y-auto flex flex-col gap-6">
            <span className="text-sm font-serif text-zinc-700 bg-zinc-200/70 px-4 py-1 rounded-full w-fit">About</span>
            <p className="text-sm leading-relaxed font-serif text-zinc-700">
              Hey! I'm Shree, born and brought up in Shahjahanpur, Uttar Pradesh, India.
              I'm a Computer Science undergraduate at <span className="font-semibold">Thapar Institute of Engineering & Technology</span>,
              with a strong interest in building scalable and impactful software systems.
              I enjoy working across the stack, from systems-level programming in
              <span className="font-semibold"> C++</span> and <span className="font-semibold">Python </span>
              to building full-stack applications with <span className="font-semibold"> React </span> and <span className="font-semibold">Node.js </span>.
            </p>
            <p className="text-sm font-serif leading-relaxed text-zinc-700">
              I'm currently exploring <span className="font-semibold"> Generative AI</span>, experimenting with how AI can be integrated
              into products to make them smarter and more useful. I also led my team during the
              <span className="font-semibold"> Smart India Hackathon </span>, where we built and delivered Vajra and won the hackathon.
            </p>
            <p className="text-sm font-serif leading-relaxed text-zinc-700">
              Alongside development, I contributed as an <span className="font-semibold"> Executive Member at the Creative Computing Society </span>,
              helping organize HackTU 6.0, a national hackathon with 150+ teams. I'm also a
              <span className="font-semibold"> Toastmaster at Toastmasters International </span>,
              where I've hosted sessions like ToastTalks 9.0 for 500+ attendees and secured 8+ sponsorships.
            </p>
            <p className="text-sm font-serif leading-relaxed text-zinc-700">
              Outside of tech, I enjoy photography and a really good plate of Alfredo pasta. Thank you for your time :)
            </p>
          </div>
        );

      case "drag":
        return (
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col items-center justify-center gap-4"
            style={{ background: "linear-gradient(135deg, #e8ede8 0%, #d4ddd4 40%, #c8d4cc 100%)" }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-serif text-zinc-500 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full whitespace-nowrap border border-white/40 z-10">
              Drag me
            </div>
            <div style={{ animation: "handBob 2.4s ease-in-out infinite" }} className="mt-6 z-10">
              <img src={handImg} alt="drag hand" className="w-20 h-20 object-contain" draggable={false}
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.18))" }} />
            </div>
            {["top-3 left-3","top-3 right-3","bottom-3 left-3","bottom-3 right-3"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-zinc-400/30`} />
            ))}
          </div>
        );

      case "achiev":
        return (
          <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden">
            <Slider {...sliderSettings} className="h-full">
              {[ach1, ach2, ach3].map((img, i) => (
                <div key={i} className="relative w-full h-[56vh]">
                  <img src={img} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                </div>
              ))}
            </Slider>
          </div>
        );
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ cursor: draggingCard ? "grabbing" : "default" }}
    >
      <div className="absolute inset-0 bg-[#487078]" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="max-w-7xl w-full h-[85vh] grid grid-cols-4 grid-rows-3 gap-6 p-10">

          {/* Render each SLOT — slot holds a card, card content is stable */}
          {slotOrder.map((cardId, slotIdx) => {
            const isDragging = draggingCard === cardId;
            const isHoverTarget = hoveredSlot === slotIdx && draggingCard !== null && draggingCard !== cardId;

            return (
              <div
                key={slotIdx}                        /* slot index is stable key */
                ref={el => { slotRefs.current[slotIdx] = el; }}
                className={`relative ${SLOT_CLASSES[slotIdx]}`}
                style={{
                  // slot itself just provides layout — no transform
                  zIndex: isDragging ? 50 : 1,
                }}
              >
                {/* Drop target highlight */}
                {isHoverTarget && (
                  <div
                    className="absolute inset-0 rounded-3xl z-10 pointer-events-none"
                    style={{
                      outline: "2.5px dashed rgba(255,255,255,0.7)",
                      outlineOffset: "-3px",
                      background: "rgba(255,255,255,0.08)",
                      transition: "all 0.15s",
                    }}
                  />
                )}

                {/* Card — dragged card floats via transform */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    transform: isDragging && dragOffset
                      ? `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.04) rotate(1.2deg)`
                      : "translate(0,0) scale(1) rotate(0deg)",
                    transition: isDragging
                      ? "box-shadow 0.1s, transform 0.05s"
                      : "transform 0.38s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s",
                    boxShadow: isDragging
                      ? "0 30px 60px rgba(0,0,0,0.45)"
                      : "0 2px 8px rgba(0,0,0,0.12)",
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    willChange: "transform",
                    zIndex: isDragging ? 50 : 1,
                  }}
                  onMouseDown={e => onMouseDown(e, cardId)}
                  onTouchStart={e => onTouchStart(e, cardId)}
                >
                  {renderCard(cardId)}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      <style>{`
        @keyframes handBob {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          30%       { transform: translateY(-10px) rotate(3deg); }
          60%       { transform: translateY(-4px) rotate(-2deg); }
        }
      `}</style>
    </section>
  );
};

export default About;