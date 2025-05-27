import { cn } from "@/lib/utils"; // Import cn from utils
import { useGlobalStore } from "@/store/global";
import { useEffect, useState } from "react";

export const SocketStatus = () => {
  const socket = useGlobalStore((state) => state.socket);
  const [isFlashing, setIsFlashing] = useState(false);

  // Get socket status
  const getStatus = () => {
    if (!socket) return "disconnected";

    // WebSocket readyState values:
    // 0 - Connecting
    // 1 - Open
    // 2 - Closing
    // 3 - Closed

    switch (socket.readyState) {
      case WebSocket.CONNECTING:
        return "connecting";
      case WebSocket.OPEN:
        return "connected";
      case WebSocket.CLOSING:
        return "closing";
      case WebSocket.CLOSED:
        return "disconnected";
      default:
        return "unknown";
    }
  };

  const status = getStatus();

  // Futuristic status color mapping with green theme
  const statusColors = {
    disconnected: "bg-gradient-to-r from-red-500 to-red-600",
    connecting: "bg-gradient-to-r from-yellow-400 to-amber-500",
    connected: "bg-gradient-to-r from-emerald-400 to-green-500",
    closing: "bg-gradient-to-r from-orange-400 to-orange-500",
    unknown: "bg-gradient-to-r from-gray-400 to-gray-500",
  };

  // Enhanced glow effects for each status
  const statusGlow = {
    disconnected: "shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.3),inset_0_0_10px_rgba(255,255,255,0.2)]",
    connecting: "shadow-[0_0_20px_rgba(251,191,36,0.6),0_0_40px_rgba(251,191,36,0.3),inset_0_0_10px_rgba(255,255,255,0.2)]",
    connected: "shadow-[0_0_25px_rgba(34,197,94,0.8),0_0_50px_rgba(16,185,129,0.4),inset_0_0_12px_rgba(255,255,255,0.3)]",
    closing: "shadow-[0_0_20px_rgba(251,146,60,0.6),0_0_40px_rgba(251,146,60,0.3),inset_0_0_10px_rgba(255,255,255,0.2)]",
    unknown: "shadow-[0_0_15px_rgba(156,163,175,0.5),0_0_30px_rgba(156,163,175,0.2),inset_0_0_8px_rgba(255,255,255,0.2)]",
  };

  // Status text mapping with futuristic styling
  const statusText = {
    disconnected: "DISCONNECTED",
    connecting: "CONNECTING...",
    connected: "CONNECTED",
    closing: "CLOSING...",
    unknown: "UNKNOWN",
  };

  // Text colors with tech aesthetic
  const textColors = {
    disconnected: "text-red-400",
    connecting: "text-yellow-400",
    connected: "text-emerald-400",
    closing: "text-orange-400",
    unknown: "text-gray-400",
  };

  // Flash effect
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 500);

    return () => clearInterval(flashInterval);
  }, []);

  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/30 backdrop-blur-sm border border-slate-700/50">
      {/* Status indicator with futuristic design */}
      <div className="relative">
        {/* Outer glow ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full animate-pulse",
            statusColors[status],
            {
              "opacity-40": !isFlashing,
              "opacity-70": isFlashing,
            }
          )}
          style={{
            transform: "scale(1.4)",
            filter: "blur(8px)",
          }}
        />
        
        {/* Main status orb */}
        <div
          className={cn(
            statusColors[status],
            statusGlow[status],
            {
              "opacity-100 scale-110": isFlashing,
              "opacity-80 scale-100": !isFlashing,
            },
            "relative h-4 w-4 rounded-full transition-all duration-300 border border-white/20"
          )}
          aria-hidden="true"
        >
          {/* Inner highlight for glass effect */}
          <div className="absolute top-0.5 left-0.5 h-1.5 w-1.5 rounded-full bg-white/40 blur-sm" />
          
          {/* Connected status gets extra sparkle */}
          {status === "connected" && (
            <div
              className="absolute -inset-1 rounded-full animate-ping"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(34,197,94,0.5), transparent)",
                animationDuration: "2s",
              }}
            />
          )}
        </div>
      </div>

      {/* Status text with tech styling */}
      <div className="flex flex-col">
        <span
          className={cn(
            "text-xs font-bold tracking-wider transition-all duration-300",
            textColors[status],
            {
              "text-shadow-[0_0_10px_currentColor]": isFlashing,
              "drop-shadow-sm": !isFlashing,
            }
          )}
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {statusText[status]}
        </span>
        
        {/* Subtle tech underline */}
        <div
          className={cn(
            "h-px mt-0.5 rounded-full transition-all duration-500",
            statusColors[status],
            {
              "opacity-80 w-full": isFlashing,
              "opacity-40 w-3/4": !isFlashing,
            }
          )}
        />
      </div>

      {/* Connection quality indicator for connected state */}
      {status === "connected" && (
        <div className="flex space-x-0.5 ml-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-full transition-all duration-300",
                {
                  "h-2": i === 0,
                  "h-3": i === 1,
                  "h-4": i === 2,
                  "opacity-100 shadow-[0_0_8px_rgba(34,197,94,0.6)]": isFlashing,
                  "opacity-70": !isFlashing,
                }
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Connecting animation */}
      {status === "connecting" && (
        <div className="flex space-x-1 ml-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce shadow-[0_0_6px_rgba(251,191,36,0.5)]"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};