import { useRef, type ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { gsap, useGSAP } from "@/lib/gsap";

/* Shared chrome for legal / utility pages: nav, editorial header, footer. */
const LegalShell = ({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  meta?: string;
  children: ReactNode;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-legal-reveal]",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
          // Clear transforms so they don't become containing blocks for fixed overlays
          clearProps: "transform",
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Nav />
      <main className="bg-cream">
        <header className="container-x border-b border-ink/10 pb-12 pt-36 sm:pt-44">
          <p data-legal-reveal className="eyebrow mb-6 text-leaf">
            {eyebrow}
          </p>
          <h1 data-legal-reveal className="display-huge max-w-4xl text-5xl sm:text-7xl">
            {title}
          </h1>
          {meta && (
            <p data-legal-reveal className="mt-6 text-xs uppercase tracking-[0.2em] text-haze">
              {meta}
            </p>
          )}
        </header>
        <div data-legal-reveal className="container-x py-16 sm:py-20">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* Numbered legal section with consistent typography. */
export const LegalSection = ({
  num,
  heading,
  children,
  id,
}: {
  num: string;
  heading: string;
  children: ReactNode;
  id?: string;
}) => (
  <section id={id} className="grid grid-cols-1 gap-4 border-b border-ink/10 py-10 sm:grid-cols-[7rem_1fr] sm:gap-10">
    <span className="font-display text-3xl font-light text-leaf/50">{num}</span>
    <div>
      <h2 className="mb-4 font-display text-2xl font-semibold">{heading}</h2>
      <div className="space-y-4 text-[0.95rem] leading-relaxed text-haze [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </div>
  </section>
);

export default LegalShell;
