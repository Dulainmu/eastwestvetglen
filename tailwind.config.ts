import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-jakarta)", "sans-serif"],
                display: ["var(--font-fraunces)", "serif"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                // New Brand Colors
                primary: {
                    DEFAULT: "#12b563", // Updated from user: #12b563
                    dark: "#0e8c4d",
                    foreground: "#ffffff",
                },
                "primary-dark": "#0e8c4d",
                "background-light": "#f6f8f7",
                "background-dark": "#112119", 
                "surface-dark": "#1c3329",
                "navy-custom": "#1e293b",
                "accent-glass": "rgba(255, 255, 255, 0.05)",

                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
                },
            },
            backgroundImage: {
                'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                'arch': '15rem 15rem 0 0',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "slide-up": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-down": {
                    from: { opacity: "0", transform: "translateY(-10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    from: { opacity: "0", transform: "scale(0.95)" },
                    to: { opacity: "1", transform: "scale(1)" },
                },
                "pulse-slow": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                "bounce-subtle": {
                    "0%, 100%": { transform: "translateY(-5%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
                    "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "pulse-slow": "pulse-slow 3s infinite",
                "bounce-subtle": "bounce-subtle 3s infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        function ({ addUtilities }: { addUtilities: any }) {
            const newUtilities = {
                ".perspective-1000": {
                    perspective: "1000px",
                },
                ".transform-style-3d": {
                    transformStyle: "preserve-3d",
                },
                ".backface-hidden": {
                    backfaceVisibility: "hidden",
                },
                ".rotate-y-180": {
                    transform: "rotateY(180deg)",
                },
            }
            addUtilities(newUtilities)
        },
    ],
} satisfies Config

export default config
