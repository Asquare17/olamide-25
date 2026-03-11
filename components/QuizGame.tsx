"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const PASSWORD_LETTERS = ["A", "P", "E", "K", "E"];
const MAX_QUIZ_ATTEMPTS = 3;
const STORAGE_QUIZ_ATTEMPTS = "olm_quiz_attempts";

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
  },
];

interface QuizGameProps {
  onWin: () => void;
}

export default function QuizGame({ onWin }: QuizGameProps) {
  const [stage, setStage] = useState<"intro" | "playing" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  // answers[i] = selected option string, or null if not yet answered
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [advancing, setAdvancing] = useState(false);
  const [attemptsUsed, setAttemptsUsed] = useState(0);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(STORAGE_QUIZ_ATTEMPTS) || "0");
      setAttemptsUsed(stored);
    } catch {}
  }, []);

  const score = answers.filter((a, i) => a === QUESTIONS[i].answer).length;
  const currentAnswer = answers[currentQ];
  const isAnswered = currentAnswer !== null;
  const isCorrect = currentAnswer === QUESTIONS[currentQ].answer;

  const handleSelect = (option: string) => {
    if (isAnswered || advancing) return;

    const newAnswers = [...answers];
    newAnswers[currentQ] = option;
    setAnswers(newAnswers);
    setAdvancing(true);

    const isLast = currentQ === QUESTIONS.length - 1;
    setTimeout(() => {
      setAdvancing(false);
      if (isLast) {
        // Compute score from newAnswers since state hasn't updated yet
        const finalScore = newAnswers.filter((a, i) => a === QUESTIONS[i].answer).length;
        const newAttempts = attemptsUsed + 1;
        setAttemptsUsed(newAttempts);
        try { localStorage.setItem(STORAGE_QUIZ_ATTEMPTS, String(newAttempts)); } catch {}
        setStage("results");
        if (finalScore === QUESTIONS.length) {
          onWin();
        }
      } else {
        setCurrentQ((q) => q + 1);
      }
    }, 1400);
  };

  const handleRetry = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQ(0);
    setAdvancing(false);
    setStage("playing");
  };

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <div className="flex flex-col items-center gap-8 max-w-lg mx-auto text-center">
        <div className="glass-gold rounded-3xl p-10">
          <div
            className="text-6xl mb-5"
            style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.5))", animation: "heartbeat 2s ease-in-out infinite" }}
          >
            🔐
          </div>
          <h3 className="font-playfair font-bold text-3xl mb-4" style={{ color: "#d4af37" }}>
            A Secret Gift Awaits
          </h3>
          <p className="font-cormorant text-xl italic mb-2" style={{ color: "rgba(255,245,240,0.8)" }}>
            Hidden just below is a message written from his heart, just for you.
          </p>
          <p className="font-cormorant text-lg mb-6" style={{ color: "rgba(201,149,106,0.7)" }}>
            Answer <span style={{ color: "#d4af37" }}>5 questions</span> about your story together.
            Get them all right to unlock the password.
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {PASSWORD_LETTERS.map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center"
                style={{ border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <span className="font-playfair font-black text-lg" style={{ color: "rgba(212,175,55,0.3)" }}>_</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStage("playing")}
            className="btn-lift glass-gold border rounded-full px-12 py-4 font-playfair font-bold text-xl tracking-widest glow-gold"
            style={{ borderColor: "rgba(212,175,55,0.6)", color: "#d4af37" }}
          >
            Take the Quiz 💌
          </button>
        </div>
      </div>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (stage === "results") {
    const perfect = score === QUESTIONS.length;
    const retriesLeft = MAX_QUIZ_ATTEMPTS - attemptsUsed;

    return (
      <div className="flex flex-col items-center gap-6 max-w-lg mx-auto text-center w-full">
        {/* Score card */}
        <div
          className="glass-gold rounded-3xl p-8 w-full"
          style={{ boxShadow: perfect ? "0 0 60px rgba(212,175,55,0.4)" : undefined }}
        >
          <div
            className="text-6xl mb-4"
            style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
          >
            {perfect ? "🎊" : score >= 3 ? "💛" : "💪"}
          </div>
          <h3 className="font-playfair font-black text-3xl mb-2 shimmer-text">
            {perfect ? "Perfect Score!" : `${score} / ${QUESTIONS.length}`}
          </h3>
          <p className="font-cormorant text-xl italic mb-6" style={{ color: "rgba(255,245,240,0.8)" }}>
            {perfect
              ? "You know our story by heart 🌹 Here's your password:"
              : score >= 3
              ? "So close! A few memories slipped through..."
              : "Don't worry — the important thing is you were there 💕"}
          </p>

          {/* Per-question result breakdown */}
          <div className="flex flex-col gap-2 mb-6 text-left">
            {QUESTIONS.map((q, i) => {
              const answered = answers[i];
              const correct = answered === q.answer;
              return (
                <div
                  key={q.id}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: correct ? "rgba(212,175,55,0.08)" : "rgba(239,68,68,0.06)",
                    border: correct ? "1px solid rgba(212,175,55,0.25)" : "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <span className="text-base mt-0.5 flex-shrink-0">{correct ? "✅" : "❌"}</span>
                  <div>
                    <p className="font-cormorant text-base leading-snug" style={{ color: "rgba(255,245,240,0.85)" }}>
                      {q.question}
                    </p>
                    {!correct && (
                      <p className="font-cormorant text-sm italic mt-0.5" style={{ color: "rgba(212,175,55,0.7)" }}>
                        Answer: {q.answer}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Password reveal on perfect */}
          {perfect && (
            <div className="glass rounded-2xl p-6 mb-4" style={{ border: "1px solid rgba(212,175,55,0.5)" }}>
              <p className="font-cormorant text-sm uppercase tracking-widest mb-3" style={{ color: "rgba(201,149,106,0.7)" }}>
                Your password is
              </p>
              <div className="flex justify-center gap-3">
                {PASSWORD_LETTERS.map((letter, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg flex items-center justify-center glow-gold"
                    style={{
                      background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(240,208,96,0.1))",
                      border: "1px solid rgba(212,175,55,0.6)",
                    }}
                  >
                    <span className="font-playfair font-black text-2xl shimmer-text">{letter}</span>
                  </div>
                ))}
              </div>
              <p className="font-dancing text-base mt-4" style={{ color: "rgba(201,149,106,0.6)" }}>
                Scroll down to unlock the gift ↓
              </p>
            </div>
          )}

          {/* Retry or out-of-attempts */}
          {!perfect && (
            retriesLeft > 0 ? (
              <div className="flex flex-col items-center gap-3">
                <p className="font-cormorant text-base" style={{ color: "rgba(255,245,240,0.5)" }}>
                  {retriesLeft === 1 ? "1 attempt remaining" : `${retriesLeft} attempts remaining`}
                </p>
                <button
                  onClick={handleRetry}
                  className="btn-lift glass-gold border rounded-full px-10 py-3 font-playfair font-bold text-lg tracking-widest"
                  style={{ borderColor: "rgba(212,175,55,0.5)", color: "#d4af37" }}
                >
                  Try Again 🔄
                </button>
              </div>
            ) : (
              <p className="font-cormorant text-base italic" style={{ color: "rgba(255,245,240,0.4)" }}>
                No more attempts — this gift is just for her 🔐
              </p>
            )
          )}
        </div>
      </div>
    );
  }

  // ── Playing ────────────────────────────────────────────────────────────────
  const question = QUESTIONS[currentQ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {QUESTIONS.map((_, i) => {
          const answered = answers[i] !== null;
          const correct = answers[i] === QUESTIONS[i].answer;
          return (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: answered
                  ? correct ? "#d4af37" : "rgba(239,68,68,0.7)"
                  : i === currentQ ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.12)",
                transform: i === currentQ ? "scale(1.4)" : "scale(1)",
              }}
            />
          );
        })}
      </div>

      {/* Counter */}
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
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(13,2,8,0.85) 100%)" }}
        />
        <div className="absolute bottom-3 left-4">
          <span className="font-dancing text-sm" style={{ color: "rgba(201,149,106,0.8)" }}>
            {question.photoCaption}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="glass-gold rounded-2xl p-5 w-full" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
        <p className="font-playfair font-semibold text-lg md:text-xl text-center" style={{ color: "rgba(255,245,240,0.95)" }}>
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {question.options.map((option) => {
          const isSelected = currentAnswer === option;
          const thisCorrect = isSelected && option === question.answer;
          const thisWrong = isSelected && option !== question.answer;
          // After answering, also highlight the correct answer in green
          const showCorrect = isAnswered && option === question.answer && !isCorrect;

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={isAnswered}
              className="rounded-2xl p-4 text-left font-cormorant text-lg transition-all duration-200 btn-lift"
              style={{
                background: thisCorrect || showCorrect
                  ? "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(240,208,96,0.15))"
                  : thisWrong
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: thisCorrect || showCorrect
                  ? "1px solid rgba(212,175,55,0.7)"
                  : thisWrong
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: thisCorrect || showCorrect ? "#d4af37" : thisWrong ? "rgba(239,68,68,0.9)" : "rgba(255,245,240,0.8)",
                boxShadow: thisCorrect || showCorrect ? "0 0 15px rgba(212,175,55,0.3)" : "none",
                cursor: isAnswered ? "default" : "pointer",
              }}
            >
              {option}
              {thisCorrect && <span className="ml-2">✓</span>}
              {thisWrong && <span className="ml-2">✗</span>}
              {showCorrect && <span className="ml-2">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Inline feedback */}
      {isAnswered && (
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
          <p className="font-dancing text-sm mt-1" style={{ color: "rgba(255,245,240,0.3)" }}>
            {currentQ < QUESTIONS.length - 1 ? "Moving to next question..." : "Calculating your score..."}
          </p>
        </div>
      )}
    </div>
  );
}
