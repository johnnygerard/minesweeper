import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        icon: "fadeIn 0.15s ease-in-out",
        trophy: "fadeIn 1s ease-in-out",
        explosion: "explosion 0.5s ease-out",
      },
      colors: {
        accent: colors.blue[500],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        explosion: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
    fontFamily: {
      sans: ["var(--font-aldrich)"],
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;
