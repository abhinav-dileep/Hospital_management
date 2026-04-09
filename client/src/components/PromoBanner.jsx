import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    src: "/banner-1.png",
    alt: "MediCare+ Healthcare Banner 1",
  },
  {
    id: 2,
    src: "/banner-2.png",
    alt: "MediCare+ Healthcare Banner 2",
  },
];

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback(
    (index, dir = "next") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#0369a1",
        lineHeight: 0,
      }}
    >
      {/* Slides track */}
      <div
        style={{
          display: "flex",
          transition: isAnimating
            ? "transform 0.6s cubic-bezier(0.77,0,0.18,1)"
            : "none",
          transform: `translateX(-${current * 100}%)`,
          willChange: "transform",
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              minWidth: "100%",
              position: "relative",
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: "100%",
                height: "clamp(220px, 40vw, 500px)",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      {[
        { fn: prev, side: "left", Icon: ChevronLeft },
        { fn: next, side: "right", Icon: ChevronRight },
      ].map(({ fn, side, Icon }) => (
        <button
          key={side}
          onClick={fn}
          aria-label={side === "left" ? "Previous banner" : "Next banner"}
          style={{
            position: "absolute",
            top: "50%",
            [side]: "16px",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.85)",
            border: "none",
            borderRadius: "50%",
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            zIndex: 10,
            transition: "background 0.2s, transform 0.2s",
            color: "#0369a1",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.transform = `translateY(-50%) scale(1.08)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.85)";
            e.currentTarget.style.transform = `translateY(-50%) scale(1)`;
          }}
        >
          <Icon size={22} strokeWidth={2.5} />
        </button>
      ))}

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 10,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? "28px" : "10px",
              height: "10px",
              borderRadius: "50px",
              background: i === current ? "#ffffff" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: i === current ? "0 2px 8px rgba(0,0,0,0.25)" : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
