import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/lib/gsap";
import logo from "@/assets/agrocom-logo.png";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "BrainBag", href: "/#brainbag" },
      { label: "Marketplace", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#manifesto" },
      { label: "Stories", href: "/#stories" },
      { label: "Get the App", href: "/#download" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
      { label: "Delete Account", href: "/account-deletion" },
    ],
  },
];

const Footer = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-footer-word]",
        { yPercent: 45, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-footer-word]", start: "top 95%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <footer ref={rootRef} className="bg-ink text-cream">
      <div className="container-x pb-10 pt-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="" className="h-8 w-8 object-contain" />
              <span className="font-display text-xl font-semibold">Agrocom</span>
            </div>
            <p className="max-w-xs font-display text-lg font-light italic text-cream/60">
              Empowering agriculture through technology.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-5 text-lime/80">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 overflow-hidden" aria-hidden="true">
          <p
            data-footer-word
            className="select-none whitespace-nowrap text-center font-display text-[15.5vw] font-semibold leading-[0.8] tracking-[-0.03em] text-outline-cream md:text-[15vw]"
          >
            AGROCOM
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 sm:flex-row">
          <p className="text-xs text-cream/40">
            © 2026 Agrocom by{" "}
            <a
              href="https://vivorafarms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime/80 hover:underline"
            >
              Vivora Farms Limited
            </a>
            . All rights reserved.
          </p>
          <p className="eyebrow text-cream/30">Sown digitally · Grown globally</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
