import Link from "next/link";
import { Activity, Github, Twitter } from "lucide-react";
import GlitchText from "@/components/effects/GlitchText";

export default function CyberFooter() {
  return (
    <footer className="relative border-t border-[#FFF72F]/20 py-16 px-6">
      {/* Top line glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/60 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 border border-[#FFF72F] flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-[#FFF72F]" />
              </div>
              <GlitchText
                text="PULSE"
                className="neon-green font-mono text-xl font-bold tracking-[0.2em]"
                intensity="low"
              />
            </div>
            <p className="text-[#FFF72F] font-mono text-xs leading-relaxed max-w-xs">
              {">"} Self-hosted analytics infrastructure.
              <br />
              {">"} Own your data. Zero compromise.
              <br />
              {">"} Built with FastAPI + TimescaleDB + Redis.
            </p>
            <div className="flex gap-4 mt-6">
              {[Github, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-[#FFF72F]/20 flex items-center justify-center text-[#FFF72F]/80 hover:text-[#FFF72F] hover:border-[#FFF72F] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "SYSTEM",
              links: ["Features", "Pricing", "Changelog", "Roadmap"],
            },
            {
              title: "DOCS",
              links: ["API Reference", "Self-hosting", "JS Snippet", "GitHub"],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="data-tag mb-4 inline-block">// {title}</div>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[#FFF72F] hover:text-[#FFF72F] font-mono text-xs transition-colors tracking-wider"
                    >
                      {l.toUpperCase().replace(" ", "_")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#FFF72F]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#FFF72F] font-mono text-xs">
            © {new Date().getFullYear()} PULSE_ANALYTICS // ALL_RIGHTS_RESERVED
          </div>
          <div className="text-[#FFF72F] font-mono text-xs">
            BUILT_BY:{" "}
            <a
              href="https://github.com/mridul-ice"
              className="neon-cyan hover:text-[#FFF72F] transition-colors"
            >
              MRiDuL-ICE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
