# How-to Guides

Practical recipes for common tasks.

---

## Add custom quotes

Edit `src/lib/content/quotes.ts`. Each quote is a `ContentItem` object:

```typescript
{
  id: "unique-id",
  type: "quote",
  lines: [
    " LINE ONE HERE",
    " LINE TWO HERE",
    "",
    " - ATTRIBUTION",
    "",
    "",
  ],
}
```

Rules:
- Exactly 6 lines (pad empty lines with `""`)
- Each line max 22 characters
- All uppercase (the formatter also uppercases, but pre-formatting avoids surprises)
- Leading spaces control horizontal positioning

Add your object to the `QUOTES` array and save. The display will include it in the rotation on next load.

---

## Enable weather display

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create `.env.local` in the project root:
   ```
   WEATHER_API_KEY=your_key_here
   ```
3. Restart the dev server

The weather endpoint is at `/api/weather?lat=40.7&lon=-74.0`. To integrate it into the content rotation, add a weather content item to your queue via the content store or extend the display page to periodically fetch and display weather data.

---

## Change flip speed and timing

Open the settings panel (press **Escape** on the display page) and adjust:

- **Flip Speed** (80–400ms): Duration of each individual character flip
- **Stagger Delay** (5–80ms): Time offset between consecutive tiles starting their animation
- **Rotation Interval** (5–120s): Seconds between automatic content changes

These settings persist in localStorage across sessions.

---

## Deploy to a TV

### Option A: Cast from a browser
1. Open the display URL in Chrome
2. Click the three-dot menu > Cast
3. Select your Chromecast, Apple TV, or smart TV
4. Enter fullscreen mode (settings panel > Toggle Fullscreen)

### Option B: Install as PWA
1. Open the display URL in Chrome or Edge
2. Click the install icon in the address bar
3. The PWA opens in fullscreen with no browser chrome
4. The Wake Lock API prevents the screen from sleeping

### Option C: Smart TV browser
1. Open the smart TV's built-in browser
2. Navigate to your deployed URL (e.g., `https://flappyboards.vercel.app/display`)
3. The display auto-scales to fit the TV resolution

---

## Deploy to Vercel

```bash
npm run build          # Verify the build passes
vercel deploy --prod   # Deploy to production
```

Or push to a GitHub repo connected to Vercel for automatic deployments.

---

## Add a new content type

1. Define the type in `src/types/index.ts`:
   ```typescript
   export interface ContentItem {
     type: "quote" | "weather" | "custom" | "stats" | "your-type";
     // ...
   }
   ```

2. Create a formatter in `src/lib/content/` that returns a `ContentItem` with 6 lines of up to 22 characters each.

3. Add items to the content queue via the content store (`src/stores/content-store.ts`).

---

## Customize the theme

All theme values are CSS custom properties in `src/app/globals.css`. The two theme blocks are:

- `:root, [data-theme="dark"]` — dark mode colors
- `[data-theme="light"]` — light mode colors

Key variables for the board appearance:
- `--tile-bg`, `--tile-bg-light`, `--tile-bg-darker` — tile face gradients
- `--tile-text` — character color
- `--board-bg` — background behind the board
- `--board-shadow` — multi-layer shadow for depth

Modify these values and the display updates immediately via hot reload.
