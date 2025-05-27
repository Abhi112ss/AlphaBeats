"use client";
import { useGlobalStore } from "@/store/global";
import { Github, Hash, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SyncProgress } from "../ui/SyncProgress";

interface TopBarProps {
  roomId: string;
}

export const TopBar = ({ roomId }: TopBarProps) => {
  const isLoadingAudio = useGlobalStore((state) => state.isInitingSystem);
  const isSynced = useGlobalStore((state) => state.isSynced);
  const roundTripEstimate = useGlobalStore((state) => state.roundTripEstimate);
  const sendNTPRequest = useGlobalStore((state) => state.sendNTPRequest);
  const resetNTPConfig = useGlobalStore((state) => state.resetNTPConfig);
  const pauseAudio = useGlobalStore((state) => state.pauseAudio);
  const connectedClients = useGlobalStore((state) => state.connectedClients);
  const setIsLoadingAudio = useGlobalStore((state) => state.setIsInitingSystem);
  const clockOffset = useGlobalStore((state) => state.offsetEstimate);
  const resync = () => {
    try {
      pauseAudio({ when: 0 });
    } catch (error) {
      console.error("Failed to pause audio:", error);
    }
    resetNTPConfig();
    sendNTPRequest();
    setIsLoadingAudio(true);
  };

  // Show minimal nav bar when synced and not loading
  if (!isLoadingAudio && isSynced) {
    return (
      <div className="h-8 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-purple-950/20 to-black/95 backdrop-blur-xl"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent"></div>
        
        {/* Subtle glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-violet-500/5 to-purple-500/5"></div>
        
        <div className="relative z-10 h-full flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 text-xs py-2 md:py-0">
            {/* Brand with glow effect */}
            <Link
              href="/"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 hover:from-green-300 hover:to-emerald-200 transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]"
            >
              AlphaBeats
            </Link>
            
            {/* Sync status with pulsing glow */}
            <div className="flex items-center group">
              <div className="relative mr-1.5">
                {/* Outer glow ring */}
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-400 animate-ping opacity-30"></div>
                {/* Inner dot */}
                <div className="relative w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(34,197,94,0.8)]"></div>
              </div>
              <span className="text-green-300 font-medium group-hover:text-green-200 transition-colors duration-200">
                Synced
              </span>
            </div>
            
            {/* Room ID with tech styling */}
            <div className="flex items-center text-violet-300 hover:text-violet-200 transition-colors duration-200 group">
              <Hash size={12} className="mr-1 group-hover:drop-shadow-[0_0_4px_rgba(139,92,246,0.6)]" />
              <span className="font-mono bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                {roomId}
              </span>
            </div>
            
            {/* Users count with glow */}
            <div className="flex items-center text-emerald-300 hover:text-emerald-200 transition-colors duration-200 group">
              <Users size={12} className="mr-1 group-hover:drop-shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
              <span className="font-medium">
                <span className="mr-1.5 bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                  {connectedClients.length}{" "}
                  {connectedClients.length === 1 ? "user" : "users"}
                </span>
              </span>
            </div>
            
            {/* Separator with glow */}
            <div className="hidden md:block text-purple-400/60">|</div>
            
            {/* Stats with tech styling */}
            <div className="hidden md:flex items-center space-x-3 text-xs">
              <span className="text-cyan-300 font-mono hover:text-cyan-200 transition-colors duration-200">
                Offset: <span className="text-green-300 font-bold">{clockOffset.toFixed(2)}</span> ms
              </span>
              <span className="text-cyan-300 font-mono hover:text-cyan-200 transition-colors duration-200">
                RTT: <span className="text-green-300 font-bold">{roundTripEstimate.toFixed(2)}</span> ms
              </span>
            </div>
            
            {/* Separator with glow */}
            <div className="hidden md:block text-purple-400/60">|</div>
            
            {/* Full Sync button with futuristic styling */}
            <button
              onClick={resync}
              className="hidden md:block relative group px-3 py-1 rounded-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 hover:text-green-100 transition-all duration-300 hover:border-green-300/60 hover:shadow-[0_0_12px_rgba(34,197,94,0.3)] hover:bg-gradient-to-r hover:from-green-500/30 hover:to-emerald-500/30 active:scale-95"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative font-medium text-xs">Full Sync</span>
            </button>
          </div>

          {/* GitHub icon with hover magic */}
          <a
            href="https://github.com/freeman-jiang/beatsync"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-1 rounded-md transition-all duration-300 hover:bg-purple-500/20 hover:shadow-[0_0_16px_rgba(139,92,246,0.4)]"
          >
            {/* Hover glow background */}
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/0 via-violet-400/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Github 
              size={16} 
              className="relative text-purple-300 group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transform group-hover:scale-110" 
            />
          </a>
        </div>
        
        {/* Subtle animated particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-violet-400/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    );
  }

  // Use the existing SyncProgress component for loading/syncing states
  return (
    <AnimatePresence>
      {isLoadingAudio && (
        <motion.div 
          exit={{ opacity: 0, scale: 0.95 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Add subtle glow to sync progress container */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-violet-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative">
            <SyncProgress />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};