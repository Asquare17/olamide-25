"use client";
import { useState, useEffect, useCallback } from "react";

const SYMBOLS = [
  { icon: "🌹", label: "Rose" },
  { icon: "💕", label: "Hearts" },
  { icon: "💎", label: "Diamond" },
  { icon: "🦋", label: "Butterfly" },
  { icon: "⭐", label: "Star" },
  { icon: "🌙", label: "Moon" },
  { icon: "🎂", label: "Cake" },
  { icon: "✨", label: "Sparkle" },
];

export type GameState = "idle" | "playing" | "won";

interface Card {
  id: number;
  symbol: { icon: string; label: string };
  flipped: boolean;
  matched: boolean;
}

interface MemoryGameProps {
  onWin: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame({ onWin }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [matchedCount, setMatchedCount] = useState(0);
  const [celebration, setCelebration] = useState(false);

  const initGame = useCallback(() => {
    const doubled = [...SYMBOLS, ...SYMBOLS].map((sym, i) => ({
      id: i,
      symbol: sym,
      flipped: false,
      matched: false,
    }));
    setCards(shuffle(doubled));
    setSelected([]);
    setLocked(false);
    setMoves(0);
    setMatchedCount(0);
    setGameState("playing");
    setCelebration(false);
  }, []);

  // Check for matches
  useEffect(() => {
    if (selected.length !== 2) return;
    setLocked(true);
    setMoves((m) => m + 1);

    const [a, b] = selected;
    const cardA = cards[a];
    const cardB = cards[b];

    if (cardA.symbol.label === cardB.symbol.label) {
      // Match!
      setCards((prev) =>
        prev.map((c, i) =>
          i === a || i === b ? { ...c, matched: true } : c
        )
      );
      setMatchedCount((n) => {
        const next = n + 1;
        if (next === SYMBOLS.length) {
          // All matched — win!
          setTimeout(() => {
            setCelebration(true);
            setGameState("won");
            onWin();
          }, 600);
        }
        return next;
      });
      setSelected([]);
      setLocked(false);
    } else {
      // No match — flip back
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c
          )
        );
        setSelected([]);
        setLocked(false);
      }, 1000);
    }
  }, [selected, cards, onWin]);

  const handleCardClick = (index: number) => {
    if (locked) return;
    if (cards[index].flipped || cards[index].matched) return;
    if (selected.length === 2) return;

    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
    setSelected((prev) => [...prev, index]);
  };

  const totalPairs = SYMBOLS.length;
  const progress = (matchedCount / totalPairs) * 100;

  if (gameState === "idle") {
    return (
      <div className="flex flex-col items-center gap-8">
        <div className="glass-gold rounded-3xl p-10 max-w-lg text-center">
          <div className="text-7xl mb-6" style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.5))" }}>
            🎁
          </div>
          <h3
            className="font-playfair font-bold text-3xl mb-4"
            style={{ color: "#d4af37" }}
          >
            A Secret Gift Awaits
          </h3>
          <p
            className="font-cormorant text-xl italic mb-2"
            style={{ color: "rgba(255,245,240,0.75)" }}
          >
            Hidden behind this game is a message written from my heart,
            just for you.
          </p>
          <p
            className="font-cormorant text-lg mb-8"
            style={{ color: "rgba(201,149,106,0.7)" }}
          >
            Match all the love cards to reveal the password.
          </p>
          <button
            onClick={initGame}
            className="btn-lift glass-gold border rounded-full px-12 py-4 font-playfair font-bold text-xl tracking-widest glow-gold"
            style={{
              borderColor: "rgba(212,175,55,0.6)",
              color: "#d4af37",
            }}
          >
            Play the Game ✨
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "won") {
    return (
      <div className="flex flex-col items-center gap-8">
        <div
          className="glass-gold rounded-3xl p-10 max-w-lg text-center"
          style={{
            animation: celebration ? "pulseGlow 1s ease-in-out 3" : "none",
            boxShadow: "0 0 60px rgba(212,175,55,0.4)",
          }}
        >
          <div className="text-7xl mb-4" style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}>
            🎊
          </div>
          <h3
            className="font-playfair font-black text-3xl mb-3 shimmer-text"
          >
            You Did It!
          </h3>
          <p
            className="font-cormorant text-2xl italic mb-2"
            style={{ color: "rgba(255,245,240,0.85)" }}
          >
            You matched all {totalPairs} pairs in{" "}
            <span style={{ color: "#d4af37" }}>{moves} moves</span>!
          </p>
          <p
            className="font-dancing text-xl mb-8"
            style={{ color: "rgba(201,149,106,0.9)" }}
          >
            Now scroll down and enter the password:
          </p>

          {/* Password reveal */}
          <div
            className="glass rounded-2xl p-6 mb-6"
            style={{ border: "1px solid rgba(212,175,55,0.5)" }}
          >
            <p
              className="font-cormorant text-sm uppercase tracking-widest mb-2"
              style={{ color: "rgba(201,149,106,0.7)" }}
            >
              Your password is
            </p>
            <p
              className="font-playfair font-black text-4xl md:text-5xl tracking-widest shimmer-text"
            >
              MYQUEEN
            </p>
          </div>

          <button
            onClick={initGame}
            className="font-dancing text-base"
            style={{ color: "rgba(201,149,106,0.6)" }}
          >
            Play again ↺
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Game header */}
      <div className="flex items-center justify-between w-full px-2">
        <div className="glass-gold rounded-full px-4 py-2">
          <span className="font-cormorant text-lg" style={{ color: "rgba(212,175,55,0.9)" }}>
            Moves: <span className="font-bold">{moves}</span>
          </span>
        </div>
        <div className="font-dancing text-lg" style={{ color: "rgba(201,149,106,0.8)" }}>
          {matchedCount}/{totalPairs} matched 💕
        </div>
        <button
          onClick={initGame}
          className="glass-gold rounded-full px-4 py-2 font-cormorant text-sm"
          style={{ color: "rgba(212,175,55,0.7)", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          Restart ↺
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #d4af37, #ff8fab)",
            boxShadow: "0 0 10px rgba(212,175,55,0.5)",
          }}
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-4 gap-3 w-full">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="card-scene"
            style={{ height: "80px" }}
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`card-inner cursor-pointer ${
                card.flipped || card.matched ? "flipped" : ""
              }`}
            >
              {/* Card back */}
              <div
                className="card-face card-back"
                style={{
                  background: card.matched
                    ? "linear-gradient(135deg, #1a0410, #d4af3722)"
                    : undefined,
                }}
              >
                {/* Ornate pattern */}
                <div className="text-2xl" style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.4))" }}>
                  🌸
                </div>
                {/* Corner decorations */}
                <span
                  className="absolute top-1 left-1 text-xs"
                  style={{ color: "rgba(212,175,55,0.3)" }}
                >
                  ✦
                </span>
                <span
                  className="absolute bottom-1 right-1 text-xs"
                  style={{ color: "rgba(212,175,55,0.3)" }}
                >
                  ✦
                </span>
              </div>

              {/* Card front */}
              <div
                className={`card-face card-front ${
                  card.matched ? "card-matched" : ""
                }`}
                style={{
                  background: card.matched
                    ? "linear-gradient(135deg, #1a0410, #2d1800)"
                    : undefined,
                  borderColor: card.matched
                    ? "rgba(212,175,55,0.8)"
                    : undefined,
                }}
              >
                <span
                  className="text-3xl"
                  style={{
                    filter: card.matched
                      ? "drop-shadow(0 0 10px rgba(212,175,55,0.8))"
                      : "drop-shadow(0 0 6px rgba(255,143,171,0.5))",
                    animation: card.matched ? "heartbeat 1.5s ease-in-out infinite" : "none",
                  }}
                >
                  {card.symbol.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        className="font-dancing text-base text-center"
        style={{ color: "rgba(201,149,106,0.6)" }}
      >
        Find all matching pairs to reveal your special password 💌
      </p>
    </div>
  );
}
