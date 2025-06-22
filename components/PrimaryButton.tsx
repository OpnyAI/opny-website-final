import React from "react";

export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-primary text-secondary font-bold rounded-2xl px-7 py-3 shadow-xl hover:bg-neutral-900 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
