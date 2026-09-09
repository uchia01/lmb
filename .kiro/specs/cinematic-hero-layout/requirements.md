# Requirements Document

## Introduction

The Cinematic Hero Layout is a full-screen, scroll-driven cinematic experience for the LMB (Luxury Molecular Bar) brand website. It replaces the existing basic split-gate scaffold in `components/sections/Hero.tsx` with a complete four-stage animated sequence spanning a 400vh scroll container. The experience is designed for a luxury editorial aesthetic in matte obsidian-charcoal, with zero neon filters, targeting local SEO for Delhi and Agra audiences. The four stages are: (1) Entry Split Gate with looping teaser videos, (2) Main Site Reveal as the curtain panels separate, (3) a 100-frame kinetic cocktail pour engine rendered on the right column, and (4) line-by-line typography synchronisation on the left column. All animations use hardware-accelerated transforms and physics-based Framer Motion springs for M3 Mac performance.

---

## Glossary

- **Hero**: The `components/sections/Hero.tsx` React component that implements the full cinematic scroll experience.
- **ScrollContainer**: The outermost `<section>` element with `height: 400vh` that provides the scroll timeline space.
- **StickyViewport**: The inner `<div>` with `position: sticky; top: 0; height: 100vh; overflow: hidden` that pins all visual layers to the viewport while the parent scrolls.
- **SplitGate**: The four-column horizontal curtain layer (z-index 30) composed of alternating up/down translating panels, each containing a looping teaser video.
- **CurtainPanel**: One of the four equal-width columns inside the SplitGate. Panels 1 and 3 translate upward; panels 2 and 4 translate downward.
- **RevealLayer**: The editorial main-site content layer (z-index 0) that fades and scales into view as the SplitGate panels separate.
- **PourEngine**: The scroll-driven frame sequencer that reads 100 alpha-transparent PNG frames from `/public/images/sequence/` and displays the correct frame based on scroll progress.
- **FrameCanvas**: The right-column container (40% viewport width) inside the StickyViewport that renders the active PourEngine frame.
- **ManifestoColumn**: The left-column container (60% viewport width) inside the StickyViewport that holds the SEO heading and three manifesto lines with scroll-threshold colour transitions.
- **ManifestoLine**: A single typographic block inside the ManifestoColumn that transitions from `text-neutral-800` to `text-white` at a defined frame threshold.
- **ScrollProgress**: The normalised scroll value (0.0–1.0) derived from `useScroll` bound to the ScrollContainer, smoothed through a `useSpring` with damping 35, stiffness 120, mass 0.5. A value of 0.0 corresponds to the ScrollContainer top aligned with the viewport top; 1.0 corresponds to the ScrollContainer bottom aligned with the viewport bottom.
- **FrameIndex**: The integer frame number (1–100) derived from `useTransform` mapping ScrollProgress [0.32, 0.90] to [1, 100], rounded to the nearest integer.
- **LMB**: Luxury Molecular Bar — the brand name. Physical locations in Delhi and Agra, India.
- **TeaserVideo**: One of four looping MP4 files placed in `/public/videos/`, each assigned to one CurtainPanel.

---

## Requirements

### Requirement 1: Scroll Container and Sticky Layout

**User Story:** As a visitor to the LMB website, I want a scroll-driven full-screen cinematic experience, so that the brand story unfolds as I naturally scroll down the page.

#### Acceptance Criteria

1. THE Hero SHALL render a `<section>` element as the ScrollContainer with a total height of 400vh.
2. THE Hero SHALL render a StickyViewport as a direct child of the ScrollContainer with `position: sticky`, `top: 0`, `height: 100vh`, and `overflow: hidden`.
3. THE Hero SHALL bind ScrollProgress to the ScrollContainer using Framer Motion `useScroll` with `offset: ["start start", "end end"]`.
4. THE Hero SHALL smooth ScrollProgress through a Framer Motion `useSpring` with `damping: 35`, `stiffness: 120`, and `mass: 0.5`.
5. THE Hero SHALL stack layers inside the StickyViewport in the following z-index order from bottom to top: RevealLayer (z-index 0), FrameCanvas (z-index 10), ManifestoColumn (z-index 10), SplitGate (z-index 30), scroll indicator (z-index 40).
6. WHEN the Hero component unmounts, THE `useScroll` listener SHALL be torn down such that no scroll events are processed after unmount.
7. THE scroll indicator SHALL have an initial opacity of 1 at ScrollProgress 0 and an opacity of 0 at ScrollProgress 0.12, with linear interpolation between those two values.

