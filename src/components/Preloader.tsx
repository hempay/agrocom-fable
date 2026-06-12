import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const WORDS = ["CULTIVATE", "CONNECT", "TRADE", "GROW"];

const Preloader = ({ onDone }: { onDone: () => void }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [word, setWord] = useState(0);
  const [skipped] = useState(
    () => prefersReducedMotion() || sessionStorage.getItem("agrocom-visited") === "1"
  );

  useEffect(() => {
    if (skipped) {
      onDone();
      return;
    }
    sessionStorage.setItem("agrocom-visited", "1");

    const counter = { value: 0 };
    const wordTimer = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 420);

    const tl = gsap.timeline({
      onComplete: () => onDone(),
    });

    tl.to(counter, {
      value: 100,
      duration: 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
        }
      },
    })
      .to(rootRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "power4.inOut",
      })
      .add(() => clearInterval(wordTimer));

    // Hold the curtain until webfonts have arrived so the hero splits cleanly.
    document.fonts?.ready.then(() => tl.play());

    return () => {
      clearInterval(wordTimer);
      tl.kill();
    };
  }, [skipped, onDone]);

  if (skipped) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <p className="font-display text-3xl sm:text-5xl font-light italic text-cream">
        {WORDS[word].toLowerCase()}
      </p>
      <span
        ref={counterRef}
        className="absolute bottom-8 right-8 font-sans text-sm tracking-[0.3em] text-lime"
      >
        000
      </span>
      <span className="absolute bottom-8 left-8 eyebrow text-cream/40">Agrocom</span>
    </div>
  );
};

export default Preloader;
