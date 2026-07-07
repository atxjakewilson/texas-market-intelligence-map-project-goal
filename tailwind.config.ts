import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        banker: {
          ink: "#252423",
          muted: "#67635d",
          paper: "#faf8f4",
          panel: "#ffffff",
          line: "#e6ded2",
          rust: "#a4471f",
          rustDark: "#7d3418",
          bronze: "#c79b55",
          bronzeSoft: "#efe2c8",
          sage: "#3f7d58",
          amber: "#bc7a16"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        banker: "0 16px 45px rgba(37, 36, 35, 0.12)",
        subtle: "0 8px 24px rgba(37, 36, 35, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
