import React from "react";
import { PredictionResult as PredictionResultType } from "../../types/attrition";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, Brush } from "recharts";
import { AlertCircle, CheckCircle2, Info, Loader2, HelpCircle, Download, FileText, Table } from "lucide-react";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../components/ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/Popover";
import { exportToCSV, exportToPDF } from "../../lib/exportUtils";

interface PredictionResultProps {
  result: PredictionResultType | null;
  loading: boolean;
  error: string | null;
  userRole?: string;
}

export function PredictionResult({ result, loading, error, userRole }: PredictionResultProps) {
  const handleExportCSV = () => {
    if (!result) return;
    const exportData = result.shapValues.map(sv => ({
      Feature: sv.feature,
      Impact: sv.value,
      RiskProbability: result.probability
    }));
    exportToCSV(exportData, "prediction_analysis");
  };

  const handleExportPDF = () => {
    exportToPDF("prediction-result-content", "prediction_analysis_report");
  };

  if (loading && !result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-4 text-slate-400 p-12">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="text-lg font-black uppercase tracking-widest">Analysing Risk Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-12 text-center space-y-4">
        <div className="bg-red-50 p-4 rounded-full">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-xl font-black text-slate-900 uppercase">Analysis Failed</h3>
        <p className="text-slate-500 max-w-md">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-12 text-center space-y-6 text-slate-400">
        <div className="p-6 bg-slate-50 rounded-full">
          <Info className="h-16 w-16 opacity-20" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Ready for Analysis</h3>
          <p className="max-w-md text-sm font-medium">Adjust the simulation parameters on the left to see the predicted attrition risk and key drivers.</p>
        </div>
      </div>
    );
  }

  const riskPct = Math.round(result.probability * 100);
  const isHighRisk = result.probability > 0.6;
  const isMediumRisk = result.probability > 0.3 && result.probability <= 0.6;

  const riskColor = isHighRisk 
    ? "text-purple-700 bg-purple-50 border-purple-100" 
    : isMediumRisk 
      ? "text-purple-500 bg-purple-50/50 border-purple-100" 
      : "text-slate-600 bg-slate-50 border-slate-100";

  const riskBadge = isHighRisk ? "High Risk" : isMediumRisk ? "Medium Risk" : "Low Risk";

  return (
    <div id="prediction-result-content" className="p-8 space-y-8 h-full overflow-y-auto bg-slate-50/30 custom-scrollbar relative">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Analysis Outcome</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Individual Risk Profile</p>
        </div>
        {userRole !== "Read-Only" && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="h-4 w-4" />
                Export Data
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                <button 
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all"
                >
                  <Table className="h-4 w-4" />
                  Export as CSV
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all"
                >
                  <FileText className="h-4 w-4" />
                  Export as PDF
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Score Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group hover:shadow-md transition-all">
          <div className={cn("absolute top-0 left-0 w-full h-2", 
            isHighRisk ? "bg-purple-600" : isMediumRisk ? "bg-purple-400" : "bg-slate-400"
          )} />
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attrition Risk Score</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-slate-300 hover:text-purple-500 transition-colors">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                <p className="text-[10px] font-medium leading-relaxed">The probability that this employee will leave the organization based on the current profile.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="relative">
            <span className={cn("text-8xl font-black tracking-tighter", 
              isHighRisk ? "text-purple-700" : isMediumRisk ? "text-purple-500" : "text-slate-600"
            )}>
              {riskPct}%
            </span>
          </div>

          <div className={cn("px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border", riskColor)}>
            {riskBadge}
          </div>

          <p className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed">
            {isHighRisk 
              ? "Critical risk detected. This profile strongly aligns with historical attrition patterns." 
              : isMediumRisk 
                ? "Moderate risk detected. Engagement and career growth should be monitored." 
                : "Stable profile. High alignment with organizational retention factors."}
          </p>
        </div>

        {/* Key Drivers Summary */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 group hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-500" />
              Primary Risk Drivers
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-slate-300 hover:text-purple-500 transition-colors">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                <p className="text-[10px] font-medium leading-relaxed">The top factors contributing most significantly to this specific prediction.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-4">
            {result.shapValues.slice(0, 3).map((sv, i) => (
              <div key={sv.feature} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                <span className="text-sm font-bold text-slate-700">{sv.feature}</span>
                <span className={cn("text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider", 
                  sv.value > 0 ? "text-purple-600 bg-purple-50" : "text-slate-600 bg-slate-100"
                )}>
                  {sv.value > 0 ? "+" : ""}{Math.round(sv.value * 100)}% impact
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHAP Chart */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 group hover:shadow-md transition-all min-h-[600px] flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Feature Importance (SHAP)</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-slate-300 hover:text-purple-500 transition-colors">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                <p className="text-[10px] font-medium leading-relaxed">SHAP values explain how each feature contributes to the final prediction probability.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Risk Increase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Risk Decrease</span>
            </div>
          </div>
        </div>
        
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
            <BarChart
              data={result.shapValues}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis 
                type="number" 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
              />
              <YAxis 
                dataKey="feature" 
                type="category" 
                tick={{ fontSize: 10, fontWeight: 700, fill: "#475569" }}
                width={120}
                axisLine={false}
                tickLine={false}
              />
              <RechartsTooltip 
                cursor={{ fill: "#f8fafc" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-4 shadow-2xl border border-slate-100 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{data.feature}</p>
                        <p className={cn("text-xs font-bold", data.value > 0 ? "text-purple-600" : "text-slate-500")}>
                          {data.value > 0 ? "Increases risk by " : "Decreases risk by "}
                          {Math.abs(Math.round(data.value * 100))}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" barSize={24}>
                {result.shapValues.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.value > 0 ? "#8b5cf6" : "#64748b"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
