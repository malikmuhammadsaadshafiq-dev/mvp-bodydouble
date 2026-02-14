"use client";

import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatsCard({ title, value, subtitle, icon, trend, trendValue }: StatsCardProps) {
  return (
    <div className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl bg-white/5 text-[#a78bfa]">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" && "bg-green-500/20 text-green-400",
            trend === "down" && "bg-red-500/20 text-red-400",
            trend === "neutral" && "bg-white/5 text-white/50"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "−"}
            {trendValue}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-semibold tracking-tight">{value}</h3>
        <p className="text-sm text-white/50 font-medium">{title}</p>
        {subtitle && <p className="text-xs text-white/30">{subtitle}</p>}
      </div>
    </div>
  );
}