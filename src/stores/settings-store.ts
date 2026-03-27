"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  flipSpeed: number;
  staggerDelay: number;
  rotationInterval: number;
  volume: number;
  isMuted: boolean;
  setFlipSpeed: (v: number) => void;
  setStaggerDelay: (v: number) => void;
  setRotationInterval: (v: number) => void;
  setVolume: (v: number) => void;
  setMuted: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      flipSpeed: 200,
      staggerDelay: 20,
      rotationInterval: 15,
      volume: 0.7,
      isMuted: false,
      setFlipSpeed: (v) => set({ flipSpeed: v }),
      setStaggerDelay: (v) => set({ staggerDelay: v }),
      setRotationInterval: (v) => set({ rotationInterval: v }),
      setVolume: (v) => set({ volume: v }),
      setMuted: (v) => set({ isMuted: v }),
    }),
    { name: "flappyboards-settings" }
  )
);
