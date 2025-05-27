"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalStore } from "@/store/global";

export const TrackSelector = () => {
  const audioSources = useGlobalStore((state) => state.audioSources);
  const selectedAudioId = useGlobalStore((state) => state.selectedAudioId);
  const setSelectedAudioId = useGlobalStore(
    (state) => state.setSelectedAudioId
  );
  const isLoadingAudioSources = useGlobalStore(
    (state) => state.isInitingSystem
  );

  return (
    <div className="relative mt-4 mb-4 group">
      {/* Ambient glow background */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-violet-400 rounded-full animate-pulse delay-300"></div>
      
      <div className="relative">
        <Select
          value={selectedAudioId || ""}
          onValueChange={(value) => setSelectedAudioId(value)}
          disabled={isLoadingAudioSources || audioSources.length === 0}
        >
          <SelectTrigger className="w-full relative backdrop-blur-xl bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95 border-0 rounded-xl shadow-2xl overflow-hidden h-14 transition-all duration-300 hover:scale-[1.02] transform-gpu group/trigger">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-violet-400/30 to-purple-400/30 rounded-xl"></div>
            <div className="absolute inset-px bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-slate-800/98 rounded-xl"></div>
            
            {/* Loading state glow */}
            {isLoadingAudioSources && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-violet-400/20 to-purple-400/20 rounded-xl animate-pulse"></div>
            )}
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-violet-400/0 to-purple-400/0 rounded-xl transition-all duration-300 group-hover/trigger:from-emerald-400/10 group-hover/trigger:via-violet-400/5 group-hover/trigger:to-purple-400/10"></div>
            
            {/* Inner sparkles on hover */}
            <div className="absolute inset-0 opacity-0 group-hover/trigger:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute top-2 left-4 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-100"></div>
              <div className="absolute bottom-3 right-6 w-0.5 h-0.5 bg-violet-400 rounded-full animate-ping delay-200"></div>
              <div className="absolute top-3 right-4 w-px h-px bg-purple-400 rounded-full animate-pulse delay-300"></div>
            </div>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-pulse"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-between w-full px-4">
              <SelectValue 
                placeholder={
                  <span className="bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 bg-clip-text text-transparent font-medium">
                    {isLoadingAudioSources ? (
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                        Loading tracks...
                      </span>
                    ) : audioSources.length === 0 ? (
                      "No tracks available"
                    ) : (
                      "Select track"
                    )}
                  </span>
                }
                className="text-white font-medium bg-gradient-to-r from-emerald-300 via-violet-300 to-purple-300 bg-clip-text"
              />
              
              {/* Custom dropdown arrow */}
              <div className="relative">
                <div className="w-2 h-2 border-r-2 border-b-2 border-emerald-400 rotate-45 transition-all duration-200 group-hover/trigger:border-violet-400 group-hover/trigger:scale-110"></div>
                <div className="absolute inset-0 w-2 h-2 border-r-2 border-b-2 border-emerald-400/30 rotate-45 animate-pulse"></div>
              </div>
            </div>
          </SelectTrigger>
          
          <SelectContent className="relative backdrop-blur-2xl bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-slate-800/98 border-0 rounded-xl shadow-2xl overflow-hidden max-h-[40vh] overflow-y-auto min-w-[var(--radix-select-trigger-width)]">
            {/* Content background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-violet-400/5 to-purple-400/10 rounded-xl"></div>
            <div className="absolute inset-px bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/95 rounded-xl"></div>
            
            {/* Floating orbs in dropdown */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-violet-400 rounded-full animate-pulse delay-500 opacity-60"></div>
            
            <div className="relative z-10 p-1">
              {audioSources.map((source, index) => (
                <SelectItem 
                  key={source.id} 
                  value={source.id} 
                  className="relative py-3 px-3 my-1 rounded-lg cursor-pointer border-0 bg-transparent hover:bg-gradient-to-r hover:from-emerald-900/30 hover:via-violet-900/20 hover:to-purple-900/30 transition-all duration-300 group/item"
                  style={{
                    animation: `slideInItem 0.4s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Item hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-violet-400/0 to-purple-400/0 rounded-lg transition-all duration-300 group-hover/item:from-emerald-400/5 group-hover/item:via-violet-400/3 group-hover/item:to-purple-400/5"></div>
                  
                  {/* Left accent line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 bg-gradient-to-b from-emerald-400 via-violet-400 to-purple-400 rounded-full transition-all duration-300 group-hover/item:w-1 group-hover/item:h-6"></div>
                  
                  {/* Item sparkles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-2 right-3 w-px h-px bg-emerald-400 rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-2 right-5 w-px h-px bg-violet-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  
                  <div className="relative z-10 truncate max-w-[90vw] md:max-w-full text-slate-200 group-hover/item:text-white transition-colors duration-300 font-medium">
                    <span className="group-hover/item:bg-gradient-to-r group-hover/item:from-emerald-300 group-hover/item:via-violet-300 group-hover/item:to-purple-300 group-hover/item:bg-clip-text group-hover/item:text-transparent transition-all duration-300">
                      {source.name}
                    </span>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedAudioId === source.id && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>
                  )}
                </SelectItem>
              ))}
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
          </SelectContent>
        </Select>
        
        {/* Status indicator */}
        {selectedAudioId && (
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50">
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
            <div className="absolute inset-0.5 bg-white rounded-full opacity-30"></div>
          </div>
        )}
        
        {/* Loading state pulse ring */}
        {isLoadingAudioSources && (
          <div className="absolute inset-0 rounded-xl border-2 border-emerald-400/30 animate-ping"></div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideInItem {
          from {
            opacity: 0;
            transform: translateX(-10px) translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        
        /* Custom scrollbar for dropdown */
        :global(.overflow-y-auto::-webkit-scrollbar) {
          width: 4px;
        }
        
        :global(.overflow-y-auto::-webkit-scrollbar-track) {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 2px;
        }
        
        :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
          background: linear-gradient(to bottom, rgb(16, 185, 129), rgb(139, 92, 246));
          border-radius: 2px;
        }
        
        :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
          background: linear-gradient(to bottom, rgb(5, 150, 105), rgb(124, 58, 237));
        }
      `}</style>
    </div>
  );
};