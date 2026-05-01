"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { analytics } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { formatNumber } from "@/lib/utils";
import CyberAreaChart from "@/components/charts/CyberAreaChart";

const RANGES = [
  { label: "24H", days: 1 },
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
];

export default function PageviewsPage() {
  const [token, setToken] = useState("");
  const [range, setRange] = useState(7);
  useEffect(() => {
    setToken(getAccessToken() || "");
  }, []);

  const start = new Date(Date.now() - range * 86400_000).toISOString();
  const end = new Date().toISOString();

  const { data, isLoading } = useQuery({
    queryKey: ["pv-detail", token, range],
    queryFn: () => analytics.pageviews(token, start, end),
    enabled: !!token,
    refetchInterval: 30_000,
  });

  const total = data?.data?.reduce((s, d) => s + d.count, 0) ?? 0;
  const peak = data?.data?.reduce((m, d) => Math.max(m, d.count), 0) ?? 0;
  const avg = data?.data?.length ? Math.round(total / data.data.length) : 0;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="data-tag mb-1 inline-block">// PAGEVIEW_ANALYTICS</div>
        <div className="neon-green font-mono text-2xl font-bold">
          TRAFFIC_ANALYSIS
        </div>
        <div className="text-[#FFF72F]/70 font-mono text-xs mt-1">
          {">"} TIMESCALEDB_TIME_BUCKET // HOURLY_RESOLUTION
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FFF72F]/10"
      >
        {[
          { label: "TOTAL_PAGEVIEWS", value: formatNumber(total) },
          { label: "PEAK_HOUR", value: formatNumber(peak) },
          { label: "AVG_PER_HOUR", value: formatNumber(avg) },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-black border border-[#FFF72F]/20 p-5 relative"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFF72F]" />
            <div className="text-[#FFF72F]/70 font-mono text-[10px] tracking-widest mb-2">
              {label}
            </div>
            <div className="neon-green font-mono text-4xl font-bold">
              {value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black border border-[#FFF72F]/20 p-5 relative"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/60 to-transparent" />
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="data-tag mb-1 inline-block">// HOURLY_STREAM</div>
            <div className="text-[#FFF72F] font-mono text-sm font-bold">
              PAGEVIEW_TIMELINE
            </div>
          </div>
          <div className="flex items-center gap-1 border border-[#FFF72F]/20 p-1">
            {RANGES.map(({ label, days }) => (
              <button
                key={label}
                onClick={() => setRange(days)}
                className={`cyber-btn px-3 py-1.5 font-mono text-xs tracking-widest transition-all ${
                  range === days
                    ? "bg-[#FFF72F] text-black"
                    : "text-[#FFF72F]/80 hover:text-[#FFF72F]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-6 h-6 border border-[#FFF72F]/30 border-t-[#FFF72F] rounded-full animate-spin" />
            </div>
          ) : data?.data?.length ? (
            <CyberAreaChart data={data.data} color="green" />
          ) : (
            <div className="h-full flex items-center justify-center text-[#FFF72F]/60 font-mono text-xs">
              {">"} NO_DATA_IN_RANGE
            </div>
          )}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black border border-[#FFF72F]/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/40 to-transparent" />
        <div className="px-5 py-4 border-b border-[#FFF72F]/10">
          <div className="text-[#FFF72F] font-mono text-sm font-bold">
            HOURLY_BREAKDOWN
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#FFF72F]/10">
                {["TIMESTAMP", "PAGEVIEWS", "SHARE_%"].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-[#FFF72F]/70 font-mono text-[10px] tracking-widest ${h === "TIMESTAMP" ? "text-left" : "text-right"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FFF72F]/5">
              {data?.data
                ?.slice(-20)
                .reverse()
                .map((row) => (
                  <tr
                    key={row.bucket}
                    className="hover:bg-[#FFF72F]/3 transition-colors"
                  >
                    <td className="px-5 py-2.5 text-[#FFF72F]/50 font-mono text-xs">
                      {new Date(row.bucket).toLocaleString()}
                    </td>
                    <td className="px-5 py-2.5 text-right text-[#FFF72F] font-mono text-xs font-bold">
                      {row.count.toLocaleString()}
                    </td>
                    <td className="px-5 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-px bg-[#FFF72F]/10 relative">
                          <div
                            className="absolute left-0 top-0 h-full bg-[#FFF72F]"
                            style={{
                              width: `${total ? (row.count / total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-[#FFF72F]/80 font-mono text-[10px] w-10 text-right">
                          {total ? ((row.count / total) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!data?.data?.length && !isLoading && (
            <div className="px-5 py-10 text-center text-[#FFF72F]/60 font-mono text-xs">
              {">"} NO_DATA_FOR_RANGE
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
