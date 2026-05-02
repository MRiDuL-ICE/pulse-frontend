"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { analytics } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { formatNumber } from "@/lib/utils";
import CyberDonut from "@/components/charts/CyberDonut";
import { useAuth } from "@/hooks/useAuth";

const COLORS = [
  "#00FF41",
  "#00FFFF",
  "#FF0080",
  "#FFE000",
  "#A855F7",
  "#FF6600",
];

const CTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black border border-[#FFF72F]/60 px-4 py-2 font-mono">
      <div className="text-[#FFF72F]/80 text-[10px] capitalize mb-1">
        {payload[0]?.payload?.event_type}
      </div>
      <div className="text-[#FFF72F] text-sm font-bold">
        {payload[0]?.value?.toLocaleString()}
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(getAccessToken() || "");
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["ev-detail", token],
    queryFn: () => analytics.eventBreakdown(token),
    enabled: !!token,
    refetchInterval: 30_000,
  });

  const total = data?.data?.reduce((s, d) => s + d.count, 0) ?? 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="data-tag mb-1 inline-block">// EVENT_ANALYTICS</div>
        <div className="neon-cyan font-mono text-2xl font-bold">
          EVENT_BREAKDOWN
        </div>
        <div className="text-[#FFF72F] font-mono text-xs mt-1">
          {">"} ALL_EVENT_TYPES // LAST_7_DAYS // REDIS_CACHED
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-black border border-cyan-electric/20 p-5 relative inline-block"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-electric" />
        <div className="text-cyan-electric font-mono text-[10px] tracking-widest mb-1">
          TOTAL_EVENTS_7D
        </div>
        <div className="neon-cyan font-mono text-5xl font-bold">
          {formatNumber(total)}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-[#FFF72F]/10">
        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-black border border-[#FFF72F]/20 p-5 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/50 to-transparent" />
          <div className="data-tag mb-1 inline-block">// TYPE_FREQUENCY</div>
          <div className="text-[#FFF72F] font-mono text-sm font-bold mb-5">
            EVENTS_BY_TYPE
          </div>
          <div className="h-56">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-6 h-6 border border-[#FFF72F]/30 border-t-[#FFF72F] rounded-full animate-spin" />
              </div>
            ) : data?.data?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.data}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="2 4"
                    stroke="rgba(0,255,65,0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="event_type"
                    tick={{
                      fill: "rgba(0,255,65,0.4)",
                      fontSize: 10,
                      fontFamily: "monospace",
                    }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(0,255,65,0.15)" }}
                  />
                  <YAxis
                    tick={{
                      fill: "rgba(0,255,65,0.4)",
                      fontSize: 10,
                      fontFamily: "monospace",
                    }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<CTooltip />}
                    cursor={{ fill: "rgba(0,255,65,0.04)" }}
                  />
                  <Bar dataKey="count" radius={0}>
                    {data.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-[#FFF72F] font-mono text-xs">
                {">"} NO_EVENTS
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
          <div className="absolute top-0 left-0 right-0 h-px bg-cyan-electric/40" />
          <div className="text-cyan-electric font-mono text-sm font-bold mb-4">
            DISTRIBUTION
          </div>
          {data?.data?.length ? (
            <CyberDonut data={data.data} />
          ) : (
            <div className="h-44 flex items-center justify-center text-[#FFF72F] font-mono text-xs">
              NO_DATA
            </div>
          )}
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black border border-[#FFF72F]/20 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/40 to-transparent" />
        <div className="px-5 py-4 border-b border-[#FFF72F]/10">
          <div className="text-[#FFF72F] font-mono text-sm font-bold">
            ALL_EVENT_TYPES
          </div>
        </div>
        <div className="divide-y divide-[#FFF72F]/5">
          {data?.data?.map((row, i) => (
            <div
              key={row.event_type}
              className="flex items-center justify-between px-5 py-3 hover:bg-[#FFF72F]/3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-[#FFF72F] font-mono text-xs uppercase tracking-wider">
                  {row.event_type}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-24 h-px bg-[#FFF72F]/10 relative">
                  <div
                    className="absolute left-0 top-0 h-full transition-all"
                    style={{
                      width: `${total ? (row.count / total) * 100 : 0}%`,
                      background: COLORS[i % COLORS.length],
                    }}
                  />
                </div>
                <span className="text-[#FFF72F] font-mono text-[10px] w-10 text-right">
                  {total ? ((row.count / total) * 100).toFixed(1) : 0}%
                </span>
                <span className="text-[#FFF72F] font-mono text-xs font-bold w-16 text-right">
                  {row.count.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
          {!data?.data?.length && !isLoading && (
            <div className="px-5 py-10 text-center text-[#FFF72F] font-mono text-xs">
              {">"} NO_EVENTS_RECORDED
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
