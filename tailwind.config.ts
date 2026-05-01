import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        void: "#050505",
        panel: "#0A0A0A",
        surface: "#0F0F0F",
        green: {
          acid: "#00FF41",
          dim: "#00CC33",
          ghost: "#003311",
          glow: "#39FF14",
        },
        cyan: {
          electric: "#00FFFF",
          dim: "#00CCCC",
          ghost: "#001133",
          glow: "#00FFFF",
        },
        pink: {
          hot: "#FF0080",
          dim: "#CC0066",
          ghost: "#1A0011",
        },
        yellow: {
          toxic: "#FFE000",
        },
        border: {
          green: "#00FF4133",
          cyan: "#00FFFF33",
          bright: "#00FF41",
        },
      },
      fontFamily: {
        mono: ["'Share Tech Mono'", "'Courier New'", "monospace"],
        display: ["'Share Tech Mono'", "monospace"],
      },
      animation: {
        "glitch": "glitch 3s infinite",
        "scanline": "scanline 8s linear infinite",
        "flicker": "flicker 0.15s infinite",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
        "pulse-cyan": "pulse-cyan 2s ease-in-out infinite",
        "matrix": "matrix 20s linear infinite",
        "grid-pulse": "grid-pulse 4s ease-in-out infinite",
        "border-flow": "border-flow 3s linear infinite",
        "typing": "typing 3s steps(40) infinite",
        "blink": "blink 1s step-end infinite",
        "noise": "noise 0.5s steps(10) infinite",
      },
      keyframes: {
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "91%": { transform: "translate(-2px, 1px)", filter: "hue-rotate(90deg)" },
          "92%": { transform: "translate(2px, -1px)", filter: "hue-rotate(-90deg)" },
          "93%": { transform: "translate(0)", filter: "none" },
          "94%": { transform: "translate(3px, 0)", filter: "hue-rotate(45deg)" },
          "95%": { transform: "translate(-3px, 0)", filter: "none" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.95" },
        },
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 5px #00FF41, 0 0 10px #00FF41" },
          "50%": { boxShadow: "0 0 20px #00FF41, 0 0 40px #00FF41, 0 0 60px #00FF41" },
        },
        "pulse-cyan": {
          "0%, 100%": { boxShadow: "0 0 5px #00FFFF, 0 0 10px #00FFFF" },
          "50%": { boxShadow: "0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 60px #00FFFF" },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        noise: {
          "0%": { backgroundPosition: "0 0" },
          "10%": { backgroundPosition: "-5% -10%" },
          "20%": { backgroundPosition: "-15% 5%" },
          "30%": { backgroundPosition: "7% -25%" },
          "40%": { backgroundPosition: "20% 25%" },
          "50%": { backgroundPosition: "-25% 10%" },
          "60%": { backgroundPosition: "15% 5%" },
          "70%": { backgroundPosition: "0 15%" },
          "80%": { backgroundPosition: "25% 35%" },
          "90%": { backgroundPosition: "-10% 10%" },
          "100%": { backgroundPosition: "0 0" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 40px #00FF41",
        "neon-cyan": "0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF",
        "neon-pink": "0 0 10px #FF0080, 0 0 20px #FF0080",
        "neon-sm-green": "0 0 5px #00FF41, 0 0 10px #00FF41",
        "neon-sm-cyan": "0 0 5px #00FFFF, 0 0 10px #00FFFF",
      },
      backgroundImage: {
        "grid-green": "linear-gradient(rgba(0,255,65,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.07) 1px, transparent 1px)",
        "grid-cyan": "linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
}
export default config
