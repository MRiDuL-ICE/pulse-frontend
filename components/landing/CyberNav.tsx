"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Terminal, Menu, X } from "lucide-react";
import GlitchText from "@/components/effects/GlitchText";
import { useAuth } from "@/hooks/useAuth";
import { getAccessToken } from "@/lib/auth";

export default function CyberNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 border-b border-[#FFF72F]/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 border border-[#FFF72F] flex items-center justify-center clip-brutal-sm animate-pulse-green">
            <Activity className="w-3.5 h-3.5 text-[#FFF72F]" />
          </div>
          <GlitchText
            text="PULSE"
            className="text-[#FFF72F] font-mono text-lg tracking-[0.2em] font-bold"
            intensity="low"
          />
          <span className="text-[#FFF72F]/70 text-xs hidden md:block tracking-widest">
            v2.0.1
          </span>
        </Link>

        {/* System clock */}
        <div className="hidden md:flex items-center gap-2 text-[#FFF72F]/50 text-xs font-mono">
          <Terminal className="w-3 h-3" />
          <span>SYS_TIME:</span>
          <span className="text-[#FFF72F]">{time}</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {["FEATURES", "PROTOCOL", "PRICING"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-[#FFF72F] hover:text-cyan-electric text-xs tracking-widest transition-colors duration-200 hover:text-shadow-neon-green font-mono"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="cyber-btn text-black hover:text-[#FFF72F] text-xs tracking-widest px-4 py-2 border border-[#FFF72F]/20 hover:border-[#FFF72F]/60 transition-all"
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            className="cyber-btn bg-[#FFF72F] text-black text-xs tracking-widest px-4 py-2 font-bold clip-brutal-sm hover:shadow-neon-green transition-all"
          >
            INITIALIZE
          </Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#FFF72F]"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black border-t border-[#FFF72F]/20 px-6 pb-6"
        >
          <div className="flex flex-col gap-4 pt-4">
            {["FEATURES", "PROTOCOL", "PRICING"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-[#FFF72F]/60 hover:text-[#FFF72F] text-xs tracking-widest font-mono py-2 border-b border-[#FFF72F]/10"
              >
                // {l}
              </a>
            ))}
            <Link
              href="/login"
              className="text-[#FFF72F] text-xs tracking-widest font-mono py-2"
            >
              // LOGIN
            </Link>
            <Link
              href="/register"
              className="bg-[#FFF72F] text-black text-xs tracking-widest font-bold py-2 px-4 text-center clip-brutal-sm"
            >
              INITIALIZE_SYSTEM
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
