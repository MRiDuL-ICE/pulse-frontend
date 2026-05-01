"use client"
import { useEffect, useRef } from "react"

export default function MatrixRain({ opacity = 0.15 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]|\\/?!@#$%^&*ABCDEFPULSE"
    const fontSize = 13
    const cols = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`

      drops.forEach((y, i) => {
        const bright = Math.random() > 0.9
        ctx.fillStyle = bright ? "#FFFFFF" : i % 3 === 0 ? "#00FFFF" : "#00FF41"
        ctx.globalAlpha = bright ? 0.9 : 0.5 + Math.random() * 0.4

        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
      ctx.globalAlpha = 1
    }

    const interval = setInterval(draw, 50)
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 0 }}
    />
  )
}
