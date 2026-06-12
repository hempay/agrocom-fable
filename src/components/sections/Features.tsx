import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const FEATURES = [
  {
    num: "01",
    glyph: "🛒",
    title: "Marketplace",
    desc: "List products, manage orders, and reach buyers directly — no middlemen, full margin back in your pocket.",
  },
  {
    num: "02",
    glyph: "🧠",
    title: "BrainBag AI",
    desc: "Your personal agricultural advisor. Crop advice, pest identification and market insights, 24/7.",
  },
  {
    num: "03",
    glyph: "📡",
    title: "Live Streaming",
    desc: "Host live farm tours and product showcases. Let buyers see the harvest before they buy it.",
  },
  {
    num: "04",
    glyph: "💬",
    title: "Community",
    desc: "Real-time chat with farmers, buyers and agribusinesses across the whole value chain.",
  },
  {
    num: "05",
    glyph: "💳",
    title: "Wallet & Payments",
    desc: "Secure, integrated payments with Hyparrow. Every transaction tracked, every naira accounted for.",
  },
  {
    num: "06",
    glyph: "🌦",
    title: "Agri-Tech Tools",
    desc: "Weather data, crop analysis, farm journal, pest ID and smart reminders — a toolkit that thinks ahead.",
  },
];

const CardBody = ({ f, accent }: { f: (typeof FEATURES)[number]; accent: boolean }) => (
  <>
    <div className="flex items-start justify-between">
      <span className={`font-display text-5xl font-light ${accent ? "text-ink/30" : "text-cream/25"}`}>
        {f.num}
      </span>
      <span className="text-3xl" aria-hidden="true">
        {f.glyph}
      </span>
    </div>
    <div>
      <h3 className="mb-3 font-display text-2xl font-semibold">{f.title}</h3>
      <p className={`text-sm leading-relaxed ${accent ? "text-ink/70" : "text-cream/60"}`}>{f.desc}</p>
    </div>
  </>
);

const Features = () => {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the cards horizontally.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile: sticky cards stack and cover each other as you scroll, with
      // covered cards receding behind the one on top.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.9,
            filter: "brightness(0.6)",
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });

      // Reduced motion: plain reveals, no stacking transforms.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-stack-wrap]", { position: "static" });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      id="features"
      ref={rootRef}
      className="overflow-x-clip bg-pine text-cream lg:overflow-hidden"
    >
      <div className="flex flex-col py-20 lg:h-screen lg:justify-center lg:py-0">
        <div className="container-x mb-12 flex items-end justify-between lg:mb-16">
          <div>
            <p className="eyebrow mb-5 text-lime">02 — The toolkit</p>
            <h2 className="display-huge text-4xl sm:text-6xl lg:text-7xl">
              One platform.
              <br />
              <em className="font-light text-lime">Infinite</em> growth.
            </h2>
          </div>
          <p className="hidden max-w-[180px] text-right text-xs uppercase tracking-[0.2em] text-cream/40 lg:block">
            Scroll — the field keeps going
          </p>
        </div>

        {/* Desktop: horizontal pinned track */}
        <div
          ref={trackRef}
          className="container-x hidden lg:flex lg:w-max lg:flex-nowrap lg:gap-7 lg:pr-[14vw]"
        >
          {FEATURES.map((f, i) => (
            <article
              key={f.num}
              className={`relative flex h-[24rem] w-[22rem] shrink-0 flex-col justify-between rounded-3xl p-7 ${
                i === 1 ? "bg-lime text-ink" : "bg-cream/[0.04] ring-1 ring-cream/15"
              }`}
            >
              <CardBody f={f} accent={i === 1} />
            </article>
          ))}
        </div>

        {/* Mobile: sticky overlapping stack */}
        <div ref={stackRef} className="container-x lg:hidden">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              data-stack-wrap
              className="sticky"
              style={{ top: `${88 + i * 12}px` }}
            >
              <article
                data-stack-card
                className={`mb-5 flex h-[19rem] flex-col justify-between rounded-3xl p-7 will-change-transform ${
                  i === 1
                    ? "bg-lime text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
                    : "bg-forest ring-1 ring-cream/12 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
                }`}
              >
                <CardBody f={f} accent={i === 1} />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
