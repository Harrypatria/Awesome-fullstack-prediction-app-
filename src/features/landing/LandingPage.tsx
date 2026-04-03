import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Target, 
  BarChart3, 
  Linkedin, 
  Twitter, 
  Globe, 
  Lock, 
  User, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  Youtube,
  Instagram
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";

interface LandingPageProps {
  onLogin: (role: "HR Admin" | "Analyst" | "Read-Only", username: string) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      if (password === "agentic26") {
        if (username === "masterclass") {
          onLogin("HR Admin", "Dr Harry Patria");
        } else if (username === "analyst") {
          onLogin("Analyst", "Data Analyst");
        } else if (username === "readonly") {
          onLogin("Read-Only", "Guest Viewer");
        } else {
          setError("Invalid username. Use 'masterclass', 'analyst', or 'readonly'.");
          setLoading(false);
        }
      } else {
        setError("Invalid password.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-widest"
            >
              <BrainCircuit className="h-4 w-4" />
              Agentic People Analytics v3.0
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900"
            >
              PREDICT RISK.<br />
              <span className="text-purple-600">RETAIN TALENT.</span><br />
              DRIVE IMPACT.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              The industry's first agentic command center for employee attrition. 
              Move from reactive exit interviews to proactive retention strategies powered by Gradient Boosting ML.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <button
                onClick={() => setShowAuth(true)}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-purple-600 transition-all flex items-center gap-2 shadow-xl shadow-purple-200"
              >
                Enter Command Center
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                View Methodology
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-400 rounded-full blur-[120px]" />
        </div>
      </header>

      {/* Systematic Framing Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            <div className="space-y-4">
              <div className="h-12 w-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">The Problem</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Employee attrition costs organizations <strong>1.5x-2x</strong> of an employee's annual salary. 
                Traditional HR relies on lagging indicators like exit interviews, missing the window for intervention.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">The Method</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We deploy <strong>Gradient Boosting Classifiers</strong> trained on 1,470+ IBM HR records. 
                Combined with <strong>SHAP values</strong>, we provide local interpretability for every risk score.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">The Insight</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our model identifies <strong>Overtime, Monthly Income, and Job Satisfaction</strong> as the primary drivers. 
                We segment high-potential talent into risk clusters for targeted action.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">The Implication</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                By shifting to an <strong>ITDO Framework</strong> (Insights, Triggers, Decisions, Operations), 
                firms can reduce turnover by <strong>25%</strong> and save millions in replacement costs.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[40px] p-12 lg:p-24 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Validated by Data.<br />
                  <span className="text-purple-400">Trusted by HR Leaders.</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Our predictive engine achieves an 85% ROC-AUC score, providing the precision needed to make high-stakes talent decisions with confidence.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-black text-white">85%</p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Model Accuracy</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white">2.4x</p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">ROI Multiplier</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center font-bold">HP</div>
                  <div>
                    <p className="font-bold">Dr Harry Patria</p>
                    <p className="text-xs text-slate-500">Chief Data & AI Officer</p>
                  </div>
                </div>
                <p className="italic text-slate-300 leading-relaxed">
                  "The future of HR isn't just about reporting what happened. It's about predicting what will happen and having the operational command center to change the outcome."
                </p>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 p-1.5 rounded-lg">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight">Attrition Predictor Pro</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering HR leaders with agentic AI to transform talent retention and organizational impact.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Patria & Co.</h4>
              <div className="flex flex-col gap-3">
                <a href="https://www.patriaco.co.uk" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Website
                </a>
                <a href="https://www.linkedin.com/company/patriaco/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="https://www.instagram.com/patriaco.id/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Instagram
                </a>
                <a href="https://patriaco.co.uk/agentic-ai" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                   Masterclass
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Convergence</h4>
              <div className="flex flex-col gap-3">
                <a href="https://www.convergeni.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Website
                </a>
                <a href="https://www.linkedin.com/in/harry-patria/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="https://convergeni.com/paths" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter
                </a>
                <a href="https://convergeni.com/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-purple-600 transition-colors text-sm flex items-center gap-2">
                   Community
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-purple-50 hover:text-purple-600 transition-all">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-purple-50 hover:text-purple-600 transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/harrypatria/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-purple-50 hover:text-purple-600 transition-all">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              &copy; 2026 Patria & Co. &middot; Agentic People Analytics Masterclass
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-transparent shadow-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white rounded-[32px] shadow-2xl border border-slate-100 p-10 space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-200 mb-4">
                <BrainCircuit className="h-8 w-8" />
              </div>
              <DialogTitle className="text-3xl font-black tracking-tight text-slate-900">Secure Access</DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">Agentic People Analytics Masterclass</DialogDescription>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-medium"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-medium"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
                >
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-purple-600 disabled:bg-slate-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-100"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Protected by Patria & Co. Security Protocols
              </p>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

