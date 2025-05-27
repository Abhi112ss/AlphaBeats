"use client";
import { useGlobalStore } from "@/store/global";
import { useRoomStore } from "@/store/room";
import { motion } from "motion/react";

export const SpatialAudioBackground = () => {
  const userId = useRoomStore((state) => state.userId);
  const spatialConfig = useGlobalStore((state) => state.spatialConfig);

  // Get the current user's gain value (0 to 1), default to 0 if not found
  const gain = spatialConfig?.gains[userId]?.gain ?? 0;

  // If gain is 0, don't render anything
  if (gain <= 0) return null;

  return (
    <>
      {/* Primary futuristic gradient overlay with green dominance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: gain * 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-emerald-500/40 via-green-400/25 to-teal-500/30 blur-lg"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(16, 185, 129, ${gain * 0.3}) 0%, 
            rgba(5, 150, 105, ${gain * 0.2}) 25%, 
            rgba(6, 78, 59, ${gain * 0.15}) 50%, 
            rgba(88, 28, 135, ${gain * 0.1}) 75%, 
            rgba(67, 56, 202, ${gain * 0.05}) 100%)`
        }}
      />

      {/* Secondary neon glow layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [gain * 0.6, gain * 0.9, gain * 0.6],
          scale: [1, 1.02, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed inset-0 pointer-events-none -z-10 blur-2xl mix-blend-screen"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, 
            rgba(34, 197, 94, ${gain * 0.4}) 0deg, 
            rgba(168, 85, 247, ${gain * 0.3}) 120deg, 
            rgba(16, 185, 129, ${gain * 0.35}) 240deg, 
            rgba(34, 197, 94, ${gain * 0.4}) 360deg)`
        }}
      />

      {/* Floating energy orbs with green theme */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [gain * 0.7, gain, gain * 0.7],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-[10%] left-[15%] w-[30vw] h-[30vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(34, 197, 94, ${gain * 0.4}) 0%, 
            rgba(16, 185, 129, ${gain * 0.25}) 30%, 
            rgba(5, 150, 105, ${gain * 0.15}) 60%, 
            transparent 100%)`,
          filter: `blur(40px) brightness(1.2)`,
          boxShadow: `0 0 80px rgba(34, 197, 94, ${gain * 0.6}), 
                      inset 0 0 40px rgba(16, 185, 129, ${gain * 0.3})`
        }}
      />

      {/* Violet-purple accent orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [gain * 0.6, gain * 0.9, gain * 0.6],
          scale: [1, 1.15, 1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="fixed bottom-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(168, 85, 247, ${gain * 0.5}) 0%, 
            rgba(147, 51, 234, ${gain * 0.3}) 30%, 
            rgba(126, 34, 206, ${gain * 0.2}) 60%, 
            transparent 100%)`,
          filter: `blur(35px) brightness(1.3)`,
          boxShadow: `0 0 70px rgba(168, 85, 247, ${gain * 0.5}), 
                      inset 0 0 35px rgba(147, 51, 234, ${gain * 0.25})`
        }}
      />

      {/* Tech-green energy pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: [gain * 0.5, gain * 0.8, gain * 0.5],
          scale: [1, 1.25, 1],
          rotate: [0, 90, 180]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="fixed top-[40%] right-[20%] w-[20vw] h-[20vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(0, 255, 127, ${gain * 0.6}) 0deg, 
            rgba(32, 201, 151, ${gain * 0.4}) 90deg, 
            rgba(16, 185, 129, ${gain * 0.5}) 180deg, 
            rgba(6, 95, 70, ${gain * 0.3}) 270deg, 
            rgba(0, 255, 127, ${gain * 0.6}) 360deg)`,
          filter: `blur(30px) brightness(1.4)`,
          boxShadow: `0 0 60px rgba(0, 255, 127, ${gain * 0.4})`
        }}
      />

      {/* Mint-cyan floating accent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [gain * 0.4, gain * 0.75, gain * 0.4],
          scale: [1, 1.1, 1],
          y: [0, -15, 0],
          rotate: [0, 45, 90]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="fixed top-[30%] left-[30%] w-[15vw] h-[15vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(20, 184, 166, ${gain * 0.6}) 0%, 
            rgba(6, 182, 212, ${gain * 0.4}) 40%, 
            rgba(34, 197, 94, ${gain * 0.3}) 70%, 
            transparent 100%)`,
          filter: `blur(25px) brightness(1.5)`,
          boxShadow: `0 0 50px rgba(20, 184, 166, ${gain * 0.4})`
        }}
      />

      {/* Deep purple mystery orb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: [gain * 0.3, gain * 0.7, gain * 0.3],
          scale: [1, 1.18, 1],
          x: [0, 15, 0],
          rotate: [0, -90, -180]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="fixed bottom-[35%] left-[15%] w-[18vw] h-[18vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(124, 58, 237, ${gain * 0.5}) 0%, 
            rgba(109, 40, 217, ${gain * 0.35}) 30%, 
            rgba(88, 28, 135, ${gain * 0.25}) 60%, 
            rgba(16, 185, 129, ${gain * 0.15}) 80%, 
            transparent 100%)`,
          filter: `blur(32px) brightness(1.2)`,
          boxShadow: `0 0 65px rgba(124, 58, 237, ${gain * 0.4}), 
                      0 0 30px rgba(16, 185, 129, ${gain * 0.2})`
        }}
      />

      {/* Additional electric green sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, gain * 0.8, 0],
          scale: [0.5, 1.3, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="fixed top-[60%] right-[40%] w-[8vw] h-[8vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, 
            rgba(0, 255, 127, ${gain * 0.8}) 0%, 
            rgba(34, 197, 94, ${gain * 0.4}) 50%, 
            transparent 100%)`,
          filter: `blur(15px) brightness(2)`,
          boxShadow: `0 0 40px rgba(0, 255, 127, ${gain * 0.6})`
        }}
      />

      {/* Floating tech particle */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
          opacity: [0, gain * 0.6, 0],
          scale: [0.3, 1, 0.3],
          rotate: [0, 360, 720]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 7,
        }}
        className="fixed bottom-[60%] left-[60%] w-[6vw] h-[6vw] rounded-full pointer-events-none -z-10"
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(168, 85, 247, ${gain * 0.7}) 0deg, 
            rgba(34, 197, 94, ${gain * 0.8}) 120deg, 
            rgba(20, 184, 166, ${gain * 0.6}) 240deg, 
            rgba(168, 85, 247, ${gain * 0.7}) 360deg)`,
          filter: `blur(20px) brightness(1.8)`,
          boxShadow: `0 0 35px rgba(34, 197, 94, ${gain * 0.5})`
        }}
      />
    </>
  );
};