# Mavalli Heritage — "Three Acts" 3D Redesign

## What the visitor experiences
1. **Brand intro:** the existing curtain with the MAVALLI / HERITAGE wordmark stays, then opens straight onto a dark stage.
2. **Pinned "Three Acts" stage:** about 3.5 screens of normal scrolling, with the stage held in place.
   - **Act I: Benne Masala Dosa.** It rises out of the dark and turns exactly once (360°) as you scroll. When the turn ends, it lifts up and out of view.
   - **Act II: Chettinad Chicken Biryani.** It arrives from below in the same way, turns once, then leaves.
   - **Act III: Banana-Leaf Thali.** It turns once, then settles and fades into the story section.
   - The scrollbar position sets the rotation. Scrolling back turns the dish back. Nothing spins on its own, and the scroll wheel is never blocked.
3. **Stage details:** a large serif act title, the dish name and its exact price, and a "01 / 03" counter with a thin progress line.
   - A small "Scroll to turn" cue and a "Skip to the restaurant" button, which also works from the keyboard.
   - Short ingredient labels, e.g. "seeraga samba rice" or "hand-ground masala", fade in beside the dish with fine brass leader lines.
   - Spice dust, soft steam, a brass ring of light behind each dish and a soft shadow underneath.
4. **The rest of the page is restyled to follow the opening:** darker stage colours flow into the story, menu, gallery and visit sections.
   - New kolam-style dotted line art separates the sections.
   - The menu cards reuse the act numbers.
   - The old full-screen photo opening is removed, and the opening headline moves to the end of Act III.
   - All dish names, prices, demo notices, made-up contact details and the demo-only booking form stay exactly as they are.

## How the dishes become genuine 3D (honest tradeoff)
- No free, permission-safe 3D models of these exact dishes exist at good quality. Generic "food" models look wrong or cartoonish.
- **My proposal: dishes built in code as real 3D objects, with detailed surfaces painted by the computer.** Not flat photos.
  - **Dosa:** a curved, folded crepe shape with a lacy golden-brown browning pattern, a glossy butter sheen and darker crisp edges. Potato masala shows at the open end. It sits on a brass plate with two chutney bowls (coconut white, tomato red) and a banana-leaf piece.
  - **Biryani:** a brass handi pot with a hammered metal finish. Hundreds of individual rice grains are drawn efficiently, with saffron-coloured patches. Chicken pieces, crisp fried onion slivers and mint/coriander leaves sit on top.
  - **Thali:** a banana leaf with a centre vein and side ribs, and a slight curl. It holds a rice mound, 5–6 small steel bowls (sambar, rasam, kootu, poriyal, payasam) with glossy liquid tops, and a papad disc with blistered texture.
- Lighting: a warm main light, a brass-tinted rim light and soft reflections, all generated locally so nothing is downloaded from other sites. Gentle colour grading, without heavy effects.
- **Honest limit:** these will look rich and handsome, like a styled food illustration. They will not look like a scanned photograph.
- If you later supply or buy real scanned food models, they can replace any dish without touching the rest.

## Phones, slow devices and reduced motion
- **Phones:** the same scroll story with fewer particles and lower rendering detail. Touch scrolling only, with no tilt that follows the finger.
- **No 3D support or a very slow device:** the stage shows the existing dish photos with the same act layout and text, plus a simple crossfade. It is labelled as photos, not 3D.
- **Reduced-motion setting:** dishes stay at rest and acts change with a fade. No spinning and no particles.
- **Loading:** an elegant brass progress ring with "Preparing the table…" while the 3D part loads. It loads only after the brand intro.

## Checks before handing over
- Screenshots at each act on desktop (1440 wide) and phone (390 wide) to confirm the dishes render, rotate with scroll and change over.
- Test the skip button, keyboard skipping, the no-3D photo version and reduced motion.
- Confirm no console errors and nothing spills sideways.
- Re-run the existing booking and price tests, and add one test for the scroll-to-act maths (each act = one full turn).
- **Cannot check here:** real graphics-card smoothness and frame rate. You'd check this on your own device.

## Technical details
- Packages: `three`, `@react-three/fiber@^9`, `@react-three/drei@^10`, `@types/three` (React 19 compatible). No postprocessing package.
- New `src/components/site/three-acts/`:
  - `ActsStage.tsx`: a sticky 100svh stage inside a ~350svh section; framer `useScroll` progress goes into a ref.
  - `ActsCanvas.tsx`: lazily loaded with `React.lazy` behind `<ClientOnly>`; Canvas with `dpr` [1, 1.75], `frameloop` driven by visibility (IntersectionObserver pauses rendering off-screen).
  - `dishes/Dosa.tsx`, `Biryani.tsx`, `Thali.tsx`: Lathe/Extrude/Tube geometry, InstancedMesh for rice grains, onion and particles; CanvasTexture for browning, hammered-brass normals and leaf veins.
  - `src/lib/acts.ts`: pure function progress → { act, localT, rotationY = localT·2π, enter/exit offsets }, unit-tested.
- Single `useFrame` reads the progress ref with damped easing (`1 - exp(-k·dt)`); no React state per frame. Labels use drei `<Html>` with occlusion off, or DOM overlays positioned from the act state.
- `<Environment>` built from Lightformers (no remote HDRI). Particle budget about 150 on desktop and 60 on mobile, with the draw-call count kept low.
- WebGL detection plus a first-second FPS probe decide the photo fallback. The skip link targets `#story`.
- Hero.tsx is replaced; the nav "Home" points to the stage; the header, menu, gallery, form and data files are kept and restyled. Update AGENTS.md with the three-acts module rule.
