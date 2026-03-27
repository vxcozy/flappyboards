"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import SplitFlapBoard, {
  type SplitFlapBoardRef,
} from "@/components/display/SplitFlapBoard";
import SettingsPanel from "@/components/settings/SettingsPanel";
import DisplayOverlay from "@/components/display/DisplayOverlay";
import { formatLines, createEmptyBoard } from "@/lib/vestaboard/message-formatter";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { useSettingsStore } from "@/stores/settings-store";
import { ContentRotator } from "@/lib/content/content-rotator";
import { QUOTES } from "@/lib/content/quotes";
import ThemeToggle from "@/components/ThemeToggle";
import MusicPlayer from "@/components/music/MusicPlayer";
import { useMusicStore } from "@/stores/music-store";
import { formatNowPlaying } from "@/lib/content/now-playing";

export default function DisplayPage() {
  const boardRef = useRef<SplitFlapBoardRef>(null);
  const [initialBoard] = useState(() => createEmptyBoard());
  const isTransitioningRef = useRef(false);
  const scale = useResponsiveScale();
  const { audioEngine } = useAudioEngine();
  const rotatorRef = useRef(new ContentRotator(QUOTES));
  const rotationCountRef = useRef(0);
  const musicSource = useMusicStore((s) => s.source);
  const musicIsPlaying = useMusicStore((s) => s.isPlaying);
  const currentTrack = useMusicStore((s) => s.currentTrack);

  // Read settings from store
  const flipSpeed = useSettingsStore((s) => s.flipSpeed);
  const staggerDelay = useSettingsStore((s) => s.staggerDelay);
  const rotationInterval = useSettingsStore((s) => s.rotationInterval);

  const onFlipStep = useCallback(() => {
    if (audioEngine.initialized) {
      audioEngine.playClack(Math.floor(Math.random() * 3));
    }
  }, [audioEngine]);

  const showMessage = useCallback(
    async (lines: string[]) => {
      if (!boardRef.current || isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      const target = formatLines(lines);
      await boardRef.current.transitionTo(target, flipSpeed, staggerDelay, onFlipStep);
      isTransitioningRef.current = false;
    },
    [flipSpeed, staggerDelay, onFlipStep]
  );

  const cycleNext = useCallback(async () => {
    rotationCountRef.current++;
    // Every 3rd rotation, show "Now Playing" if music is active
    if (
      musicIsPlaying &&
      musicSource !== "off" &&
      currentTrack &&
      rotationCountRef.current % 3 === 0
    ) {
      const npLines = formatNowPlaying(currentTrack.title, currentTrack.artist);
      await showMessage(npLines);
      return;
    }
    const content = rotatorRef.current.next();
    await showMessage(content.lines);
  }, [showMessage, musicIsPlaying, musicSource, currentTrack]);

  // Initial message + auto-rotation
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      cycleNext();
    }, 800);

    const interval = setInterval(() => {
      if (!isTransitioningRef.current) {
        cycleNext();
      }
    }, rotationInterval * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [cycleNext, rotationInterval]);

  return (
    <>
      <DisplayOverlay />
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          cursor: "pointer",
          position: "relative",
          zIndex: 5,
        }}
        onClick={() => {
          if (!isTransitioningRef.current) {
            cycleNext();
          }
        }}
      >
        <SplitFlapBoard ref={boardRef} initialBoard={initialBoard} />
      </div>

      {/* Footer */}
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
          pointerEvents: "none",
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
            opacity: 0.55,
          }}
        >
          MADE WITH &#9825; BY COZY
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", pointerEvents: "auto" }}>
          <a
            href="https://x.com/vec0zy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--fg)",
              transition: "opacity 200ms ease",
              display: "flex",
              alignItems: "center",
              opacity: 0.5,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
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
              color: "var(--fg)",
              transition: "opacity 200ms ease",
              display: "flex",
              alignItems: "center",
              opacity: 0.5,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      <MusicPlayer />

      <SettingsPanel
        onSendMessage={(lines) => {
          showMessage(lines);
        }}
      />
    </>
  );
}
