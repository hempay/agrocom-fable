import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";

const FinalCta = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-cta-reveal]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="overflow-hidden bg-ink pb-28 pt-20 text-cream">
      {/* Oversized marquee headline */}
      <div className="mb-16 flex w-max animate-marquee-fast items-center whitespace-nowrap" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center font-display text-6xl font-light sm:text-8xl">
            <em className="mx-6 text-lime">join the harvest</em>
            <span className="text-outline-cream font-semibold">START FREE</span>
          </span>
        ))}
      </div>

      <div className="container-x text-center">
        <h2 data-cta-reveal className="display-huge mx-auto mb-6 max-w-4xl text-4xl sm:text-6xl">
          Thousands of farmers are building the future of agriculture.
        </h2>
        <p data-cta-reveal className="mb-12 text-cream/55">
          Free to start. No credit card required.
        </p>
        <div data-cta-reveal>
          <Magnetic>
            <Link to="/#download" className="btn-lime px-12 py-5 text-base">
              Create your free account
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
