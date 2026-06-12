import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Period = "monthly" | "quarterly" | "halfyear";

const PERIODS: Record<Period, { label: string; premium: string; business: string; saving?: string }> = {
  monthly: { label: "Monthly", premium: "₦1,200", business: "₦2,500" },
  quarterly: { label: "Quarterly", premium: "₦2,850", business: "₦7,200", saving: "Save 5%" },
  halfyear: { label: "Half Year", premium: "₦5,500", business: "₦14,500", saving: "Save 8%" },
};

const PLANS = [
  {
    name: "Basic",
    desc: "Perfect for getting started",
    cta: "Get started free",
    features: [
      { label: "List up to 10 products", included: true },
      { label: "4 BrainBag messages/day", included: true },
      { label: "Community access", included: true },
      { label: "Basic analytics", included: true },
      { label: "Live streaming", included: false },
      { label: "Wallet & payments", included: false },
    ],
    popular: false,
  },
  {
    name: "Premium",
    desc: "For serious farmers & sellers",
    cta: "Start Premium",
    features: [
      { label: "Unlimited product listings", included: true },
      { label: "Unlimited BrainBag AI", included: true },
      { label: "Live streaming", included: true },
      { label: "Wallet & payments", included: true },
      { label: "Priority support", included: true },
      { label: "Advanced analytics", included: true },
    ],
    popular: true,
  },
  {
    name: "Business",
    desc: "For agribusinesses & enterprises",
    cta: "Go Business",
    features: [
      { label: "Everything in Premium", included: true },
      { label: "Team accounts", included: true },
      { label: "Bulk listing tools", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "Custom integrations", included: true },
      { label: "SLA support", included: true },
    ],
    popular: false,
  },
];

const Pricing = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [period, setPeriod] = useState<Period>("monthly");

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-price-card]",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
        }
      );
    },
    { scope: rootRef }
  );

  const priceFor = (name: string) => {
    if (name === "Basic") return "Free";
    return name === "Premium" ? PERIODS[period].premium : PERIODS[period].business;
  };

  return (
    <section id="pricing" ref={rootRef} className="bg-cream py-28 sm:py-36">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-5 text-leaf">06 — Pricing</p>
          <h2 className="display-huge text-4xl sm:text-6xl">
            Start free. <em className="font-light text-leaf">Grow</em> with us.
          </h2>
        </div>

        <div className="mb-14 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-parchment p-1.5">
            {(Object.keys(PERIODS) as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                  period === p ? "bg-ink text-cream" : "text-ink/55 hover:text-ink"
                }`}
              >
                {PERIODS[p].label}
                {PERIODS[p].saving && (
                  <span className="absolute -right-2 -top-2.5 rounded-full bg-lime px-1.5 py-0.5 text-[9px] font-bold normal-case tracking-normal text-ink">
                    {PERIODS[p].saving}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              data-price-card
              className={`relative flex flex-col rounded-[2rem] p-8 ${
                plan.popular
                  ? "bg-ink text-cream shadow-[0_40px_80px_-30px_rgba(12,18,11,0.5)] md:-translate-y-3"
                  : "border border-ink/12 bg-cream"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-lime px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.popular ? "text-cream/55" : "text-haze"}`}>{plan.desc}</p>

              <p className="mt-7 flex items-end gap-2">
                <span className="font-display text-5xl font-semibold">{priceFor(plan.name)}</span>
                {plan.name !== "Basic" && (
                  <span className={`pb-1.5 text-xs uppercase tracking-[0.12em] ${plan.popular ? "text-cream/50" : "text-haze"}`}>
                    / {PERIODS[period].label.toLowerCase()}
                  </span>
                )}
              </p>

              <ul className="mb-9 mt-8 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li
                    key={f.label}
                    className={`flex items-center gap-3 text-sm ${
                      f.included ? "" : plan.popular ? "text-cream/35 line-through" : "text-ink/35 line-through"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                        f.included
                          ? plan.popular
                            ? "bg-lime text-ink"
                            : "bg-leaf text-cream"
                          : "bg-ink/10 text-ink/40"
                      }`}
                    >
                      {f.included ? "✓" : "✕"}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <a
                href="#download"
                className={`${plan.popular ? "btn-lime" : "btn-outline"} w-full px-6 py-4 text-center`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-haze">
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default Pricing;
