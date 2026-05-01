import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  })
}
