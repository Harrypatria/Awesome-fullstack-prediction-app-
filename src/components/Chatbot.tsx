import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I'm your **HR Analytics assistant**. How can I help you understand the attrition model, team insights, or the **ITDO framework** today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are an expert HR Analytics Assistant for the Attrition Predictor Pro platform. 
          Your goal is to provide explainability and inclusivity for HR professionals.
          
          Context about the platform:
          1. **Predictor**: Uses a machine learning model to predict individual attrition risk.
             - **SHAP (SHapley Additive exPlanations)**: A game-theoretic approach to explain model outputs. It assigns each feature an importance value for a specific prediction. 
             - **Positive SHAP values** (Purple) indicate factors that increase the probability of attrition.
             - **Negative SHAP values** (Grey) indicate factors that decrease the probability of attrition.
          2. **Team Insights**: Provides organizational-level data, including attrition by department, risk by job role, and global feature importance.
          3. **Command Center**: An actionable framework called **ITDO**:
             - **Insight**: Deep dive into "Why" attrition happens (e.g., identifying that Overtime is a primary driver).
             - **Target**: Pinpointing specific departments or roles that need immediate attention.
             - **Design**: Creating specific interventions like "Flexible Work Policies" or "Leadership Training".
             - **Outcome**: Tracking the success of these interventions over time.
          
          When users ask about:
          - **The model**: Explain it's a predictive system trained on historical data to identify attrition patterns.
          - **Predicted output**: Explain the percentage is a probability, and SHAP values provide the "why" for that specific individual.
          - **Team insights**: Explain aggregate patterns across the whole company.
          - **ITDO**: Explain it as a bridge from data to action.
          
          **Formatting Guidelines**:
          - Use **bold** for emphasis on key terms.
          - Use bullet points for lists.
          - Use separate paragraphs for readability.
          - Keep your tone professional and encouraging.`
        }
      });

      const modelResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: "model", text: modelResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I encountered an error. Please check your connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-purple-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">HR AI Assistant</h3>
                  <p className="text-[10px] opacity-80 font-medium">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0",
                    msg.role === "user" ? "bg-purple-100 text-purple-600" : "bg-white border border-slate-100 text-slate-600 shadow-sm"
                  )}>
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
                    msg.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                  )}>
                    <div className="markdown-body">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 mr-auto">
                  <div className="bg-white border border-slate-100 text-slate-600 p-2 rounded-full h-8 w-8 flex items-center justify-center shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about the model or insights..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all shadow-md"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group",
          isOpen ? "bg-slate-900 text-white" : "bg-purple-600 text-white"
        )}
      >
        <div className="relative">
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-purple-600 rounded-full"></span>
          )}
        </div>
        {!isOpen && (
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-xs font-black uppercase tracking-widest whitespace-nowrap">
            Ask AI Assistant
          </span>
        )}
      </button>
    </div>
  );
}
