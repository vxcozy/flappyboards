"use client";

import { useMusicStore } from "@/stores/music-store";
import StationPicker from "./StationPicker";

export default function MusicSettings() {
  const { source, setSource, musicVolume, setMusicVolume } = useMusicStore();

  return (
    <div>
      {/* Source toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {(["off", "radio", "spotify"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSource(s)}
            style={{
              flex: 1,
              padding: "6px 0",
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono)",
              background: source === s ? "var(--fg)" : "var(--tag-bg)",
              color: source === s ? "var(--bg)" : "var(--text-subtle)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Radio station picker */}
      {source === "radio" && <StationPicker />}

      {/* Spotify placeholder */}
      {source === "spotify" && (
        <div
          style={{
            padding: 16,
            textAlign: "center",
            border: "1px solid var(--border)",
            borderRadius: 2,
          }}
        >
          <p
            style={{
              fontSize: 8,
              color: "var(--text-subtle)",
              margin: 0,
              fontFamily: "var(--font-geist-mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            SPOTIFY INTEGRATION
          </p>
          <p
            style={{
              fontSize: 7,
              color: "var(--text-subtle)",
              margin: "6px 0 0",
              fontFamily: "var(--font-geist-mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            COMING SOON — REQUIRES PREMIUM
          </p>
        </div>
      )}

      {/* Music volume (when any source active) */}
      {source !== "off" && (
        <div style={{ marginTop: 12 }}>
          <p
            style={{
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              margin: "0 0 8px",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            MUSIC VOLUME — {Math.round(musicVolume * 100)}%
          </p>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={musicVolume}
            onChange={(e) => setMusicVolume(Number(e.target.value))}
            style={{
              width: "100%",
              height: 2,
              appearance: "none",
              background: "var(--border)",
              borderRadius: 1,
              outline: "none",
              cursor: "pointer",
              accentColor: "var(--fg)",
            }}
          />
        </div>
      )}
    </div>
  );
}
