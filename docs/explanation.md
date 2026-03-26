# Explanation

How FlappyBoards works under the hood.

---

## The split-flap animation model

A real split-flap display has a rotating drum of flaps inside each tile. The drum can only spin forward. To change from character A to character B, it cycles through every intermediate character in the physical order on the drum.

FlappyBoards replicates this with a 4-face DOM structure per tile:

```
[tile container] (perspective: 800px)
  ├── top-half-static     — top 50% of the CURRENT character
  ├── bottom-half-static  — bottom 50% of the NEXT character
  ├── flap-front          — top 50% of current, rotates 0° → -90°
  └── flap-back           — bottom 50% of next, rotates 90° → 0°
```

When a flip occurs:
1. The front flap falls forward (rotateX 0 to -90 degrees) with an accelerating ease
2. At the midpoint, it disappears behind the tile
3. The back flap swings down from above (rotateX 90 to 0 degrees) with an overshoot ease
4. The static halves update to show the new character
5. Flaps reset instantly (no transition) for the next cycle

This runs via direct DOM manipulation through refs — never through React state — so the 132-tile grid maintains 60fps without triggering re-renders.

---

## Sequential character cycling

The `calculateFlipPath` function in `charset.ts` determines how many intermediate flips are needed. It walks forward through the `FLIP_SEQUENCE` array from the current code to the target code, wrapping around the end.

Example: changing from `Z` (code 26) to `B` (code 2) requires cycling through: `1, 2, 3, ..., 9, 0, !, @, #, $, (, ), -, +, &, =, ;, :, ', ", %, comma, period, /, ?, degree, blank, A, B` — 38 individual flips.

This creates the authentic cascade effect where tiles at different positions in the sequence take different amounts of time to reach their target.

---

## Stagger timing

Tiles do not all start flipping at the same moment. A stagger delay creates the characteristic left-to-right, top-to-bottom wave:

```
delay = (row * 22 + col) * baseDelay + randomJitter
```

The jitter (±15% of base delay) prevents the wave from looking too mechanical. A base delay of 20ms with 132 tiles means the last tile starts ~2.6 seconds after the first, creating a natural cascade.

---

## Audio synchronization

The audio engine synthesizes mechanical clack sounds using the Web Audio API. Each sound is a short (20-35ms) burst combining:

- White noise (70%) — the impact component
- Brief tonal click at 700-1500Hz (15%) — the resonant "snap"
- High harmonic (10%) — adds crispness

To prevent the "jet engine" problem (hundreds of overlapping audio nodes), three throttling mechanisms work together:

1. **Minimum interval**: At least 30ms between any two sounds
2. **Concurrency cap**: Maximum 4 AudioBufferSourceNodes active simultaneously
3. **Probabilistic skip**: Only 35% of flip steps produce a sound

The result is a sparse, organic rattle rather than a wall of noise. Slight random pitch variation (0.85x-1.15x) on each sound prevents the "machine gun" artifact.

---

## Theme system

The theme uses CSS custom properties toggled by a `data-theme` attribute on the `<html>` element:

```html
<html data-theme="dark">  <!-- or "light" -->
```

The `ThemeProvider` component:
1. Reads the stored preference from localStorage on mount
2. Falls back to `prefers-color-scheme` system preference
3. Sets the `data-theme` attribute
4. Provides a React context for components that need to know the current theme

All visual properties derive from CSS variables (e.g., `var(--tile-bg)`), so switching themes is a single attribute change — no component re-renders needed for the visual update. The `transition: background-color 300ms ease` on `body` provides a smooth crossfade.

---

## Responsive scaling

The board has fixed base dimensions (48px x 64px tiles in a 22x6 grid). The `useResponsiveScale` hook calculates a single scale factor:

```
scaleX = (viewport width * 0.95) / board natural width
scaleY = (viewport height * 0.9) / board natural height
scale = min(scaleX, scaleY)
```

This is applied via `transform: scale()` — a compositor-only property that does not trigger layout recalculation. The board renders at its natural size and is then scaled to fit, maintaining its exact aspect ratio on any screen from mobile to 4K.

---

## State architecture

Three Zustand stores separate concerns:

- **display-store**: Current and target board states (6x22 arrays of character codes). Tracks whether a transition is in progress.
- **settings-store**: User preferences (flip speed, volume, etc.). Persisted to localStorage via Zustand's `persist` middleware.
- **content-store**: The queue of content items and the current rotation index. Also persisted.

The animation itself is not in any store — it runs imperatively via GSAP/CSS transitions on DOM refs. Stores only hold the logical state; the visual state is managed outside React's render cycle for performance.
