"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Eye, EyeOff, ArrowRight, Terminal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MatrixRain from "@/components/effects/MatrixRain";
import GlitchText from "@/components/effects/GlitchText";

export default function CyberLogin() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      <MatrixRain opacity={0.12} />

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#FFF72F]/30 pointer-events-none" />
      <div className="fixed top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-electric/30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-electric/30 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#FFF72F]/30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border border-[#FFF72F] flex items-center justify-center animate-pulse-green">
              <Activity className="w-4 h-4 text-[#FFF72F]" />
            </div>
            <GlitchText
              text="PULSE"
              className="neon-green font-mono text-2xl font-bold tracking-[0.2em]"
              intensity="low"
            />
          </Link>

          <div className="data-tag mb-3 inline-block">// AUTH_MODULE</div>
          <GlitchText
            text="ACCESS_TERMINAL"
            tag="h1"
            className="neon-green font-mono text-3xl font-bold tracking-tight mb-2"
            intensity="low"
          />
          <p className="text-[#FFF72F]/80 font-mono text-xs">
            {">"} Enter credentials to access the system
          </p>
        </div>

        {/* Panel */}
        <div className="cyber-panel clip-brutal p-8">
          {/* Panel header line */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#FFF72F]/10">
            <Terminal className="w-3.5 h-3.5 text-[#FFF72F]/50" />
            <span className="text-[#FFF72F]/70 font-mono text-xs tracking-widest">
              LOGIN_SEQUENCE_INITIATED
            </span>
            <div className="ml-auto w-2 h-2 bg-[#FFF72F] animate-pulse" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block text-[#FFF72F]/80 font-mono text-[10px] tracking-widest mb-2">
                {">"} IDENTIFIER_EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@sector7.net"
                required
                className="cyber-input w-full px-4 py-3 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#FFF72F]/80 font-mono text-[10px] tracking-widest mb-2">
                {">"} ACCESS_KEY
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="cyber-input w-full px-4 py-3 pr-12 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFF72F]/70 hover:text-[#FFF72F] transition-colors"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full flex items-center justify-center gap-3 py-3.5 bg-[#FFF72F] text-black font-bold font-mono text-sm tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                <>
                  GRANT_ACCESS <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#FFF72F]/60 font-mono text-xs mt-6">
          NO_ACCOUNT?{" "}
          <Link
            href="/register"
            className="text-[#FFF72F]/60 hover:text-[#FFF72F] transition-colors underline underline-offset-4"
          >
            INITIALIZE_NEW_TENANT
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
