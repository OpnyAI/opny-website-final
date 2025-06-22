// components/GlassCard.tsx
import React from "react";

export default function GlassCard({ children }) {
  return (
    <div
      className="
        bg-white/40
        backdrop-blur-lg
        rounded-3xl
        shadow-glass
        border border-white/30
        p-8
        transition
        hover:bg-white/60
        hover:shadow-2xl
      "
    >
      {children}
    </div>
  );
}
