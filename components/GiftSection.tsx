"use client";
import { useState, useEffect, useRef } from "react";
import QuizGame from "./QuizGame";

const CORRECT_PASSWORD = "LAGOS";

const BIRTHDAY_MESSAGE = `My dearest Shukurat Olamide,

Where do I even begin?

I've been trying to find the right words since the day I knew I wanted to write this — and the truth is, there are no words beautiful enough for you. But I'll try anyway, because you deserve every attempt.

You are, without question, the most fascinating person I have ever met.

The girl who walked into See Lagos on our first date, sitting between those bookshelves looking like something out of a painting — that image never left me. And it never will.

I think about that car selfie from when the love began. You, in your pink head wrap, not even trying, and I was already finished. Done. Completely yours. You did that effortlessly, and I think that's the most Olamide thing possible.

I think about you in my Inter Miami jersey at my place — just existing, comfortable, unbothered — and it hit me that this was exactly where I wanted you to be. In my space. In my life. For good.

I think about you at Genesis Cinema with that smile — the one you can't contain — and how it felt like the whole world paused to admire you. I wanted to tell every stranger: I know her. She's mine. Isn't she incredible?

I think about Ramadan 2024. Breaking fast with you, watching you in your faith, calm and grateful and beautiful. There are sides of you that leave me speechless. That was one of them.

I think about us at Takwa Bay — sand, waves, and your laughter. If someone asked me to describe joy, I would describe that day.

And then I think about today. You, at 25. More confident, more radiant, more fully yourself than I have ever seen you.

Shukurat Olamide, you are a woman of incredible depth. Your faith grounds you. Your style expresses you. Your kindness defines you. You are funny in the best way, real in a world full of performance, and soft in all the places that matter.

I am so proud to know you. So grateful you chose me. So excited for every chapter that comes after this one.

Happy 25th Birthday, my love.

The best is still ahead — and I'll be right there for all of it.

Yours, always.`;

