import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.body.classList.add("custom-cursor-active");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor-grow], input, select, textarea, label"
      );
      gsap.to(ring, {
        scale: target ? 2.2 : 1,
        opacity: target ? 0.55 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block" aria-hidden="true">
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-leaf" />
      <div ref={ringRef} className="fixed left-0 top-0 h-9 w-9 rounded-full border border-leaf/70 mix-blend-difference" />
    </div>
  );
};

export default Cursor;
