# SENTIO AI — Landing Page

A production-quality, cinematic landing page for SENTIO AI, built with React, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The optimized output is generated in `dist/` — deploy that folder to Vercel, Netlify, or any static host.

## Structure

```
src/
  components/       # Navbar, Hero, AIChatPreview, Capabilities, Pricing, FAQ, etc.
  App.jsx           # Assembles all sections
  index.css         # Design tokens, grid texture, glass panels, custom cursor
tailwind.config.js  # Color palette, fonts, animation keyframes
```

## Notes

- Custom cursor is automatically disabled on touch devices and when the OS "reduce motion" setting is on.
- All copy is placeholder/fictional (testimonials, company names) as specified in the brief.
- Fonts: Instrument Serif (display) + Inter (UI), loaded from Google Fonts in `index.html`.
