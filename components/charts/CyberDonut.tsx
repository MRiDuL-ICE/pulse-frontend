"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#FFF72F",
  "#00FFFF",
  "#FF0080",
  "#FFE000",
  "#A855F7",
  "#FF6600",
];

interface Props {
  data: { event_type: string; count: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black border border-[#FFF72F]/60 px-4 py-2 font-mono">
      <div className="text-[#FFF72F]/80 text-[10px] tracking-widest capitalize mb-1">
        {payload[0]?.name}
      </div>
      <div className="text-[#FFF72F] text-sm font-bold">
        {payload[0]?.value.toLocaleString()}
      </div>
    </div>
  );
};

export default function CyberDonut({ data }: Props) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div>
      <div className="relative h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={2}
              dataKey="count"
              nameKey="event_type"
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="neon-green font-mono text-2xl font-bold">
            {total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total}
          </div>
          <div className="text-[#FFF72F] font-mono text-[10px] tracking-widest">
            TOTAL
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-3">
        {data.slice(0, 5).map((d, i) => (
          <div key={d.event_type} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-[#FFF72F]/50 font-mono text-[11px] uppercase tracking-wider">
                {d.event_type}
              </span>
            </div>
            <span className="text-[#FFF72F] font-mono text-[11px]">
              {d.count.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
