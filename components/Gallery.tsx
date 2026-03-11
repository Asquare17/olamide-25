"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// ── 25th Birthday Shoot — all 4 images, face-optimised ──────────────────────
const SHOOT_ITEMS = [
  {
    id: "s1",
    label: "Power",
    caption: "Seated. Still. Commanding every inch of the room.",
    imagePath: "/images/shoot-1.webp",
    objectPosition: "center 20%",   // seated at desk, face ~28% from top
  },
  {
    id: "s2",
    label: "Fire",
    caption: "She looked at the camera like it owed her something.",
    imagePath: "/images/shoot-2.webp",
    objectPosition: "center 10%",   // close-up, face fills frame
  },
  {
    id: "s3",
    label: "Icon",
    caption: "Her shadow on the wall knew it was watching greatness.",
    imagePath: "/images/hero.webp",
    objectPosition: "center 8%",    // full body standing, face at ~18%
  },
  {
    id: "s4",
    label: "Boss",
    caption: "Louboutins on the ground, standards in the stratosphere.",
    imagePath: "/images/shoot-4.webp",
    objectPosition: "center 10%",   // seated on box, face at ~18%
  },
];

// ── Personal gallery ─────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  {
    id: "g1",
    label: "Eid Mubarak",
    caption: "Faith and fashion, perfectly held in one frame.",
    imagePath: "/images/eid-dress.webp",
    objectPosition: "center 15%",
  },
  {
    id: "g2",
    label: "The Model",
    caption: "Between the staircase and dim light — art.",
    imagePath: "/images/model.webp",
    objectPosition: "center 55%",
  },
  {
    id: "g3",
    label: "Shukurat",
    caption: "Her faith is her crown, and it suits her perfectly.",
    imagePath: "/images/islamic.webp",
    objectPosition: "center 18%",
  },
  {
    id: "g4",
    label: "Baby Shuks",
    caption: "Cute from day one. That denim vest? Already fashion.",
    imagePath: "/images/baby.webp",
    objectPosition: "center 25%",
  },
  {
    id: "g5",
    label: "Owambe Queen",
    caption: "The most beautiful person at every party, without trying.",
    imagePath: "/images/owambe.webp",
    objectPosition: "center 15%",
  },
  {
    id: "g6",
    label: "Casual & Iconic",
    caption: "Glasses on, focused, effortlessly the most interesting person in the room.",
    imagePath: "/images/at-my-place.webp",
    objectPosition: "center 44%",
  },
  {
    id: "g7",
    label: "All In Red",
    caption: "A red dress, a heart full of roses, and a room she owned completely.",
    imagePath: "/images/shoot-24th.webp",
    objectPosition: "center 14%",
  },
  {
    id: "g8",
    label: "On The Way",
    caption: "Even in transit she makes it look this good.",
    imagePath: "/images/ramadan-date-2.webp",
    objectPosition: "center 42%",
  },
];

// ── Shared card component ─────────────────────────────────────────────────────
function PhotoCard({
  id,
  label,
  caption,
  imagePath,
  objectPosition,
  height,
  index,
}: {
  id: string;
  label: string;
  caption: string;
  imagePath: string;
  objectPosition: string;
  height: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        height: `${height}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.07}s`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Image
        src={imagePath}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition }}
      />

      {/* Gradient overlay — light so the face stays clear */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,2,8,0.75) 0%, rgba(13,2,8,0.08) 45%, transparent 100%)",
        }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3
          className="font-playfair font-semibold text-base"
          style={{ color: "rgba(212,175,55,0.95)" }}
        >
          {label}
        </h3>
        <p
          className="font-cormorant text-sm italic mt-0.5 leading-snug"
          style={{ color: "rgba(255,245,240,0.62)" }}
        >
          {caption}
        </p>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          border: "1px solid rgba(212,175,55,0.45)",
          boxShadow: "inset 0 0 24px rgba(212,175,55,0.05)",
        }}
      />
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center mb-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s ease",
      }}
    >
      <span className="font-dancing text-lg" style={{ color: "rgba(201,149,106,0.8)" }}>
        {eyebrow}
      </span>
      <h2 className="font-playfair font-black text-4xl md:text-5xl mt-1 shimmer-text">
        {title}
      </h2>
      {sub && (
        <p className="font-cormorant text-lg italic mt-3" style={{ color: "rgba(255,245,240,0.48)" }}>
          {sub}
        </p>
      )}
      <div className="gold-divider max-w-xs mx-auto mt-5" />
    </div>
  );
}

// ── Gallery page ──────────────────────────────────────────────────────────────
export default function Gallery() {
  return (
    <section className="relative py-24 px-4 md:px-12 overflow-hidden">
      <div
        className="orb w-[400px] h-[400px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #c2185b 0%, transparent 70%)",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section 1: The 25th Birthday Shoot ── */}
        <SectionHeader
          eyebrow="fope dredd photography"
          title="The 25th Birthday Shoot"
          sub="Four looks. One woman. Completely unforgettable."
        />

        {/* 4 equal cards — tall portrait height, faces front and centre */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {SHOOT_ITEMS.map((item, i) => (
            <PhotoCard key={item.id} {...item} height={420} index={i} />
          ))}
        </div>

        {/* ── Section 2: Her Gallery ── */}
        <SectionHeader
          eyebrow="captured in time"
          title="Her Gallery"
          sub="Every photo tells a story only she could write"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY_ITEMS.map((item, i) => (
            <PhotoCard key={item.id} {...item} height={320} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
