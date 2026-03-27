"use client";

import { useState, useEffect, useRef } from "react";
import { useMusicStore } from "@/stores/music-store";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer";

export default function MusicPlayer() {
  const { source, isPlaying, currentTrack } = useMusicStore();
  const { play: radioPlay, pause: radioPause } = useRadioPlayer();
  const { togglePlay: spotifyToggle, skip: spotifySkip, previous: spotifyPrev } =
    useSpotifyPlayer();
  const [opacity, setOpacity] = useState(0.6);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const resetFade = () => {
      setOpacity(0.6);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setOpacity(0.15), 8000);
    };

    resetFade();
    window.addEventListener("mousemove", resetFade);
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", resetFade);
    };
  }, []);

  if (source === "off") return null;

  const handlePlayPause = () => {
    if (source === "spotify") {
      spotifyToggle();
    } else {
      isPlaying ? radioPause() : radioPlay();
    }
  };

  const btnStyle: React.CSSProperties = {
    width: 20,
    height: 20,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    fontSize: 10,
    opacity: 0.7,
    transition: "opacity 150ms",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: source === "spotify" ? 4 : 0,
        background: "none",
        border: "none",
        padding: 0,
        opacity,
        transition: "opacity 1s ease",
        cursor: "default",
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0.6)}
    >
      {/* Previous (Spotify only) */}
      {source === "spotify" && (
        <button onClick={spotifyPrev} style={btnStyle} title="Previous">
          ⏮
        </button>
      )}

      {/* Play/Pause */}
      <button onClick={handlePlayPause} style={{ ...btnStyle, fontSize: 12, opacity: 1 }}>
        {isPlaying ? "❚❚" : "▶"}
      </button>

      {/* Next (Spotify only) */}
      {source === "spotify" && (
        <button onClick={spotifySkip} style={btnStyle} title="Next">
          ⏭
        </button>
      )}
    </div>
  );
}
