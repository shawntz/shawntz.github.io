/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Evergreen palette - the heart of our design system
        evergreen: {
          DEFAULT: "#12574A",
          50: "#E8F5F1",
          100: "#D1EBE4",
          200: "#A3D7C9",
          300: "#75C3AE",
          400: "#47AF93",
          500: "#12574A",
          600: "#0F4A3F",
          700: "#0C3D34",
          800: "#093029",
          900: "#06231E",
          950: "#041613",
        },
        // Warm accent - golden amber for highlights and CTAs
        amber: {
          DEFAULT: "#D4A855",
          50: "#FDF8EF",
          100: "#FAF0DC",
          200: "#F5E1B9",
          300: "#EFD296",
          400: "#E9C373",
          500: "#D4A855",
          600: "#B8893A",
          700: "#8F6A2D",
          800: "#664C20",
          900: "#3D2D13",
        },
        // Cool accent - sage for secondary elements
        sage: {
          DEFAULT: "#7D9B8C",
          50: "#F4F7F5",
          100: "#E9EFEC",
          200: "#D3DFD8",
          300: "#BDCFC5",
          400: "#9DB7A8",
          500: "#7D9B8C",
          600: "#5F7D6E",
          700: "#475D52",
          800: "#2F3E37",
          900: "#181F1B",
        },
        // Coral accent - for errors, warnings, and warm highlights
        coral: {
          DEFAULT: "#E07A5F",
          50: "#FDF5F3",
          100: "#FAEBE7",
          200: "#F5D7CF",
          300: "#EFC3B7",
          400: "#E99E8B",
          500: "#E07A5F",
          600: "#D35A3D",
          700: "#A8452F",
          800: "#7D3323",
          900: "#522116",
        },
        // Surface colors - backgrounds and cards
        surface: {
          // Light mode surfaces
          light: {
            DEFAULT: "#FDFCFA",
            secondary: "#F7F5F0",
            tertiary: "#EFECE4",
            elevated: "#FFFFFF",
          },
          // Dark mode surfaces
          dark: {
            DEFAULT: "#0D1512",
            secondary: "#131D19",
            tertiary: "#1A2822",
            elevated: "#1F302A",
          },
        },
        // Text colors
        ink: {
          // Light mode text
          light: {
            DEFAULT: "#1A2822",
            secondary: "#3D4F47",
            tertiary: "#6B7D74",
            inverse: "#FDFCFA",
          },
          // Dark mode text
          dark: {
            DEFAULT: "#F0F4F2",
            secondary: "#B8C4BE",
            tertiary: "#7D8F86",
            inverse: "#1A2822",
          },
        },
        // Border colors
        border: {
          light: {
            DEFAULT: "#E2DED4",
            subtle: "#EFECE4",
            strong: "#C9C3B5",
          },
          dark: {
            DEFAULT: "#2A3D35",
            subtle: "#1F302A",
            strong: "#3D5249",
          },
        },
      },
      fontFamily: {
        // Geist for hero/brand elements
        geist: ["Geist", "Geist Placeholder", "sans-serif"],
        // Elegant serif for headings
        display: ["Fraunces", "Georgia", "serif"],
        // Clean sans for body text
        sans: ["Inter", "system-ui", "sans-serif"],
        // Monospace for code
        mono: ["JetBrains Mono", "Geist Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-down": "fadeDown 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "slide-left": "slideLeft 0.6s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
