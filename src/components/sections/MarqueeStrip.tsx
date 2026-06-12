const ITEMS = [
  "Trusted by 10,000+ farmers",
  "500+ products listed",
  "AI-powered insights",
  "Live streaming",
  "Secure payments",
  "24/7 support",
];

const MarqueeStrip = () => (
  <section className="overflow-hidden border-y border-ink/10 bg-ink py-4" aria-hidden="true">
    <div className="flex w-max animate-marquee items-center whitespace-nowrap">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span key={i} className="flex items-center font-sans text-sm font-medium uppercase tracking-[0.2em] text-cream/80">
          <span className="mx-8 text-lime">✳</span>
          {item}
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeStrip;
