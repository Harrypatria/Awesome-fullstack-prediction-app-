import React, { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/Popover";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationCenter({ notifications, onMarkAsRead, onClearAll }: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-slate-400 hover:text-purple-600 transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-hidden border-slate-100 shadow-2xl rounded-2xl">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Notifications</h3>
          {notifications.length > 0 && (
            <button 
              onClick={onClearAll}
              className="text-[10px] font-bold text-slate-400 hover:text-purple-600 uppercase tracking-widest"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Bell className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              <AnimatePresence initial={false}>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={cn(
                      "p-4 flex gap-3 hover:bg-slate-50/50 transition-colors cursor-pointer relative",
                      !notification.read && "bg-purple-50/30"
                    )}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                      notification.type === "success" && "bg-emerald-100 text-emerald-600",
                      notification.type === "warning" && "bg-amber-100 text-amber-600",
                      notification.type === "info" && "bg-purple-100 text-purple-600"
                    )}>
                      {notification.type === "success" && <CheckCircle className="h-4 w-4" />}
                      {notification.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                      {notification.type === "info" && <Info className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1 pr-4">
                      <p className="text-xs font-bold text-slate-900 leading-tight">{notification.title}</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{notification.message}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{notification.timestamp}</p>
                    </div>
                    {!notification.read && (
                      <div className="absolute top-4 right-4 h-2 w-2 bg-purple-600 rounded-full" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-50/50 border-t border-slate-50 text-center">
          <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline">
            View All Activity
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