---

### Requirement 2: Stage 1 — Entry SplitGate

**User Story:** As a visitor, I want to see a dramatic split-gate curtain of looping video panels on first load, so that the cinematic luxury brand experience is immediately communicated before any scrolling occurs.

#### Acceptance Criteria

1. THE SplitGate SHALL render a CSS grid with exactly four equal-width CurtainPanels occupying the full viewport width and height.
2. THE SplitGate SHALL be positioned at z-index 30 above all other layers.
3. WHEN the page loads at ScrollProgress 0, THE SplitGate SHALL display all four CurtainPanels with a Y-axis translation of 0%, fully covering the viewport.
4. WHEN ScrollProgress reaches 0.28, CurtainPanels 1 and 3 SHALL have a Y-axis translation of -115%, placing them entirely above the viewport. Between ScrollProgress 0.00 and 0.28 the translation SHALL interpolate linearly from 0% to -115%.
5. WHEN ScrollProgress reaches 0.28, CurtainPanels 2 and 4 SHALL have a Y-axis translation of +115%, placing them entirely below the viewport. Between ScrollProgress 0.00 and 0.28 the translation SHALL interpolate linearly from 0% to +115%.
6. CurtainPanel 1 SHALL display `teaser-1.mp4`, CurtainPanel 2 SHALL display `teaser-2.mp4`, CurtainPanel 3 SHALL display `teaser-3.mp4`, and CurtainPanel 4 SHALL display `teaser-4.mp4`, each playing automatically, looping continuously, muted, and inline.
7. EACH TeaserVideo SHALL fill its CurtainPanel without distortion, cropping as needed to maintain its aspect ratio.
8. EACH CurtainPanel SHALL be promoted to its own GPU compositing layer so that its Y-axis translation is handled entirely by the compositor without triggering layout or paint.
9. EACH CurtainPanel SHALL render a vignette overlay that is fully transparent at its top edge and reaches `rgba(14, 15, 17, 0.5)` opacity at its bottom edge.
10. WHERE the viewport width is less than 768px, THE SplitGate SHALL display only two CurtainPanels (panels 1 and 3) and each SHALL occupy 50% of the viewport width.
11. THE SplitGate layer SHALL not intercept pointer or click events, and text within it SHALL not be selectable by the user.
12. AT ScrollProgress 0.28 and above, no pixel of any CurtainPanel SHALL be visible within the viewport bounds.

---

### Requirement 3: Stage 2 — Main Site Reveal

**User Story:** As a visitor, I want the main editorial site layout to fade and scale into view as the curtain panels separate, so that the brand identity emerges with cinematic weight.

#### Acceptance Criteria

1. THE RevealLayer SHALL be positioned so that it fills the StickyViewport exactly (inset: 0) and sits below all other layers (z-index 0).
2. THE RevealLayer SHALL use a solid background colour of `#0E0F11`. No gradient, glow, neon, or pattern SHALL be applied to the RevealLayer background.
3. AT ScrollProgress 0.18, THE RevealLayer opacity SHALL be 0. AT ScrollProgress 0.32, THE RevealLayer opacity SHALL be 1. Between those two values opacity SHALL interpolate linearly. Outside that range, opacity SHALL be clamped (0 below 0.18, 1 above 0.32).
4. AT ScrollProgress 0.18, THE RevealLayer CSS scale SHALL be 0.85. AT ScrollProgress 0.32, THE RevealLayer scale SHALL be 1. Between those two values scale SHALL interpolate linearly. Outside that range, scale SHALL be clamped (0.85 below 0.18, 1 above 0.32).
5. THE RevealLayer SHALL be promoted to its own GPU compositing layer so that opacity and scale changes are handled by the compositor without triggering layout or paint.
6. THE RevealLayer SHALL NOT apply any CSS property whose value changes on every scroll tick except `opacity` and `transform` (scale/translate).

---

### Requirement 4: Stage 3 — 100-Frame Kinetic Pour Engine

**User Story:** As a visitor, I want to see a high-fidelity animated cocktail glass pour sequence on the right side of the screen as I scroll, so that the brand's molecular mixology expertise is communicated visually.

#### Acceptance Criteria

