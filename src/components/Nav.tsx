import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import Magnetic from "@/components/Magnetic";
import logo from "@/assets/agrocom-logo.png";

const LINKS = [
  { label: "Features", to: "/#features" },
  { label: "BrainBag", to: "/#brainbag" },
  { label: "Stories", to: "/#stories" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Contact", to: "/contact" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current!;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" }
      );
      gsap.fromTo(
        overlay.querySelectorAll("[data-menu-item]"),
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.25, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut" });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(12,18,11,0.08)]" : "bg-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Agrocom home">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <span
              className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
                open ? "text-cream" : "text-ink"
              }`}
            >
              Agrocom
            </span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="group relative font-sans text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-leaf transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Link to="/#download" className="btn-ink hidden px-6 py-3 sm:inline-flex">
                Get the App
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-1 rotate-45 bg-cream" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-1 -rotate-45 bg-cream" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 pt-28 lg:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {LINKS.map((l, i) => (
            <li key={l.label} className="overflow-hidden pb-2">
              <div data-menu-item>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl font-light italic text-cream transition-colors hover:text-lime"
                  tabIndex={open ? 0 : -1}
                >
                  <span className="mr-4 align-super font-sans text-xs not-italic text-lime/70">
                    0{i + 1}
                  </span>
                  {l.label}
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 overflow-hidden">
          <div data-menu-item className="flex items-center justify-between border-t border-cream/15 pt-6">
            <p className="eyebrow text-cream/40">The future of farming</p>
            <Link
              to="/#download"
              onClick={() => setOpen(false)}
              className="btn-lime px-6 py-3"
              tabIndex={open ? 0 : -1}
            >
              Get the App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
