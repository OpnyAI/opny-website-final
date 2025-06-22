import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-card backdrop-blur-xl border border-white/40 rounded-3xl shadow-glass p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
