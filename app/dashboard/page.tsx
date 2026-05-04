"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TrendingUp, Zap, MousePointer, Users, Terminal } from "lucide-react";
import { analytics } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { formatNumber } from "@/lib/utils";
import CyberStatCard from "@/components/dashboard/CyberStatCard";
import CyberAreaChart from "@/components/charts/CyberAreaChart";
import CyberDonut from "@/components/charts/CyberDonut";
import { useSite } from "@/context/SiteContext";

export const dynamic = "force-dynamic";

export default function DashboardOverview() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(getAccessToken() || "");
  }, []);

  const { activeSite } = useSite();

  const { data: pv, isLoading: pvLoad } = useQuery({
    queryKey: ["pv", token, activeSite?.id],
    queryFn: () => analytics.pageviews(token, activeSite?.id ?? ""),
    enabled: !!token && !!activeSite?.id,
    refetchInterval: 30_000,
  });
  const { data: top } = useQuery({
    queryKey: ["top", token, activeSite?.id],
    queryFn: () => analytics.topPages(token, activeSite?.id ?? "", 8),
    enabled: !!token && !!activeSite?.id,
    refetchInterval: 30_000,
  });
  const { data: ev } = useQuery({
    queryKey: ["ev", token, activeSite?.id],
    queryFn: () => analytics.eventBreakdown(token, activeSite?.id ?? ""),
    enabled: !!token && !!activeSite?.id,
    refetchInterval: 30_000,
  });

  const totalPv = pv?.data?.reduce((s, d) => s + d.count, 0) ?? 0;
  const totalEv = ev?.data?.reduce((s, d) => s + d.count, 0) ?? 0;
  const topPage = top?.data?.[0];

  const stats = [
    {
      label: "TOTAL_PAGEVIEWS",
      value: formatNumber(totalPv),
      sub: "LAST 7 DAYS",
      icon: TrendingUp,
      color: "green" as const,
    },
    {
      label: "TOTAL_EVENTS",
      value: formatNumber(totalEv),
      sub: "LAST 7 DAYS",
      icon: Zap,
      color: "cyan" as const,
    },
    {
      label: "TOP_PAGE",
      value: topPage?.url ?? "—",
      sub: `${topPage?.count ?? 0} HITS`,
      icon: MousePointer,
      color: "green" as const,
    },
    {
      label: "ACTIVE_NODES",
      value: "2",
      sub: "POLLING 30s",
      icon: Users,
      color: "cyan" as const,
      blink: true,
    },
  ];

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Terminal className="w-4 h-4 text-[#FFF72F]/80" />
          <div className="data-tag">// COMMAND_CENTER</div>
        </div>
        <div className="neon-green font-mono text-2xl font-bold tracking-tight">
          ANALYTICS_OVERVIEW
        </div>
        <div className="text-[#FFF72F] font-mono text-xs mt-1">
          {">"} LIVE_DATA // REFRESH_INTERVAL: 30s // CACHE: REDIS
        </div>
      </motion.div>

      {/* Stat grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 bg-[#FFF72F]/10"
      >
        {stats.map((s) => (
          <CyberStatCard key={s?.label} {...s} />
        ))}
      </motion.div>

      {/* Chart + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-[#FFF72F]/10">
        {/* Pageview chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-black border border-[#FFF72F]/20 p-5 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/50 to-transparent" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="data-tag mb-1 inline-block">
                // PAGEVIEW_STREAM
              </div>
              <div className="text-[#FFF72F] font-mono text-sm font-bold">
                HOURLY_TRAFFIC_ANALYSIS
              </div>
            </div>
            <div className="flex items-center gap-2">
              {pvLoad && (
                <div className="w-3 h-3 border border-[#FFF72F]/30 border-t-[#FFF72F] rounded-full animate-spin" />
              )}
              <div className="w-2 h-2 bg-[#FFF72F] animate-pulse" />
            </div>
          </div>
          <div className="h-52">
            {pv?.data?.length ? (
              <CyberAreaChart data={pv?.data} color="green" />
            ) : (
              <div className="h-full flex items-center justify-center text-[#FFF72F] font-mono text-xs">
                {">"} NO_DATA // SEND_EVENTS_TO_POPULATE
              </div>
            )}
          </div>
        </motion.div>

        {/* Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black border border-cyan-electric/20 p-5 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-electric to-transparent" />
          <div
            className="data-tag mb-1 inline-block"
            style={{
              borderColor: "rgba(0,255,255,0.3)",
              color: "rgba(0,255,255,0.9)",
            }}
          >
            // EVENT_MATRIX
          </div>
          <div className="text-cyan-electric font-mono text-sm font-bold mb-4">
            TYPE_DISTRIBUTION
          </div>
          {ev?.data?.length ? (
            <CyberDonut data={ev?.data} />
          ) : (
            <div className="h-44 flex items-center justify-center text-[#FFF72F] font-mono text-xs">
              NO_EVENTS
            </div>
          )}
        </motion.div>
      </div>

      {/* Top pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black border border-[#FFF72F]/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/50 to-transparent" />
        <div className="px-5 py-4 border-b border-[#FFF72F]/10 flex items-center justify-between">
          <div>
            <div className="data-tag mb-1 inline-block">// TRAFFIC_INTEL</div>
            <div className="text-[#FFF72F] font-mono text-sm font-bold">
              TOP_PAGES_RANKED
            </div>
          </div>
          <div className="text-[#FFF72F] font-mono text-xs">
            {top?.data?.length ?? 0}_RESULTS
          </div>
        </div>

        {top?.data?.length ? (
          <div className="divide-y divide-[#FFF72F]/5">
            {top?.data?.map((page, i) => (
              <div
                key={page?.url}
                className="flex items-center justify-between px-5 py-3 hover:bg-[#FFF72F]/3 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 text-[#FFF72F] font-mono text-xs text-right">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-px h-4 bg-[#FFF72F]/20" />
                  <span className="text-[#FFF72F] font-mono text-xs group-hover:text-[#FFF72F] transition-colors">
                    {page?.url}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block w-28 h-px bg-[#FFF72F]/10 relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#FFF72F] transition-all"
                      style={{
                        width: `${((page?.count ?? 0) / (top?.data?.[0]?.count ?? 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[#FFF72F] font-mono text-xs w-16 text-right">
                    {page?.count?.toLocaleString() ?? "0"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-[#FFF72F] font-mono text-xs">
            {">"} NO_PAGEVIEWS_RECORDED // EMBED_SNIPPET_TO_BEGIN
          </div>
        )}
      </motion.div>
    </div>
  );
}
