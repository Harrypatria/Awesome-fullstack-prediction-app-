import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/Tooltip";
import { HelpCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  description?: string;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "neutral",
  description,
  className,
  iconClassName,
}: StatCardProps) {
  const trendColors = {
    positive: "text-emerald-600 bg-emerald-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-slate-400 bg-slate-50",
  };

  return (
    <div className={cn("bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 group hover:shadow-md transition-all", className)}>
      <div className="flex justify-between items-start">
        <div className={cn("p-2 rounded-xl transition-colors", iconClassName)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          {trend && (
            <span className={cn("text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider", trendColors[trendType])}>
              {trend}
            </span>
          )}
          {description && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-slate-300 hover:text-purple-500 transition-colors">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                <p className="text-[10px] font-medium leading-relaxed">{description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