1. THE PourEngine SHALL define exactly 100 image paths following the pattern `/images/sequence/frame_001.png` through `/images/sequence/frame_100.png`, using zero-padded three-digit frame numbers.
2. THE PourEngine SHALL compute FrameIndex by mapping ScrollProgress range `[0.32, 0.90]` to the float range `[1, 100]` and rounding to the nearest integer, clamped to [1, 100].
3. IF ScrollProgress is below 0.32, THE PourEngine SHALL display frame 1.
4. IF ScrollProgress is above 0.90, THE PourEngine SHALL display frame 100 and hold it static.
5. THE FrameCanvas SHALL be positioned in the rightmost 40% of the StickyViewport width.
6. THE FrameCanvas SHALL render the active frame as a single persistent `<img>` element whose `src` attribute is updated to the current frame path. The `alt` attribute SHALL read `"Cocktail pour sequence, frame [N] of 100"` where [N] is the current FrameIndex.
7. THE FrameCanvas and its ancestor elements SHALL NOT apply a `background-color` style that would occlude the PNG alpha channel, so that the cocktail glass composites directly over the `#0E0F11` RevealLayer background.
8. THE `<img>` element SHALL NOT have a CSS `transition` property on its `src`-related styles. The frame update SHALL be a discrete `src` swap with no cross-fade between consecutive frames.
9. THE PourEngine SHALL subscribe to the smoothed ScrollProgress MotionValue and update the displayed frame via React state, without direct DOM manipulation.
10. IF ScrollProgress is at 0.90, THE FrameCanvas opacity SHALL be 1. IF ScrollProgress is at 0.95, THE FrameCanvas opacity SHALL be 0. Between those values opacity SHALL interpolate linearly.

---

### Requirement 5: Stage 4 — Line-by-Line Typography Synchronisation

**User Story:** As a visitor, I want to read manifesto text on the left side of the screen that progressively illuminates as the cocktail pour advances, so that the brand's philosophy is revealed in synchrony with the visual pour narrative.

#### Acceptance Criteria

1. THE ManifestoColumn SHALL be positioned in the leftmost 60% of the StickyViewport width and rendered at z-index 10.
2. THE ManifestoColumn SHALL contain an `<h1>` element with the exact text "LUXURY MOLECULAR BAR". AT ScrollProgress 0.35 the `<h1>` opacity SHALL be 1; AT ScrollProgress 0.42 the opacity SHALL be 0; between those values opacity SHALL interpolate linearly.
3. THE ManifestoColumn SHALL contain an `<h2>` element that includes both the words "Delhi" and "Agra" in its visible text content, serving as a crawlable location identifier for local SEO.
4. THE ManifestoColumn SHALL contain exactly three ManifestoLines, each rendered as a `<p>` element.
5. ManifestoLine 1 SHALL contain the text "Where Science Meets Luxury". AT ScrollProgress 0.494 (FrameIndex 35 equivalent) the text colour SHALL begin transitioning from `#262626` (neutral-800) toward `#ffffff` (white), completing the transition by ScrollProgress 0.519. Outside this range the colour SHALL be clamped: `#262626` below 0.494, `#ffffff` above 0.519.
6. ManifestoLine 2 SHALL contain text describing LMB's challenge to standard mixology guidelines. AT ScrollProgress 0.641 (FrameIndex 60 equivalent) the text colour SHALL begin transitioning from `#262626` toward `#ffffff`, completing by ScrollProgress 0.666. Outside this range the colour SHALL be clamped accordingly.
7. ManifestoLine 3 SHALL contain text describing liquid nitrogen infusion experiences. AT ScrollProgress 0.758 (FrameIndex 80 equivalent) the text colour SHALL begin transitioning from `#262626` toward `#ffffff`, completing by ScrollProgress 0.783. Outside this range the colour SHALL be clamped accordingly.
8. EACH ManifestoLine colour value SHALL be driven by a `useTransform` derivation on ScrollProgress, interpolating the colour string between `#262626` and `#ffffff` over the defined range.
9. THE ManifestoColumn `<h1>` SHALL use font-weight extralight (font-weight 200 or lighter), uppercase text transform, and letter-spacing of at least 0.25em.
10. THE ManifestoColumn SHALL use semantic HTML elements (`<h1>`, `<h2>`, `<p>`) so that search engine crawlers can index the LMB brand keywords, locations (Delhi, Agra), and manifesto copy.

---

### Requirement 6: Scroll Indicator

**User Story:** As a first-time visitor, I want a subtle visual cue to scroll, so that I know the experience is scroll-driven and I am invited to begin.

#### Acceptance Criteria

