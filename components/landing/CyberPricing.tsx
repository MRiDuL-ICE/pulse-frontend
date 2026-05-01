"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import GlitchText from "@/components/effects/GlitchText";

const plans = [
  {
    tier: "TIER_00",
    name: "HOBBYIST",
    price: "FREE",
    sub: "self-hosted forever",
    color: "green",
    features: [
      "1 tenant",
      "Unlimited events",
      "7-day retention",
      "Pageview tracking",
      "1 API key",
      "Community support",
    ],
    cta: "DEPLOY_FREE",
    href: "/register",
  },
  {
    tier: "TIER_01",
    name: "OPERATOR",
    price: "$0",
    sub: "your infrastructure",
    color: "cyan",
    featured: true,
    features: [
      "Unlimited tenants",
      "Unlimited events",
      "90-day retention",
      "Funnel analysis",
      "Unlimited API keys",
      "Read replica",
      "Redis caching",
      "Rate limiting",
    ],
    cta: "INITIALIZE_NOW",
    href: "/register",
  },
  {
    tier: "TIER_02",
    name: "ENTERPRISE",
    price: "SOON™",
    sub: "managed cloud",
    color: "green",
    features: [
      "Everything in OPERATOR",
      "Managed Postgres+Redis",
      "Auto backups",
      "Custom domain",
      "Priority support",
      "SLA guarantee",
    ],
    cta: "JOIN_WAITLIST",
    href: "#",
  },
];

export default function CyberPricing() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="data-tag mb-4 inline-block">// PRICING_MATRIX</div>
          <GlitchText
            text="PAY_NOTHING."
            tag="h2"
            className="neon-green font-mono text-4xl md:text-6xl font-bold tracking-tight mb-2"
            intensity="low"
          />
          <GlitchText
            text="OWN_EVERYTHING."
            tag="h2"
            className="neon-cyan font-mono text-4xl md:text-6xl font-bold tracking-tight mb-4"
            intensity="low"
          />
          <p className="text-[#FFF72F]/80 font-mono text-sm">
            {">"} Open source. Self-hosted. No surprise bills. No vendor
            lock-in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#FFF72F]/20">
          {plans.map(
            (
              { tier, name, price, sub, color, featured, features, cta, href },
              i,
            ) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 flex flex-col ${
                  featured
                    ? "bg-[#FFF72F]/5 border-x border-[#FFF72F]/40"
                    : "bg-black"
                } ${i < plans.length - 1 ? "border-r border-[#FFF72F]/10" : ""}`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF72F] text-black font-mono text-[10px] tracking-widest px-3 py-1 font-bold">
                    RECOMMENDED
                  </div>
                )}

                <div className="mb-6">
                  <div className="text-[#FFF72F]/70 font-mono text-[10px] tracking-widest mb-1">
                    {tier}
                  </div>
                  <div
                    className={`font-mono text-sm font-bold tracking-widest mb-4 ${color === "cyan" ? "text-cyan-electric" : "text-[#FFF72F]"}`}
                  >
                    {name}
                  </div>
                  <div
                    className={`font-mono text-5xl font-bold ${color === "cyan" ? "neon-cyan" : "neon-green"}`}
                  >
                    {price}
                  </div>
                  <div className="text-[#FFF72F]/70 font-mono text-xs mt-1">
                    {sub}
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 font-mono text-xs text-[#FFF72F]/50"
                    >
                      <Check
                        className={`w-3 h-3 flex-shrink-0 ${color === "cyan" ? "text-cyan-electric" : "text-[#FFF72F]"}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`btn bg-[#FFF72F] block text-center py-3 font-mono text-xs font-bold tracking-widest transition-all ${
                    featured
                      ? "bg-[#FFF72F] cyber-btn text-black hover:shadow-neon-green clip-brutal-sm"
                      : "border border-[#FFF72F]/30 text-black"
                  }`}
                >
                  {cta}
                </Link>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
