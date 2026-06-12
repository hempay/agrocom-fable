import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const StoreButton = ({
  store,
  line1,
  line2,
  icon,
}: {
  store: string;
  line1: string;
  line2: string;
  icon: JSX.Element;
}) => (
  <div className="relative">
    <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-lime px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-ink">
      Coming soon
    </span>
    <button
      disabled
      aria-label={`${store} — coming soon`}
      className="flex w-full cursor-not-allowed items-center gap-3 rounded-2xl bg-cream px-6 py-3.5 text-ink opacity-75 sm:w-auto"
    >
      {icon}
      <span className="text-left">
        <span className="block text-[10px] leading-none opacity-60">{line1}</span>
        <span className="block text-base font-bold leading-tight">{line2}</span>
      </span>
    </button>
  </div>
);

const AppDownload = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-dl-reveal]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );

      // Gentle parallax drift on the phone shot.
      gsap.to("[data-dl-phone]", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="download" ref={rootRef} className="bg-cream px-5 pb-28 pt-4 sm:px-8 sm:pb-36 lg:px-14">
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-14 overflow-hidden rounded-[2.5rem] bg-pine px-8 py-16 text-cream lg:grid-cols-2 lg:px-16 lg:py-20">
        <div>
          <p data-dl-reveal className="eyebrow mb-5 text-lime">
            07 — Mobile app
          </p>
          <h2 data-dl-reveal className="display-huge mb-6 text-4xl sm:text-6xl">
            Farm smarter,
            <br />
            from your <em className="font-light text-lime">pocket.</em>
          </h2>
          <p data-dl-reveal className="mb-10 max-w-md leading-relaxed text-cream/60">
            The full Agrocom experience — marketplace, BrainBag AI, live streaming and
            payments — folded into one app.
          </p>
          <div data-dl-reveal className="flex flex-col gap-5 sm:flex-row">
            <StoreButton
              store="App Store"
              line1="Download on the"
              line2="App Store"
              icon={
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              }
            />
            <StoreButton
              store="Google Play"
              line1="Get it on"
              line2="Google Play"
              icon={
                <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.18 23.76c.3.17.64.22.99.14l12.86-7.42-2.82-2.82-11.03 10.1zM.5 1.48C.19 1.8 0 2.29 0 2.93v18.14c0 .64.19 1.13.5 1.45l.08.07 10.16-10.16v-.24L.58 1.4l-.08.08zM20.67 10.52l-2.89-1.67-3.17 3.17 3.17 3.17 2.91-1.68c.83-.48.83-1.26-.02-1.99zM4.17.24L17.03 7.66l-2.82 2.82L3.18.38C3.52.3 3.87.07 4.17.24z" />
                </svg>
              }
            />
          </div>
        </div>

        <div data-dl-reveal className="flex justify-center lg:justify-end">
          <img
            data-dl-phone
            src="/agrocom-mobile.jpg"
            alt="The Agrocom mobile app"
            loading="lazy"
            className="w-64 rotate-2 rounded-[2rem] object-cover shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] sm:w-72 lg:w-80"
          />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
