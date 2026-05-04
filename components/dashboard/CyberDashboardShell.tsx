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
  Plus,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getAccessToken } from "@/lib/auth";
import { tenant } from "@/lib/api";
import NeonGrid from "@/components/effects/NeonGrid";
import Scanlines from "@/components/effects/Scanlines";
import GlitchText from "@/components/effects/GlitchText";
import { useSite } from "@/context/SiteContext";

const NAV = [
  { label: "OVERVIEW", href: "/dashboard", icon: Activity },
  { label: "PAGEVIEWS", href: "/dashboard/pageviews", icon: TrendingUp },
  { label: "EVENTS", href: "/dashboard/events", icon: Zap },
  { label: "API_KEYS", href: "/dashboard/api-keys", icon: Key },
  { label: "SITES", href: "/dashboard/sites", icon: Globe },
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
  const { activeSite, allSites, setActiveSite } = useSite();
  const [siteDropOpen, setSiteDropOpen] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toISOString().slice(0, 19).replace("T", " "));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return; // Don't run during SSR/build
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }
    tenant
      .me(token)
      .then((t) => {
        if (t && t.name) {
          setTenantName(t.name.toUpperCase().replace(/\s+/g, "_"));
        } else {
          setTenantName("UNKNOWN");
        }
      })
      .catch(() => setTenantName("ERROR"));
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
        <a
          href="/"
          className="h-14 flex items-center gap-3 px-5 border-b border-[#FFF72F]/20"
        >
          <div className="w-6 h-6 border border-[#FFF72F] flex items-center justify-center animate-pulse-green flex-shrink-0">
            <Activity className="w-3 h-3 text-[#FFF72F]" />
          </div>
          <GlitchText
            text="PULSE"
            className="neon-green font-mono text-base font-bold tracking-[0.2em]"
            intensity="low"
          />
        </a>

        <div className="relative mx-4 mt-4 mb-2">
          <button
            onClick={() => setSiteDropOpen(!siteDropOpen)}
            className="w-full flex items-center gap-2 px-3 py-2 border border-cyan-electric hover:border-accent-green/40 bg-slate-panel rounded-lg transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-accent-green flex-shrink-0" />
            <span className="text-text-primary text-sm font-medium truncate flex-1 text-left">
              {activeSite?.name ?? "Select site"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-text-muted transition-transform ${siteDropOpen ? "rotate-180" : ""}`}
            />
          </button>

          {siteDropOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-cyan-electric rounded-lg shadow-xl z-50 overflow-hidden bg-[#FFF72F] text-black">
              {(allSites || []).map((site) => (
                <button
                  key={site.id}
                  onClick={() => {
                    setActiveSite(site);
                    setSiteDropOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors hover:bg-cyan-electric hover:text-black ${
                    activeSite?.id === site.id
                      ? "text-accent-green"
                      : "text-text-secondary"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${activeSite?.id === site.id ? "bg-cyan-electric" : ""}`}
                  />
                  <div className="text-left min-w-0">
                    <div className="font-medium truncate">{site?.name}</div>
                    <div className="text-text-muted text-xs truncate">
                      {site?.domain}
                    </div>
                  </div>
                </button>
              ))}
              <div className="border-t border-cyan-electric">
                <a
                  href="/dashboard/sites"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-text-muted hover:text-accent-green transition-colors hover:bg-cyan-electric hover:text-black"
                >
                  <Plus className="w-3.5 h-3.5" /> Add new site
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          <div className="text-[#FFF72F] font-mono text-[9px] tracking-widest px-2 mb-3">
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
                    : "text-[#FFF72F] hover:text-[#FFF72F] hover:bg-[#FFF72F]/5 border-l-2 border-transparent"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${active ? "text-[#FFF72F]" : "text-[#FFF72F] group-hover:text-[#FFF72F]"}`}
                />
                {active ? `> ${label}` : label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 border-t border-[#FFF72F]/10 pt-3">
          <div className="text-[#FFF72F]/80 font-mono text-[12px] px-2 mb-3 leading-relaxed">
            SYS_TIME:
            <br />
            <span className="text-[#FFF72F]">{time}</span>
          </div>
          <button
            onClick={logout}
            className=" border border-[#FFF72F] w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider text-[#FFF72F] hover:bg-[#FFF72F]  transition-all hover:text-black duration-150 group clip-brutal-sm"
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
                          : "text-[#FFF72F] hover:text-[#FFF72F] border-transparent"
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
                  className="border border-[#FFF72F] w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider text-[#FFF72F] hover:bg-[#FFF72F]  transition-all hover:text-black duration-150 group clip-brutal-sm"
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
                PULSE({activeSite?.name ?? "..."}) {">"} {currentLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#FFF72F] animate-pulse" />
              <span className="text-[#FFF72F] font-mono text-[10px] tracking-widest">
                LIVE
              </span>
            </div>
            <div className="text-[#FFF72F] font-mono text-[10px] hidden md:block">
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
