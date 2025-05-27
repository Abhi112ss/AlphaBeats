import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Queue } from "../Queue";

export const Main = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full lg:flex-1 overflow-y-auto h-full relative",
        // Futuristic multi-layer background
        "bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-purple-950/80",
        // Animated overlay gradients
        "before:absolute before:inset-0 before:bg-gradient-to-tr before:from-emerald-950/20 before:via-transparent before:to-violet-950/30 before:pointer-events-none before:z-0",
        "after:absolute after:inset-0 after:bg-gradient-to-bl after:from-transparent after:via-emerald-900/10 after:to-purple-900/20 after:pointer-events-none after:z-0",
        // Enhanced glassmorphism
        "backdrop-blur-2xl",
        // Futuristic scrollbar with neon glow
        "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-emerald-500/40 scrollbar-track-transparent hover:scrollbar-thumb-emerald-400/70 hover:scrollbar-thumb-glow",
        // Subtle border glow
        "border-r border-emerald-400/10"
      )}
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(124, 58, 237, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, 
            rgba(2, 6, 23, 0.98) 0%,
            rgba(15, 23, 42, 0.95) 30%,
            rgba(30, 41, 59, 0.92) 60%,
            rgba(88, 28, 135, 0.15) 80%,
            rgba(16, 185, 129, 0.08) 100%
          )
        `
      }}
    >
      {/* Floating ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          className="absolute top-1/6 left-1/4 w-1 h-1 bg-emerald-400/40 rounded-full blur-sm"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-violet-400/50 rounded-full blur-sm"
          animate={{
            y: [10, -15, 10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-purple-400/30 rounded-full blur-sm"
          animate={{
            y: [15, -10, 15],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-0.5 h-0.5 bg-emerald-300/60 rounded-full blur-sm"
          animate={{
            x: [-8, 8, -8],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-violet-300/40 rounded-full blur-sm"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>

      {/* Animated edge glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        className="p-6 pt-4 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        {/* Optional: Uncomment and style the header if needed */}
        {/* <motion.h1 
          className={cn(
            "text-xl font-semibold mb-8",
            "bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 bg-clip-text text-transparent",
            "drop-shadow-lg"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          BeatSync
        </motion.h1> */}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Queue className="mb-8" />
        </motion.div>

        {/* Subtle bottom accent */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Side accent glow */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/0 via-emerald-400/40 to-violet-500/30 blur-sm pointer-events-none z-10" />
      
      {/* Corner accent lights */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/50 rounded-full blur-sm"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-violet-400/40 rounded-full blur-sm"
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.div>
  );
};