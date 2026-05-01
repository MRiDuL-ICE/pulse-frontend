"use client"
import { useEffect, useRef } from "react"

export default function NeonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      const size = 60
      const cols = Math.ceil(canvas.width / size)
      const rows = Math.ceil(canvas.height / size)

      ctx.strokeStyle = "#00FF41"
      ctx.lineWidth = 0.5

      for (let x = 0; x <= cols; x++) {
        const pulse = Math.sin(frame * 0.02 + x * 0.3) * 0.5 + 0.5
        ctx.globalAlpha = 0.03 + pulse * 0.06
        ctx.beginPath()
        ctx.moveTo(x * size, 0)
        ctx.lineTo(x * size, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y <= rows; y++) {
        const pulse = Math.sin(frame * 0.02 + y * 0.3) * 0.5 + 0.5
        ctx.globalAlpha = 0.03 + pulse * 0.06
        ctx.beginPath()
        ctx.moveTo(0, y * size)
        ctx.lineTo(canvas.width, y * size)
        ctx.stroke()
      }

      // Intersection dots
      ctx.fillStyle = "#00FF41"
      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const pulse = Math.sin(frame * 0.03 + x * 0.5 + y * 0.5) * 0.5 + 0.5
          ctx.globalAlpha = pulse * 0.15
          ctx.beginPath()
          ctx.arc(x * size, y * size, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      requestAnimationFrame(draw)
    }

    const raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.8 }}
    />
  )
}
