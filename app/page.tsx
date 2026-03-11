"use client";
import StarField from "@/components/StarField";
import FloatingPetals from "@/components/FloatingPetals";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Gallery, { BirthdayShoot } from "@/components/Gallery";
import GiftSection from "@/components/GiftSection";
import WishesSection from "@/components/WishesSection";
import { useEffect, useState } from "react";

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-5 py-2 px-12">
      <div className="gold-divider flex-1" />
      <span
        className="text-xl"
        style={{
          color: "rgba(212,175,55,0.5)",
          filter: "drop-shadow(0 0 6px rgba(212,175,55,0.3))",
        }}
      >
        🌹
      </span>
      <div className="gold-divider flex-1" />
    </div>
  );
}

function ClosingSection() {

  const wishes = [
    { icon: "🌙", text: "May this year carry you higher than you've ever been" },
    { icon: "💎", text: "May every dream you've whispered quietly come true loudly" },
    { icon: "🌹", text: "May you be surrounded by people who see your worth" },
    { icon: "⭐", text: "May your faith keep you grounded in every storm" },
    { icon: "💫", text: "May your 25th year be the beginning of everything beautiful" },
  ];

  return (
    <section className="relative py-28 px-4 md:px-12 overflow-hidden">
      <div
        className="orb w-[500px] h-[300px] opacity-[0.12]"
        style={{
          background: "radial-gradient(ellipse, #c2185b 0%, transparent 70%)",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Opening */}
        <span className="font-dancing text-xl" style={{ color: "rgba(201,149,106,0.8)" }}>
          for her 25th year
        </span>
        <h2 className="font-playfair font-black text-4xl md:text-5xl mt-2 shimmer-text">
          My Wishes For You
        </h2>
        <div className="gold-divider max-w-xs mx-auto mt-5 mb-10" />

        {/* Wish list */}
        <div className="flex flex-col gap-5">
          {wishes.map((wish, i) => (
            <div
              key={i}
              className="flex items-start gap-4 text-left glass rounded-2xl px-5 py-4"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="text-xl flex-shrink-0 mt-0.5"
                style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.4))" }}
              >
                {wish.icon}
              </span>
              <p
                className="font-cormorant text-xl italic leading-relaxed"
                style={{ color: "rgba(255,245,240,0.8)" }}
              >
                {wish.text}
              </p>
            </div>
          ))}
        </div>

        {/* Final message */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div
            className="text-6xl"
            style={{
              filter: "drop-shadow(0 0 20px rgba(212,175,55,0.5))",
              animation: "heartbeat 2s ease-in-out infinite",
            }}
          >
            🌹
          </div>
          <p
            className="font-playfair font-black text-3xl md:text-4xl shimmer-text"
          >
            Happy 25th Birthday
          </p>
          <p
            className="font-playfair font-black italic text-4xl md:text-5xl"
            style={{
              color: "#ff8fab",
              textShadow: "0 0 25px rgba(255,143,171,0.4)",
            }}
          >
            Olamide
          </p>
          <p
            className="font-dancing text-2xl mt-2"
            style={{ color: "rgba(201,149,106,0.75)" }}
          >
            The world is better because you&apos;re in it. ✨
          </p>
        </div>

        <div className="gold-divider mt-14 opacity-40" />
        <p
          className="font-cormorant text-sm italic mt-4"
          style={{ color: "rgba(255,245,240,0.2)" }}
        >
          Made with love · For the love of my life
        </p>
      </div>
    </section>
  );
}

function NavDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.section);
            setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const labels = ["Intro", "Shoot", "Gallery", "Wishes", "Story", "Gift", "Closing"];

  const scrollTo = (i: number) => {
    const el = document.querySelector(`section[data-section="${i}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
      {labels.map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          title={labels[i]}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: active === i ? "#d4af37" : "rgba(255,255,255,0.18)",
            boxShadow: active === i ? "0 0 8px rgba(212,175,55,0.7)" : "none",
            transform: active === i ? "scale(1.5)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <main
      className="relative"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #2d0820 0%, #0d0208 45%, #0d0208 100%)",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <StarField />
      <FloatingPetals />
      <NavDots />

      {/* 1. Intro */}
      <section data-section="0">
        <Hero />
      </section>

      <SectionDivider />

      {/* 2. Birthday Shoot */}
      <section data-section="1">
        <BirthdayShoot />
      </section>

      <SectionDivider />

      {/* 3. Her Gallery */}
      <section data-section="2">
        <Gallery />
      </section>

      <SectionDivider />

      {/* 4. Birthday Wishes */}
      <section data-section="3">
        <WishesSection />
      </section>

      <SectionDivider />

      {/* 5. Our Story */}
      <section data-section="4">
        <Timeline />
      </section>

      <SectionDivider />

      {/* 6. Gift */}
      <section data-section="5">
        <GiftSection />
      </section>

      <SectionDivider />

      {/* 7. Closing */}
      <section data-section="6">
        <ClosingSection />
      </section>
    </main>
  );
}
