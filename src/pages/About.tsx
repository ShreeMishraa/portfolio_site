import React, { useEffect, useRef, useState } from "react";

const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  const [wipeCount, setWipeCount] = useState(0);
  const [fullyRevealed, setFullyRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Fill with fog
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
      {/* COLOR CONTENT (BEHIND) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center px-10">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="text-white space-y-4">
            <p className="text-sm uppercase tracking-widest opacity-70">
              A little more about me
            </p>

            <h2 className="text-4xl md:text-6xl font-bold">
              I won Smart India Hackathon 🏆
            </h2>

            <p className="max-w-xl text-lg">
              I was part of the team that won{" "}
              <span className="font-semibold">Smart India Hackathon</span>, one of
              India’s biggest national-level hackathons. It was intense, chaotic,
              and incredibly rewarding — building under pressure, solving real
              problems, and learning what teamwork truly means.
            </p>

            <p className="max-w-xl text-base opacity-90">
              This experience changed how I look at technology — not just as
              code, but as something that can genuinely impact real people and
              real systems.
            </p>
          </div>

          {/* Image */}
          <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/src/assets/sih.jpeg"
              alt="sih"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* BLUR LAYER (REMOVED AFTER REVEAL) */}
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

      {/* INSTRUCTIONS (DISAPPEAR AFTER FIRST WIPE) */}
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
