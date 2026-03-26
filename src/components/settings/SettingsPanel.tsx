"use client";

import { useState, useEffect, useCallback } from "react";
import { useSettingsStore } from "@/stores/settings-store";
import { audioEngine } from "@/lib/audio/audio-engine";
import ThemeToggle from "@/components/ThemeToggle";

interface SettingsPanelProps {
  onSendMessage?: (lines: string[]) => void;
}

export default function SettingsPanel({ onSendMessage }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const settings = useSettingsStore();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    audioEngine.setVolume(settings.volume);
  }, [settings.volume]);

  useEffect(() => {
    audioEngine.setMuted(settings.isMuted);
  }, [settings.isMuted]);

  const handleSendCustom = () => {
    if (!customText.trim()) return;
    const lines = customText
      .toUpperCase()
      .split("\n")
      .slice(0, 6)
      .map((l) => l.slice(0, 22));
    while (lines.length < 6) lines.push("");
    onSendMessage?.(lines);
    setCustomText("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 50,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--glass-bg)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid var(--border)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fg)",
          transition: "opacity 200ms ease",
          opacity: 0.5,
          padding: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        title="Settings (Esc)"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: "0 0 0 auto",
        zIndex: 50,
        width: 300,
        background: "var(--glass-bg-solid)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderLeft: "1px solid var(--border)",
        padding: "28px 24px",
        overflowY: "auto",
        transition: "transform 200ms ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          SETTINGS
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "var(--text-muted)",
              transition: "opacity 150ms",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--divider)", marginBottom: 20 }} />

      {/* Custom Message */}
      <Section label="MESSAGE">
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="TYPE YOUR MESSAGE..."
          rows={6}
          maxLength={132}
          style={{
            width: "100%",
            background: "var(--tag-bg)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            padding: "10px 12px",
            fontSize: 10,
            fontFamily: "var(--font-geist-mono)",
            color: "var(--text)",
            letterSpacing: "0.04em",
            resize: "none",
            outline: "none",
          }}
        />
        <p
          style={{
            fontSize: 8,
            color: "var(--text-subtle)",
            margin: "6px 0 0",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          6 LINES / 22 CHARS / UPPERCASE
        </p>
        <button
          onClick={handleSendCustom}
          disabled={!customText.trim()}
          style={{
            marginTop: 10,
            width: "100%",
            padding: "8px 0",
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono)",
            background: customText.trim() ? "var(--fg)" : "var(--tag-bg)",
            color: customText.trim() ? "var(--bg)" : "var(--text-subtle)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            cursor: customText.trim() ? "pointer" : "default",
            transition: "all 200ms ease",
          }}
        >
          SEND TO DISPLAY
        </button>
      </Section>

      {/* Flip Speed */}
      <Section label={`FLIP SPEED — ${settings.flipSpeed}MS`}>
        <RangeInput min={80} max={400} step={10} value={settings.flipSpeed} onChange={settings.setFlipSpeed} />
      </Section>

      {/* Stagger */}
      <Section label={`STAGGER — ${settings.staggerDelay}MS`}>
        <RangeInput min={5} max={80} step={5} value={settings.staggerDelay} onChange={settings.setStaggerDelay} />
      </Section>

      {/* Rotation */}
      <Section label={`ROTATION — ${settings.rotationInterval}S`}>
        <RangeInput min={5} max={120} step={5} value={settings.rotationInterval} onChange={settings.setRotationInterval} />
      </Section>

      {/* Volume */}
      <Section label={`VOLUME — ${Math.round(settings.volume * 100)}%`}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <RangeInput min={0} max={1} step={0.05} value={settings.volume} onChange={settings.setVolume} />
          </div>
          <button
            onClick={() => settings.setMuted(!settings.isMuted)}
            style={{
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono)",
              padding: "4px 8px",
              borderRadius: 2,
              background: settings.isMuted ? "var(--fg)" : "var(--tag-bg)",
              color: settings.isMuted ? "var(--bg)" : "var(--text-muted)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            {settings.isMuted ? "UNMUTE" : "MUTE"}
          </button>
        </div>
      </Section>

      {/* Fullscreen */}
      <Section label="DISPLAY">
        <button
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
          style={{
            width: "100%",
            padding: "8px 0",
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-geist-mono)",
            background: "var(--tag-bg)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 200ms ease",
          }}
        >
          TOGGLE FULLSCREEN
        </button>
      </Section>

      <p
        style={{
          fontSize: 8,
          color: "var(--text-subtle)",
          marginTop: 24,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        PRESS ESC TO CLOSE
      </p>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          fontSize: 8,
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          margin: "0 0 10px",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function RangeInput({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
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
  );
}
