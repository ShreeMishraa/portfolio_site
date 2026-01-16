import React, { useEffect, useRef, useState } from "react";

const images = [
  "/src/assets/sih.jpeg",
  "/src/assets/niti.jpeg",
  "/src/assets/content.jpeg",
];

const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  const [wipeCount, setWipeCount] = useState(0);
  const [fullyRevealed, setFullyRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [imageIndex, setImageIndex] = useState(0);

  // Rotate images every 3 seconds (after reveal)
  useEffect(() => {
    if (!fullyRevealed) return;

    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [fullyRevealed]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.9)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const erase = (x: number, y: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing.current || fullyRevealed) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    erase(x, y);
  };

  const handleDown = () => {
    if (fullyRevealed) return;
    if (!hasStarted) setHasStarted(true);

    isDrawing.current = true;
    setWipeCount((c) => c + 1);
  };

  const handleUp = () => {
    isDrawing.current = false;
  };

  // Auto-clear after ~2 wipes
  useEffect(() => {
    if (wipeCount >= 2 && !fullyRevealed) {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      setFullyRevealed(true);

      // Smooth fade out fog
      let alpha = 0.9;
      const fade = () => {
        alpha -= 0.04;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (alpha > 0) {
          requestAnimationFrame(fade);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      fade();
    }
  }, [wipeCount, fullyRevealed]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      onMouseMove={handleMove}
    >
      {/* CONTENT */}
      <div className="absolute inset-0 z-0 flex items-center justify-center px-10">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="text-white space-y-6">
            <p className="text-sm uppercase tracking-widest opacity-70">
              A little more about me
            </p>

            <div className="space-y-4 text-lg text-zinc-300 max-w-xl">
              <p>
                I won Smart India Hackathon, one of India’s biggest national-level
                hackathons.
              </p>

              <p>
                I’ve worked with NITI Aayog, where I saw how technology meets
                policy and real-world impact.
              </p>

              <p>
                Outside of coding, I’m into public speaking and content creation.
              </p>
            </div>
          </div>

          {/* IMAGE rotating */}
          <div className="w-full h-2xl overflow-hidden shadow-2xl">
            <img
              src={images[imageIndex]}
              alt="proof"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* BLUR LAYER */}
      {!fullyRevealed && (
        <div className="absolute inset-0 z-10 backdrop-blur-xl bg-black/60 pointer-events-none transition-opacity duration-700" />
      )}

      {/* FOG CANVAS */}
      {!fullyRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />
      )}

      {/* INSTRUCTIONS */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-700 ${
          hasStarted ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <p className="text-white text-3xl md:text-4xl font-light mb-2">
            Wipe to reveal
          </p>
          <p className="text-zinc-400 text-sm">
            click & move your mouse
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
