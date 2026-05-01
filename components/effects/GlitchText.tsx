"use client"
import { useEffect, useState, useRef } from "react"

interface Props {
  text: string
  className?: string
  intensity?: "low" | "medium" | "high"
  tag?: "h1" | "h2" | "h3" | "span" | "div" | "p"
}

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ01"

export default function GlitchText({ text, className = "", intensity = "medium", tag: Tag = "span" }: Props) {
  const [display, setDisplay] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const iterRef = useRef(0)
  const frameRef = useRef<number>()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const intervals = { low: 6000, medium: 3500, high: 1500 }
  const duration = { low: 400, medium: 600, high: 1000 }

  useEffect(() => {
    const triggerGlitch = () => {
      if (isGlitching) return
      setIsGlitching(true)
      iterRef.current = 0

      const animate = () => {
        iterRef.current++
        const progress = iterRef.current / 20

        setDisplay(
          text.split("").map((char, idx) => {
            if (char === " ") return " "
            if (idx < iterRef.current * (text.length / 20)) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          }).join("")
        )

        if (iterRef.current < 20) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setDisplay(text)
          setIsGlitching(false)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
      setTimeout(() => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
        setDisplay(text)
        setIsGlitching(false)
      }, duration[intensity])
    }

    const loop = () => {
      triggerGlitch()
      timeoutRef.current = setTimeout(loop, intervals[intensity] + Math.random() * 2000)
    }

    timeoutRef.current = setTimeout(loop, 1000 + Math.random() * 2000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [text, intensity])

  return (
    <Tag
      className={`${className} ${isGlitching ? "animate-glitch" : ""}`}
      data-text={text}
      style={isGlitching ? {
        textShadow: `
          ${Math.random() * 4 - 2}px 0 #00FFFF,
          ${Math.random() * 4 - 2}px 0 #FF0080
        `
      } : undefined}
    >
      {display}
    </Tag>
  )
}
