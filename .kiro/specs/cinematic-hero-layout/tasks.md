# Implementation Plan: Cinematic Hero Layout

## Overview

Rewrite `components/sections/Hero.tsx` in place to implement the full four-stage scroll-driven cinematic experience. All changes are confined to a single file, with tests co-located in `components/sections/__tests__/`. One new dev dependency (`fast-check`) is added before any code is written.

---

## Tasks

- [ ] 1. Install fast-check and configure the test environment
  - Run `npm install --save-dev fast-check` to add the PBT library
  - Verify `jest` (or the existing test runner) can resolve `fast-check` imports
  - Create `components/sections/__tests__/` directory
  - _Requirements: 7 (performance/testing infrastructure)_

- [ ] 2. Define module-scope constants and pure math utilities in Hero.tsx
  - [ ] 2.1 Define `VIDEO_SRCS` constant (4 paths, `/videos/teaser-{1-4}.mp4`)
    - Replace all inline path literals that currently exist in the scaffold
    - _Requirements: 9.1, 9.5_
  - [ ] 2.2 Define `FRAME_PATHS` constant (100 paths, zero-padded `frame_001.png`–`frame_100.png`)
    - Use `Array.from({ length: 100 }, ...)` with `String(i+1).padStart(3,'0')`
    - _Requirements: 4.1, 9.2, 9.5_
  - [ ] 2.3 Extract `computeFrameIndex(p: number): number` pure utility
    - Implements `clamp(Math.round(lerp(p, 0.32, 0.90, 1, 100)), 1, 100)`
    - Used both inside `usePourEngine` and by property tests
    - _Requirements: 4.2, 4.3, 4.4_
  - [ ] 2.4 Extract `computeScrollIndicatorOpacity(p: number): number` pure utility
    - Clamps output to `[0, 1]`, value is 1 at p=0, 0 at p=0.12
    - _Requirements: 1.7, 6.3_
  - [ ] 2.5 Extract `computeCurtainUp(p: number): number` and `computeCurtainDown(p: number): number` pure utilities (percentage values as numbers)
    - Up: 0% → -115% over [0, 0.28], clamped at boundaries
    - Down: 0% → +115% over [0, 0.28], clamped at boundaries
    - _Requirements: 2.4, 2.5, 2.12_
  - [ ] 2.6 Extract `computeRevealOpacity(p: number): number` and `computeRevealScale(p: number): number` pure utilities
    - Opacity: 0 at p≤0.18, 1 at p≥0.32, linear between
    - Scale: 0.85 at p≤0.18, 1 at p≥0.32, linear between
    - _Requirements: 3.3, 3.4_
  - [ ] 2.7 Extract `computeH1Opacity(p: number): number` pure utility
    - 1 at p≤0.35, 0 at p≥0.42, linear between
    - _Requirements: 5.2_
  - [ ] 2.8 Extract `computeFrameCanvasOpacity(p: number): number` pure utility
    - 1 at p≤0.90, 0 at p≥0.95, linear between
    - _Requirements: 4.10_

- [ ] 3. Implement `usePourEngine` custom hook
  - [ ] 3.1 Implement hook body: `useEffect` subscribing to `smoothProgress.on("change", cb)`
    - `cb` calls `computeFrameIndex(p)` and calls `setFrameIndex` only when value changes
    - Return the unsubscribe function from `useEffect` cleanup
    - _Requirements: 4.2, 4.9, 1.6_
  - [ ] 3.2 Verify hook returns `{ frameIndex }` integer in `[1, 100]` at all progress values
    - No JSX, no MotionValues created internally, no direct DOM mutations
    - _Requirements: 4.2, 4.3, 4.4_

