"use client";

import { cn } from "@/lib/utils";
import { Library, Search } from "lucide-react";
import { motion } from "motion/react";
import { AudioUploaderMinimal } from "../AudioUploaderMinimal";
import { Button } from "../ui/button";
import { AudioControls } from "./AudioControls";

interface LeftProps {
  className?: string;
}

export const Left = ({ className }: LeftProps) => {
  // const shareRoom = () => {
  //   try {
  //     navigator.share({
  //       title: "Join my BeatSync room",
  //       text: `Join my BeatSync room with code: ${roomId}`,
  //       url: window.location.href,
  //     });
  //   } catch {
  //     copyRoomId();
  //   }
  // };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "w-full lg:w-72 flex-shrink-0 relative overflow-hidden flex flex-col h-full text-sm group",
        "scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-emerald-500/20 scrollbar-track-transparent hover:scrollbar-thumb-emerald-500/40",
        "overflow-y-auto",
        className
      )}
    >
      {/* Futuristic background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl" />
      
      {/* Animated border */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/30 via-violet-500/40 to-emerald-500/30 group-hover:from-emerald-400/50 group-hover:via-violet-400/60 group-hover:to-emerald-400/50 transition-all duration-700" />
      
      {/* Floating orb decorations */}
      <div className="absolute top-6 right-4 w-2 h-2 rounded-full bg-emerald-400/40 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.4)]" />
      <div className="absolute top-20 right-2 w-1.5 h-1.5 rounded-full bg-violet-400/30 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.3)]" style={{ animationDelay: "0.5s" }} />
      
      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-12 h-12">
        <div className="absolute top-3 left-3 w-6 h-[1px] bg-gradient-to-r from-emerald-400/60 to-transparent" />
        <div className="absolute top-3 left-3 w-[1px] h-6 bg-gradient-to-b from-emerald-400/60 to-transparent" />
      </div>

      {/* Header Section with holographic styling */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 px-4 py-4"
      >
        <h2 className="text-lg font-bold select-none flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
          {/* Holographic icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400/20 to-violet-400/20 border border-emerald-400/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <div className="w-3 h-3 rounded-md bg-gradient-to-br from-emerald-400 to-teal-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
          </div>
          
          <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent font-extrabold tracking-wide">
            YOUR LIBRARY
          </span>
          
          {/* Animated accent line */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-emerald-400/50 to-transparent group-hover:from-emerald-400/80 transition-all duration-500" />
        </h2>
      </motion.div>

      {/* Navigation Menu with enhanced futuristic styling */}
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 px-4 space-y-3 py-2"
      >
        <Button
          className="w-full flex justify-start gap-4 py-3 text-white font-semibold rounded-xl text-sm transition-all duration-300 group/btn relative overflow-hidden border border-emerald-500/20 hover:border-emerald-400/40 hover:scale-105 hover:shadow-[0_0_25px_rgba(52,211,153,0.3)]"
          variant="ghost"
          style={{
            background: "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(16,185,129,0.10) 50%, rgba(5,150,105,0.15) 100%)",
          }}
        >
          {/* Scanning line effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 rounded-xl" />
          
          {/* Icon with glow */}
          <div className="relative z-10 p-1 rounded-md bg-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.4)]">
            <Library className="h-4 w-4 text-emerald-300" />
          </div>
          
          <span className="relative z-10 tracking-wide">Default Library</span>
          
          {/* Corner accent */}
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-emerald-400/30 rounded-tr-md" />
        </Button>

        <a href="https://cobalt.tools/" target="_blank">
          <Button
            className="w-full flex justify-start gap-4 py-3 text-white font-semibold rounded-xl text-sm transition-all duration-300 group/btn relative overflow-hidden border border-violet-500/20 hover:border-violet-400/40 hover:scale-105 hover:shadow-[0_0_25px_rgba(167,139,250,0.3)]"
            variant="ghost"
            style={{
              background: "linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(147,51,234,0.10) 50%, rgba(126,34,206,0.15) 100%)",
            }}
          >
            {/* Scanning line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 rounded-xl" />
            
            {/* Icon with glow */}
            <div className="relative z-10 p-1 rounded-md bg-violet-400/20 shadow-[0_0_10px_rgba(167,139,250,0.4)]">
              <Search className="h-4 w-4 text-violet-300" />
            </div>
            
            <span className="relative z-10 tracking-wide">Search Music</span>
            
            {/* Corner accent */}
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-violet-400/30 rounded-tr-md" />
          </Button>
        </a>
      </motion.div>

      {/* Enhanced Separator */}
      <div className="relative z-10 mx-4 my-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 -mt-1.5">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400/60 to-violet-400/40 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
        </div>
      </div>

      {/* Audio Controls */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative z-10"
      >
        <AudioControls />
      </motion.div>

      {/* Tips Section with futuristic styling */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 mt-auto pb-4 pt-2"
      >
        <div className="flex flex-col gap-4 p-4">
          {/* Enhanced border */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
          
          {/* Tips header with holographic styling */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-400/20 to-emerald-400/20 border border-teal-400/30 flex items-center justify-center backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
            </div>
            <h5 className="text-sm font-bold text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text tracking-wide">
              SYSTEM TIPS
            </h5>
          </div>
          
          {/* Enhanced tips list */}
          <ul className="space-y-3 pl-2">
            {[
              "Works best with multiple devices IRL in the same space.",
              "If audio gets de-synced, pause, play / full sync and try again or refresh.",
              "Play on speaker directly. Don't use Bluetooth."
            ].map((tip, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 group/tip hover:scale-105 transition-transform duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 mt-2 shadow-[0_0_6px_rgba(45,212,191,0.5)] group-hover/tip:shadow-[0_0_10px_rgba(45,212,191,0.8)] transition-all duration-300" />
                <span className="text-xs leading-relaxed text-slate-300 group-hover/tip:text-slate-200 transition-colors duration-300">
                  {tip}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Audio Uploader with enhanced styling */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="pl-4 pr-2"
        >
          <AudioUploaderMinimal />
        </motion.div>

        {/* Bottom floating particles */}
        <div className="absolute bottom-2 right-6 flex space-x-2">
          <div className="w-1 h-1 rounded-full bg-emerald-400/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "0s" }} />
          <div className="w-1 h-1 rounded-full bg-violet-400/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.7s" }} />
          <div className="w-1 h-1 rounded-full bg-teal-400/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "1.4s" }} />
        </div>
      </motion.div>
    </motion.div>
  );
};