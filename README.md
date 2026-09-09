# LMB Molecular

A cinematic one-page website for LMB Molecular, built with Next.js, React, TypeScript, Framer Motion, GSAP, and Lenis.

## Requirements

- Node.js 20 or later
- npm 10 or later

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is occupied, Next.js selects the next available port and prints it in the terminal.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint. |
| `npx tsc --noEmit` | Run a TypeScript type check. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |

## Project structure

```text
app/                 Next.js routes, layout, and global styles
components/lmb/      The LMB experience and content data
lib/                 Shared integration setup
public/videos/       Hero film assets
```

## Motion ownership

- **Framer Motion** owns hero entrance, scene changes, and reel controls.
- **GSAP** owns scroll-driven effects and section reveals.
- **Lenis** provides smooth scrolling when reduced motion is not enabled.

Keeping these responsibilities separate prevents animation libraries from competing for the same DOM styles.

## Media

The hero reel uses `Vid1.mp4` through `Vid4.mp4` from `public/videos`. The active scene loads video metadata first; the rest of the reel is fetched only when selected, helping keep the first visit responsive.
