"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import GlitchText from "@/components/effects/GlitchText";

const mockData = [
  { v: 1200 },
  { v: 3400 },
  { v: 2100 },
  { v: 5800 },
  { v: 3200 },
  { v: 7100 },
  { v: 4900 },
  { v: 8900 },
  { v: 6200 },
  { v: 9100 },
  { v: 7400 },
  { v: 11200 },
  { v: 8800 },
  { v: 13400 },
  { v: 10200 },
];

const LIVE_STATS = [
  { label: "EVENTS/SEC", value: "2,847", color: "text-[#FFF72F]" },
  { label: "LATENCY_MS", value: "< 50", color: "text-cyan-electric" },
  { label: "UPTIME_%", value: "99.99", color: "text-[#FFF72F]" },
  { label: "DATA_NODES", value: "2", color: "text-cyan-electric" },
];

export default function CyberHero() {
  const [counter, setCounter] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  const bootLines = [
    "> INITIALIZING PULSE ANALYTICS CORE...",
    "> LOADING TIMESCALEDB HYPERTABLES... [OK]",
    "> REDIS CACHE LAYER ONLINE... [OK]",
    "> NGINX LOAD BALANCER ACTIVE... [OK]",
    "> MULTI-TENANT ISOLATION ENABLED... [OK]",
    "> SYSTEM READY. TRACKING INITIALIZED.",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 847 + 100));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (lineIndex < bootLines.length - 1) {
      const id = setTimeout(() => setLineIndex((i) => i + 1), 400);
      return () => clearTimeout(id);
    }
  }, [lineIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            {/* System badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 mb-8 border border-[#FFF72F]/30 px-3 py-1.5"
            >
              <div className="w-2 h-2 bg-[#FFF72F] animate-pulse" />
              <span className="text-[#FFF72F] text-xs tracking-widest font-mono">
                SYSTEM_STATUS: OPERATIONAL
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlitchText
                text="TRACK."
                tag="div"
                className="neon-green font-mono text-7xl md:text-9xl font-bold leading-none tracking-tight"
                intensity="medium"
              />
              <GlitchText
                text="OWN."
                tag="div"
                className="neon-cyan font-mono text-7xl md:text-9xl font-bold leading-none tracking-tight"
                intensity="medium"
              />
              <GlitchText
                text="DOMINATE."
                tag="div"
                className="text-white font-mono text-7xl md:text-9xl font-bold leading-none tracking-tight"
                intensity="low"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#FFF72F]/50 font-mono text-sm mt-6 mb-8 leading-relaxed max-w-md"
            >
              {">"} Self-hosted analytics infrastructure built for developers
              who refuse to hand data to Big Tech. TimescaleDB + Redis +
              FastAPI. Sub-50ms ingestion. Zero compromise.
            </motion.p>

            {/* Live counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 border border-cyan-electric/30 px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 bg-cyan-electric animate-pulse" />
              <span className="text-cyan-electric/60 font-mono text-xs">
                EVENTS_TRACKED:
              </span>
              <span className="neon-cyan font-mono text-sm font-bold">
                {counter.toLocaleString()}
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/register"
                className="cyber-btn border border-[#FFF72F]/40 text-black text-sm tracking-widest px-8 py-3 hover:border-[#FFF72F] hover:shadow-neon-sm-green transition-all duration-200"
              >
                INITIALIZE_SYSTEM →
              </Link>
              <Link
                href="/login"
                className="cyber-btn border border-[#FFF72F]/40 text-black text-sm tracking-widest px-8 py-3 hover:border-[#FFF72F] hover:shadow-neon-sm-green transition-all duration-200 clip-brutal-sm"
              >
                ACCESS_TERMINAL
              </Link>
            </motion.div>
          </div>

          {/* Right — live dashboard panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            {/* Boot terminal */}
            <div className="cyber-panel clip-brutal mb-4 p-4">
              <div className="text-[#FFF72F]/80 text-xs font-mono mb-2 tracking-widest">
                // BOOT_LOG
              </div>
              {bootLines.slice(0, lineIndex + 1).map((line, i) => (
                <div
                  key={i}
                  className={`font-mono text-xs leading-relaxed ${i === lineIndex ? "text-[#FFF72F]" : "text-[#FFF72F]/80"}`}
                >
                  {line}
                  {i === lineIndex && i < bootLines.length - 1 && (
                    <span className="animate-blink">█</span>
                  )}
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {LIVE_STATS.map(({ label, value, color }) => (
                <div key={label} className="cyber-panel p-3 text-center">
                  <div className={`font-mono text-lg font-bold ${color}`}>
                    {value}
                  </div>
                  <div className="text-[#FFF72F] text-[9px] tracking-wider mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Live chart panel */}
            <div className="cyber-panel clip-brutal p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[#FFF72F]/80 text-xs font-mono tracking-widest">
                  // PAGEVIEW_STREAM
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FFF72F] animate-pulse" />
                  <span className="text-[#FFF72F] text-xs font-mono">LIVE</span>
                </div>
              </div>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient
                        id="cyberGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FFF72F"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FFF72F"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        background: "#0A0A0A",
                        border: "1px solid #FFF72F",
                        color: "#FFF72F",
                        fontFamily: "monospace",
                        fontSize: "11px",
                      }}
                      formatter={(v: any) => [
                        `${v.toLocaleString()} events`,
                        "",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#FFF72F"
                      strokeWidth={2}
                      fill="url(#cyberGrad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#FFF72F]/10">
                <div className="text-[#FFF72F]/80 font-mono text-xs">
                  PEAK: <span className="text-[#FFF72F]">13,400</span>
                </div>
                <div className="text-[#FFF72F]/80 font-mono text-xs">
                  AVG: <span className="text-cyan-electric">6,891</span>
                </div>
                <div className="text-[#FFF72F]/80 font-mono text-xs">
                  TOTAL: <span className="text-[#FFF72F]">98.4K</span>
                </div>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#FFF72F]" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-electric" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-electric" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#FFF72F]" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-[#FFF72F] text-xs font-mono tracking-widest">
          SCROLL_DOWN
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-[#FFF72F]/40 to-transparent" />
      </div>
    </section>
  );
}
