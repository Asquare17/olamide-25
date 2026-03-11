"use client";
import { useState } from "react";
import Image from "next/image";

// Each correct answer reveals one letter of the password "LAGOS"
const PASSWORD_LETTERS = ["L", "A", "G", "O", "S"];

const QUESTIONS = [
  {
    id: 1,
    photo: "/images/first-date.webp",
    photoCaption: "💭 Hint: look at the background...",
    question: "Where did we go on our very first date?",
    options: ["Silverbird Cinema", "See Lagos", "Terra Kulture", "The Palms"],
    answer: "See Lagos",
    correctMsg: "Yes! 📚 Between those bookshelves in Lagos — that's where it all began.",
    wrongMsg: "Think back to the bookshelves and the mood lighting... 💡",
    reveals: "L",
  },
  {
    id: 2,
    photo: "/images/love-began.webp",
    photoCaption: "💭 Our very first photo together...",
    question: "What shirt was I wearing in our first car selfie — 'when the love began'?",
    options: ["A plain white polo", "A black hoodie", "A blue floral shirt", "A red Ankara top"],
    answer: "A blue floral shirt",
    correctMsg: "That blue floral shirt 💙 You noticed! I was hoping you would.",
    wrongMsg: "Look closely at the colours in that first selfie... 👀",
    reveals: "A",
  },
  {
    id: 3,
    photo: "/images/at-my-place.webp",
    photoCaption: "💭 Glasses on. Focused. Completely her.",
    question: "Which football club jersey are you wearing in this photo?",
    options: ["Chelsea FC", "Real Madrid", "Inter Miami", "Man United"],
    answer: "Inter Miami",
    correctMsg: "That pink jersey 🩷 You made it look better than any player ever has.",
    wrongMsg: "Look at the badge on the jersey... think pink 🌸",
    reveals: "G",
  },
  {
    id: 4,
    photo: "/images/genesis-cinema.webp",
    photoCaption: "💭 That smile when you walked out...",
    question: "Which cinema did we visit together?",
    options: ["Filmhouse", "Silverbird", "Genesis Cinema", "Vue Cinema"],
    answer: "Genesis Cinema",
    correctMsg: "Genesis Cinema 🎬 That smile walking out — I have it memorised.",
    wrongMsg: "Think about that big smile outside the cinema... 🎭",
    reveals: "O",
  },
  {
    id: 5,
    photo: "/images/islamic.webp",
    photoCaption: "💭 One of his favourites of you...",
    question: "What is your Islamic first name — the name your closest people know you by?",
    options: ["Fatimah", "Zainab", "Shukurat", "Amina"],
    answer: "Shukurat",
    correctMsg: "Shukurat 🌙 The name that carries your faith. I love every version of you.",
    wrongMsg: "The name your family calls you by... it starts with S 💛",
    reveals: "S",
  },
];

interface QuizGameProps {
  onWin: () => void;
}

