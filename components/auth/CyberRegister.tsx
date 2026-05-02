"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Eye, EyeOff, ArrowRight, Terminal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MatrixRain from "@/components/effects/MatrixRain";
import GlitchText from "@/components/effects/GlitchText";

export default function CyberRegister() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    tenant_name: "",
    tenant_slug: "",
  });
  const [showPw, setShowPw] = useState(false);

  const update =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "tenant_name") {
          next.tenant_slug = value
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        }
        return next;
      });
    };

  const fields = [
    {
      key: "email",
      label: "OPERATOR_EMAIL",
      type: "email",
      placeholder: "operator@sector7.net",
    },
    {
      key: "tenant_name",
      label: "TENANT_DESIGNATION",
      type: "text",
      placeholder: "ACME_CORPORATION",
    },
    {
      key: "tenant_slug",
      label: "TENANT_SLUG (AUTO)",
      type: "text",
      placeholder: "acme-corporation",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <MatrixRain opacity={0.12} />

      <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-electric/30 pointer-events-none" />
      <div className="fixed top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#FFF72F]/30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#FFF72F]/30 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-electric/30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
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
          <div className="data-tag mb-3 inline-block">// INIT_MODULE</div>
          <GlitchText
            text="SYSTEM_INITIALIZE"
            tag="h1"
            className="neon-cyan font-mono text-3xl font-bold tracking-tight mb-2"
            intensity="low"
          />
          <p className="text-[#FFF72F]/80 font-mono text-xs">
            {">"} Create your tenant. Own your analytics stack.
          </p>
        </div>

        <div className="cyber-panel-cyan clip-brutal p-8">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-electric/10">
            <Terminal className="w-3.5 h-3.5 text-cyan-electric/50" />
            <span className="text-cyan-electric font-mono text-xs tracking-widest">
              NEW_TENANT_REGISTRATION
            </span>
            <div className="ml-auto w-2 h-2 bg-cyan-electric animate-pulse" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              register(
                form.email,
                form.password,
                form.tenant_name,
                form.tenant_slug,
              );
            }}
            className="space-y-5"
          >
            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-cyan-electric/40 font-mono text-[10px] tracking-widest mb-2">
                  {">"} {label}
                </label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={update(key)}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 text-sm bg-black border border-cyan-electric/20 focus:border-cyan-electric focus:shadow-neon-sm-cyan text-cyan-electric outline-none transition-all font-mono placeholder:text-cyan-electric/20"
                />
                {key === "tenant_slug" && form.tenant_slug && (
                  <div className="text-[#FFF72F] font-mono text-[10px] mt-1.5">
                    {">"} WORKSPACE_ID:{" "}
                    <span className="text-[#FFF72F]">{form.tenant_slug}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-cyan-electric/40 font-mono text-[10px] tracking-widest mb-2">
                {">"} ENCRYPTION_KEY
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  placeholder="min 8 characters"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 text-sm bg-black border border-cyan-electric/20 focus:border-cyan-electric focus:shadow-neon-sm-cyan text-cyan-electric outline-none transition-all font-mono placeholder:text-cyan-electric/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-electric hover:text-cyan-electric transition-colors"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full flex items-center justify-center gap-3 py-3.5 bg-cyan-electric text-black font-bold font-mono text-sm tracking-widest clip-brutal-sm hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin" />
                  <span>INITIALIZING...</span>
                </div>
              ) : (
                <>
                  DEPLOY_TENANT <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#FFF72F] font-mono text-xs mt-6">
          HAVE_ACCOUNT?{" "}
          <Link
            href="/login"
            className="text-[#FFF72F] hover:text-[#FFF72F] transition-colors underline underline-offset-4"
          >
            ACCESS_TERMINAL
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
