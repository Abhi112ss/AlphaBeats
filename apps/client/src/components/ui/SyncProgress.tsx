"use client";

import { MAX_NTP_MEASUREMENTS, useGlobalStore } from "@/store/global";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SyncProgressProps {
  // Loading state flags
  isLoading?: boolean; // Initial loading phase (room/socket/audio)
  loadingMessage?: string; // Message for initial loading phase

  // Sync state
  isSyncComplete?: boolean; // Whether sync is complete
}

export const SyncProgress = ({
  isLoading = false,
  loadingMessage = "Loading...",
}: SyncProgressProps) => {
  // Internal state for tracking progress animation
  const syncProgress = useGlobalStore(
    (state) => state.ntpMeasurements.length / MAX_NTP_MEASUREMENTS
  );
  const isSyncComplete = useGlobalStore((state) => state.isSynced);
  const setIsLoadingAudio = useGlobalStore((state) => state.setIsInitingSystem);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Message state based on current progress phase
  const [message, setMessage] = useState("Loading...");

  // Effect to handle initial loading animation (0-20%)
  useEffect(() => {
    // In loading phase, animate progress from 0 to 20%
    if (isLoading) {
      setMessage(loadingMessage);

      const initialLoadInterval = setInterval(() => {
        setAnimatedProgress((prev) => {
          // Cap at 0.19 (19%) to visually indicate we're still loading
          const nextProgress = prev + 0.005;
          return nextProgress >= 0.1 ? 0.1 : nextProgress;
        });
      }, 40);

      return () => clearInterval(initialLoadInterval);
    }

    // In syncing phase, scale progress from 20% to 100%
    setMessage("Synchronizing time...");

    // If sync is complete, set to 100%
    if (isSyncComplete) {
      setAnimatedProgress(1);
    } else {
      // Otherwise, scale the syncProgress to 20%-100% range
      setAnimatedProgress(0.1 + syncProgress * 0.9);
    }
  }, [isLoading, syncProgress, isSyncComplete, loadingMessage]);

  // Normalize progress to ensure it's between 0 and 1
  const normalizedProgress = Math.min(Math.max(animatedProgress, 0), 1);

  if (isSyncComplete) {
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(5px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse at top left, rgba(124, 58, 237, 0.1) 0%, transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, 
              rgba(2, 6, 23, 0.98) 0%,
              rgba(15, 23, 42, 0.95) 50%,
              rgba(30, 41, 59, 0.92) 100%
            )
          `
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/60 rounded-full blur-sm"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-violet-400/50 rounded-full blur-sm"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [-15, 15, -15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-purple-400/40 rounded-full blur-sm"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          />
        </div>

        {/* Success overlay glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-violet-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="w-full max-w-md px-4 relative z-10">
          <motion.div
            className={`
              flex flex-col items-center justify-center p-8 relative overflow-hidden
              bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-purple-900/60
              backdrop-blur-xl border border-emerald-400/30 shadow-2xl shadow-emerald-500/20
              rounded-2xl
            `}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Card background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10 rounded-2xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated border accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent rounded-t-2xl"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className={`
                w-16 h-16 flex items-center justify-center mb-4 relative
                bg-gradient-to-br from-emerald-500/20 to-violet-500/20
                backdrop-blur-sm border border-emerald-400/40 rounded-2xl
                shadow-lg shadow-emerald-500/30
              `}
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Icon glow effect */}
              <motion.div
                className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-emerald-300 relative z-10 drop-shadow-sm"
              >
                <motion.path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            <motion.h2
              className={`
                text-lg font-semibold tracking-tight mb-2 text-center
                bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 
                bg-clip-text text-transparent drop-shadow-sm
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Synchronization Complete
            </motion.h2>

            <motion.p
              className="text-slate-300/90 mb-6 text-center text-sm leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Your device is now synchronized with this room.
            </motion.p>

            <motion.button
              className={`
                mt-2 px-6 py-3 relative overflow-hidden
                bg-gradient-to-r from-emerald-500 to-emerald-600
                hover:from-emerald-400 hover:to-emerald-500
                text-white font-medium text-sm tracking-wide cursor-pointer w-full
                rounded-xl shadow-lg shadow-emerald-500/30
                border border-emerald-400/50
                transition-all duration-300 ease-out
              `}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => setIsLoadingAudio(false)}
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-violet-400/20 rounded-xl"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">Start System</span>
            </motion.button>

            <motion.p
              className="text-slate-400/80 mt-5 text-center text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Use native device speakers.
            </motion.p>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, transparent 70%),
          radial-gradient(ellipse at top right, rgba(124, 58, 237, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at bottom left, rgba(147, 51, 234, 0.06) 0%, transparent 60%),
          linear-gradient(135deg, 
            rgba(2, 6, 23, 0.98) 0%,
            rgba(15, 23, 42, 0.95) 50%,
            rgba(30, 41, 59, 0.92) 100%
          )
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/5 w-1.5 h-1.5 bg-emerald-400/50 rounded-full blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-1 h-1 bg-violet-400/40 rounded-full blur-sm"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.6, 0.2],
            x: [-12, 12, -12],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-0.5 h-0.5 bg-purple-400/60 rounded-full blur-sm"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>

      {/* Loading overlay pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-violet-500/5"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="w-full max-w-md px-4 relative z-10">
        <motion.div
          className={`
            flex flex-col items-center justify-center p-8 relative overflow-hidden
            bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-purple-900/60
            backdrop-blur-xl border border-emerald-400/20 shadow-2xl shadow-emerald-500/10
            rounded-2xl
          `}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Card background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5 rounded-2xl"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated progress indicator */}
          <div className="w-20 h-20 mb-4 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-700/50"
              />

              {/* Progress circle with gradient */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-sm"
                stroke="url(#progressGradient)"
                strokeDasharray={2 * Math.PI * 42}
                initial={{
                  strokeDashoffset: 2 * Math.PI * 42,
                }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 42 * (1 - normalizedProgress),
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06d6a0" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Progress percentage with glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className={`
                  text-sm font-semibold
                  bg-gradient-to-r from-emerald-300 to-violet-300 
                  bg-clip-text text-transparent drop-shadow-sm
                `}
                key={Math.round(normalizedProgress * 100)}
                initial={{ opacity: 0.8, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {`${Math.round(normalizedProgress * 100)}%`}
              </motion.div>
            </div>

            {/* Rotating accent ring */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent border-t-emerald-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <motion.h2
            className={`
              text-lg font-semibold tracking-tight mb-2 text-center
              bg-gradient-to-r from-emerald-300 via-emerald-200 to-violet-300 
              bg-clip-text text-transparent drop-shadow-sm
            `}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Beatsync calibrating
          </motion.h2>

          <motion.p
            className="text-slate-300/80 mb-6 text-center text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {message}
          </motion.p>

          {/* Enhanced progress bar */}
          <div className="w-full h-1.5 bg-slate-800/60 rounded-full overflow-hidden mt-2 mb-2 relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 rounded-full"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-violet-400 rounded-full shadow-sm shadow-emerald-500/30 relative z-10"
              initial={{ width: "0%" }}
              animate={{ width: `${normalizedProgress * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};