export default function QuizGame({ onWin }: QuizGameProps) {
  const [stage, setStage] = useState<"intro" | "playing" | "won">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(5).fill(false));
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [shake, setShake] = useState(false);

  const question = QUESTIONS[currentQ];
  const isCorrect = selected === question.answer;
  const allRevealed = revealed.every(Boolean);

  const handleSelect = (option: string) => {
    if (selected && isCorrect) return; // already answered correctly
    setSelected(option);
    if (option === question.answer) {
      // Correct
      const newRevealed = [...revealed];
      newRevealed[currentQ] = true;
      setRevealed(newRevealed);
      setWrongAttempt(false);
    } else {
      // Wrong
      setWrongAttempt(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setSelected(null), 1000);
    }
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setWrongAttempt(false);
    } else {
      setStage("won");
      onWin();
    }
  };

  if (stage === "intro") {
    return (
      <div className="flex flex-col items-center gap-8 max-w-lg mx-auto text-center">
        <div className="glass-gold rounded-3xl p-10">
          <div className="text-6xl mb-5" style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.5))", animation: "heartbeat 2s ease-in-out infinite" }}>🔐</div>
          <h3 className="font-playfair font-bold text-3xl mb-4" style={{ color: "#d4af37" }}>A Secret Gift Awaits</h3>
          <p className="font-cormorant text-xl italic mb-2" style={{ color: "rgba(255,245,240,0.8)" }}>
            Hidden just below is a message written from his heart, just for you.
          </p>
          <p className="font-cormorant text-lg mb-6" style={{ color: "rgba(201,149,106,0.7)" }}>
            Answer <span style={{ color: "#d4af37" }}>5 questions</span> about your story together. Each correct answer reveals one letter of the password.
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {PASSWORD_LETTERS.map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
                <span className="font-playfair font-black text-lg" style={{ color: "rgba(212,175,55,0.3)" }}>_</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStage("playing")} className="btn-lift glass-gold border rounded-full px-12 py-4 font-playfair font-bold text-xl tracking-widest glow-gold" style={{ borderColor: "rgba(212,175,55,0.6)", color: "#d4af37" }}>
            Take the Quiz 💌
          </button>
        </div>
      </div>
    );
  }

  if (stage === "won") {
    return (
      <div className="flex flex-col items-center gap-8 max-w-lg mx-auto text-center">
        <div className="glass-gold rounded-3xl p-10" style={{ boxShadow: "0 0 60px rgba(212,175,55,0.4)" }}>
          <div className="text-6xl mb-4" style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}>🎊</div>
          <h3 className="font-playfair font-black text-3xl mb-3 shimmer-text">You Passed!</h3>
          <p className="font-cormorant text-xl italic mb-6" style={{ color: "rgba(255,245,240,0.85)" }}>
            You know our story by heart. Now scroll down and enter the password:
          </p>
          <div className="glass rounded-2xl p-6 mb-2" style={{ border: "1px solid rgba(212,175,55,0.5)" }}>
            <p className="font-cormorant text-sm uppercase tracking-widest mb-2" style={{ color: "rgba(201,149,106,0.7)" }}>Your password is</p>
            <div className="flex justify-center gap-3">
              {PASSWORD_LETTERS.map((letter, i) => (
                <div key={i} className="w-12 h-12 rounded-lg flex items-center justify-center glow-gold" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(240,208,96,0.1))", border: "1px solid rgba(212,175,55,0.6)" }}>
                  <span className="font-playfair font-black text-2xl shimmer-text">{letter}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="font-dancing text-base mt-4" style={{ color: "rgba(201,149,106,0.6)" }}>
            Scroll down to unlock the gift ↓
          </p>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Progress letters */}
      <div className="flex items-center gap-3">
        {PASSWORD_LETTERS.map((letter, i) => (
          <div
            key={i}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500"
            style={{
              background: revealed[i] ? "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(240,208,96,0.15))" : "rgba(255,255,255,0.05)",
              border: revealed[i] ? "1px solid rgba(212,175,55,0.7)" : "1px solid rgba(255,255,255,0.1)",
              boxShadow: revealed[i] ? "0 0 15px rgba(212,175,55,0.5)" : "none",
              transform: revealed[i] ? "scale(1.1)" : "scale(1)",
            }}
          >
            <span
              className="font-playfair font-black text-lg md:text-xl"
              style={{ color: revealed[i] ? "#d4af37" : "rgba(255,255,255,0.15)" }}
            >
              {revealed[i] ? letter : "_"}
            </span>
          </div>
        ))}
      </div>

      {/* Question counter */}
      <div className="font-dancing text-base" style={{ color: "rgba(201,149,106,0.7)" }}>
        Question {currentQ + 1} of {QUESTIONS.length} 💕
      </div>

      {/* Photo */}
      <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden">
        <Image
          src={question.photo}
          alt={`Question ${currentQ + 1}`}
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(13,2,8,0.85) 100%)" }} />
        <div className="absolute bottom-3 left-4">
          <span className="font-dancing text-sm" style={{ color: "rgba(201,149,106,0.8)" }}>{question.photoCaption}</span>
        </div>
      </div>

      {/* Question */}
      <div className="glass-gold rounded-2xl p-5 w-full" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
        <p className="font-playfair font-semibold text-lg md:text-xl text-center" style={{ color: "rgba(255,245,240,0.95)" }}>
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 w-full transition-all duration-100 ${shake ? "translate-x-1" : ""}`}
      >
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isThisCorrect = isSelected && isCorrect;
          const isThisWrong = isSelected && !isCorrect;

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={isCorrect}
              className="rounded-2xl p-4 text-left font-cormorant text-lg transition-all duration-200 btn-lift"
              style={{
                background: isThisCorrect
                  ? "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(240,208,96,0.15))"
                  : isThisWrong
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: isThisCorrect
                  ? "1px solid rgba(212,175,55,0.7)"
                  : isThisWrong
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: isThisCorrect ? "#d4af37" : isThisWrong ? "rgba(239,68,68,0.9)" : "rgba(255,245,240,0.8)",
                boxShadow: isThisCorrect ? "0 0 15px rgba(212,175,55,0.3)" : "none",
              }}
            >
              <span className="font-cormorant">{option}</span>
              {isThisCorrect && <span className="ml-2">✓</span>}
              {isThisWrong && <span className="ml-2">✗</span>}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selected && (
        <div
          className="w-full rounded-2xl p-4 text-center"
          style={{
            background: isCorrect ? "rgba(212,175,55,0.1)" : "rgba(239,68,68,0.08)",
            border: isCorrect ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <p
            className="font-cormorant text-lg italic"
            style={{ color: isCorrect ? "rgba(212,175,55,0.9)" : "rgba(239,68,68,0.8)" }}
          >
            {isCorrect ? question.correctMsg : question.wrongMsg}
          </p>
          {isCorrect && (
            <button
              onClick={handleNext}
              className="mt-3 btn-lift glass-gold border rounded-full px-8 py-2 font-playfair font-semibold tracking-widest"
              style={{ borderColor: "rgba(212,175,55,0.5)", color: "#d4af37", fontSize: "0.9rem" }}
            >
              {currentQ < QUESTIONS.length - 1 ? "Next Question →" : "Reveal Password 🎁"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