1. THE Hero SHALL render a scroll indicator that is horizontally centered and pinned to the bottom of the StickyViewport, positioned above the SplitGate layer (z-index 40).
2. THE scroll indicator SHALL display the label "Scroll to Open Gate" in a monospace font at exactly 9px, uppercase, with a letter-spacing of 0.4em.
3. AT ScrollProgress 0, THE scroll indicator opacity SHALL be 1. AT ScrollProgress 0.12, THE scroll indicator opacity SHALL be 0. Between those values opacity SHALL interpolate linearly.
4. THE scroll indicator SHALL include a downward-animated vertical line element that loops continuously to reinforce the scroll direction affordance.
5. THE scroll indicator SHALL not intercept pointer or click events.

---

### Requirement 7: Performance and Hardware Acceleration

**User Story:** As a developer deploying the LMB site on an M3 MacBook Pro, I want all animations to run at 60fps without jank, so that the cinematic quality of the experience is maintained across preview and production environments.

#### Acceptance Criteria

1. EVERY animated element whose position or size changes on scroll SHALL be promoted to its own GPU compositing layer via the `transform-gpu` Tailwind utility class.
2. EVERY animated element that translates or scales on scroll SHALL declare `will-change: transform` so the browser pre-allocates a compositor layer before the first animation frame.
3. THE Hero SHALL NOT animate CSS `filter`, `backdrop-filter`, or `box-shadow` properties on any element that changes on every scroll tick.
4. THE Hero SHALL NOT call `.get()` on any MotionValue inside JSX or a render function to derive a style value. All reactive style bindings SHALL pass MotionValues or `useTransform` derivations directly to Framer Motion `style` props.
5. ALL `useTransform` and `useSpring` calls SHALL be placed at the top level of the Hero component function body, not inside loops, conditional branches, or nested component render calls.
6. THE PourEngine SHALL update the displayed frame by mutating the `src` attribute of a single persistent `<img>` element, rather than by conditionally rendering different `<img>` elements per frame.
7. THE Hero SHALL apply `loading="eager"` to the first frame `<img>` element so the browser prioritises loading it before the first paint.

---

### Requirement 8: Semantic HTML and Local SEO

**User Story:** As the LMB marketing team, I want the hero section to be crawlable by search engines with brand and location keywords, so that LMB ranks for "Luxury Molecular Bar Delhi" and "Luxury Molecular Bar Agra" searches.

#### Acceptance Criteria

1. THE Hero SHALL render exactly one `<h1>` element containing the text "LUXURY MOLECULAR BAR" as the primary page heading. This `<h1>` SHALL be the topmost heading in the Hero's DOM.
2. THE Hero SHALL render an `<h2>` element whose visible text includes both "Delhi" and "Agra" as geographic location identifiers.
3. THE Hero SHALL render each manifesto statement as a `<p>` element containing natural language text about LMB's molecular mixology concepts.
4. THE Hero SHALL render all visible text content inside semantic HTML elements (`<h1>`, `<h2>`, `<p>`, `<span>`). No visible text SHALL be placed as the sole content of a `<div>` element.
5. THE Hero SHALL NOT apply `aria-hidden="true"` to any element that contains indexable brand or location text.
6. THE Hero SHALL wrap all content in a `<section>` element with `aria-label="Cinematic Hero"` to identify the landmark region for assistive technologies.

---

### Requirement 9: Asset Conventions and File Structure

**User Story:** As a developer integrating video and image assets into the project, I want clearly defined asset naming conventions, so that the Hero component can reliably reference the correct files without manual path edits.

#### Acceptance Criteria

1. THE Hero SHALL reference exactly four TeaserVideo files using the paths `/videos/teaser-1.mp4`, `/videos/teaser-2.mp4`, `/videos/teaser-3.mp4`, and `/videos/teaser-4.mp4` placed in `/public/videos/`.
2. THE PourEngine SHALL reference frame images using zero-padded three-digit filenames: `frame_001.png` through `frame_100.png` placed in `/public/images/sequence/`.
3. IF a TeaserVideo file is absent at its referenced path, the video column SHALL display a dark background fill and SHALL NOT render a broken media indicator or throw a runtime error.
4. IF frame images are absent at their referenced paths, the frame display area SHALL render as an empty region sized to match its container, with no broken image indicator and no runtime error.
5. THE Hero component SHALL define all video source paths in a single constant and all frame image paths in a single generated array, so that no path literals are scattered across JSX markup.
