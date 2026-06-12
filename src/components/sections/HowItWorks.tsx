import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STEPS = [
  {
    num: "01",
    title: "Create your free account",
    desc: "Sign up with just your email — OTP-first, no passwords needed.",
  },
  {
    num: "02",
    title: "List your products",
    desc: "Upload photos, set prices, and go live on the marketplace instantly.",
  },
  {
    num: "03",
    title: "Start earning",
    desc: "Receive orders, chat with buyers, and get paid directly to your wallet.",
  },
];

const HowItWorks = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((row) => {
        gsap.fromTo(
          row.querySelector("[data-step-line]"),
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
        gsap.fromTo(
          row.querySelectorAll("[data-step-content]"),
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 82%" },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="how" ref={rootRef} className="bg-parchment py-28 sm:py-36">
      <div className="container-x">
        <p className="eyebrow mb-5 text-leaf">04 — Simple by design</p>
        <h2 className="display-huge mb-16 text-4xl sm:text-6xl">
          Up and running
          <br />
          in <em className="font-light text-leaf">minutes.</em>
        </h2>

        <div>
          {STEPS.map((s) => (
            <div key={s.num} data-step className="group relative py-10 sm:py-12">
              <span data-step-line className="absolute left-0 top-0 block h-px w-full bg-ink/20" />
              <div className="grid grid-cols-1 items-baseline gap-3 sm:grid-cols-[8rem_1fr_1fr] sm:gap-8">
                <span
                  data-step-content
                  className="font-display text-5xl font-light text-leaf/40 transition-colors duration-500 group-hover:text-leaf sm:text-6xl"
                >
                  {s.num}
                </span>
                <h3 data-step-content className="font-display text-2xl font-semibold sm:text-3xl">
                  {s.title}
                </h3>
                <p data-step-content className="max-w-md text-sm leading-relaxed text-haze sm:justify-self-end sm:text-right">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
          <span className="block h-px w-full bg-ink/20" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
