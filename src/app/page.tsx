"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top-left corner: branding */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          padding: "28px 32px",
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text)",
            margin: 0,
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          FLAPPYBOARDS
        </p>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            margin: "4px 0 0",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          BY COZY
        </p>
      </div>

      {/* Top-right: theme toggle */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          padding: "28px 32px",
          zIndex: 20,
        }}
      >
        <ThemeToggle />
      </div>

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "0 24px",
        }}
      >
        {/* TV Mockup */}
        <div
          style={{
            position: "relative",
            maxWidth: 640,
            width: "100%",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              padding: 12,
            }}
          >
            {/* Screen */}
            <div
              style={{
                aspectRatio: "16 / 7",
                background: "var(--board-bg)",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 16,
                  right: 16,
                  height: 1,
                  background: "var(--accent)",
                }}
              />
              {/* Mock tiles */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(22, 1fr)",
                  gap: 1,
                  padding: 8,
                  width: "100%",
                  maxWidth: 520,
                }}
              >
                {renderMockBoard()}
              </div>
            </div>
            {/* TV chin */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 8,
                paddingBottom: 4,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            margin: "0 0 32px",
            textAlign: "center",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          TURN ANY TV INTO A RETRO SPLIT-FLAP DISPLAY
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link
            href="/display"
            style={{
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--fg)",
              textDecoration: "none",
              padding: "8px 20px",
              border: "1px solid var(--border)",
              borderRadius: 2,
              transition: "all 200ms ease",
              fontFamily: "var(--font-geist-mono)",
              background: "var(--glass-bg)",
              backdropFilter: "blur(8px)",
              transform: "translateY(0)",
              boxShadow: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px var(--board-border)";
              e.currentTarget.style.borderColor = "var(--border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "";
            }}
          >
            LAUNCH DISPLAY
          </Link>
          <a
            href="https://github.com/vxcozy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              padding: "8px 20px",
              transition: "all 200ms ease",
              fontFamily: "var(--font-geist-mono)",
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--fg)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span style={{ fontSize: 10, display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ fontSize: 11, marginTop: -1 }}>&#9733;</span>GITHUB</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontSize: 8,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--tile-text)",
            margin: 0,
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          MADE WITH &#9825; BY COZY
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a
            href="https://x.com/vec0zy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-muted)",
              transition: "color 200ms ease",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://github.com/vxcozy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-muted)",
              transition: "color 200ms ease",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}

function renderMockBoard() {
  const text = [
    "                      ",
    "      GOD IS IN       ",
    "      THE DETAILS.    ",
    "                      ",
    "      - LUDWIG MIES   ",
    "                      ",
  ];

  const tiles: React.ReactNode[] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 22; col++) {
      const char = text[row]?.[col] ?? " ";
      tiles.push(
        <div
          key={`${row}-${col}`}
          style={{
            aspectRatio: "3 / 4",
            background: "var(--tile-bg)",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 7,
            fontWeight: 500,
            color: "var(--tile-text)",
            fontFamily: "var(--font-geist-mono)",
            boxShadow:
              "inset 0 0.5px 0 var(--tile-highlight), inset 0 -0.5px 0 var(--tile-split)",
          }}
        >
          {char !== " " ? char : ""}
        </div>
      );
    }
  }
  return tiles;
}
