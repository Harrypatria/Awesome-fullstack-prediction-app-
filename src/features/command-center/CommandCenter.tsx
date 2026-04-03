import React, { useState } from "react";
import { useCommandCenter } from "../../hooks/useCommandCenter";
import { 
  ShieldAlert, 
  Zap, 
  Lightbulb, 
  CheckSquare, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  Users,
  Bell,
  GanttChartSquare,
  ClipboardList,
  Plus,
  Trash2,
  MoreVertical,
  Info,
  Calendar,
  User as UserIcon,
  Download,
  Table,
  FileText
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { exportToCSV, exportToPDF } from "../../lib/exportUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/Tooltip";

export function CommandCenter({ onNotify }: { onNotify?: (title: string, message: string, type: "info" | "warning" | "success") => void }) {
  const { data, loading, error } = useCommandCenter();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", assignee: "", deadline: "" });

  const handleExportCSV = () => {
    if (!data) return;
    const exportData = data.tasks.map(t => ({
      Task: t.title,
      Assignee: t.assignee,
      Deadline: t.deadline,
      Status: t.status
    }));
    exportToCSV(exportData, "command_center_tasks");
  };

  const handleExportPDF = () => {
    exportToPDF("command-center-content", "command_center_report");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-slate-400">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="text-lg font-medium">Initializing Command Center...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center space-y-4 text-red-500">
        <AlertCircle className="h-12 w-12" />
        <h3 className="text-xl font-bold">System Error</h3>
        <p className="text-slate-500">{error || "Data unavailable"}</p>
      </div>
    );
  }

  const handleAddTask = async () => {
    try {
      const response = await fetch("/api/command-center/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTask, status: "Pending" }),
      });
      if (response.ok) {
        // Simulate email notification
        console.log(`Email notification sent to ${newTask.assignee} for task: ${newTask.title}`);
        if (onNotify) {
          onNotify("Task Created", `A new task has been assigned to ${newTask.assignee} and an email notification was sent.`, "success");
        }
        setIsAddingTask(false);
        // We should ideally refetch data instead of reload, but for demo:
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    try {
      const response = await fetch(`/api/command-center/${type}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        if (onNotify) {
          onNotify("Resource Removed", `The ${type} has been successfully deleted from the system.`, "info");
        }
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="command-center-content" className="p-8 space-y-12 h-full overflow-y-auto bg-slate-50/30 pb-32 relative">
      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <GanttChartSquare className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Retention Strategy Command Center</h2>
          </div>
          <p className="text-slate-500 font-medium italic">Actionable Measurement Framework (ITDO)</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Download className="h-4 w-4" />
              Export Actions
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="space-y-1">
              <button 
                onClick={handleExportCSV}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all"
              >
                <Table className="h-4 w-4" />
                Export Tasks (CSV)
              </button>
              <button 
                onClick={handleExportPDF}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all"
              >
                <FileText className="h-4 w-4" />
                Export Report (PDF)
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INSIGHTS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                KPQ: Which employee segments are most likely to leave?
              </h3>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                Segments identified via cluster analysis on top risk drivers.
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="grid gap-4">
            {data.insights.map((insight) => (
              <div key={insight.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{insight.segment}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">
                      {insight.count} Employees
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Primary Driver: {insight.driver}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Risk Level</p>
                    <p className={cn("text-xl font-black", 
                      insight.risk > 0.6 ? "text-red-500" : "text-amber-500"
                    )}>
                      {Math.round(insight.risk * 100)}%
                    </p>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="bg-purple-50 text-purple-600 p-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-3">
                      <h4 className="font-bold text-sm">Next Step: Segment Drilldown</h4>
                      <p className="text-xs text-slate-500">Analyze individual profiles within this high-risk cluster to personalize retention offers.</p>
                      <button className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">View List</button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRIGGERS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                KPQ: What thresholds should alert HR to immediate risk?
              </h3>
            </div>
          </div>
          <div className="grid gap-4">
            {data.triggers.map((trigger) => (
              <div key={trigger.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{trigger.name}</p>
                    <p className="text-xs text-slate-400">Threshold: {trigger.threshold}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded uppercase tracking-tighter">
                    {trigger.status}
                  </span>
                  <button 
                    onClick={() => handleDelete("triggers", trigger.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-purple-300 hover:text-purple-500 transition-all flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Trigger
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Retention Trigger</DialogTitle>
                  <DialogDescription>Set automated alerts based on predictive thresholds.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Trigger Name</label>
                    <input className="w-full p-3 bg-slate-50 border rounded-xl" placeholder="e.g. Burnout Alert" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Threshold</label>
                    <select className="w-full p-3 bg-slate-50 border rounded-xl">
                      <option>Risk &gt; 70%</option>
                      <option>Satisfaction &lt; 2</option>
                      <option>Overtime &gt; 10hrs/wk</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl">Save Trigger</button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* DECISIONS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
              KPQ: What interventions will most effectively retain talent?
            </h3>
          </div>
          <div className="grid gap-4">
            {data.decisions.map((decision) => (
              <div key={decision.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-slate-900 max-w-[200px]">{decision.suggestion}</h4>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded uppercase">Impact: {decision.impact}</span>
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded uppercase">Cost: {decision.cost}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Based on Insight #{decision.insightId}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-purple-600 transition-all flex items-center gap-2">
                        Execute Decision
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-3">
                      <h4 className="font-bold text-sm">Next Step: Operationalize</h4>
                      <p className="text-xs text-slate-500">Create a specific project task to implement this intervention across the target segment.</p>
                      <button className="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-lg">Create Task</button>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OPERATIONAL ACTIONS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                KPQ: Who is responsible for executing these tasks?
              </h3>
            </div>
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all">
                  <Plus className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Operational Task</DialogTitle>
                  <DialogDescription>Assign a retention action to a team member.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Task Title</label>
                    <input 
                      className="w-full p-3 bg-slate-50 border rounded-xl" 
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Assignee</label>
                      <input 
                        className="w-full p-3 bg-slate-50 border rounded-xl" 
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">Deadline</label>
                      <input 
                        type="date" 
                        className="w-full p-3 bg-slate-50 border rounded-xl" 
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <button onClick={handleAddTask} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl">Create Task</button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Task</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignee</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</th>
                  <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task) => (
                  <tr key={task.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-bold text-slate-900">{task.title}</p>
                      <p className="text-[10px] text-purple-500 font-bold uppercase">{task.status}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-purple-600">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-slate-700">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold text-slate-500">{task.deadline}</td>
                    <td className="p-4 text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-slate-300 hover:text-purple-600 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2">
                          <button 
                            onClick={() => handleDelete("tasks", task.id)}
                            className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete Task
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                    Next Step: Operational Review
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-xs text-slate-500">Review all pending tasks with department heads to ensure accountability and resource allocation.</p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