- [ ] 4. Implement scroll binding and all `useTransform` derivations in Hero component body
  - [ ] 4.1 Replace `containerRef` type from `HTMLDivElement` to `HTMLElement`, attach to `<section>`
    - Add `imgRef: RefObject<HTMLImageElement>` for the persistent pour image
    - _Requirements: 1.1, 4.6_
  - [ ] 4.2 Fix scroll container: change `useScroll` target to `containerRef`, keep `offset: ["start start","end end"]`
    - Fix `useSpring` parameters: `damping: 35, stiffness: 120, mass: 0.5` (unchanged, verify)
    - _Requirements: 1.3, 1.4_
  - [ ] 4.3 Add `curtainUp` derivation: `useTransform(smoothProgress, [0, 0.28], ["0%", "-115%"])`
    - Replaces existing `moveUp` which uses wrong range `[0, 0.6]` and wrong magnitude `-125%`
    - _Requirements: 2.4_
  - [ ] 4.4 Add `curtainDown` derivation: `useTransform(smoothProgress, [0, 0.28], ["0%", "+115%"])`
    - Replaces existing `moveDown` which uses wrong range `[0, 0.6]` and wrong magnitude `+125%`
    - _Requirements: 2.5_
  - [ ] 4.5 Add `revealOpacity` derivation: `useTransform(smoothProgress, [0.18, 0.32], [0, 1])`
    - _Requirements: 3.3_
  - [ ] 4.6 Add `revealScale` derivation: `useTransform(smoothProgress, [0.18, 0.32], [0.85, 1])`
    - _Requirements: 3.4_
  - [ ] 4.7 Add `h1Opacity` derivation: `useTransform(smoothProgress, [0.35, 0.42], [1, 0])`
    - _Requirements: 5.2_
  - [ ] 4.8 Add `line1Color` derivation: `useTransform(smoothProgress, [0.494, 0.519], ["#262626", "#ffffff"])`
    - _Requirements: 5.5_
  - [ ] 4.9 Add `line2Color` derivation: `useTransform(smoothProgress, [0.641, 0.666], ["#262626", "#ffffff"])`
    - _Requirements: 5.6_
  - [ ] 4.10 Add `line3Color` derivation: `useTransform(smoothProgress, [0.758, 0.783], ["#262626", "#ffffff"])`
    - _Requirements: 5.7_
  - [ ] 4.11 Add `frameCanvasOpacity` derivation: `useTransform(smoothProgress, [0.90, 0.95], [1, 0])`
    - _Requirements: 4.10_
  - [ ] 4.12 Add `scrollIndicatorOpacity` derivation: `useTransform(smoothProgress, [0, 0.12], [1, 0])`
    - Replaces inline `useTransform` call that was embedded in JSX
    - _Requirements: 1.7, 6.3_
  - [ ] 4.13 Call `usePourEngine(smoothProgress)` to obtain `frameIndex`
    - _Requirements: 4.2_

- [ ] 5. Build the ScrollContainer and StickyViewport structure
  - [ ] 5.1 Render `<section aria-label="Cinematic Hero" ref={containerRef}>` as the ScrollContainer with `h-[400vh]` (fix from wrong `300vh`)
    - Remove existing `<div ref={containerRef}>` root — replace with semantic `<section>`
    - _Requirements: 1.1, 1.2, 8.6_
  - [ ] 5.2 Render StickyViewport as direct child: `<div className="sticky top-0 h-screen overflow-hidden">`
    - _Requirements: 1.2_

- [ ] 6. Implement RevealLayer and ManifestoColumn (Stage 2 and Stage 4 structure)
  - [ ] 6.1 Render `<motion.div>` RevealLayer with `style={{ opacity: revealOpacity, scale: revealScale }}`, `bg-[#0E0F11]`, `absolute inset-0 z-0 transform-gpu will-change-transform`
    - No gradient, glow, or neon on background; remove existing overlay MotionValue with `.get()` anti-pattern
    - _Requirements: 3.1, 3.2, 3.5, 3.6_
  - [ ] 6.2 Inside RevealLayer, add a flex container `<div className="flex h-full">` to host ManifestoColumn and FrameCanvas side by side
    - _Requirements: 5.1, 4.5_
  - [ ] 6.3 Implement ManifestoColumn: `<div className="relative z-10 w-3/5 flex flex-col justify-center px-16">`
    - _Requirements: 5.1_
  - [ ] 6.4 Add `<motion.h1 style={{ opacity: h1Opacity }}` inside ManifestoColumn with exact text `"LUXURY MOLECULAR BAR"`, `font-extralight uppercase tracking-[0.25em]`
    - _Requirements: 5.2, 5.9, 8.1_
  - [ ] 6.5 Add `<h2>` inside ManifestoColumn with visible text including both "Delhi" and "Agra"
    - _Requirements: 5.3, 8.2_
  - [ ] 6.6 Add three `<motion.p>` ManifestoLines with correct text strings and `style={{ color: lineNColor }}`
    - Line 1: "Where Science Meets Luxury"
    - Line 2: LMB challenges standard mixology text
    - Line 3: Liquid nitrogen infusion experiences text
    - _Requirements: 5.4, 5.5, 5.6, 5.7, 5.8, 5.10_
  - [ ] 6.7 Implement FrameCanvas: `<motion.div style={{ opacity: frameCanvasOpacity }}` with `relative z-10 w-2/5 flex items-center justify-center transform-gpu will-change-transform`
    - No `background-color` on FrameCanvas or its ancestors (preserves PNG alpha channel)
    - _Requirements: 4.5, 4.7_
  - [ ] 6.8 Render single persistent `<img ref={imgRef} src={FRAME_PATHS[0]} loading="eager" alt="Cocktail pour sequence, frame 1 of 100" onError={...}>` inside FrameCanvas
    - `onError` sets `visibility: hidden` on the image element
    - No CSS `transition` on src-related styles; no conditional rendering per frame
    - _Requirements: 4.6, 4.7, 4.8, 7.6, 7.7, 9.4_

