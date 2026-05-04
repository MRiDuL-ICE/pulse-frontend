"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Terminal, Menu, X } from "lucide-react";
import GlitchText from "@/components/effects/GlitchText";
import { useAuth } from "@/context/AuthContext";

export default function CyberNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const { user } = useAuth();
  // console.log("user", user);

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
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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
          {/* System clock */}
          <div className="hidden md:flex items-center gap-2 text-[#FFF72F]/50 text-xs font-mono">
            <Terminal className="w-3 h-3" />
            <span>SYS_TIME:</span>
            <span className="text-[#FFF72F]">{time}</span>
          </div>
        </Link>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3 px-10 py-2 text-cyan-electric font-mono text-xs font-bold tracking-widest animate-glow-clockwise transition-all duration-100">
          {/* Nav links */}
          <div className="hidden md:flex items-end gap-6">
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
          {user?.id ? (
            <Link
              href="/dashboard"
              className="cyber-btn border border-[#FFF72F]/40 text-black text-xs tracking-widest hover:border-[#FFF72F] hover:shadow-neon-sm-green transition-all duration-200 clip-brutal-sm"
            >
              DASHBOARD
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="cyber-btn border border-[#FFF72F]/40 text-black text-xs tracking-widest hover:border-[#FFF72F] hover:shadow-neon-sm-green transition-all duration-200"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="cyber-btn border border-[#FFF72F]/40 text-black text-xs tracking-widest hover:border-[#FFF72F] hover:shadow-neon-sm-green transition-all duration-200 clip-brutal-sm"
              >
                INITIALIZE
              </Link>
            </>
          )}
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
                className="text-[#FFF72F] hover:text-[#FFF72F] text-xs tracking-widest font-mono py-2 border-b border-[#FFF72F]/10"
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
