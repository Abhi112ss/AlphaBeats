import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { motion } from "motion/react";
import { UserGrid } from "../room/UserGrid";

interface RightProps {
  className?: string;
}

export const Right = ({ className }: RightProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full lg:w-80 lg:flex-shrink-0 relative overflow-hidden",
        // Futuristic border with animated glow
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-emerald-500/20 before:via-transparent before:to-violet-500/20 before:blur-sm before:z-0",
        "after:absolute after:inset-0 after:border-l-2 after:border-transparent after:bg-gradient-to-b after:from-emerald-400/50 after:via-purple-400/30 after:to-violet-500/50 after:bg-clip-border after:z-10",
        // Main background with glassmorphism
        "bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-purple-900/40 backdrop-blur-xl",
        // Animated shimmer overlay
        "before:animate-pulse",
        "flex flex-col pb-4 lg:pb-0 text-sm space-y-1 overflow-y-auto pr-2 flex-shrink-0",
        // Custom scrollbar with neon effect
        "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-emerald-500/40 scrollbar-track-transparent hover:scrollbar-thumb-emerald-400/60",
        className
      )}
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%,
            rgba(30, 41, 59, 0.85) 25%,
            rgba(88, 28, 135, 0.3) 50%,
            rgba(124, 58, 237, 0.4) 75%,
            rgba(16, 185, 129, 0.2) 100%
          )
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 right-4 w-2 h-2 bg-emerald-400/60 rounded-full blur-sm"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-8 w-1 h-1 bg-violet-400/50 rounded-full blur-sm"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-3/4 right-2 w-1.5 h-1.5 bg-purple-400/40 rounded-full blur-sm"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div 
        className="flex-1 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <UserGrid />
      </motion.div>

      <motion.div 
        className={cn(
          "flex flex-col gap-3 px-4 py-4 mt-1 mx-3 mb-3 relative z-20",
          "rounded-xl overflow-hidden",
          // Futuristic card background
          "bg-gradient-to-br from-slate-800/60 via-purple-900/40 to-emerald-900/30",
          "backdrop-blur-md border border-emerald-400/20",
          // Animated glow effect
          "shadow-lg shadow-emerald-500/10",
          // Hover effects
          "hover:shadow-emerald-400/20 hover:border-emerald-400/40 hover:bg-gradient-to-br hover:from-slate-800/80 hover:via-purple-900/50 hover:to-emerald-900/40",
          "transition-all duration-500 ease-out",
          // Inner glow
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-emerald-400/5 before:to-transparent before:blur-sm",
        )}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Animated top border accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex items-start gap-3 relative">
          <motion.div
            className={cn(
              "flex-shrink-0 p-2 rounded-lg",
              "bg-gradient-to-br from-emerald-500/20 to-violet-500/20",
              "border border-emerald-400/30",
              "shadow-lg shadow-emerald-500/20"
            )}
            whileHover={{ 
              scale: 1.1,
              rotate: 5
            }}
            transition={{ duration: 0.2 }}
          >
            <Info className="h-4 w-4 text-emerald-300 drop-shadow-sm" />
          </motion.div>
          
          <div className="flex-1">
            <motion.h5 
              className={cn(
                "text-sm font-semibold mb-2 flex items-center gap-2",
                "bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 bg-clip-text text-transparent",
                "drop-shadow-sm"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              What is this?
              <motion.span
                className="inline-block w-2 h-2 bg-emerald-400/60 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.h5>
            
            <motion.p 
              className={cn(
                "text-xs leading-relaxed mb-3",
                "text-slate-300/90 hover:text-slate-200/95",
                "transition-colors duration-300"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              This grid simulates a spatial audio environment. The headphone
              icon (🎧) is a listening source. The circles represent other
              devices in the room.
            </motion.p>
            
            <motion.p 
              className={cn(
                "text-xs leading-relaxed",
                "text-slate-300/80 hover:text-emerald-200/90",
                "transition-colors duration-300",
                // Subtle highlight effect
                "hover:drop-shadow-sm"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {
                "Drag the headphone icon around and hear how the volume changes on each device. Isn't it cool!"
              }
            </motion.p>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        />
      </motion.div>

      {/* Side glow effect */}
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400/0 via-emerald-400/60 to-violet-500/40 blur-sm pointer-events-none z-10" />
    </motion.div>
  );
};