- [ ] 7. Implement SplitGate (Stage 1 — renders on top at z-30)
  - [ ] 7.1 Build static `panels` array from `VIDEO_SRCS` with `PanelConfig` type (`id`, `videoSrc`, `direction: 'up'|'down'`, `mobileHidden`)
    - Panels 1 & 3 → direction `'up'`, mobileHidden `false`; panels 2 & 4 → direction `'down'`, mobileHidden `true`
    - _Requirements: 2.1, 9.1_
  - [ ] 7.2 Render SplitGate `<div>` at `absolute inset-0 z-30 grid grid-cols-2 md:grid-cols-4 pointer-events-none select-none`
    - _Requirements: 2.1, 2.2, 2.11_
  - [ ] 7.3 Map over `panels` to render each `<motion.div>` CurtainPanel with `style={{ y: panel.direction === 'up' ? curtainUp : curtainDown }}` and classes `relative w-full h-full overflow-hidden transform-gpu will-change-transform bg-[#0E0F11]`
    - `hidden md:block` for `mobileHidden` panels
    - _Requirements: 2.3, 2.4, 2.5, 2.8, 2.10_
  - [ ] 7.4 Inside each CurtainPanel, render `<video autoPlay loop muted playsInline>` with `<source src={panel.videoSrc} type="video/mp4">`
    - Remove `filter grayscale contrast-125 brightness-90` classes entirely (anti-pattern)
    - Video fills panel via `w-full h-full object-cover`
    - _Requirements: 2.6, 2.7, 7.3_
  - [ ] 7.5 Add vignette overlay `<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(14,15,17,0.5)]">` inside each CurtainPanel
    - _Requirements: 2.9_

- [ ] 8. Implement scroll indicator (Stage: top layer at z-40)
  - [ ] 8.1 Render `<motion.div style={{ opacity: scrollIndicatorOpacity }}` at `absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-400 pointer-events-none`
    - _Requirements: 6.1, 6.2, 6.3, 6.5_
  - [ ] 8.2 Add `<span>Scroll to Open Gate</span>` and looping animated line `<div className="w-px h-6 bg-neutral-400 animate-bounce">`
    - _Requirements: 6.2, 6.4_

- [ ] 9. Checkpoint — verify render and remove all anti-patterns
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Performance audit — remove anti-patterns and add GPU acceleration everywhere
  - [ ] 10.1 Remove `.get()` call on `overlayDarkness` MotionValue in JSX (current `style={{ backgroundColor: \`rgba(10,10,12,${overlayDarkness.get()})\` }}`)
    - Replace or remove the entire "LAYER 2" overlay `<motion.div>` (design does not include it); bind animated styles to MotionValues directly
    - _Requirements: 7.4_
  - [ ] 10.2 Remove all CSS `filter` utility classes from video elements (`grayscale`, `contrast-125`, `brightness-90`) and any `transition-all` on scroll-driven elements
    - _Requirements: 7.3_
  - [ ] 10.3 Confirm `transform-gpu` and `will-change-transform` are applied to every `<motion.div>` that translates or scales on scroll (CurtainPanels, RevealLayer, FrameCanvas)
    - _Requirements: 7.1, 7.2_
  - [ ] 10.4 Confirm the `<section>` scroll container height is `400vh` (not the old `300vh`)
    - _Requirements: 1.1_
  - [ ] 10.5 Confirm all `useTransform` and `useSpring` calls are at top level of component body (not inside loops, conditionals, or nested renders)
    - _Requirements: 7.5_

