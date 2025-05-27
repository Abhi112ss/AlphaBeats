import { useGlobalStore } from "@/store/global";
import { Button } from "../ui/button";

export const NTP = () => {
  const sendNTPRequest = useGlobalStore((state) => state.sendNTPRequest);
  const ntpMeasurements = useGlobalStore((state) => state.ntpMeasurements);
  const offsetEstimate = useGlobalStore((state) => state.offsetEstimate);
  const roundTripEstimate = useGlobalStore((state) => state.roundTripEstimate);
  const resetNTPConfig = useGlobalStore((state) => state.resetNTPConfig);
  const pauseAudio = useGlobalStore((state) => state.pauseAudio);

  const resync = () => {
    pauseAudio({ when: 0 });
    resetNTPConfig();
    sendNTPRequest();
  };

  return (
    <div className="relative p-6 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-purple-900/70 border border-emerald-500/20 shadow-2xl backdrop-blur-lg">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-violet-500/12 pointer-events-none" />
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/30 via-violet-400/20 to-emerald-400/30 opacity-40 animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute inset-0.5 rounded-xl bg-gradient-to-br from-slate-900/95 via-slate-800/85 to-purple-900/75" />
      
      {/* Inner content with relative positioning */}
      <div className="relative z-10 space-y-4">
        {/* Header section with sync status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Status indicator dot */}
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-emerald-300/50 rounded-full animate-ping" />
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-200 via-white to-emerald-100 bg-clip-text text-transparent">
              Network Time Protocol
            </h3>
          </div>
          
          {/* Connection quality indicator */}
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-5 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Sync counter with enhanced styling */}
        {ntpMeasurements.length > 0 && (
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-violet-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            
            <div className="relative p-3 rounded-lg bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-violet-950/40 border border-emerald-500/30">
              <p className="text-sm font-medium flex items-center gap-2">
                {/* Sync icon */}
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="bg-gradient-to-r from-emerald-200 to-emerald-100 bg-clip-text text-transparent">
                  Synced {ntpMeasurements.length} times
                </span>
                
                {/* Success indicator */}
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <div className="w-1 h-1 bg-emerald-300 rounded-full animate-ping" />
                </div>
              </p>
            </div>
          </div>
        )}

        {/* Metrics section with futuristic cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Offset metric */}
          <div className="group relative overflow-hidden rounded-lg">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            <div className="relative p-4 bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-cyan-950/60 border border-cyan-400/20 rounded-lg backdrop-blur-sm">
              {/* Metric label */}
              <div className="text-xs font-medium text-cyan-300/80 mb-1 flex items-center gap-2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                OFFSET
              </div>
              
              {/* Metric value */}
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-200 to-cyan-100 bg-clip-text text-transparent">
                {offsetEstimate} ms
              </div>
              
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            </div>
          </div>

          {/* Round trip metric */}
          <div className="group relative overflow-hidden rounded-lg">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            <div className="relative p-4 bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-violet-950/60 border border-violet-400/20 rounded-lg backdrop-blur-sm">
              {/* Metric label */}
              <div className="text-xs font-medium text-violet-300/80 mb-1 flex items-center gap-2">
                <div className="w-1 h-1 bg-violet-400 rounded-full animate-pulse" />
                ROUND TRIP
              </div>
              
              {/* Metric value */}
              <div className="text-lg font-bold bg-gradient-to-r from-violet-200 to-violet-100 bg-clip-text text-transparent">
                {roundTripEstimate} ms
              </div>
              
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Enhanced Resync Button */}
        <div className="pt-2">
          <Button 
            onClick={resync}
            className="relative w-full group overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 border-0 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/40 transition-all duration-300 text-white font-semibold py-3 rounded-lg hover:scale-[1.02]"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-white/10 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center justify-center gap-2">
              {/* Sync icon */}
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative">Resync</span>
              
              {/* Arrow indicator */}
              <div className="w-1 h-1 bg-white rounded-full group-hover:animate-ping" />
            </div>
            
            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Floating ambient particles */}
      <div className="absolute top-4 right-8 w-px h-px bg-emerald-300 rounded-full animate-pulse opacity-40" 
           style={{ animationDelay: '1s', animationDuration: '3s' }} />
      <div className="absolute bottom-8 left-6 w-0.5 h-0.5 bg-violet-300 rounded-full animate-pulse opacity-30" 
           style={{ animationDelay: '2s', animationDuration: '4s' }} />
      <div className="absolute top-1/2 right-4 w-px h-px bg-cyan-300 rounded-full animate-pulse opacity-35" 
           style={{ animationDelay: '3s', animationDuration: '5s' }} />
    </div>
  );
};