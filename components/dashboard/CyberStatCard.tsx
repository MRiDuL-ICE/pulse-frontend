import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  color?: "green" | "cyan" | "pink";
  blink?: boolean;
}

export default function CyberStatCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "green",
  blink,
}: Props) {
  const c = {
    green: {
      text: "text-[#FFF72F]",
      border: "border-[#FFF72F]/20 hover:border-[#FFF72F]/60",
      icon: "text-[#FFF72F]",
      glow: "hover:shadow-neon-sm-green",
      top: "bg-[#FFF72F]",
    },
    cyan: {
      text: "text-cyan-electric",
      border: "border-cyan-electric/20 hover:border-cyan-electric/60",
      icon: "text-cyan-electric",
      glow: "hover:shadow-neon-sm-cyan",
      top: "bg-cyan-electric",
    },
    pink: {
      text: "text-pink-hot",
      border: "border-pink-hot/20 hover:border-pink-hot/40",
      icon: "text-pink-hot",
      glow: "",
      top: "bg-pink-hot",
    },
  }[color];

  return (
    <div
      className={`relative bg-black border ${c.border} ${c.glow} transition-all duration-200 p-5 group cursor-crosshair`}
    >
      {/* Top glow line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${c.top}`} />

      <div className="flex items-start justify-between mb-3">
        <div className="text-[#FFF72F]/60 font-mono text-[10px] tracking-widest">
          {label}
        </div>
        <Icon
          className={`w-4 h-4 ${c.icon} opacity-50 group-hover:opacity-100 transition-opacity`}
        />
      </div>

      <div
        className={`font-mono text-3xl font-bold ${c.text} ${blink ? "animate-pulse" : ""}`}
      >
        {value}
      </div>

      {sub && (
        <div className="text-[#FFF72F]/60 font-mono text-[10px] mt-2 tracking-wider">
          {sub}
        </div>
      )}

      {/* Corner accent */}
      <div
        className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r ${
          color === "green"
            ? "border-[#FFF72F]/30"
            : color === "cyan"
              ? "border-cyan-electric/30"
              : "border-pink-hot/30"
        }`}
      />
    </div>
  );
}
