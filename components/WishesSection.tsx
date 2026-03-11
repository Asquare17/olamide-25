"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { getSupabase, BirthdayWish } from "@/lib/supabase";

export default function WishesSection() {
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    setLoading(true);
    const client = getSupabase();
    if (!client) { setLoading(false); return; }
    const { data } = await client
      .from("olamide_birthday")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setWishes(data);
    setLoading(false);
  };

  const goTo = useCallback((idx: number) => {
    if (wishes.length <= 1) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 300);
  }, [wishes.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (wishes.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % wishes.length;
        setFading(true);
        setTimeout(() => setFading(false), 300);
        return next;
      });
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [wishes.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) {
      setFormError("Please fill in both your name and message.");
      return;
    }
    setSubmitting(true);
    setFormError("");

    const client = getSupabase();
    if (!client) { setFormError("Service unavailable. Please try again later."); setSubmitting(false); return; }
    const { error } = await client
      .from("olamide_birthday")
      .insert([{ name: name.trim(), wish: wish.trim() }]);

    setSubmitting(false);
    if (error) {
      setFormError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setName("");
      setWish("");
      await fetchWishes();
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-4 md:px-12 overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-[450px] h-[450px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #ff8fab 0%, transparent 70%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-dancing text-xl" style={{ color: "rgba(201,149,106,0.8)" }}>
            drop a message for the birthday girl
          </span>
          <h2 className="font-playfair font-black text-4xl md:text-5xl mt-2 shimmer-text">
            Birthday Wishes
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: Wishes carousel ── */}
          <div className="flex flex-col gap-5">
            <p className="font-dancing text-lg text-center" style={{ color: "rgba(201,149,106,0.7)" }}>
              what people are saying 💕
            </p>

            {loading ? (
              <div className="flex items-center justify-center h-52">
                <div
                  className="w-8 h-8 rounded-full border-2 animate-spin"
                  style={{ borderColor: "rgba(212,175,55,0.3)", borderTopColor: "#d4af37" }}
                />
              </div>
            ) : wishes.length === 0 ? (
              <div
                className="glass rounded-2xl p-8 text-center"
                style={{ border: "1px solid rgba(255,255,255,0.07)", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <p className="font-cormorant text-xl italic" style={{ color: "rgba(255,245,240,0.4)" }}>
                  Be the first to leave a wish for Olamide 🌹
                </p>
              </div>
            ) : (
              <>
                {/* Wish card */}
                <div
                  className="glass-rose rounded-2xl p-7 relative overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,143,171,0.15)",
                    minHeight: "200px",
                    opacity: fading ? 0 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {/* Decorative quote */}
                  <span
                    className="absolute top-3 left-4 font-serif text-5xl leading-none select-none"
                    style={{ color: "rgba(212,175,55,0.15)" }}
                  >
                    &ldquo;
                  </span>

                  <div className="relative z-10 pt-4">
                    <p
                      className="font-cormorant text-xl italic leading-relaxed mb-5"
                      style={{ color: "rgba(255,245,240,0.88)" }}
                    >
                      {wishes[current]?.wish}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(255,143,171,0.2))",
                          border: "1px solid rgba(212,175,55,0.4)",
                        }}
                      >
                        <span className="font-playfair font-bold text-sm" style={{ color: "#d4af37" }}>
                          {wishes[current]?.name[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-playfair font-semibold text-sm" style={{ color: "#d4af37" }}>
                          {wishes[current]?.name}
                        </p>
                        <p className="font-cormorant text-xs" style={{ color: "rgba(255,245,240,0.35)" }}>
                          {new Date(wishes[current]?.created_at).toLocaleDateString("en-GB", {
                            day: "numeric", month: "long"
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-1">
                  {/* Prev/Next */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => goTo((current - 1 + wishes.length) % wishes.length)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 btn-lift"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,245,240,0.6)",
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => goTo((current + 1) % wishes.length)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 btn-lift"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,245,240,0.6)",
                      }}
                    >
                      ›
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                    {wishes.slice(0, 12).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === current ? "18px" : "6px",
                          height: "6px",
                          background: i === current ? "#d4af37" : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                    {wishes.length > 12 && (
                      <span className="font-cormorant text-xs" style={{ color: "rgba(255,245,240,0.3)" }}>
                        +{wishes.length - 12}
                      </span>
                    )}
                  </div>

                  {/* Count */}
                  <span className="font-cormorant text-sm" style={{ color: "rgba(255,245,240,0.35)" }}>
                    {current + 1} / {wishes.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* ── Right: Submit form ── */}
          <div>
            <p className="font-dancing text-lg text-center mb-5" style={{ color: "rgba(201,149,106,0.7)" }}>
              leave your wish 🌹
            </p>

            {submitted ? (
              <div
                className="glass-gold rounded-2xl p-8 text-center"
                style={{
                  border: "1px solid rgba(212,175,55,0.4)",
                  boxShadow: "0 0 40px rgba(212,175,55,0.15)",
                }}
              >
                <div className="text-5xl mb-4" style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}>
                  🌹
                </div>
                <h3 className="font-playfair font-bold text-xl mb-2" style={{ color: "#d4af37" }}>
                  Thank you!
                </h3>
                <p className="font-cormorant text-lg italic" style={{ color: "rgba(255,245,240,0.75)" }}>
                  Your wish has been sent. Olamide will love it. 💕
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-cormorant text-sm uppercase tracking-widest"
                    style={{ color: "rgba(201,149,106,0.7)" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fatima"
                    maxLength={50}
                    className="rounded-xl px-4 py-3 font-cormorant text-lg w-full outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,245,240,0.9)",
                      caretColor: "#d4af37",
                    }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(212,175,55,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-cormorant text-sm uppercase tracking-widest"
                    style={{ color: "rgba(201,149,106,0.7)" }}
                  >
                    Your Message
                  </label>
                  <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder="Write something beautiful for the birthday girl..."
                    maxLength={300}
                    rows={4}
                    className="rounded-xl px-4 py-3 font-cormorant text-lg w-full outline-none resize-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,245,240,0.9)",
                      caretColor: "#d4af37",
                    }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(212,175,55,0.5)"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; }}
                  />
                  <div className="text-right">
                    <span className="font-cormorant text-xs" style={{ color: "rgba(255,245,240,0.25)" }}>
                      {wish.length}/300
                    </span>
                  </div>
                </div>

                {formError && (
                  <p className="font-cormorant text-sm text-center" style={{ color: "rgba(239,68,68,0.8)" }}>
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !wish.trim()}
                  className="btn-lift glass-gold border rounded-full py-4 font-playfair font-bold text-lg tracking-widest glow-gold disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ borderColor: "rgba(212,175,55,0.6)", color: "#d4af37" }}
                >
                  {submitting ? "Sending..." : "Send My Wish 💌"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
