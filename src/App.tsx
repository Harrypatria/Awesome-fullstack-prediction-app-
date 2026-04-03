/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { SlicerPanel } from "./features/predictor/SlicerPanel";
import { PredictionResult } from "./features/predictor/PredictionResult";
import { TeamInsights } from "./features/insights/TeamInsights";
import { CommandCenter } from "./features/command-center/CommandCenter";
import { LandingPage } from "./features/landing/LandingPage";
import { usePredict } from "./hooks/usePredict";
import { AttritionData } from "./types/attrition";
import { INITIAL_DATA } from "./constants";
import { BrainCircuit, Github, LayoutDashboard, Users, ShieldCheck, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import { TooltipProvider } from "./components/ui/Tooltip";

import { NotificationCenter, Notification } from "./components/NotificationCenter";
import { Chatbot } from "./components/Chatbot";

export default function App() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [activeTab, setActiveTab] = useState<"predictor" | "insights" | "command-center">("predictor");
  const [data, setData] = useState<AttritionData>(INITIAL_DATA);
  const [user, setUser] = useState<{ role: "HR Admin" | "Analyst" | "Read-Only"; name: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New High-Risk Segment",
      message: "A new segment of 'Research Scientists' has reached 75% risk threshold.",
      type: "warning",
      timestamp: "2 mins ago",
      read: false,
    },
    {
      id: "2",
      title: "Task Assigned",
      message: "You have been assigned to 'Review Salary Benchmarks'.",
      type: "info",
      timestamp: "1 hour ago",
      read: true,
    }
  ]);

  const { predict, result, loading, error } = usePredict();

  const handleLogin = (role: "HR Admin" | "Analyst" | "Read-Only", name: string) => {
    setUser({ role, name });
    setView("app");
    // Default tab based on role
    if (role === "Read-Only") {
      setActiveTab("insights");
    } else {
      setActiveTab("predictor");
    }

    // Welcome notification
    setTimeout(() => {
      addNotification(
        "System Access Granted",
        `Welcome back, ${name}. You are logged in as ${role}.`,
        "success"
      );
    }, 1000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title: string, message: string, type: "info" | "warning" | "success") => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: "Just now",
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Debounced prediction
  useEffect(() => {
    if (view === "app" && activeTab === "predictor" && user?.role !== "Read-Only") {
      const timer = setTimeout(() => {
        predict(data);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data, predict, activeTab, view, user]);

  if (view === "landing") {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg cursor-pointer" onClick={() => setView("landing")}>
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Attrition Predictor Pro</h1>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">HR Analytics & ML Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {user?.role !== "Read-Only" && (
              <button 
                onClick={() => setActiveTab("predictor")}
                className={cn(
                  "text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  activeTab === "predictor" ? "text-purple-600 bg-purple-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Predictor
              </button>
            )}
            <button 
              onClick={() => setActiveTab("insights")}
              className={cn(
                "text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                activeTab === "insights" ? "text-purple-600 bg-purple-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Users className="h-4 w-4" />
              Team Insights
            </button>
            {user?.role === "HR Admin" && (
              <button 
                onClick={() => setActiveTab("command-center")}
                className={cn(
                  "text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  activeTab === "command-center" ? "text-purple-600 bg-purple-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <ShieldCheck className="h-4 w-4" />
                Command Center
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <NotificationCenter 
              notifications={notifications} 
              onMarkAsRead={markAsRead} 
              onClearAll={clearAll} 
            />
            
            <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-900">{user?.name}</span>
              <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">{user?.role}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Harry'}`} 
                alt="Avatar" 
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              onClick={() => {
                setView("landing");
                setUser(null);
              }}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === "predictor" && user?.role !== "Read-Only" && (
              <motion.div 
                key="predictor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-1 overflow-hidden"
              >
                {/* Left Panel: Slicers */}
                <aside className="w-full md:w-[400px] shrink-0 border-r border-slate-200 bg-white shadow-xl z-0">
                  <SlicerPanel data={data} onChange={setData} />
                </aside>

                {/* Right Panel: Results */}
                <section className="flex-1 overflow-hidden relative">
                  <PredictionResult result={result} loading={loading} error={error} userRole={user?.role} />
                </section>
              </motion.div>
            )}
            {activeTab === "insights" && (
              <motion.div 
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 overflow-hidden"
              >
                <TeamInsights userRole={user?.role} />
              </motion.div>
            )}
            {activeTab === "command-center" && user?.role === "HR Admin" && (
              <motion.div 
                key="command-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="flex-1 overflow-hidden"
              >
                <CommandCenter onNotify={addNotification} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Branding */}
          <footer className="absolute bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur border-t border-slate-100 flex justify-between items-center px-8 z-20">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              Built with Prompt.md · React 18 + FastAPI · Patria & Co.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Harrypatria" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </footer>
        </main>
        <Chatbot />
      </div>
    </TooltipProvider>
  );
}



