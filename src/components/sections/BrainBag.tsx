import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const AI_RESPONSE =
  "For tomatoes, I recommend Neem oil — it's organic, effective against aphids and whiteflies, and safe for consumption. Apply every 7–10 days during the growing season.";

const BULLETS = [
  "Multi-session conversations",
  "Personalized crop advice",
  "Free daily messages for all users",
  "Unlimited for subscribed farmers",
];

const BrainBag = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-bb-reveal]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );

      // Type out the AI answer when the chat card scrolls into view.
      const typer = { i: 0 };
      gsap.to(typer, {
        i: AI_RESPONSE.length,
        duration: AI_RESPONSE.length * 0.018,
        ease: "none",
        delay: 0.8,
        scrollTrigger: { trigger: "[data-bb-chat]", start: "top 75%" },
        onUpdate: () => setTyped(AI_RESPONSE.slice(0, Math.round(typer.i))),
        onComplete: () => setDone(true),
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="brainbag" ref={rootRef} className="bg-cream py-28 sm:py-40">
      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p data-bb-reveal className="eyebrow mb-5 text-leaf">
            03 — Powered by AI
          </p>
          <h2 data-bb-reveal className="display-huge mb-6 text-4xl sm:text-6xl">
            Meet <em className="font-light text-leaf">BrainBag,</em>
            <br />
            your field's second brain.
          </h2>
          <p data-bb-reveal className="mb-8 max-w-lg leading-relaxed text-haze">
            Ask anything about crops, pests, weather or market prices. BrainBag learns
            your context and answers like an agronomist who never sleeps — free to try,
            always in your pocket.
          </p>
          <ul className="mb-10 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} data-bb-reveal className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-leaf text-[10px] text-cream">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
          <a
            data-bb-reveal
            href="#download"
            className="group inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-leaf"
          >
            Try BrainBag free
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
        </div>

        {/* Chat mock */}
        <div data-bb-reveal data-bb-chat className="mx-auto w-full max-w-md">
          <div className="rounded-[2rem] bg-ink p-6 shadow-[0_40px_80px_-30px_rgba(12,18,11,0.45)]">
            <div className="mb-5 flex items-center gap-3 border-b border-cream/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-lg">
                🧠
              </div>
              <div>
                <p className="text-sm font-semibold text-cream">BrainBag AI</p>
                <p className="flex items-center gap-1.5 text-xs text-lime">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                  Online
                </p>
              </div>
            </div>

            <div className="mb-4 flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-lime px-4 py-3 text-sm text-ink">
                What pesticide is safe for tomatoes?
              </p>
            </div>

            <div className="flex justify-start">
              <p className="min-h-[7.5rem] max-w-[88%] rounded-2xl rounded-bl-md bg-cream/10 px-4 py-3 text-sm leading-relaxed text-cream">
                {typed}
                {!done && <span className="ml-0.5 inline-block h-4 w-0.5 animate-blink bg-lime align-middle" />}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrainBag;
