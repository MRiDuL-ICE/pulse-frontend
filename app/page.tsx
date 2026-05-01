import type { Metadata } from "next"
import CyberNav from "@/components/landing/CyberNav"
import CyberHero from "@/components/landing/CyberHero"
import CyberFeatures from "@/components/landing/CyberFeatures"
import CyberHowItWorks from "@/components/landing/CyberHowItWorks"
import CyberPricing from "@/components/landing/CyberPricing"
import CyberFooter from "@/components/landing/CyberFooter"
import MatrixRain from "@/components/effects/MatrixRain"
import NeonGrid from "@/components/effects/NeonGrid"

export const metadata: Metadata = {
  title: "PULSE // Self-Hosted Analytics System",
  description: "Cyberpunk-grade analytics infrastructure. Track everything. Own everything. Zero Big Tech.",
}

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <MatrixRain opacity={0.08} />
      <NeonGrid />
      <div className="relative z-10">
        <CyberNav />
        <CyberHero />
        <CyberFeatures />
        <CyberHowItWorks />
        <CyberPricing />
        <CyberFooter />
      </div>
    </main>
  )
}
