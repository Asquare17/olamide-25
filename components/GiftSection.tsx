"use client";
import { useState, useEffect, useRef } from "react";
import QuizGame from "./QuizGame";

const CORRECT_PASSWORD = "APEKE";

const STORAGE_UNLOCKED = "olm_unlocked";
const STORAGE_FAILS = "olm_fails";
const STORAGE_QUIZ = "olm_quiz";
const MAX_FAILS = 3;

const BIRTHDAY_MESSAGE = `My dearest Shukurat Olamide,

Where do I even begin?

I've been sitting with these words for a long time, trying to find the right ones. And I've come to accept that there aren't words beautiful enough for you. But I'll try anyway, because you deserve every attempt.

You are, without question, the most fascinating person I have ever met.

September 3rd, 2023. I think about that afternoon more than you know. A car ride. Your pink head wrap. And that smile of yours, the one you can't quite hide even when you're trying to be casual. I remember thinking: this is it. I didn't say a word. But I knew.

Then there was See Lagos, our first date. You walked in between those bookshelves looking like something out of a painting, and I was done. Completely finished. The girl who reads; of course I never stood a chance.

Riri, I have watched you do life in a way that very few people can. With grace and fire, at the same time. You walk into a room and the energy shifts. You smile and people can't help but smile back. That positive energy of yours is not something you perform. It just radiates out of you naturally, and it's one of my favourite things about you.

I think about Ramadan 2024. Breaking fast with you at Gusto, watching you in your element, faithful and calm and present. There are sides of you that leave me quietly in awe. That was one of them.

I think about Takwa Bay. Sand and waves and your laughter. If someone asked me to describe joy, I would describe that day.

And now today, you at 25. More confident, more radiant, more fully yourself than I have ever seen you.

Shukurat Olamide, you are a woman of real depth. Your faith grounds you. Your drive moves you. Your kindness defines you. You have this quiet, competitive fire that I genuinely admire, the kind that doesn't need to announce itself but shows up in everything you do.

I am praying over your 25th year like I mean it: long life, prosperity, and everything you're building (your brand, your business, your vision) growing beyond what even you can imagine right now.

Apeke, the best is still ahead. And I'll be right there for all of it.

Happy 25th Birthday, my love.

Yours, always.
Shola`;

export default function GiftSection() {
  const [gameWon, setGameWon] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [locked, setLocked] = useState(false);
  const [failsLeft, setFailsLeft] = useState(MAX_FAILS);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore persisted state on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_UNLOCKED) === "1") {
        setUnlocked(true);
        setShowLetter(true);
        return;
      }
      const fails = Number(localStorage.getItem(STORAGE_FAILS) || "0");
      if (fails >= MAX_FAILS) {
        setLocked(true);
        setFailsLeft(0);
        return;
      }
      setFailsLeft(MAX_FAILS - fails);
      if (localStorage.getItem(STORAGE_QUIZ) === "1") {
        setGameWon(true);
      }
    } catch {
      // localStorage unavailable (private browsing etc.) — degrade gracefully
    }
  }, []);

  const handleQuizWin = () => {
    try { localStorage.setItem(STORAGE_QUIZ, "1"); } catch {}
    setGameWon(true);
  };

  const handleUnlock = () => {
    if (password.toUpperCase().trim() === CORRECT_PASSWORD) {
      try { localStorage.setItem(STORAGE_UNLOCKED, "1"); } catch {}
      setUnlocked(true);
      setError(false);
      setConfettiActive(true);
      setTimeout(() => setShowLetter(true), 600);
      setTimeout(() => setConfettiActive(false), 8000);
    } else {
      try {
        const fails = Number(localStorage.getItem(STORAGE_FAILS) || "0") + 1;
        localStorage.setItem(STORAGE_FAILS, String(fails));
        const remaining = MAX_FAILS - fails;
        setFailsLeft(remaining);
        if (remaining <= 0) {
          setLocked(true);
          return;
        }
      } catch {}
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <section ref={sectionRef} className="snap-section relative py-24 px-4 md:px-12 overflow-hidden">
      {confettiActive && <ConfettiBurst />}

      <div className="orb w-[600px] h-[600px] opacity-15" style={{ background: "radial-gradient(circle, #c9956a 0%, transparent 70%)", top: "20%", left: "50%", transform: "translateX(-50%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-dancing text-xl" style={{ color: "rgba(201, 149, 106, 0.8)" }}>unlock the secret</span>
          <h2 className="font-playfair font-black text-5xl md:text-6xl mt-2 shimmer-text">Your Gift</h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
          <p className="font-cormorant text-lg italic mt-4" style={{ color: "rgba(255,245,240,0.5)" }}>
            Answer 5 questions about your story to find the password
          </p>
        </div>

        {/* Locked out */}
        {locked && !unlocked && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="glass-gold rounded-3xl p-10 max-w-lg mx-auto">
              <div className="text-6xl mb-5">🔒</div>
              <h3 className="font-playfair font-bold text-2xl mb-3" style={{ color: "#d4af37" }}>
                This gift is just for her
              </h3>
              <p className="font-cormorant text-xl italic" style={{ color: "rgba(255,245,240,0.7)" }}>
                You&apos;ve used all your attempts. This message was meant for one person only. 💌
              </p>
            </div>
          </div>
        )}

        {/* Quiz */}
        {!unlocked && !locked && (
          <div className="mb-12">
            <QuizGame onWin={handleQuizWin} />
          </div>
        )}

        {/* Password input */}
        {!unlocked && !locked && (
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
                  Not quite... {failsLeft} {failsLeft === 1 ? "attempt" : "attempts"} remaining 💭
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
                      color: line.startsWith("My dearest") || line.startsWith("Happy 25th") || line.startsWith("Yours") || line.startsWith("— Shola") ? "#d4af37" : "rgba(255, 245, 240, 0.88)",
                      fontWeight: line.startsWith("My dearest") || line.startsWith("Happy 25th") || line.startsWith("Yours") ? 600 : 400,
                      fontFamily: line.startsWith("My dearest") || line.startsWith("Happy 25th") || line.startsWith("Yours") || line.startsWith("— Shola") ? "'Playfair Display', serif" : "'Cormorant Garamond', serif",
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
