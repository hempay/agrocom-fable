# Agrocom — Fable Edition

An editorial, motion-driven landing experience for Agrocom: the living marketplace
for agriculture. Built with artistic freedom as a full redesign of the original
agrocom-landing site.

## Design language

- **Type**: Fraunces (display serif) × Space Grotesk (UI) — big editorial headlines,
  italic accents, outlined mega-words.
- **Palette**: cream paper, ink green-black, pine/forest darks, leaf green, lime accent.
- **Motion**: GSAP + ScrollTrigger with Lenis smooth scrolling — preloader curtain,
  masked line reveals, scroll-scrubbed manifesto, pinned horizontal feature gallery,
  drawn SVG horizon, typing AI chat, magnetic buttons, custom cursor.
- Honors `prefers-reduced-motion`; custom cursor and magnetic effects are
  pointer-fine (desktop) only.

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · GSAP (`@gsap/react`) · Lenis · React Router

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing |
| `/privacy-policy` | Privacy Policy (incl. Child Safety Standards) |
| `/terms-and-conditions` | Terms & Conditions |
| `/account-deletion` | Account deletion info + request form |
| `/contact` | Contact form |
| `*` | 404 |

Forms post to the Vercel serverless functions in `api/` (Resend-powered),
carried over from the original project.

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview the build
```
