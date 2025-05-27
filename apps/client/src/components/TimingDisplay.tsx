import { cn } from "@/lib/utils";
import { formatTimeMicro } from "@/utils/time";

interface TimingDisplayProps {
  currentTime: number; // in milliseconds
  isPlaying: boolean;
  totalNudge: number; // in milliseconds
  clockOffset: number | null; // in milliseconds
}

export const TimingDisplay: React.FC<TimingDisplayProps> = ({
  currentTime,
  isPlaying,
  totalNudge,
  clockOffset,
}) => {
  // Calculate colors based on offset values
  const getOffsetColor = (offset: number) => {
    if (Math.abs(offset) < 1) return "bg-emerald-500"; // Very close - green
    if (offset > 0) return "bg-red-500"; // Ahead - red
    return "bg-blue-500"; // Behind - blue
  };

  // Get color based on 2-second cycle with futuristic colors
  const getTimeCycleColor = (timeMs: number) => {
    const cyclePosition = Math.floor((timeMs % 6000) / 2000);

    switch (cyclePosition) {
      case 0:
        return "bg-gradient-to-br from-red-500 via-red-400 to-pink-500"; // 0-2 seconds: Red gradient
      case 1:
        return "bg-gradient-to-br from-emerald-500 via-green-400 to-teal-500"; // 2-4 seconds: Green gradient
      case 2:
        return "bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-500"; // 4-6 seconds: Blue gradient
      default:
        return "bg-gradient-to-br from-slate-500 to-slate-600";
    }
  };

  // Get text color based on 2-second cycle
  const getTimeCycleTextColor = (timeMs: number) => {
    const cyclePosition = Math.floor((timeMs % 6000) / 2000);

    switch (cyclePosition) {
      case 0:
        return "text-red-400"; // 0-2 seconds: Red
      case 1:
        return "text-emerald-400"; // 2-4 seconds: Green
      case 2:
        return "text-blue-400"; // 4-6 seconds: Blue
      default:
        return "text-slate-400";
    }
  };

  // Calculate which 2-second block we're in
  const currentCycleSeconds = Math.floor((currentTime % 6000) / 1000);
  const currentColorName = [
    "Red", // 0s
    "Red", // 1s
    "Green", // 2s
    "Green", // 3s
    "Blue", // 4s
    "Blue", // 5s
  ][currentCycleSeconds];

  return (
    <div className="relative w-full max-w-md">
      {/* Ambient glow background */}
      <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-purple-500/10 rounded-3xl blur-2xl animate-pulse"></div>
      
      {/* Main container */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95 border-0 rounded-2xl shadow-2xl overflow-hidden p-6">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-violet-400/20 to-purple-400/20 rounded-2xl"></div>
        <div className="absolute inset-px bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-slate-800/98 rounded-2xl"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-6 right-8 w-1 h-1 bg-violet-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-700 opacity-40"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-emerald-300 via-violet-300 to-purple-300 bg-clip-text text-transparent tracking-wide">
              Precise Timing Display
            </h3>
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
          </div>

          {/* Color cycle indicator */}
          <div className="mb-6 group">
            <div className="flex justify-between mb-3 items-center">
              <span className="text-slate-300 font-medium">Color Cycle (6s):</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg ${getTimeCycleTextColor(currentTime)} drop-shadow-lg`}>
                  {currentColorName}
                </span>
                <div className="text-slate-400 bg-slate-800/50 px-2 py-1 rounded-lg text-sm backdrop-blur-sm border border-slate-700/50">
                  ({currentCycleSeconds % 2}s)
                </div>
              </div>
            </div>

            {/* Large color block for easy visual comparison between clients */}
            <div className="flex justify-center relative">
              {/* Glow effect around the block */}
              <div className="absolute inset-0 flex justify-center">
                <div className={cn(
                  "w-28 h-28 rounded-2xl blur-xl opacity-50 animate-pulse",
                  getTimeCycleColor(currentTime)
                )}></div>
              </div>
              
              <div className="relative group/block">
                <div
                  className={cn(
                    "w-24 h-24 rounded-2xl border-2 border-white/20 shadow-2xl transition-all duration-500 group-hover/block:scale-110 transform-gpu cursor-pointer overflow-hidden",
                    getTimeCycleColor(currentTime)
                  )}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                  
                  {/* Animated sparkles */}
                  <div className="absolute inset-0 opacity-60">
                    <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300"></div>
                    <div className="absolute top-4 right-4 w-px h-px bg-white rounded-full animate-ping delay-500"></div>
                  </div>
                  
                  <div className="relative w-full h-full flex items-center justify-center text-white font-bold text-3xl drop-shadow-lg z-10">
                    {currentCycleSeconds % 2}
                  </div>
                </div>
                
                {/* Reflection effect */}
                <div className="absolute -bottom-6 left-0 right-0 h-6 bg-gradient-to-b from-white/5 to-transparent rounded-b-2xl blur-sm opacity-30"></div>
              </div>
            </div>
          </div>

          {/* Current playback time with microsecond precision */}
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Playback Time:</span>
              <span
                className={cn(
                  "font-mono text-lg tracking-wider transition-all duration-300",
                  isPlaying 
                    ? "text-emerald-400 drop-shadow-lg animate-pulse" 
                    : "text-slate-400"
                )}
              >
                {formatTimeMicro(currentTime)}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="relative">
              <div className="w-full bg-slate-800/60 rounded-full h-3 backdrop-blur-sm border border-slate-700/30 overflow-hidden">
                {/* Glow track */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-violet-500/10 to-purple-500/20 animate-pulse"></div>
                
                <div
                  className="relative h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 rounded-full shadow-lg transition-all duration-150 ease-out"
                  style={{ width: `${(currentTime % 2000) / 20}%` }}
                >
                  {/* Inner highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-full"></div>
                  
                  {/* Moving shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Floating indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg transition-all duration-150 ease-out"
                style={{ left: `${(currentTime % 2000) / 20}%` }}
              >
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>

          {/* Nudge amount visualization */}
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Timing Adjustment:</span>
              <span className="font-mono text-lg tracking-wider text-slate-200">
                {totalNudge > 0 ? "+" : ""}
                {totalNudge} ms
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-slate-800/60 rounded-full h-3 backdrop-blur-sm border border-slate-700/30 flex items-center overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-slate-700/60 to-slate-600/40 rounded-l-full"></div>
                <div className="w-1/2 h-full bg-gradient-to-r from-slate-600/40 to-slate-700/60 rounded-r-full"></div>
                
                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400/50"></div>
              </div>
              
              {/* Nudge indicator */}
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-3 h-6 rounded-full shadow-lg transition-all duration-300 transform-gpu",
                  Math.abs(totalNudge) < 0.1
                    ? "bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-emerald-500/50"
                    : totalNudge > 0
                    ? "bg-gradient-to-b from-red-400 to-red-600 shadow-red-500/50"
                    : "bg-gradient-to-b from-blue-400 to-blue-600 shadow-blue-500/50"
                )}
                style={{ left: `calc(50% + ${totalNudge * 10}%)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Clock offset visualization */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Clock Offset:</span>
              <span className="font-mono text-lg tracking-wider text-slate-200">
                {clockOffset !== null
                  ? `${clockOffset > 0 ? "+" : ""}${clockOffset.toFixed(3)} ms`
                  : "Unknown"}
              </span>
            </div>
            
            {clockOffset !== null && (
              <div className="relative">
                <div className="w-full bg-slate-800/60 rounded-full h-3 backdrop-blur-sm border border-slate-700/30 flex items-center overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-slate-700/60 to-slate-600/40 rounded-l-full"></div>
                  <div className="w-1/2 h-full bg-gradient-to-r from-slate-600/40 to-slate-700/60 rounded-r-full"></div>
                  
                  {/* Center line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-400/50"></div>
                </div>
                
                {/* Offset indicator */}
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-3 h-6 rounded-full shadow-lg transition-all duration-300 transform-gpu",
                    getOffsetColor(clockOffset).replace('bg-', 'bg-gradient-to-b from-').replace('-500', '-400 to-').concat(clockOffset < 1 ? 'emerald-600 shadow-emerald-500/50' : clockOffset > 0 ? 'red-600 shadow-red-500/50' : 'blue-600 shadow-blue-500/50')
                  )}
                  style={{
                    left: `${50 + Math.min(Math.max(clockOffset * 5, -49), 49)}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                  
                  {/* Pulse effect for very close values */}
                  {Math.abs(clockOffset) < 1 && (
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
        
        {/* Floating scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-pulse"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};