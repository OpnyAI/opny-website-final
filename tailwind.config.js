// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // falls vorhanden
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",    // Opny-Schwarz
        secondary: "#ffffff",  // Opny-Weiß
        accent: "#2563eb",     // Optional, z.B. für Buttons/Links (Blau)
        bg: "#f6f8fa",         // Hellgrau/Apple-Look
        card: "#ffffffcc",     // Halbtransparentes Weiß für Glassmorphism
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.11)",
      },
      // Hier kannst du weitere Design-Token wie Spacing, etc. ergänzen
    },
  },
  plugins: [],
};
