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
  return (
    <>
      {/* Global Bellota Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bellota:wght@300;400;700&display=swap');
        
        .bellota-font {
          font-family: 'Bellota', cursive;
        }
        
        /* Custom scrollbar styling */
        .cyber-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .cyber-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 170, 0.1);
          border-radius: 10px;
        }
        
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #00ffcc, #7c3aed);
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
        }
        
        .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #00ffaa, #4b006e);
          box-shadow: 0 0 15px rgba(0, 255, 170, 0.8);
        }
        
        /* Floating particle animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        .float-particle {
          animation: float 4s ease-in-out infinite;
        }
        
        /* Cyber glow pulse */
        @keyframes cyber-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 255, 204, 0.4), 
                        0 0 40px rgba(0, 255, 204, 0.2),
                        inset 0 0 20px rgba(0, 255, 204, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 255, 204, 0.8), 
                        0 0 60px rgba(0, 255, 204, 0.4),
                        inset 0 0 30px rgba(0, 255, 204, 0.2);
          }
        }
        
        .cyber-glow {
          animation: cyber-pulse 3s ease-in-out infinite;
        }
        
        /* Holographic shimmer effect */
        @keyframes hologram-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .hologram-text {
          background: linear-gradient(
            90deg,
            #00ffcc 0%,
            #00ffaa 25%,
            #7c3aed 50%,
            #4b006e 75%,
            #00ffcc 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: hologram-shimmer 3s linear infinite;
        }
        
        /* Neural network lines */
        @keyframes neural-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .neural-line {
          animation: neural-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <motion.div
        initial={{ x: -50, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100
        }}
        className={cn(
          "w-full lg:w-72 flex-shrink-0 relative overflow-hidden flex flex-col h-full text-sm group bellota-font cyber-scrollbar",
          "overflow-y-auto",
          className
        )}
      >
        {/* Advanced futuristic background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/98 via-indigo-950/95 to-slate-900/98 backdrop-blur-2xl" />
        
        {/* Cyber grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 204, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 204, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Animated holographic border with neural network effect */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-cyan-300/80 via-violet-400/80 to-cyan-300/80"
            animate={{
              opacity: [0.4, 1, 0.4],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Dynamic floating particles with enhanced glow */}
        <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 float-particle cyber-glow" />
        <div className="absolute top-24 right-3 w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 float-particle cyber-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-40 right-8 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 float-particle" style={{ animationDelay: "2s" }} />
        
        {/* Enhanced corner accent with neural lines */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute top-4 left-4 w-8 h-[2px] bg-gradient-to-r from-cyan-400/80 via-emerald-400/60 to-transparent neural-line" />
          <div className="absolute top-4 left-4 w-[2px] h-8 bg-gradient-to-b from-cyan-400/80 via-emerald-400/60 to-transparent neural-line" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-6 left-6 w-4 h-4 border border-cyan-400/40 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        </div>

        {/* Header Section with advanced holographic styling */}
        <motion.div 
          initial={{ y: -20, opacity: 0, rotateX: -15 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "backOut" }}
          className="relative z-10 px-6 py-6"
        >
          <motion.h2 
            className="text-xl font-bold select-none flex items-center gap-4 group-hover:scale-110 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
          >
            {/* Enhanced holographic icon with layered effects */}
            <motion.div 
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/30 via-emerald-400/20 to-violet-400/30 border-2 border-cyan-400/40 flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,204,0.4)]"
              whileHover={{ 
                rotateY: 180,
                boxShadow: "0 0 50px rgba(0,255,204,0.8)"
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-violet-300/20 rounded-xl animate-pulse" />
              <div className="relative w-4 h-4 rounded-lg bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-400 shadow-[0_0_15px_rgba(0,255,204,0.8)]" />
              
              {/* Orbital rings */}
              <div className="absolute inset-0 border border-cyan-300/30 rounded-xl animate-spin" style={{ animationDuration: "8s" }} />
              <div className="absolute inset-1 border border-violet-300/20 rounded-lg animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                className="hologram-text font-extrabold text-lg tracking-wider"
                whileHover={{ scale: 1.1 }}
              >
                YOUR LIBRARY
              </motion.span>
              <motion.div 
                className="w-24 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-transparent mt-1"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
          </motion.h2>
        </motion.div>

        {/* Navigation Menu with cyber-enhanced styling */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative z-10 px-6 space-y-4 py-3"
        >
          <motion.div
            whileHover={{ scale: 1.03, rotateX: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full flex justify-start gap-4 py-4 text-white font-semibold rounded-2xl text-sm transition-all duration-500 group/btn relative overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-300/60 shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:shadow-[0_0_40px_rgba(0,255,204,0.5)]"
              variant="ghost"
              style={{
                background: "linear-gradient(135deg, rgba(0,255,204,0.15) 0%, rgba(20,184,166,0.10) 30%, rgba(6,182,212,0.15) 70%, rgba(0,255,170,0.10) 100%)",
              }}
            >
              {/* Advanced scanning line effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              
              {/* Cyber particles */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60" />
              <div className="absolute bottom-2 right-4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40" style={{ animationDelay: "0.5s" }} />
              
              {/* Enhanced icon with multi-layer glow */}
              <motion.div 
                className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-cyan-400/30 to-emerald-400/20 shadow-[0_0_20px_rgba(0,255,204,0.6)] border border-cyan-300/40"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <Library className="h-5 w-5 text-cyan-300" />
              </motion.div>
              
              <span className="relative z-10 tracking-wide font-bold bellota-font">Default Library</span>
              
              {/* Enhanced corner accents */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-400/40 rounded-bl-lg" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, rotateX: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <a href="https://cobalt.tools/" target="_blank">
              <Button
                className="w-full flex justify-start gap-4 py-4 text-white font-semibold rounded-2xl text-sm transition-all duration-500 group/btn relative overflow-hidden border-2 border-violet-400/30 hover:border-violet-300/60 shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
                variant="ghost"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(147,51,234,0.10) 30%, rgba(168,85,247,0.15) 70%, rgba(75,0,110,0.10) 100%)",
                }}
              >
                {/* Advanced scanning line effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                
                {/* Cyber particles */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-violet-400 rounded-full animate-ping opacity-60" />
                <div className="absolute bottom-2 right-4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40" style={{ animationDelay: "0.5s" }} />
                
                {/* Enhanced icon with multi-layer glow */}
                <motion.div 
                  className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-violet-400/30 to-purple-400/20 shadow-[0_0_20px_rgba(124,58,237,0.6)] border border-violet-300/40"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Search className="h-5 w-5 text-violet-300" />
                </motion.div>
                
                <span className="relative z-10 tracking-wide font-bold bellota-font">Search Music</span>
                
                {/* Enhanced corner accents */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-violet-400/50 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/40 rounded-bl-lg" />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Enhanced Separator with neural connection */}
        <motion.div 
          className="relative z-10 mx-6 my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 -mt-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/80 via-emerald-400/60 to-violet-400/80 shadow-[0_0_20px_rgba(0,255,204,0.6)]" />
            <div className="absolute inset-1 rounded-full border border-white/20" />
          </motion.div>
          
          {/* Neural connection nodes */}
          <div className="absolute left-1/4 top-0 w-2 h-2 -mt-1 bg-cyan-400/60 rounded-full animate-pulse" />
          <div className="absolute right-1/4 top-0 w-2 h-2 -mt-1 bg-violet-400/60 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        </motion.div>

        {/* Audio Controls with enhanced container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 px-2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-violet-400/10 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-cyan-400/20 backdrop-blur-xl">
              <AudioControls />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tips Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 mt-auto pb-6 pt-4"
        >
          <div className="flex flex-col gap-6 p-6">
            {/* Enhanced holographic border */}
            <motion.div 
              className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
            
            {/* Enhanced tips header */}
            <motion.div 
              className="flex items-center gap-4 mt-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-cyan-400/30 border-2 border-emerald-400/40 flex items-center justify-center backdrop-blur-xl shadow-[0_0_25px_rgba(45,212,191,0.5)]"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-3 h-3 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
              </motion.div>
              
              <motion.h5 
                className="text-base font-bold hologram-text tracking-wider bellota-font"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                SYSTEM TIPS
              </motion.h5>
              
              <motion.div 
                className="flex-1 h-[2px] bg-gradient-to-r from-emerald-400/60 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              />
            </motion.div>
            
            {/* Enhanced tips list with cyber styling */}
            <ul className="space-y-4 pl-2">
              {[
                "Works best with multiple devices IRL in the same space.",
                "If audio gets de-synced, pause, play / full sync and try again or refresh.",
                "Play on speaker directly. Don't use Bluetooth."
              ].map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                  className="flex items-start gap-4 group/tip"
                  whileHover={{ scale: 1.03, x: 5 }}
                >
                  <motion.div 
                    className="relative w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-2 shadow-[0_0_10px_rgba(45,212,191,0.6)]"
                    animate={{ 
                      boxShadow: [
                        "0 0 10px rgba(45,212,191,0.6)",
                        "0 0 20px rgba(45,212,191,0.9)",
                        "0 0 10px rgba(45,212,191,0.6)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <span className="text-sm leading-relaxed text-slate-300 group-hover/tip:text-white transition-all duration-300 bellota-font font-medium">
                    {tip}
                  </span>
                  
                  {/* Subtle hover glow line */}
                  <motion.div 
                    className="absolute left-6 right-0 bottom-0 h-[1px] bg-gradient-to-r from-emerald-400/0 to-emerald-400/40 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-300"
                  />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Enhanced Audio Uploader */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="px-6 pr-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-violet-400/10 rounded-2xl blur-lg" />
              <div className="relative">
                <AudioUploaderMinimal />
              </div>
            </div>
          </motion.div>

          {/* Enhanced floating particles constellation */}
          <div className="absolute bottom-4 right-8 flex space-x-3">
            {[0, 0.8, 1.6].map((delay, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === 0 ? 'bg-emerald-400/60' : 
                  i === 1 ? 'bg-violet-400/60' : 'bg-cyan-400/60'
                }`}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  delay: delay,
                  ease: "easeInOut"
                }}
                style={{ 
                  boxShadow: `0 0 10px ${
                    i === 0 ? 'rgba(45,212,191,0.6)' :
                    i === 1 ? 'rgba(124,58,237,0.6)' : 'rgba(0,255,204,0.6)'
                  }`
                }}
              />
            ))}
          </div>
          
          {/* Neural network connection lines */}
          <svg className="absolute bottom-2 right-4 w-16 h-8 opacity-30">
            <motion.path
              d="M0,4 Q8,0 16,4 T32,4"
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00ffaa" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
};