- [ ] 11. Property-based tests (fast-check) — pure math utilities
  - [ ]* 11.1 Write property test for P1: scrollIndicatorOpacity
    - `// Feature: cinematic-hero-layout, Property 1: scrollIndicatorOpacity always in [0,1] and monotonically non-increasing over [0, 0.12]`
    - Use `fc.float({ min: 0, max: 1 })` arbitrary; assert output ∈ [0,1] and monotonic over active range
    - **Property 1: Scroll Indicator Opacity is always in [0, 1] and monotonically non-increasing over [0, 0.12]**
    - **Validates: Requirements 1.7, 6.3**
    - _File: `components/sections/__tests__/Hero.test.ts`_
  - [ ]* 11.2 Write property test for P2: curtain translation symmetry and monotonicity
    - `// Feature: cinematic-hero-layout, Property 2: curtainUp(p) = -curtainDown(p), both monotonic, fully off-screen at p≥0.28`
    - Use `fc.float({ min: 0, max: 0.28 })` arbitrary; assert symmetry `curtainUp(p) === -curtainDown(p)` and magnitude ≥ 115% at boundary
    - **Property 2: Curtain translation symmetry and monotonicity**
    - **Validates: Requirements 2.4, 2.5, 2.12**
  - [ ]* 11.3 Write property test for P3: RevealLayer opacity and scale correctness
    - `// Feature: cinematic-hero-layout, Property 3: revealOpacity ∈ [0,1] and revealScale ∈ [0.85,1] with correct boundary clamping`
    - Use `fc.float({ min: 0, max: 1 })` arbitrary; assert both ranges and clamped boundary values
    - **Property 3: RevealLayer reveal state — opacity and scale are correct at all progress values**
    - **Validates: Requirements 3.3, 3.4**
  - [ ]* 11.4 Write property test for P4: FrameIndex invariant
    - `// Feature: cinematic-hero-layout, Property 4: FrameIndex is always an integer in [1,100], monotonically non-decreasing, clamped at boundaries`
    - Use `fc.float({ min: 0, max: 1 })` arbitrary; assert `Number.isInteger`, in [1,100], clamped at 0.32 and 0.90
    - **Property 4: FrameIndex invariant — always in [1, 100] and monotonically non-decreasing**
    - **Validates: Requirements 4.2, 4.3, 4.4**
  - [ ]* 11.5 Write property test for P5: FRAME_PATHS format
    - `// Feature: cinematic-hero-layout, Property 5: every FRAME_PATHS[i-1] matches /images/sequence/frame_NNN.png with zero-padded 3-digit N`
    - Use `fc.integer({ min: 1, max: 100 })` arbitrary; assert exact path string and array length === 100
    - **Property 5: FRAME_PATHS format — every path follows the zero-padded pattern**
    - **Validates: Requirements 4.1, 9.2**
  - [ ]* 11.6 Write property test for P6: FrameCanvas opacity boundary values
    - `// Feature: cinematic-hero-layout, Property 6: frameCanvasOpacity ∈ [0,1], equals 1 at p≤0.90, 0 at p≥0.95`
    - Use `fc.float({ min: 0, max: 1 })` arbitrary; assert range and boundary clamping
    - **Property 6: FrameCanvas opacity is always in [0, 1] with correct boundary values**
    - **Validates: Requirements 4.10**
  - [ ]* 11.7 Write property test for P7: h1 opacity fade
    - `// Feature: cinematic-hero-layout, Property 7: h1Opacity ∈ [0,1], equals 1 at p≤0.35, 0 at p≥0.42`
    - Use `fc.float({ min: 0, max: 1 })` arbitrary; assert range and boundary clamping
    - **Property 7: h1 opacity fades correctly over [0.35, 0.42]**
    - **Validates: Requirements 5.2**
  - [ ]* 11.8 Write property test for P8: ManifestoLine color interpolation for all three lines
    - `// Feature: cinematic-hero-layout, Property 8: each lineNColor produces a valid interpolated value between #262626 and #ffffff, clamped at boundaries`
    - Use `fc.float({ min: 0, max: 1 })` arbitrary; assert each line's color is clamped `#262626` below its lower threshold and `#ffffff` above its upper threshold
    - **Property 8: ManifestoLine color interpolation — each line's color is always a valid interpolated value**
    - **Validates: Requirements 5.5, 5.6, 5.7**
  - [ ]* 11.9 Write property test for P9: VIDEO_SRCS path format
    - `// Feature: cinematic-hero-layout, Property 9: VIDEO_SRCS[i-1] === '/videos/teaser-{i}.mp4', array length === 4`
    - Use `fc.integer({ min: 1, max: 4 })` arbitrary; assert exact path string and array length
    - **Property 9: VIDEO_SRCS path format**
    - **Validates: Requirements 9.1**

