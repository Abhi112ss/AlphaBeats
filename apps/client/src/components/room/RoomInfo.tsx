"use client";
import { useRoomStore } from "@/store/room";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const RoomInfo = () => {
  // Get room information directly from the store
  const roomId = useRoomStore((state) => state.roomId);
  const username = useRoomStore((state) => state.username);
  const userId = useRoomStore((state) => state.userId);

  return (
    <Card className="w-full md:w-2/3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
      {/* Futuristic background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 via-violet-500/20 to-emerald-500/20 p-[1px] group-hover:from-emerald-400/40 group-hover:via-violet-400/40 group-hover:to-emerald-400/40 transition-all duration-700">
        <div className="h-full w-full rounded-lg bg-slate-900/80 backdrop-blur-sm" />
      </div>

      {/* Floating orb decorations */}
      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-400/60 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.6)]" />
      <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-violet-400/50 animate-pulse shadow-[0_0_10px_rgba(167,139,250,0.5)]" style={{ animationDelay: "0.5s" }} />
      
      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-8 h-8">
        <div className="absolute top-2 left-2 w-4 h-[1px] bg-gradient-to-r from-emerald-400 to-transparent" />
        <div className="absolute top-2 left-2 w-[1px] h-4 bg-gradient-to-b from-emerald-400 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8">
        <div className="absolute bottom-2 right-2 w-4 h-[1px] bg-gradient-to-l from-violet-400 to-transparent" />
        <div className="absolute bottom-2 right-2 w-[1px] h-4 bg-gradient-to-t from-violet-400 to-transparent" />
      </div>

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent flex items-center gap-3 group-hover:from-emerald-300 group-hover:via-green-200 group-hover:to-teal-300 transition-all duration-500">
          {/* Holographic icon */}
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400/20 to-violet-400/20 border border-emerald-400/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          ROOM INFORMATION
          
          {/* Animated underline */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-emerald-400/50 via-transparent to-violet-400/30 group-hover:from-emerald-400/80 group-hover:to-violet-400/60 transition-all duration-700" />
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room ID Field */}
          <div className="flex flex-col group/field hover:scale-105 transition-transform duration-300">
            <div className="relative mb-2">
              <span className="text-xs font-semibold text-emerald-400/80 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                ROOM ID
              </span>
              <div className="absolute -bottom-1 left-0 w-12 h-[1px] bg-gradient-to-r from-emerald-400 to-transparent group-hover/field:w-20 transition-all duration-500" />
            </div>
            <div className="relative">
              <span className="font-mono font-bold text-white/90 text-lg tracking-wide p-2 rounded-md bg-slate-800/50 border border-emerald-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(52,211,153,0.1)] group-hover/field:border-emerald-500/40 group-hover/field:shadow-[0_0_25px_rgba(52,211,153,0.2)] transition-all duration-400">
                {roomId}
              </span>
              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent translate-x-[-100%] group-hover/field:translate-x-[100%] transition-transform duration-1000 rounded-md" />
            </div>
          </div>

          {/* Username Field */}
          <div className="flex flex-col group/field hover:scale-105 transition-transform duration-300">
            <div className="relative mb-2">
              <span className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.6)]" />
                USERNAME
              </span>
              <div className="absolute -bottom-1 left-0 w-12 h-[1px] bg-gradient-to-r from-violet-400 to-transparent group-hover/field:w-20 transition-all duration-500" />
            </div>
            <div className="relative">
              <span className="font-mono font-bold text-white/90 text-lg tracking-wide p-2 rounded-md bg-slate-800/50 border border-violet-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(167,139,250,0.1)] group-hover/field:border-violet-500/40 group-hover/field:shadow-[0_0_25px_rgba(167,139,250,0.2)] transition-all duration-400">
                {username}
              </span>
              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent translate-x-[-100%] group-hover/field:translate-x-[100%] transition-transform duration-1000 rounded-md" />
            </div>
          </div>

          {/* User ID Field */}
          <div className="flex flex-col group/field hover:scale-105 transition-transform duration-300">
            <div className="relative mb-2">
              <span className="text-xs font-semibold text-teal-400/80 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
                USER ID
              </span>
              <div className="absolute -bottom-1 left-0 w-12 h-[1px] bg-gradient-to-r from-teal-400 to-transparent group-hover/field:w-20 transition-all duration-500" />
            </div>
            <div className="relative">
              <span className="font-mono font-bold text-white/90 text-lg tracking-wide p-2 rounded-md bg-slate-800/50 border border-teal-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(45,212,191,0.1)] truncate block group-hover/field:border-teal-500/40 group-hover/field:shadow-[0_0_25px_rgba(45,212,191,0.2)] transition-all duration-400">
                {userId}
              </span>
              {/* Scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent translate-x-[-100%] group-hover/field:translate-x-[100%] transition-transform duration-1000 rounded-md" />
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent group-hover:via-emerald-400/60 transition-all duration-700" />
        
        {/* Floating particles */}
        <div className="absolute bottom-4 right-8 flex space-x-2">
          <div className="w-1 h-1 rounded-full bg-emerald-400/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0s" }} />
          <div className="w-1 h-1 rounded-full bg-violet-400/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
          <div className="w-1 h-1 rounded-full bg-teal-400/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
        </div>
      </CardContent>
    </Card>
  );
};