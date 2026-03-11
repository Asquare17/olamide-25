"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const LETTERS = "OLAMIDE".split("");

// All 4 photoshoot images — face positions tuned per image
const SHOOT_SLIDES = [
  {
    src: "/images/shoot-2.webp",     // close-up, face fills frame
    objectPosition: "center 10%",
    label: "I",
  },
  {
    src: "/images/shoot-1.webp",     // seated at desk, face ~28% down
    objectPosition: "center 20%",
    label: "II",
  },
  {
    src: "/images/hero.webp",        // full body standing, spotlight, face ~18% down
    objectPosition: "center 8%",
    label: "III",
  },
  {
    src: "/images/shoot-4.webp",     // seated on box, Louboutins, face ~18% down
    objectPosition: "center 10%",
    label: "IV",
  },
];

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(idx);
        setFading(false);
      }, 350);
    },
    [current]
  );

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SHOOT_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = SHOOT_SLIDES[current];

  return (
    <div className="relative flex-shrink-0 mx-auto md:mx-0">
      {/* Glow halo */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)",
          transform: "scale(1.18)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      {/* Photo frame */}
      <div
        className="photo-frame relative w-56 h-72 md:w-64 md:h-[340px] rounded-2xl overflow-hidden"
        style={{ zIndex: 5 }}
      >
        {/* Render all slides — only active one is visible; others preloaded */}
        {SHOOT_SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt="Olamide"
            fill
            className="object-cover"
            style={{
              objectPosition: s.objectPosition,
              opacity: i === current && !fading ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
            priority
          />
        ))}
        {/* Subtle bottom gradient so age badge reads clearly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 65%, rgba(13,2,8,0.5) 100%)",
          }}
        />
        {/* Slide counter top-right */}
        <div
          className="absolute top-3 right-3 rounded-full px-2 py-0.5"
          style={{
            background: "rgba(13,2,8,0.55)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <span
            className="font-cormorant text-xs tracking-widest"
            style={{ color: "rgba(212,175,55,0.9)" }}
          >
            {current + 1} / {SHOOT_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-3 z-10 relative">
        {SHOOT_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background:
                i === current ? "#d4af37" : "rgba(255,255,255,0.2)",
              boxShadow:
                i === current ? "0 0 8px rgba(212,175,55,0.6)" : "none",
            }}
          />
        ))}
      </div>

      {/* Age badge — below dots */}
      <div
        className="flex justify-center mt-3 z-10 relative"
      >
        <div
          className="glass-gold rounded-full px-6 py-2 glow-gold flex items-center gap-2"
          style={{ border: "1px solid rgba(212,175,55,0.5)" }}
        >
          <span className="text-base">🌹</span>
          <span className="font-playfair font-bold text-2xl age-badge">25</span>
          <span
            className="font-cormorant text-base"
            style={{ color: "rgba(212,175,55,0.8)" }}
          >
            years of magic
          </span>
          <span className="text-base">🌹</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden">
      {/* Background orbs */}
      <div
        className="orb w-[500px] h-[500px] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, #c2185b 0%, transparent 70%)",
          top: "-80px",
          left: "-180px",
          animation: "orbFloat 14s ease-in-out infinite",
        }}
      />
      <div
        className="orb w-[400px] h-[400px] opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          bottom: "-60px",
          right: "-120px",
          animation: "orbFloat 18s ease-in-out infinite reverse",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-5xl w-full mx-auto">

        {/* Eyebrow */}
        <div>
          <span
            className="font-dancing text-xl md:text-2xl"
            style={{ color: "rgba(201, 149, 106, 0.85)", letterSpacing: "0.12em" }}
          >
            wishing you the most magical year
          </span>
        </div>

        {/* HAPPY BIRTHDAY */}
        <div>
          <h2 className="font-playfair font-black tracking-[0.2em] text-3xl md:text-5xl lg:text-6xl shimmer-text">
            HAPPY BIRTHDAY
          </h2>
        </div>

        {/* Name */}
        <div className="flex gap-1.5 md:gap-3 items-end">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="font-playfair font-black text-5xl md:text-8xl lg:text-[9rem]"
              style={{
                fontStyle: "italic",
                color: "#ff8fab",
                textShadow:
                  "0 0 25px rgba(255,143,171,0.5), 0 0 50px rgba(194,24,91,0.25)",
                display: "inline-block",
                lineHeight: 1,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Slideshow + Quote — connected hero unit */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4 w-full max-w-3xl">
          {/* Left: 4-photo slideshow */}
          <PhotoSlideshow />

          {/* Right: quote card */}
          <div
            className="flex-1 flex flex-col justify-center glass-rose rounded-2xl p-6 md:p-8 text-left"
            style={{ border: "1px solid rgba(255,143,171,0.15)" }}
          >
            <span
              className="text-5xl leading-none font-serif"
              style={{ color: "rgba(212,175,55,0.2)" }}
            >
              &ldquo;
            </span>
            <p
              className="font-cormorant text-xl md:text-2xl italic leading-relaxed -mt-2"
              style={{ color: "rgba(255, 245, 240, 0.88)" }}
            >
              She walks in beauty — in faith, in grace, in fire. And on this
              25th year, she walks taller than ever.
            </p>
            <p
              className="font-dancing text-base mt-4"
              style={{ color: "rgba(201,149,106,0.65)" }}
            >
              — written for Shukurat Olamide ✨
            </p>
            <div className="gold-divider mt-5" />
            <p
              className="font-cormorant text-sm italic mt-3"
              style={{ color: "rgba(255,245,240,0.28)" }}
            >
              Photography · Fope Dredd
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span
          className="font-dancing text-sm"
          style={{ color: "rgba(212, 175, 55, 0.55)" }}
        >
          scroll to explore
        </span>
        <div
          className="w-5 h-8 border-2 rounded-full flex items-start justify-center pt-1.5"
          style={{ borderColor: "rgba(212, 175, 55, 0.35)" }}
        >
          <div
            className="w-1 h-2.5 rounded-full"
            style={{ background: "#d4af37", animation: "bounce 1.5s infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
