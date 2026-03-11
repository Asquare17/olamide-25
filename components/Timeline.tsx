"use client";
import Image from "next/image";

const MOMENTS = [
  {
    id: 1,
    label: "The Beginning · Sept 2023",
    title: "Where It All Started",
    desc: "A car ride. A pink head wrap. A blue floral shirt. Genesis Cinema. That ordinary September afternoon quietly became the start of everything — and neither of us knew it yet.",
    imagePath: "/images/love-began.webp",
    imagePos: "center 55%",
    side: "left",
  },
  {
    id: 2,
    label: "First Date",
    title: "See Lagos",
    desc: "You walked in between those bookshelves and I couldn't look away. The girl who reads — of course I was done for.",
    imagePath: "/images/first-date.webp",
    imagePos: "center 65%",
    side: "right",
  },
  {
    id: 3,
    label: "Ramadan 2024",
    title: "Iftar at Gusto",
    desc: "Breaking fast together at Gusto. Watching you in your element — faithful, calm, luminous — was one of the most beautiful things I've witnessed.",
    imagePath: "/images/ramadan-date.webp",
    imagePos: "center 52%",
    side: "left",
  },
  {
    id: 4,
    label: "Together",
    title: "That Quiet, Competitive Fire",
    desc: "She has this focus — the kind that doesn't need to announce itself. Whatever she sets her mind to, watch out. You've seen it up close, and it's something else entirely.",
    imagePath: "/images/at-my-place.webp",
    imagePos: "center 44%",
    side: "right",
  },
  {
    id: 5,
    label: "Takwa Bay",
    title: "The Beach, Together",
    desc: "Sand and waves and your laughter. If someone asked me to describe joy, I would describe that day.",
    imagePath: "/images/beach.webp",
    imagePos: "center 42%",
    side: "left",
  },
  {
    id: 6,
    label: "Today · 25",
    title: "More Radiant Than Ever",
    desc: "Stronger, softer, fiercer, deeper. You've grown into yourself so beautifully — and the best chapters are still ahead.",
    imagePath: "/images/shoot-1.webp",
    imagePos: "center 18%",
    side: "right",
  },
];

function TimelineCard({
  moment,
  index,
  align,
}: {
  moment: (typeof MOMENTS)[0];
  index: number;
  align: "left" | "right";
}) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden group"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={moment.imagePath}
          alt={moment.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: moment.imagePos }}
        />
        {/* Subtle bottom fade only */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(13,2,8,0.65) 100%)",
          }}
        />
        {/* Label pill */}
        <div
          className="absolute top-3 left-3 rounded-full px-3 py-1"
          style={{
            background: "rgba(13,2,8,0.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(212,175,55,0.35)",
          }}
        >
          <span
            className="font-cormorant text-sm font-semibold uppercase tracking-widest"
            style={{ color: "rgba(212,175,55,0.9)" }}
          >
            {moment.label}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3
          className="font-playfair font-bold text-xl mb-2"
          style={{ color: "#d4af37" }}
        >
          {moment.title}
        </h3>
        <p
          className="font-cormorant text-lg italic leading-relaxed"
          style={{ color: "rgba(255,245,240,0.72)" }}
        >
          {moment.desc}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {

  return (
    <section className="relative py-24 px-4 md:px-12 overflow-hidden">
      <div
        className="orb w-[350px] h-[350px] opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          top: "20%",
          right: "-80px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-dancing text-xl" style={{ color: "rgba(201,149,106,0.8)" }}>
            written in the stars
          </span>
          <h2 className="font-playfair font-black text-5xl md:text-6xl mt-2 shimmer-text">
            Our Story
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* ─── DESKTOP: proper grid with center line ─── */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #d4af37 10%, #c9956a 50%, #ff8fab 90%, transparent 100%)",
                opacity: 0.5,
              }}
            />

            <div className="flex flex-col gap-16">
              {MOMENTS.map((moment, i) => {
                const isLeft = moment.side === "left";
                return (
                  <div key={moment.id} className="grid grid-cols-[1fr_48px_1fr] items-center">
                    {/* Left cell */}
                    <div className={`${isLeft ? "pr-8" : ""}`}>
                      {isLeft && (
                        <TimelineCard moment={moment} index={i} align="left" />
                      )}
                    </div>

                    {/* Center node */}
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #d4af37, #f0d060)",
                          boxShadow: "0 0 12px rgba(212,175,55,0.6), 0 0 24px rgba(212,175,55,0.2)",
                        }}
                      />
                    </div>

                    {/* Right cell */}
                    <div className={`${!isLeft ? "pl-8" : ""}`}>
                      {!isLeft && (
                        <TimelineCard moment={moment} index={i} align="right" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── MOBILE: single column with left-rail line ─── */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Left rail line */}
            <div
              className="absolute left-3 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #d4af37 8%, #c9956a 50%, #ff8fab 92%, transparent 100%)",
                opacity: 0.5,
              }}
            />

            <div className="flex flex-col gap-10">
              {MOMENTS.map((moment, i) => (
                <div key={moment.id} className="relative">
                  {/* Rail node */}
                  <div
                    className="absolute -left-[21px] top-6 w-3 h-3 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #f0d060)",
                      boxShadow: "0 0 8px rgba(212,175,55,0.6)",
                    }}
                  />
                  <TimelineCard moment={moment} index={i} align="left" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
