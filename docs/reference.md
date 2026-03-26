# Reference

Technical specifications and API documentation.

---

## Character set

FlappyBoards uses the Vestaboard character encoding. The flip sequence defines the physical order tiles cycle through:

| Code | Character | Code | Character | Code | Character |
|------|-----------|------|-----------|------|-----------|
| 0 | (blank) | 21 | U | 42 | ) |
| 1 | A | 22 | V | 44 | - |
| 2 | B | 23 | W | 46 | + |
| 3 | C | 24 | X | 47 | & |
| 4 | D | 25 | Y | 48 | = |
| 5 | E | 26 | Z | 49 | ; |
| 6 | F | 27 | 1 | 50 | : |
| 7 | G | 28 | 2 | 52 | ' |
| 8 | H | 29 | 3 | 53 | " |
| 9 | I | 30 | 4 | 54 | % |
| 10 | J | 31 | 5 | 55 | , |
| 11 | K | 32 | 6 | 56 | . |
| 12 | L | 33 | 7 | 59 | / |
| 13 | M | 34 | 8 | 60 | ? |
| 14 | N | 35 | 9 | 62 | degree |
| 15 | O | 36 | 0 | | |
| 16 | P | 37 | ! | | |
| 17 | Q | 38 | @ | | |
| 18 | R | 39 | # | | |
| 19 | S | 40 | $ | | |
| 20 | T | 41 | ( | | |

When transitioning between characters, the tile always cycles forward through this sequence, wrapping around from the end back to blank.

---

## Board dimensions

| Property | Value |
|----------|-------|
| Rows | 6 |
| Columns | 22 |
| Total tiles | 132 |
| Tile width | 48px (base, before scaling) |
| Tile height | 64px (base, before scaling) |
| Tile gap | 3px |
| Board padding | 20px vertical, 24px horizontal |

---

## File structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, ThemeProvider
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Theme variables, global styles
│   ├── display/
│   │   ├── layout.tsx          # Fullscreen display layout
│   │   └── page.tsx            # Display page: board + settings + footer
│   └── api/weather/route.ts    # Weather proxy API
├── components/
│   ├── ThemeProvider.tsx        # Dark/light theme context
│   ├── ThemeToggle.tsx          # Moon/sun toggle button
│   ├── display/
│   │   ├── SplitFlapBoard.tsx  # 6x22 grid, transition orchestrator
│   │   ├── SplitFlapRow.tsx    # Single row of 22 tiles
│   │   ├── SplitFlapTile.tsx   # Core 3D flip component (4-face DOM)
│   │   └── DisplayOverlay.tsx  # Vignette overlay
│   └── settings/
│       └── SettingsPanel.tsx   # Slide-out settings drawer
├── hooks/
│   ├── useAudioEngine.ts       # Audio init on user gesture
│   ├── useFullscreen.ts        # Fullscreen + Wake Lock
│   └── useResponsiveScale.ts   # Viewport-to-board scale factor
├── lib/
│   ├── audio/
│   │   └── audio-engine.ts     # Web Audio API singleton, clack synthesis
│   ├── content/
│   │   ├── quotes.ts           # 30 built-in quotes
│   │   ├── weather.ts          # Weather data formatter
│   │   └── content-rotator.ts  # Shuffle + cycle through content
│   └── vestaboard/
│       ├── charset.ts          # Character codes + flip sequence
│       ├── layout.ts           # Grid constants
│       └── message-formatter.ts # Text to 6x22 board state
├── stores/
│   ├── display-store.ts        # Current/target board state
│   ├── settings-store.ts       # Persisted user preferences
│   └── content-store.ts        # Content queue
├── styles/
│   ├── tile.module.css         # 3D flip transforms, perspective
│   └── board.module.css        # Grid layout, frame, shadows
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## Settings defaults

| Setting | Default | Range |
|---------|---------|-------|
| Flip speed | 160ms | 80–400ms |
| Stagger delay | 20ms | 5–80ms |
| Rotation interval | 15s | 5–120s |
| Volume | 50% | 0–100% |
| Muted | false | — |

Settings are stored in localStorage under the key `flappyboards-settings`.

---

## Audio engine

| Parameter | Value |
|-----------|-------|
| Max concurrent sounds | 4 |
| Minimum interval | 30ms |
| Play probability | 35% of flip steps |
| Sound duration | 20–35ms |
| Pitch variation | 0.85x–1.15x |
| Decay rate | exp(-t * 200) |

Sound synthesis: white noise (70%) + brief tonal click (15%) + high harmonic (10%), shaped by exponential envelope. Four variations at different base frequencies (700–1500 Hz).

---

## Theme variables

See `src/app/globals.css` for the complete list. Key variables:

### Dark mode (`[data-theme="dark"]`)
| Variable | Value |
|----------|-------|
| `--bg` | `#000000` |
| `--fg` | `#ffffff` |
| `--tile-bg` | `#1a1a1a` |
| `--tile-text` | `#f0ece4` |
| `--board-bg` | `#000000` |

### Light mode (`[data-theme="light"]`)
| Variable | Value |
|----------|-------|
| `--bg` | `#f5f5f5` |
| `--fg` | `#111111` |
| `--tile-bg` | `#e8e8e8` |
| `--tile-text` | `#111111` |
| `--board-bg` | `#f5f5f5` |
