import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const TEXT =
  "Agriculture feeds the world, yet the people who grow it are the last to profit. Agrocom rewires the chain — connecting farmers, buyers and agribusinesses directly, with AI in every pocket and a market that never sleeps.";

const Manifesto = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section id="manifesto" ref={rootRef} className="bg-cream py-28 sm:py-40">
      <div className="container-x">
        <p className="eyebrow mb-10 text-leaf">01 — Why we exist</p>
        <p className="max-w-5xl font-display text-3xl font-light leading-snug sm:text-5xl lg:text-[3.4rem]">
          {TEXT.split(" ").map((word, i) => (
            <span key={i} data-word className="inline">
              {word === "Agrocom" || word === "directly," ? (
                <em className="text-leaf">{word}</em>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
