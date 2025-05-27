"use client";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrackSelector } from "../TrackSelector";
import { Player } from "./Player";

export const MusicControls = () => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-purple-900/80 border-0 shadow-2xl backdrop-blur-xl">
      {/* Ambient glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/8 pointer-events-none" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 via-violet-500/20 to-emerald-500/20 opacity-30 animate-pulse" 
           style={{ animationDuration: '3s' }} />
      <div className="absolute inset-0.5 rounded-lg bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-purple-900/80" />
      
      {/* Subtle inner glow */}
      <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-emerald-500/3 via-transparent to-violet-500/5 pointer-events-none" />
      
      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="relative">
          {/* Title with futuristic gradient text */}
          <div className="flex items-center gap-3">
            {/* Decorative icon glow */}
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse" />
            
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-200 via-white to-emerald-100 bg-clip-text text-transparent">
              Music Controls
            </span>
            
            {/* Floating particles */}
            <div className="relative ml-2">
              <div className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-75" />
              <div className="absolute w-1 h-1 bg-emerald-400 rounded-full" />
            </div>
          </div>
          
          {/* Subtle underline glow */}
          <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full opacity-60" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        {/* Enhanced alert warning with premium styling */}
        <div className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]">
          {/* Multi-layered background for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-orange-500/15 rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent rounded-xl animate-pulse" 
               style={{ animationDuration: '4s' }} />
          
          {/* Border glow effect */}
          <div className="absolute inset-0 rounded-xl border border-yellow-500/40 shadow-lg shadow-yellow-500/20" />
          <div className="absolute inset-0 rounded-xl border border-yellow-400/20 group-hover:border-yellow-400/60 transition-colors duration-300" />
          
          <div className="relative p-4 backdrop-blur-sm">
            <p className="text-sm flex items-center gap-3">
              {/* Enhanced warning icon with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md animate-pulse" />
                <div className="relative bg-gradient-to-br from-yellow-400 to-amber-500 p-1.5 rounded-full shadow-lg">
                  <AlertTriangle size={14} className="text-black drop-shadow-sm" />
                </div>
              </div>
              
              {/* Enhanced warning text */}
              <span className="font-medium bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent">
                These controls affect all users in the room.
              </span>
              
              {/* Subtle pulsing dot */}
              <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
            </p>
            
            {/* Animated accent line */}
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          </div>
        </div>
        
        {/* Track Selector Container with enhanced styling */}
        <div className="relative group">
          {/* Glow effect on hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative">
            <TrackSelector />
          </div>
        </div>
        
        {/* Player Container with enhanced styling */}
        <div className="relative group">
          {/* Enhanced glow effect for player */}
          <div className="absolute -inset-3 bg-gradient-to-r from-violet-500/15 via-emerald-500/10 to-violet-500/15 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
          <div className="relative">
            <Player />
          </div>
        </div>
      </CardContent>
      
      {/* Corner accent details */}
      <div className="absolute top-3 right-3 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-50" />
      <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-violet-400 rounded-full animate-ping opacity-40" 
           style={{ animationDelay: '1s' }} />
      
      {/* Floating ambient particles */}
      <div className="absolute top-1/4 right-1/4 w-px h-px bg-emerald-300 rounded-full animate-pulse opacity-30" 
           style={{ animationDelay: '2s', animationDuration: '4s' }} />
      <div className="absolute bottom-1/3 left-1/5 w-px h-px bg-violet-300 rounded-full animate-pulse opacity-25" 
           style={{ animationDelay: '3s', animationDuration: '5s' }} />
    </Card>
  );
};