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
  const [slotOrder, setSlotOrder] = useState<CardId[]>([...INITIAL_ORDER]);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [draggingCard, setDraggingCard] = useState<CardId | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

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

  const slotOfCard = useCallback((id: CardId) => slotOrder.indexOf(id), [slotOrder]);

  const getHoveredSlot = useCallback((mouseX: number, mouseY: number): number | null => {
    let best: number | null = null;
    let bestArea = 0;
    slotRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (mouseX >= r.left && mouseX <= r.right && mouseY >= r.top && mouseY <= r.bottom) {
        const area = r.width * r.height;
        if (area > bestArea) { bestArea = area; best = i; }
      }
    });
    return best;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent, cardId: CardId) => {
    if ((e.target as HTMLElement).closest("button,a,input,select,textarea")) return;
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const fromSlot = slotOfCard(cardId);
    setDraggingCard(cardId);
    setDragOffset({ x: 0, y: 0 });
    dragState.current = {
      cardId, fromSlot,
      startMouseX: e.clientX, startMouseY: e.clientY,
      cardLeft: rect.left, cardTop: rect.top,
      cardW: rect.width, cardH: rect.height,
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
      cardId, fromSlot,
      startMouseX: touch.clientX, startMouseY: touch.clientY,
      cardLeft: rect.left, cardTop: rect.top,
      cardW: rect.width, cardH: rect.height,
    };
  }, [slotOfCard]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragState.current) return;
      const d = dragState.current;
      const dx = e.clientX - d.startMouseX;
      const dy = e.clientY - d.startMouseY;
      setDragOffset({ x: dx, y: dy });
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
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [getHoveredSlot]);

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
              <a href="https://instagram.com/its_mishree__" target="_blank" rel="noopener noreferrer" className="absolute left-1 -bottom-1 rotate-[25deg]">
                <img src={instagramImg} className="w-16 hover:scale-110 transition" draggable={false} />
              </a>
              <a href="https://github.com/ShreeMishraa" target="_blank" rel="noopener noreferrer" className="absolute left-14 bottom-0 rotate-[-12deg]">
                <img src={githubImg} className="w-10 hover:scale-110 transition" draggable={false} />
              </a>
              <a href="mailto:shreemishra58@gmail.com" className="absolute left-28 bottom-0 rotate-[10deg]">
                <img src={mailImg} className="w-14 hover:scale-110 transition" draggable={false} />
              </a>
              <a href="https://www.linkedin.com/in/shreemishraa/" target="_blank" rel="noopener noreferrer" className="absolute right-2 bottom-0">
                <img src={linkedinImg} className="w-16 hover:scale-110 transition" draggable={false} />
              </a>
              <a href="https://leetcode.com/Shree_mishra/" target="_blank" rel="noopener noreferrer" className="absolute left-40 bottom-0 rotate-[-23deg]">
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
              Drag me to rearrange
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

  // ── Contact form state ────────────────────────────────────────────────────
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", details: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.details) return;
    setSent(true);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════ ABOUT / BENTO SECTION ══════════════════════ */}
      <section
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ cursor: draggingCard ? "grabbing" : "default" }}
      >
        <div className="absolute inset-0 bg-[#294045]" />

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="max-w-7xl w-full h-[85vh] grid grid-cols-4 grid-rows-3 gap-6 p-10">

            {slotOrder.map((cardId, slotIdx) => {
              const isDragging    = draggingCard === cardId;
              const isHoverTarget = hoveredSlot === slotIdx && draggingCard !== null && draggingCard !== cardId;

              return (
                <div
                  key={slotIdx}
                  ref={el => { slotRefs.current[slotIdx] = el; }}
                  className={`relative ${SLOT_CLASSES[slotIdx]}`}
                  style={{ zIndex: isDragging ? 50 : 1 }}
                >
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

      {/* ══════════════════════ CONTACT SECTION ════════════════════════════ */}
      <section className="relative w-full bg-[#294045] flex flex-col">

        <div className="flex items-stretch justify-center px-8 py-10 mb-10">
          <div className="max-w-7xl w-full flex flex-col md:flex-row gap-16 items-start">

            {/* ── LEFT — Form ─────────────────────────────────────────────── */}
            <div className="flex-1">
              <h2
                className="text-4xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Get in touch
              </h2>
              <p
                className="text-zinc-400 mb-10 text-sm leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Need to get in touch with me? Fill in the form and smash the{" "}
                <span className="text-white">Send it</span> or reach out via contact details.
              </p>

              {sent ? (
                <div
                  className="text-white text-lg py-16 text-center"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Message sent — I'll get back to you soon :)
                </div>
              ) : (
                <div className="flex flex-col gap-5">

                  {/* First + Last name */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <label
                        className="text-xs text-white tracking-wide"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        First name
                      </label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="bg-white/80 text-zinc-800 text-sm rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#487078] transition placeholder:text-zinc-600"
                        style={{ fontFamily: "Georgia, serif" }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <label
                        className="text-xs text-white tracking-wide"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Last name
                      </label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Foster"
                        className="bg-white/80 text-zinc-800 text-sm rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#487078] transition placeholder:text-zinc-600"
                        style={{ fontFamily: "Georgia, serif" }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs text-white tracking-wide"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourawesome@email.com"
                      className="bg-white/80 text-zinc-800 text-sm rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#487078] transition placeholder:text-zinc-600"
                      style={{ fontFamily: "Georgia, serif" }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs text-white tracking-wide"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Some details
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Let's talk about..."
                      rows={5}
                      className="bg-white/80 text-zinc-800 text-sm rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#487078] transition placeholder:text-zinc-600 resize-none"
                      style={{ fontFamily: "Georgia, serif" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#111c1e] hover:bg-[#629da9] text-white text-sm rounded-lg px-4 py-4 transition-all duration-300 tracking-widest flex items-center justify-center gap-3 group border border-zinc-700 hover:border-[#487078]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Send it
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>

                </div>
              )}
            </div>

            {/* ── Vertical divider ────────────────────────────────────────── */}
            <div className="hidden md:block w-px self-stretch bg-zinc-800 mt-16" />

            {/* ── RIGHT — Contact info ─────────────────────────────────────── */}
            <div className="md:w-72 flex flex-col gap-8 mt-2 md:mt-16">
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Contact Information
              </h3>

              <div className="flex flex-col gap-6">

                {/* Email */}
                <a href="mailto:shreemishra58@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-full border border-[#487078] flex items-center justify-center shrink-0 group-hover:bg-[#487078]/20 transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#487078" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <span
                    className="text-zinc-300 text-sm group-hover:text-white transition"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    shreemishra58@gmail.com
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full border border-[#487078] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#487078" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span
                    className="text-zinc-300 text-sm"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Shahjahanpur, India
                  </span>
                </div>

              </div>

              {/* Decorative quote */}
              <p
                className="text-zinc-400 text-sm leading-relaxed mt-4 italic border-l-2 border-[#487078]/40 pl-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                "Always open to interesting conversations, collaborations, and good pasta recommendations."
              </p>
            </div>

          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="w-full h-px bg-zinc-800" />

      </section>
    </>
  );
};

export default About;
