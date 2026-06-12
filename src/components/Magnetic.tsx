import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Pulls its child gently toward the cursor — desktop only. */
const Magnetic = ({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {children}
    </div>
  );
};

export default Magnetic;
