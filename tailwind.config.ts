import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google Stitch Brand & Surface Palette
        primary: {
          DEFAULT: "#094cb2",
          foreground: "#ffffff",
          container: "#3366cc",
          fixed: "#d9e2ff",
          "fixed-dim": "#b1c5ff",
        },
        surface: {
          DEFAULT: "#faf9fa",
          bright: "#faf9fa",
          dim: "#dbdadb",
          container: "#efedee",
          "container-lowest": "#ffffff",
          "container-low": "#f5f3f4",
          "container-high": "#e9e8e9",
          "container-highest": "#e3e2e3",
          variant: "#e3e2e3",
          tint: "#2259bf",
        },
        "on-surface": {
          DEFAULT: "#1b1c1d",
          variant: "#434653",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#e7ebff",
          fixed: "#001946",
        },
        tertiary: {
          DEFAULT: "#6d5e00",
          container: "#bfab49",
          fixed: "#f9e37a",
        },
        outline: {
          DEFAULT: "#737784",
          variant: "#c3c6d5",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        // Standard shadcn semantic tokens mapped cleanly
        border: "hsl(var(--border, 0 0% 89%))",
        input: "hsl(var(--input, 0 0% 89%))",
        ring: "hsl(var(--ring, 221 83% 53%))",
        background: "hsl(var(--background, 240 5% 98%))",
        foreground: "hsl(var(--foreground, 240 10% 4%))",
        muted: {
          DEFAULT: "#f5f3f4",
          foreground: "#737784",
        },
        accent: {
          DEFAULT: "#efedee",
          foreground: "#1b1c1d",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1b1c1d",
        },
      },
      fontFamily: {
        headline: ["var(--font-noto-serif)", "Noto Serif", "serif"],
        display: ["var(--font-noto-serif)", "Noto Serif", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        label: ["var(--font-public-sans)", "Public Sans", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
