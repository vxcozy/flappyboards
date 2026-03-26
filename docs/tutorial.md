# Tutorial

This tutorial walks you through installing FlappyBoards, running it locally, and displaying your first custom message. By the end, you will have a working split-flap display running on your screen.

## Prerequisites

- Node.js 18 or later
- npm (included with Node.js)
- A modern browser (Chrome, Firefox, Safari, Edge)

## Step 1: Clone and install

```bash
git clone https://github.com/vxcozy/flappyboards.git
cd flappyboards
npm install
```

## Step 2: Start the development server

```bash
npm run dev
```

You should see output like:

```
▲ Next.js 15.x (Turbopack)
- Local: http://localhost:3000
✓ Ready
```

## Step 3: Open the landing page

Navigate to [http://localhost:3000](http://localhost:3000) in your browser. You will see the FlappyBoards landing page with a TV mockup preview and a "Launch Display" button.

## Step 4: Launch the display

Click **Launch Display** or navigate directly to [http://localhost:3000/display](http://localhost:3000/display).

The display will:
1. Render a 6x22 grid of blank tiles
2. After ~1 second, begin flipping to the first quote
3. Auto-rotate through shuffled quotes every 15 seconds

## Step 5: Enable audio

Click anywhere on the display. This initializes the Web Audio API (browsers require a user gesture before playing audio). You will hear mechanical clack sounds synchronized to the flipping tiles.

## Step 6: Send a custom message

1. Press **Escape** or click the gear icon in the bottom-right corner
2. The settings panel slides in from the right
3. Type a message in the text area (6 lines, 22 characters per line, uppercase)
4. Click **Send to Display**
5. Watch your message flip into place

## Step 7: Switch themes

Click the theme icon in the top-right corner of the display to toggle between dark and light mode. Your preference is saved to localStorage.

## Step 8: Go fullscreen

In the settings panel, click **Toggle Fullscreen** to enter full-screen mode. Combined with the Wake Lock API, your screen will stay on indefinitely — perfect for TV display mode.

## Next steps

- Read the [How-to Guides](how-to.md) to add custom quotes, enable weather, or deploy to a TV
- Read the [Explanation](explanation.md) to understand how the animation engine works
- Check the [Reference](reference.md) for the full character set and component API
