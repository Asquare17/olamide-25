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

// Only two motifs — roses and stars
const PETAL_TYPES = ["🌹", "🌹", "⭐", "🌹", "⭐"];

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 20,
      size: Math.random() * 10 + 10,
      type: PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)],
    }));
    setPetals(generated);
  }, []);

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
            opacity: 0.4,
          }}
        >
          {petal.type}
        </div>
      ))}
    </div>
  );
}
