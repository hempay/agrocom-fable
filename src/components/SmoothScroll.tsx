import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