- [ ] 12. Unit and example tests (Jest + React Testing Library)
  - [ ]* 12.1 Test DOM structure: `<section>` with `aria-label="Cinematic Hero"`, height class `h-[400vh]`, sticky viewport child, five layers at correct z-indices
    - _Requirements: 1.1, 1.2, 1.5, 8.6_
  - [ ]* 12.2 Test SplitGate: four CurtainPanel children, `pointer-events-none select-none`, correct grid class, two hidden panels on mobile
    - _Requirements: 2.1, 2.2, 2.10, 2.11_
  - [ ]* 12.3 Test video attributes: each CurtainPanel `<video>` has `autoPlay`, `loop`, `muted`, `playsInline`; `<source>` src matches `VIDEO_SRCS` in correct order
    - _Requirements: 2.6_
  - [ ]* 12.4 Test FrameCanvas `<img>`: single element in DOM, `loading="eager"`, correct initial `src` (`FRAME_PATHS[0]`), `onError` sets `visibility: hidden`
    - _Requirements: 4.6, 4.8, 7.6, 7.7, 9.4_
  - [ ]* 12.5 Test SEO and accessibility: exactly one `<h1>` with text "LUXURY MOLECULAR BAR"; `<h2>` contains "Delhi" and "Agra"; exactly three `<p>` manifesto elements; no `aria-hidden` on brand text
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [ ]* 12.6 Test ManifestoColumn typography: `<h1>` has `font-extralight`, `uppercase`, `tracking-[0.25em]` classes
    - _Requirements: 5.9_
  - [ ]* 12.7 Test scroll indicator: text "Scroll to Open Gate", `font-mono text-[9px] tracking-[0.4em]` classes, `pointer-events-none`, looping animated-line child element present
    - _Requirements: 6.1, 6.2, 6.4, 6.5_
  - [ ]* 12.8 Test error resilience: broken video `src` does not trigger React error boundary; broken img `src` results in `visibility: hidden` on image element
    - _Requirements: 9.3, 9.4_

- [ ] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Tasks 2–4 are pure additions/changes to the component module scope and hook — no JSX touched yet
- Tasks 5–8 build the DOM tree in dependency order matching z-index stacking
- Task 10 explicitly removes the three anti-patterns in the existing scaffold (`.get()`, filter classes, `300vh` height)
- Task 11 (PBT) tests the pure utility functions extracted in Task 2 — no React mounting needed
- Task 12 (RTL) validates DOM structure, attributes, and SEO requirements
- Property tests must be run with `--testPathPattern=Hero` or similar; never in watch mode during CI
- The `computeFrameIndex`, `computeScrollIndicatorOpacity`, etc. utilities are exported for testability but are thin wrappers over the same math as `useTransform`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8"] },
    { "id": 2, "tasks": ["3.1", "3.2"] },
    { "id": 3, "tasks": ["4.1", "4.2"] },
    { "id": 4, "tasks": ["4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "4.12", "4.13"] },
    { "id": 5, "tasks": ["5.1", "5.2"] },
    { "id": 6, "tasks": ["6.1", "6.2"] },
    { "id": 7, "tasks": ["6.3", "6.7"] },
    { "id": 8, "tasks": ["6.4", "6.5", "6.6", "6.8", "7.1"] },
    { "id": 9, "tasks": ["7.2"] },
    { "id": 10, "tasks": ["7.3"] },
    { "id": 11, "tasks": ["7.4", "7.5", "8.1"] },
    { "id": 12, "tasks": ["8.2"] },
    { "id": 13, "tasks": ["10.1", "10.2", "10.3", "10.4", "10.5"] },
    { "id": 14, "tasks": ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "11.7", "11.8", "11.9"] },
    { "id": 15, "tasks": ["12.1", "12.2", "12.3", "12.4", "12.5", "12.6", "12.7", "12.8"] }
  ]
}
```
