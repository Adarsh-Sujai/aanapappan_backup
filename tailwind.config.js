/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files contain class usages to scan, so it can
  // tree-shake the final CSS down to just what you actually use.
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#FBF4E2",
        cream2:   "#F4E9CF",
        leaf:     "#1F4D2A",
        leaf2:    "#2E6B3A",
        leaf3:    "#7AA17A",
        turmeric: "#E8B23A",
        turmeric2:"#F1C661",
        brick:    "#C0533B",
        brick2:   "#A03A26",
        ink:      "#2A1F14",
        ink2:     "#5A4634",
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        hand:    ['"Caveat"', "cursive"],
        body:    ['"Nunito"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 28px -16px rgba(74, 49, 18, 0.25)",
        warm: "0 18px 40px -18px rgba(192, 83, 59, 0.35)",
      },
      borderRadius: {
        blob: "32px",
      },
    },
  },
  plugins: [],
}
