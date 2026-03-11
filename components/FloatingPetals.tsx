"use client";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  type: string;
}

const PETAL_TYPES = ["🌹", "🌹", "⭐", "🌹", "⭐"];

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Disable on mobile — backdrop-filter and DOM animations are already heavy
    if (window.innerWidth < 768) return;

    const generated = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 14 + 12,
      delay: Math.random() * 22,
      size: Math.random() * 10 + 10,
      type: PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)],
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal select-none"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: 0.35,
          }}
        >
          {petal.type}
        </div>
      ))}
    </div>
  );
}
