"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Database, Code2, BarChart3, Users } from "lucide-react";
import GlitchText from "@/components/effects/GlitchText";

const features = [
  {
    icon: Shield,
    code: "MOD_01",
    title: "PRIVACY_CORE",
    color: "green",
    desc: "No cookies. No fingerprinting. No third-party exfiltration. Your data never leaves your infrastructure. GDPR compliant by architecture.",
  },
  {
    icon: Zap,
    code: "MOD_02",
    title: "SUB_50MS_INGEST",
    color: "cyan",
    desc: "Async FastAPI + asyncpg pipeline. Events accepted and queued in under 50ms. Redis cache layer serves dashboard queries instantly.",
  },
  {
    icon: Database,
    code: "MOD_03",
    title: "TIMESCALE_ENGINE",
    color: "green",
    desc: "Events stored in TimescaleDB hypertable partitioned by time. 7-day chunks. Automatic compression. Queries over millions of rows in milliseconds.",
  },
  {
    icon: Code2,
    code: "MOD_04",
    title: "ONE_LINE_DEPLOY",
    color: "cyan",
    desc: "Single script tag. Auto-tracks pageviews, sessions, referrers. Manual event API via window.pulse.track(). Write-only API keys for security.",
  },
  {
    icon: BarChart3,
    code: "MOD_05",
    title: "REALTIME_INTEL",
    color: "green",
    desc: "Live visitor count. Hourly pageview streams. Top pages ranked. Full event breakdown. Polls every 30s. No WebSocket complexity needed.",
  },
  {
    icon: Users,
    code: "MOD_06",
    title: "MULTI_TENANT",
    color: "cyan",
    desc: "Row-level isolation via tenant_id on every table. Composite indexes on (tenant_id, occurred_at). One deployment, unlimited clients.",
  },
];

export default function CyberFeatures() {
  return (
    <section id="features" className="relative py-24 px-6">
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="data-tag mb-4 inline-block">// MODULE_DIRECTORY</div>
          <GlitchText
            text="SYSTEM_MODULES"
            tag="h2"
            className="neon-green font-mono text-4xl md:text-6xl font-bold tracking-tight mb-4"
            intensity="low"
          />
          <p className="text-[#FFF72F]/80 font-mono text-sm max-w-xl">
            {">"} Six core modules. Each engineered for production workloads.
            Zero vendor lock-in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#FFF72F]/10">
          {features.map(({ icon: Icon, code, title, color, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                backgroundColor:
                  color === "green"
                    ? "rgba(0,255,65,0.04)"
                    : "rgba(0,255,255,0.04)",
              }}
              className="bg-black p-6 relative group cursor-crosshair transition-all duration-200"
            >
              {/* Corner accent */}
              <div
                className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 ${color === "green" ? "border-[#FFF72F]" : "border-cyan-electric"} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div
                className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${color === "green" ? "border-[#FFF72F]" : "border-cyan-electric"} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-10 h-10 border flex items-center justify-center flex-shrink-0 ${
                    color === "green"
                      ? "border-[#FFF72F]/40 group-hover:border-[#FFF72F] group-hover:shadow-neon-sm-green"
                      : "border-cyan-electric/40 group-hover:border-cyan-electric group-hover:shadow-neon-sm-cyan"
                  } transition-all`}
                >
                  <Icon
                    className={`w-4 h-4 ${color === "green" ? "text-[#FFF72F]" : "text-cyan-electric"}`}
                  />
                </div>
                <div>
                  <div className="text-[#FFF72F] font-mono text-[10px] tracking-widest mb-1">
                    {code}
                  </div>
                  <div
                    className={`font-mono text-sm font-bold tracking-wider ${color === "green" ? "text-[#FFF72F]" : "text-cyan-electric"}`}
                  >
                    {title}
                  </div>
                </div>
              </div>

              <p className="text-[#FFF72F]/80 font-mono text-xs leading-relaxed group-hover:text-[#FFF72F] transition-colors">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
