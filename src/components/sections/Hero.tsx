import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";

const STATS = [
  { value: 10000, suffix: "+", label: "Farmers on the platform" },
  { value: 500, suffix: "+", label: "Products listed & traded" },
  { value: 24, suffix: "/7", label: "BrainBag AI, always on" },
];

const Hero = ({ ready }: { ready: boolean }) => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const reduced = prefersReducedMotion();

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-line]",
        { yPercent: reduced ? 0 : 115 },
        { yPercent: 0, duration: 1.3, stagger: 0.13 }
      )
        .fromTo(
          "[data-hero-fade]",
          { y: reduced ? 0 : 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          "-=0.8"
        )
        .fromTo(
          "[data-hero-horizon]",
          { strokeDashoffset: 1600 },
          { strokeDashoffset: 0, duration: reduced ? 0 : 1.8, ease: "power2.inOut" },
          "-=1.1"
        )
        .fromTo(
          "[data-hero-sun]",
          { scale: 0, transformOrigin: "center" },
          { scale: 1, duration: 0.8, ease: "back.out(2)" },
          "-=0.9"
        );

      // Count the stats up once the intro settles.
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: reduced ? 0 : 1.8,
          delay: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString();
          },
        });
      });
    },
    { scope: rootRef, dependencies: [ready] }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-24 sm:pt-32"
    >
      {/* Drawn horizon + rising sun, behind the type */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-[31%] -z-0 hidden w-full md:block"
        viewBox="0 0 1440 320"
        fill="none"
        aria-hidden="true"
      >
        <circle data-hero-sun cx="1150" cy="120" r="58" className="fill-lime" />
        <path
          data-hero-horizon
          d="M-20 240 C 240 140, 520 300, 780 210 S 1260 130, 1460 220"
          className="stroke-leaf"
          strokeWidth="1.5"
          strokeDasharray="1600"
          strokeDashoffset="1600"
        />
        <path
          data-hero-horizon
          d="M-20 280 C 300 200, 600 330, 900 255 S 1300 190, 1460 260"
          className="stroke-ink/20"
          strokeWidth="1"
          strokeDasharray="1600"
          strokeDashoffset="1600"
        />
      </svg>

      <div className="container-x relative z-10">
        <p data-hero-fade className="eyebrow mb-6 text-leaf sm:mb-10">
          A living marketplace for agriculture
        </p>

        <h1 className="display-huge text-[17vw] sm:text-[13vw] lg:text-[10.5vw]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              Where fields
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              <em className="mr-[0.18em] font-light text-leaf">meet</em>the
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-hero-line className="block">
              future<span className="text-leaf">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero-fade className="max-w-md text-base leading-relaxed text-haze sm:text-lg">
            Agrocom connects farmers, buyers and agribusinesses on one platform —
            AI insights, live markets, secure payments, zero middlemen.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link to="/#pricing" className="btn-ink px-8 py-4">
                Start free
              </Link>
            </Magnetic>
            <Link to="/#how" className="btn-outline px-8 py-4">
              How it works
            </Link>
          </div>
        </div>
      </div>

      {/* Stats ribbon */}
      <div data-hero-fade className="container-x relative z-10 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 divide-y divide-ink/10 border-t border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3 py-5 sm:block sm:px-6 sm:py-7 sm:first:pl-0">
              <p className="font-display text-4xl font-semibold sm:text-5xl">
                <span data-counter={s.value}>0</span>
                <span className="text-leaf">{s.suffix}</span>
              </p>
              <p className="mt-0 text-xs uppercase tracking-[0.18em] text-haze sm:mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
