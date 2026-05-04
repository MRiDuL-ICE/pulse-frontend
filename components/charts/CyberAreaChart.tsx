"use client";

import { memo, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { parseISO, format, isValid } from "date-fns";

// Theme configuration
const THEMES = {
  green: {
    stroke: "#00FF41",
    gradientId: "cyberGreen",
    text: "rgba(0,255,65,0.3)",
    grid: "rgba(0,255,65,0.08)",
    axisLine: "rgba(0,255,65,0.15)",
    border: "rgba(0,255,65,0.6)",
    muted: "rgba(0,255,65,0.4)",
  },
  cyan: {
    stroke: "#00FFFF",
    gradientId: "cyberCyan",
    text: "rgba(0,255,255,0.3)",
    grid: "rgba(0,255,255,0.08)",
    axisLine: "rgba(0,255,255,0.15)",
    border: "rgba(0,255,255,0.6)",
    muted: "rgba(0,255,255,0.4)",
  },
} as const;

type ThemeColor = keyof typeof THEMES;
type Theme = (typeof THEMES)[ThemeColor];

interface DataPoint {
  bucket: string;
  count: number;
}

interface Props {
  data: DataPoint[];
  color?: ThemeColor;
}

// Memoized tooltip component to prevent unnecessary re-renders
const CustomTooltip = memo(function CustomTooltip({
  active,
  payload,
  label,
  theme,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  theme: Theme;
}) {
  if (!active || !payload?.length) return null;

  const formattedDate = (() => {
    if (!label) return "";
    const date = parseISO(label);
    return isValid(date) ? format(date, "MMM dd HH:mm") : "Invalid Date";
  })();
  return (
    <div
      className="bg-black border px-4 py-2 font-mono"
      style={{ borderColor: theme.border }}
    >
      <div
        className="text-[10px] tracking-widest mb-1"
        style={{ color: theme.muted }}
      >
        {formattedDate}
      </div>
      <div className="text-sm font-bold" style={{ color: theme.stroke }}>
        {payload[0].value.toLocaleString()}
        <span className="text-xs ml-1" style={{ color: theme.muted }}>
          events
        </span>
      </div>
    </div>
  );
});

// Formatted data type for the chart
interface FormattedDataPoint extends DataPoint {
  label: string;
  display: string;
}

export default memo(function CyberAreaChart({ data, color = "green" }: Props) {
  const theme = THEMES[color];

  // Memoize formatted data to prevent recalculation on re-renders
  const formatted = useMemo<FormattedDataPoint[]>(
    () =>
      data.map((d) => ({
        ...d,
        label: d.bucket,
        display: format(parseISO(d.bucket), "HH:mm"),
      })),
    [data],
  );

  // Memoize tick formatter to prevent recreation
  const tickFormatter = useMemo(
    () => (value: string) =>
      parseInt(value) >= 1000
        ? `${(parseInt(value) / 1000).toFixed(0)}k`
        : value,
    [],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={formatted}
        margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
      >
        <defs>
          <linearGradient id={theme.gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.stroke} stopOpacity={0.25} />
            <stop offset="95%" stopColor={theme.stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="2 4"
          stroke={theme.grid}
          vertical={false}
        />
        <XAxis
          dataKey="display"
          tick={{
            fill: theme.text,
            fontSize: 10,
            fontFamily: "monospace",
          }}
          tickLine={false}
          axisLine={{ stroke: theme.axisLine }}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{
            fill: theme.text,
            fontSize: 10,
            fontFamily: "monospace",
          }}
          tickLine={false}
          axisLine={false}
          tickFormatter={tickFormatter}
        />
        <Tooltip
          content={<CustomTooltip theme={theme} />}
          cursor={{
            stroke: theme.stroke,
            strokeWidth: 1,
            strokeDasharray: "4 4",
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke={theme.stroke}
          strokeWidth={2}
          fill={`url(#${theme.gradientId})`}
          dot={false}
          activeDot={{
            r: 4,
            fill: theme.stroke,
            stroke: "black",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});