export default function GiftSection() {
  const [gameWon, setGameWon] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleUnlock = () => {
    if (password.toUpperCase().trim() === CORRECT_PASSWORD) {
      setUnlocked(true);
      setError(false);
      setConfettiActive(true);
      setTimeout(() => setShowLetter(true), 600);
      setTimeout(() => setConfettiActive(false), 8000);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => { setError(false); }, 3000);
    }
  };

  return (
    <section ref={sectionRef} className="snap-section relative py-24 px-4 md:px-12 overflow-hidden">
      {confettiActive && <ConfettiBurst />}

      <div className="orb w-[600px] h-[600px] opacity-15" style={{ background: "radial-gradient(circle, #c9956a 0%, transparent 70%)", top: "20%", left: "50%", transform: "translateX(-50%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease" }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-dancing text-xl" style={{ color: "rgba(201, 149, 106, 0.8)" }}>unlock the secret</span>
          <h2 className="font-playfair font-black text-5xl md:text-6xl mt-2 shimmer-text">Your Gift</h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
          <p className="font-cormorant text-lg italic mt-4" style={{ color: "rgba(255,245,240,0.5)" }}>
            Answer 5 questions about your story to find the password
          </p>
        </div>

        {/* Quiz */}
        {!unlocked && (
          <div className="mb-12">
            <QuizGame onWin={() => setGameWon(true)} />
          </div>
        )}

        {/* Password input */}
        {!unlocked && (
          <div className="flex flex-col items-center gap-6" style={{ opacity: gameWon ? 1 : 0.35, transition: "opacity 0.5s ease", pointerEvents: gameWon ? "auto" : "none" }}>
            <div className="gold-divider max-w-sm w-full" />

            <div className="flex flex-col items-center gap-4">
              <p className="font-cormorant text-lg italic text-center" style={{ color: "rgba(201,149,106,0.8)" }}>
                {gameWon ? "Enter the password below to open your gift 💌" : "Complete the quiz above first"}
              </p>

              <div className={shake ? "animate-bounce" : ""}>
                <input
                  ref={inputRef}
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  placeholder="ENTER PASSWORD"
                  maxLength={10}
                  className="gift-input rounded-2xl px-8 py-4 w-72"
                  style={{
                    borderColor: error ? "rgba(239,68,68,0.6)" : undefined,
                    boxShadow: error ? "0 0 20px rgba(239,68,68,0.3)" : undefined,
                  }}
                />
              </div>

              {error && (
                <p className="font-cormorant text-sm text-center" style={{ color: "rgba(239,68,68,0.8)" }}>
                  Not quite... remember where your story began 💭
                </p>
              )}

              <button
                onClick={handleUnlock}
                disabled={password.length === 0}
                className="btn-lift glass-gold border rounded-full px-12 py-4 font-playfair font-bold text-lg tracking-widest glow-gold disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderColor: "rgba(212,175,55,0.6)", color: "#d4af37" }}
              >
                Open My Gift 💌
              </button>
            </div>
          </div>
        )}

        {/* The love letter */}
        {unlocked && (
          <div className="flex flex-col items-center gap-8" style={{ opacity: showLetter ? 1 : 0, transform: showLetter ? "translateY(0)" : "translateY(30px)", transition: "all 1s ease" }}>
            <div className="flex flex-col items-center gap-3">
              <div className="text-7xl" style={{ filter: "drop-shadow(0 0 30px rgba(212,175,55,0.6)) drop-shadow(0 0 60px rgba(255,143,171,0.3))", animation: "heartbeat 2s ease-in-out infinite" }}>
                💌
              </div>
              <h3 className="font-dancing text-3xl" style={{ color: "#d4af37" }}>
                A Message From His Heart
              </h3>
            </div>

            <div className="glass-rose rounded-3xl p-8 md:p-12 relative overflow-hidden w-full" style={{ border: "1px solid rgba(255,143,171,0.2)", boxShadow: "0 0 60px rgba(194,24,91,0.1)" }}>
              <span className="absolute top-4 left-4 text-2xl opacity-20">🌹</span>
              <span className="absolute top-4 right-4 text-2xl opacity-20">🌹</span>
              <span className="absolute bottom-4 left-4 text-2xl opacity-20">🌹</span>
              <span className="absolute bottom-4 right-4 text-2xl opacity-20">🌹</span>

              <div className="letter-content relative z-10">
                {BIRTHDAY_MESSAGE.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={`${line === "" ? "my-3" : "my-0.5"}`}
                    style={{
                      color: line.startsWith("My dearest") || line.startsWith("Happy 25th") || line.startsWith("Yours") ? "#d4af37" : "rgba(255, 245, 240, 0.88)",
                      fontWeight: line.startsWith("My dearest") || line.startsWith("Happy 25th") || line.startsWith("Yours") ? 600 : 400,
                      fontFamily: line.startsWith("My dearest") || line.startsWith("Happy 25th") || line.startsWith("Yours") ? "'Playfair Display', serif" : "'Cormorant Garamond', serif",
                      fontSize: line.startsWith("My dearest") || line.startsWith("Happy 25th") ? "1.3rem" : "1.1rem",
                      opacity: 0,
                      animation: `reveal 0.5s ease forwards ${0.1 + i * 0.025}s`,
                    }}
                  >
                    {line || "\u00A0"}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-center" style={{ opacity: showLetter ? 1 : 0, transition: "opacity 1s ease 2.5s" }}>
              <p className="font-dancing text-3xl text-glow-rose" style={{ color: "#ff8fab" }}>
                Happy 25th Birthday, Olamide 🌹
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ConfettiBurst() {
  const pieces = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#d4af37", "#ff8fab", "#c2185b", "#f0d060", "#ffffff", "#c9956a"][Math.floor(Math.random() * 6)],
    size: Math.random() * 12 + 4,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 1.5,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5,
  }));

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <div key={p.id} className="absolute top-0" style={{ left: `${p.x}%`, width: `${p.size}px`, height: `${p.size}px`, background: p.color, borderRadius: p.shape ? "50%" : "2px", transform: `rotate(${p.rotation}deg)`, animation: `petalFall ${p.duration}s ease-in ${p.delay}s forwards`, opacity: 0.9 }} />
      ))}
    </div>
  );
}
