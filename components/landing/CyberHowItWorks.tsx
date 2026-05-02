"use client";
import { motion } from "framer-motion";
import GlitchText from "@/components/effects/GlitchText";

const steps = [
  {
    step: "01",
    title: "CREATE_TENANT",
    color: "green",
    commands: [
      "POST /api/v1/auth/register",
      '{ "email": "you@corp.com",',
      '  "tenant_name": "ACME_CORP",',
      '  "tenant_slug": "acme" }',
      "// → 201 TENANT_INITIALIZED",
    ],
    desc: "Register your tenant. Isolated workspace. JWT issued. Data never touches another tenant's partition.",
  },
  {
    step: "02",
    title: "GENERATE_API_KEY",
    color: "cyan",
    commands: [
      "POST /api/v1/api-keys",
      "Authorization: Bearer <jwt>",
      '{ "name": "production" }',
      "// → pk_live_xxxxxxxxxxxxxxxx",
      "// SAVE IT. SHOWN ONCE.",
    ],
    desc: "Generate a write-only API key. Bcrypt hashed in storage. Prefix-indexed for fast lookup. Safe to embed in public JS.",
  },
  {
    step: "03",
    title: "EMBED_SNIPPET",
    color: "green",
    commands: [
      '<script data-key="pk_live_xxx"',
      '  src="/pulse.js">',
      "</script>",
      "// AUTO-TRACKS: pageview",
      "// MANUAL: pulse.track('click')",
    ],
    desc: "One script tag. Auto-tracks pageviews, sessions, referrers. X-API-Key header. No JWT in the browser.",
  },
  {
    step: "04",
    title: "ANALYZE_DATA",
    color: "cyan",
    commands: [
      "GET /api/v1/analytics/pageviews",
      "// → TimescaleDB time_bucket()",
      "// → Redis cache hit < 1ms",
      "// → Hourly buckets, 7d range",
      "// → YOUR DATA. YOUR SERVER.",
    ],
    desc: "Dashboard queries hit Redis first. Cache miss triggers TimescaleDB time_bucket() aggregation. Data refreshes every 30s.",
  },
];

export default function CyberHowItWorks() {
  return (
    <section id="protocol" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="data-tag mb-4 inline-block">
            // EXECUTION_PROTOCOL
          </div>
          <GlitchText
            text="4_STEPS_TO_DOMINANCE"
            tag="h2"
            className="neon-cyan font-mono text-4xl md:text-5xl font-bold tracking-tight mb-4"
            intensity="low"
          />
          <p className="text-[#FFF72F]/80 font-mono text-sm">
            {">"} From zero to full analytics stack in under 10 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map(({ step, title, color, commands, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative ${color === "green" ? "cyber-panel" : "cyber-panel-cyan"} clip-brutal p-6`}
            >
              {/* Step number */}
              <div
                className={`absolute -top-4 -right-4 w-12 h-12 border-2 flex items-center justify-center bg-black font-mono font-bold text-lg ${
                  color === "green"
                    ? "border-[#FFF72F] text-[#FFF72F]"
                    : "border-cyan-electric text-cyan-electric"
                }`}
              >
                {step}
              </div>

              <div
                className={`font-mono text-xs tracking-widest mb-4 ${color === "green" ? "text-[#FFF72F]" : "text-cyan-electric"}`}
              >
                // {title}
              </div>

              {/* Terminal block */}
              <div className="bg-black border border-[#FFF72F]/10 p-4 mb-4 font-mono text-xs leading-relaxed">
                {commands.map((cmd, j) => (
                  <div
                    key={j}
                    className={
                      cmd.startsWith("//")
                        ? "text-[#FFF72F] mt-1"
                        : cmd.startsWith("{") ||
                            cmd.startsWith("}") ||
                            cmd.startsWith('"')
                          ? "text-cyan-electric/70 pl-2"
                          : cmd.startsWith("<")
                            ? "text-green-600"
                            : color === "green"
                              ? "text-[#FFF72F]"
                              : "text-cyan-electric"
                    }
                  >
                    {cmd}
                  </div>
                ))}
              </div>

              <p className="text-[#FFF72F]/80 font-mono text-xs leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
