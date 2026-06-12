import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STORIES = [
  {
    quote:
      "Agrocom connected me with buyers across West Africa I never could have reached on my own. My cassava exports doubled within two seasons.",
    name: "Kwame B.",
    role: "Cassava Farmer, Ghana",
    image: "/ghana.jpg",
  },
  {
    quote:
      "BrainBag AI diagnosed my rice crop disease overnight. Back in my village we would have lost everything — now I farm smarter every day.",
    name: "Priya M.",
    role: "Rice Farmer, India",
    image: "/india.jpg",
  },
  {
    quote:
      "I source fresh produce directly from African farms for my restaurant chain. The quality and traceability on Agrocom is unmatched.",
    name: "Jordan T.",
    role: "Restaurant Owner, United States",
    image: "/usa.jpg",
  },
];

const Stories = () => {
  const rootRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-story-reveal]",
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
    },
    { scope: rootRef }
  );

  const go = useCallback((dir: 1 | -1) => {
    const el = quoteRef.current!;
    gsap.to(el, {
      y: -24,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setIndex((i) => (i + dir + STORIES.length) % STORIES.length);
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
      },
    });
  }, []);

  const story = STORIES[index];

  return (
    <section id="stories" ref={rootRef} className="bg-forest py-28 text-cream sm:py-40">
      <div className="container-x">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p data-story-reveal className="eyebrow mb-5 text-lime">
              05 — Farmer stories
            </p>
            <h2 data-story-reveal className="display-huge text-4xl sm:text-6xl">
              Real farmers.
              <br />
              Real <em className="font-light text-lime">results.</em>
            </h2>
          </div>
          <div data-story-reveal className="flex gap-3">
            <button
              onClick={() => go(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-lg transition-colors hover:bg-lime hover:text-ink"
              aria-label="Previous story"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-lg transition-colors hover:bg-lime hover:text-ink"
              aria-label="Next story"
            >
              →
            </button>
          </div>
        </div>

        <div data-story-reveal>
          <div ref={quoteRef}>
            <p className="max-w-4xl font-display text-2xl font-light leading-snug sm:text-4xl">
              <span className="mr-3 text-lime" aria-hidden="true">
                “
              </span>
              {story.quote}
              <span className="ml-1 text-lime" aria-hidden="true">
                ”
              </span>
            </p>
            <div className="mt-10 flex items-center gap-4">
              <img
                src={story.image}
                alt={story.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-lime/60"
              />
              <div>
                <p className="font-semibold">{story.name}</p>
                <p className="text-sm text-cream/55">{story.role}</p>
              </div>
              <div className="ml-2 flex gap-1 text-lime" aria-label="5 out of 5 stars">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-2.5">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() =>
                  i !== index && go(i > index ? 1 : -1)
                }
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-lime" : "w-4 bg-cream/25 hover:bg-cream/50"
                }`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
