import React from "react";

export default function ModernButton({ children, ...props }) {
  return (
    <button
      className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
        shadow
        hover:bg-blue-700
        active:scale-95
        transition
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-offset-2
        text-base
      "
      {...props}
    >
      {children}
    </button>
  );
}
