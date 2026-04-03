import React from "react";
import { useTeamStats } from "../../hooks/useTeamStats";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line, Brush 
} from "recharts";
import { Loader2, TrendingUp, Users, DollarSign, Clock, AlertTriangle, Info, Download, FileText, Table } from "lucide-react";
import { cn } from "../../lib/utils";
import { StatCard } from "../../components/StatCard";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/Popover";
import { exportToCSV, exportToPDF } from "../../lib/exportUtils";

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#64748b", "#94a3b8"];

interface TeamInsightsProps {
  userRole?: string;
}

export function TeamInsights({ userRole }: TeamInsightsProps) {
  const { stats, loading, error } = useTeamStats();

  const handleExportCSV = () => {
    if (!stats) return;
    // Exporting department attrition as a sample
    const exportData = stats.departmentAttrition.map(d => ({
      Department: d.name,
      AttritionRate: d.attrition
    }));
    exportToCSV(exportData, "team_insights_data");
  };

  const handleExportPDF = () => {
    exportToPDF("team-insights-content", "team_insights_report");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-4 text-slate-400">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="text-lg font-medium">Loading organizational insights...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-12 text-center space-y-4 text-red-500">
        <AlertTriangle className="h-12 w-12" />
        <h3 className="text-xl font-bold">Failed to load insights</h3>
        <p className="text-slate-500">{error || "Data unavailable"}</p>
      </div>
    );
  }

  return (
    <div id="team-insights-content" className="p-8 space-y-8 h-full overflow-y-auto bg-slate-50/30 pb-24 custom-scrollbar relative">
      <div className="flex justify-between items-end">
        <div className="flex flex-col space-y-2">
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Team Insights</h2>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Organizational Attrition Risk Patterns</p>
        </div>
        {userRole !== "Read-Only" && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="h-4 w-4" />
                Export Report
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Headcount"
          value="1,470"
          icon={Users}
          trend="+2.4%"
          trendType="positive"
          description="Total number of active employees across all departments."
          iconClassName="bg-purple-50 text-purple-600"
        />
        <StatCard 
          title="Attrition Rate"
          value="16.1%"
          icon={TrendingUp}
          trend="+1.2%"
          trendType="negative"
          description="Percentage of employees who left the company within the last period."
          iconClassName="bg-slate-100 text-slate-600"
        />
        <StatCard 
          title="Avg Tenure"
          value="7.0 yrs"
          icon={Clock}
          trend="Stable"
          trendType="neutral"
          description="Average length of time an employee has been with the company."
          iconClassName="bg-slate-100 text-slate-600"
        />
        <StatCard 
          title="Avg Monthly Income"
          value="$6,503"
          icon={DollarSign}
          trend="+5%"
          trendType="positive"
          description="Average gross monthly salary across the entire workforce."
          iconClassName="bg-purple-100 text-purple-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Attrition */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Attrition by Department</h3>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Zoom/Pan Enabled</span>
          </div>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <BarChart data={stats.departmentAttrition}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="attrition" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                <Brush dataKey="name" height={30} stroke="#8b5cf6" fill="#f8fafc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global SHAP Impact Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-900">Global Feature Impact Summary</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Average SHAP Contribution</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Increase</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Decrease</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <BarChart 
                data={stats.globalFeatureImpact} 
                layout="vertical"
                stackOffset="sign"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={120} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="riskIncrease" fill="#8b5cf6" stackId="a" radius={[0, 4, 4, 0]} />
                <Bar dataKey="riskDecrease" fill="#94a3b8" stackId="a" radius={[4, 0, 0, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global SHAP Importance (Absolute) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Absolute Feature Importance</h3>
            <Info className="h-4 w-4 text-slate-300" />
          </div>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <BarChart data={stats.globalShapValues} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={120} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="importance" fill="#a78bfa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Role Risk */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900">Risk by Job Role</h3>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <PieChart>
                <Pie
                  data={stats.jobRoleRisk}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="risk"
                  nameKey="role"
                >
                  {stats.jobRoleRisk.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Distribution vs Attrition */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Salary Range vs Attrition</h3>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Zoom/Pan Enabled</span>
          </div>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <LineChart data={stats.salaryDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" name="Total Employees" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="attrition" name="Attrition Count" stroke="#64748b" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                <Brush dataKey="range" height={30} stroke="#8b5cf6" fill="#f8fafc" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
