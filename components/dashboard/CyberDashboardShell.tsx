"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  TrendingUp,
  Zap,
  Key,
  LogOut,
  Menu,
  X,
  Terminal,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getAccessToken } from "@/lib/auth";
import { tenant } from "@/lib/api";
import NeonGrid from "@/components/effects/NeonGrid";
import Scanlines from "@/components/effects/Scanlines";
import GlitchText from "@/components/effects/GlitchText";

const NAV = [
  { label: "OVERVIEW", href: "/dashboard", icon: Activity },
  { label: "PAGEVIEWS", href: "/dashboard/pageviews", icon: TrendingUp },
  { label: "EVENTS", href: "/dashboard/events", icon: Zap },
  { label: "API_KEYS", href: "/dashboard/api-keys", icon: Key },
];

export default function CyberDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [tenantName, setTenantName] = useState("LOADING...");
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toISOString().slice(0, 19).replace("T", " "));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }
    tenant
      .me(token)
      .then((t) => setTenantName(t.name.toUpperCase().replace(/\s+/g, "_")))
      .catch(() => {});
  }, [router]);

  const currentLabel =
    NAV.find((n) =>
      n.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(n.href),
    )?.label ?? "DASHBOARD";

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      {/* <Scanlines /> */}
      <NeonGrid />

      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-[#FFF72F]/20 bg-black/90 fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="h-14 flex items-center gap-3 px-5 border-b border-[#FFF72F]/20">
          <div className="w-6 h-6 border border-[#FFF72F] flex items-center justify-center animate-pulse-green flex-shrink-0">
            <Activity className="w-3 h-3 text-[#FFF72F]" />
          </div>
          <GlitchText
            text="PULSE"
            className="neon-green font-mono text-base font-bold tracking-[0.2em]"
            intensity="low"
          />
        </div>

        {/* Tenant */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 border border-[#FFF72F]/10 bg-[#FFF72F]/5">
          <div className="text-[#FFF72F]/70 font-mono text-[9px] tracking-widest mb-1">
            ACTIVE_TENANT
          </div>
          <div className="text-[#FFF72F] font-mono text-xs truncate">
            {tenantName}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          <div className="text-[#FFF72F]/60 font-mono text-[9px] tracking-widest px-2 mb-3">
            // NAVIGATION
          </div>
          {NAV.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider transition-all duration-150 group ${
                  active
                    ? "bg-[#FFF72F]/10 text-[#FFF72F] border-l-2 border-[#FFF72F]"
                    : "text-[#FFF72F]/70 hover:text-[#FFF72F]/70 hover:bg-[#FFF72F]/5 border-l-2 border-transparent"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${active ? "text-[#FFF72F]" : "text-[#FFF72F]/70 group-hover:text-[#FFF72F]/60"}`}
                />
                {active ? `> ${label}` : label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-[#FFF72F]/10 pt-3">
          <div className="text-[#FFF72F]/15 font-mono text-[9px] px-2 mb-3 leading-relaxed">
            SYS_TIME:
            <br />
            <span className="text-[#FFF72F]/70">{time}</span>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider text-[#FFF72F]/70 hover:text-pink-hot hover:bg-pink-hot/5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            TERMINATE_SESSION
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-black border-r border-[#FFF72F]/20 z-50 lg:hidden flex flex-col"
            >
              <div className="h-14 flex items-center justify-between px-5 border-b border-[#FFF72F]/20">
                <GlitchText
                  text="PULSE"
                  className="neon-green font-mono text-base font-bold tracking-[0.2em]"
                  intensity="low"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#FFF72F]/80 hover:text-[#FFF72F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV.map(({ label, href, icon: Icon }) => {
                  const active =
                    href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider transition-all border-l-2 ${
                        active
                          ? "bg-[#FFF72F]/10 text-[#FFF72F] border-[#FFF72F]"
                          : "text-[#FFF72F]/70 hover:text-[#FFF72F]/70 border-transparent"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <div className="px-3 pb-4 border-t border-[#FFF72F]/10 pt-3">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs text-[#FFF72F]/70 hover:text-pink-hot transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" /> TERMINATE_SESSION
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen relative z-10">
        {/* Topbar */}
        <header className="h-14 border-b border-[#FFF72F]/20 bg-black/90 sticky top-0 z-20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-[#FFF72F]/80 hover:text-[#FFF72F]"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#FFF72F]/80" />
              <span className="text-[#FFF72F]/80 font-mono text-xs tracking-widest hidden sm:block">
                PULSE {">"} {currentLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#FFF72F] animate-pulse" />
              <span className="text-[#FFF72F]/70 font-mono text-[10px] tracking-widest">
                LIVE
              </span>
            </div>
            <div className="text-[#FFF72F]/60 font-mono text-[10px] hidden md:block">
              {time}
            </div>
            <div className="w-7 h-7 border border-[#FFF72F]/30 flex items-center justify-center">
              <span className="text-[#FFF72F] font-mono text-xs font-bold">
                {tenantName[0] || "?"}
              </span>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
