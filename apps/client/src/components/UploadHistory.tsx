"use client";

import { useGlobalStore } from "@/store/global";
import { CloudUpload, History } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Helper function to format relative time
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  // Convert to appropriate time unit
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
  return `${Math.floor(diff / 86400000)} days ago`;
};

export const UploadHistory = () => {
  const uploadHistory = useGlobalStore((state) => state.uploadHistory);
  const reuploadAudio = useGlobalStore((state) => state.reuploadAudio);

  const handleReupload = (item: {
    name: string;
    timestamp: number;
    id: string;
  }) => {
    reuploadAudio(item.id, item.name);
    toast.success(`Rebroadcasting ${item.name} to all users`);
  };

  return (
    <div className="relative">
      {/* Ambient glow background */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-purple-500/10 rounded-3xl blur-xl animate-pulse"></div>
      
      <Card className="relative backdrop-blur-md bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-800/90 border-0 shadow-2xl overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-violet-400/30 to-purple-400/30 rounded-lg"></div>
        <div className="absolute inset-px bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95 rounded-lg"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-violet-400 rounded-full animate-pulse"></div>
        
        <CardHeader className="relative flex flex-row items-center justify-between pb-2 z-10">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="relative">
              <History size={18} className="text-emerald-400 drop-shadow-lg filter" />
              <div className="absolute inset-0 text-emerald-400 animate-pulse opacity-50">
                <History size={18} />
              </div>
            </div>
            <span className="bg-gradient-to-r from-emerald-300 via-violet-300 to-purple-300 bg-clip-text text-transparent font-semibold tracking-wide">
              Upload History
            </span>
          </CardTitle>
          
          {/* Decorative elements */}
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-violet-400 rounded-full animate-pulse delay-150"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {uploadHistory.length === 0 ? (
            <div className="text-center py-8 relative">
              {/* Empty state glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-violet-500/5 to-purple-500/5 rounded-lg animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 via-violet-400/20 to-purple-400/20 rounded-full flex items-center justify-center">
                    <History size={24} className="text-emerald-400/60" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-purple-400/10 rounded-full animate-ping"></div>
                </div>
                
                <span className="text-slate-400 font-medium bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text">
                  No upload history yet
                </span>
                
                <div className="text-xs text-slate-500 bg-gradient-to-r from-emerald-400/20 via-violet-400/20 to-purple-400/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  Waiting for your first upload...
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto w-full custom-scrollbar">
              {uploadHistory.map((item, index) => (
                <div
                  key={`${item.name}-${item.timestamp}`}
                  className="group relative flex items-center justify-between p-3 rounded-xl transition-all duration-500 hover:scale-[1.02] transform-gpu"
                  style={{
                    animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Item background with animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/40 to-slate-800/50 rounded-xl transition-all duration-300 group-hover:from-emerald-900/30 group-hover:via-violet-900/20 group-hover:to-purple-900/30"></div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-violet-400/0 to-purple-400/0 rounded-xl transition-all duration-500 group-hover:from-emerald-400/10 group-hover:via-violet-400/5 group-hover:to-purple-400/10 group-hover:shadow-lg group-hover:shadow-emerald-500/20"></div>
                  
                  {/* Left border accent */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-emerald-400 via-violet-400 to-purple-400 rounded-full transition-all duration-300 group-hover:h-8"></div>
                  
                  <div className="relative flex flex-col flex-1 min-w-0 z-10">
                    <span className="text-sm font-medium truncate text-white group-hover:text-emerald-100 transition-colors duration-300">
                      {item.name}
                    </span>
                    <span className="text-xs bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-emerald-300 group-hover:to-violet-300">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>

                  {item.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleReupload(item)}
                      className="relative h-8 w-8 p-0 flex-shrink-0 ml-2 z-10 rounded-lg border-0 bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-emerald-600/80 hover:to-violet-600/60 transition-all duration-300 group/btn overflow-hidden"
                      title="Reupload to all users"
                    >
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-purple-400/0 transition-all duration-300 group-hover/btn:from-emerald-400/20 group-hover/btn:to-purple-400/20"></div>
                      
                      {/* Button sparkle effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
                        <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-pulse delay-150"></div>
                      </div>
                      
                      <CloudUpload 
                        size={14} 
                        className="relative z-10 text-slate-300 group-hover/btn:text-white transition-all duration-300 group-hover/btn:drop-shadow-lg group-hover/btn:scale-110" 
                      />
                    </Button>
                  )}
                  
                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-2 left-4 w-px h-px bg-emerald-400 rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-3 right-6 w-px h-px bg-violet-400 rounded-full animate-ping delay-200"></div>
                    <div className="absolute top-3 right-4 w-px h-px bg-purple-400 rounded-full animate-ping delay-300"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
      </Card>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(16, 185, 129), rgb(139, 92, 246));
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(5, 150, 105), rgb(124, 58, 237));
        }
      `}</style>
    </div>
  );
};