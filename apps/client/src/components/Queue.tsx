import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocalAudioSource } from "@/lib/localTypes";
import { cn, formatTime } from "@/lib/utils";
import { useGlobalStore } from "@/store/global";
import { MoreHorizontal, Pause, Play, UploadCloud } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePostHog } from "posthog-js/react";

export const Queue = ({ className, ...rest }: React.ComponentProps<"div">) => {
  const posthog = usePostHog();
  const audioSources = useGlobalStore((state) => state.audioSources);
  const selectedAudioId = useGlobalStore((state) => state.selectedAudioId);
  const setSelectedAudioId = useGlobalStore(
    (state) => state.setSelectedAudioId
  );
  const isInitingSystem = useGlobalStore((state) => state.isInitingSystem);
  const broadcastPlay = useGlobalStore((state) => state.broadcastPlay);
  const broadcastPause = useGlobalStore((state) => state.broadcastPause);
  const isPlaying = useGlobalStore((state) => state.isPlaying);
  const reuploadAudio = useGlobalStore((state) => state.reuploadAudio);

  const handleItemClick = (source: LocalAudioSource) => {
    if (source.id === selectedAudioId) {
      if (isPlaying) {
        broadcastPause();
        posthog.capture("pause_track", { track_id: source.id });
      } else {
        broadcastPlay();
        posthog.capture("play_track", { track_id: source.id });
      }
    } else {
      // Track selection event
      posthog.capture("select_track", {
        track_id: source.id,
        track_name: source.name,
        previous_track_id: selectedAudioId,
      });

      setSelectedAudioId(source.id);
      broadcastPlay(0);
    }
  };

  const handleReupload = (sourceId: string, sourceName: string) => {
    reuploadAudio(sourceId, sourceName);

    // Track reupload event
    posthog.capture("reupload_track", {
      track_id: sourceId,
      track_name: sourceName,
    });
  };

  return (
    <div className={cn("relative", className)} {...rest}>
      <style jsx>{`
        @keyframes sound-wave-1 {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }
        @keyframes sound-wave-2 {
          0%, 100% { height: 80%; }
          50% { height: 60%; }
        }
        @keyframes sound-wave-3 {
          0%, 100% { height: 60%; }
          50% { height: 90%; }
        }
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3), 
                        0 0 40px rgba(34, 197, 94, 0.1),
                        inset 0 0 20px rgba(34, 197, 94, 0.05);
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.5), 
                        0 0 60px rgba(34, 197, 94, 0.2),
                        inset 0 0 30px rgba(34, 197, 94, 0.1);
          }
        }
        @keyframes sparkle {
          0%, 100% { 
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes border-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .gradient-shift {
          background: linear-gradient(-45deg, 
            rgba(34, 197, 94, 0.1), 
            rgba(168, 85, 247, 0.1), 
            rgba(139, 92, 246, 0.1), 
            rgba(34, 197, 94, 0.1));
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        .border-flow {
          background: linear-gradient(90deg, 
            transparent, 
            rgba(34, 197, 94, 0.5), 
            transparent);
          background-size: 200% 100%;
          animation: border-flow 3s linear infinite;
        }
        .glass-morphism {
          backdrop-filter: blur(16px) saturate(180%);
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        .hover-sparkle:hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(34, 197, 94, 1) 0%, transparent 70%);
          border-radius: 50%;
          animation: sparkle 0.6s ease-in-out;
          pointer-events: none;
        }
      `}</style>
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-purple-500/5 to-violet-500/5 rounded-xl blur-xl"></div>
      
      <div className="relative space-y-2 p-4">
        {audioSources.length > 0 ? (
          <AnimatePresence initial={true}>
            {audioSources.map((source, index) => {
              const isSelected = source.id === selectedAudioId;
              const isPlayingThis = isSelected && isPlaying;

              return (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 * index,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={cn(
                    "relative flex items-center pl-4 pr-5 py-4 rounded-xl group transition-all duration-300 select-none cursor-pointer overflow-hidden",
                    "glass-morphism hover:backdrop-blur-xl",
                    isSelected
                      ? "glow-pulse border-green-400/40 bg-gradient-to-r from-green-500/10 via-purple-500/5 to-violet-500/10"
                      : "hover:border-green-400/30 hover:bg-gradient-to-r hover:from-green-500/5 hover:via-purple-500/3 hover:to-violet-500/5",
                    "hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20"
                  )}
                  onClick={() => handleItemClick(source)}
                >
                  {/* Animated border flow for selected item */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-xl opacity-60">
                      <div className="absolute inset-0 border-flow rounded-xl"></div>
                    </div>
                  )}
                  
                  {/* Hover sparkle overlay */}
                  <div className="absolute inset-0 hover-sparkle"></div>

                  {/* Track number / Play icon */}
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center relative cursor-default select-none">
                    {/* Play/Pause button (shown on hover) */}
                    <button className={cn(
                      "text-sm hover:scale-125 transition-all duration-300 w-full h-full flex items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 select-none rounded-full",
                      "hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/30",
                      isSelected ? "text-green-400" : "text-green-300"
                    )}>
                      {isSelected && isPlaying ? (
                        <Pause className="fill-current size-4 stroke-1 drop-shadow-lg" />
                      ) : (
                        <Play className="fill-current size-4 drop-shadow-lg" />
                      )}
                    </button>

                    {/* Playing indicator or track number (hidden on hover) */}
                    <div className="w-full h-full flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 select-none">
                      {isPlayingThis ? (
                        <div className="flex items-end justify-center h-5 w-5 gap-[3px]">
                          <div className="bg-gradient-to-t from-green-400 to-green-300 w-[3px] h-[40%] rounded-full shadow-lg shadow-green-500/50 animate-[sound-wave-1_1.2s_ease-in-out_infinite]"></div>
                          <div className="bg-gradient-to-t from-green-400 to-green-300 w-[3px] h-[80%] rounded-full shadow-lg shadow-green-500/50 animate-[sound-wave-2_1.4s_ease-in-out_infinite]"></div>
                          <div className="bg-gradient-to-t from-green-400 to-green-300 w-[3px] h-[60%] rounded-full shadow-lg shadow-green-500/50 animate-[sound-wave-3_1s_ease-in-out_infinite]"></div>
                        </div>
                      ) : (
                        <span
                          className={cn(
                            "text-sm font-medium select-none transition-colors duration-300",
                            isSelected 
                              ? "text-green-400 drop-shadow-lg" 
                              : "text-slate-400 group-hover:text-green-300"
                          )}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Track name */}
                  <div className="flex-grow min-w-0 ml-4 select-none">
                    <div
                      className={cn(
                        "font-semibold text-sm truncate select-none transition-all duration-300",
                        isSelected 
                          ? "text-green-300 drop-shadow-lg bg-gradient-to-r from-green-300 to-green-400 bg-clip-text" 
                          : "text-slate-200 group-hover:text-green-200"
                      )}
                    >
                      {source.name}
                    </div>
                  </div>

                  {/* Duration & Optional Re-upload Menu */}
                  <div className="ml-4 flex items-center gap-3">
                    <div className={cn(
                      "text-xs font-medium select-none transition-colors duration-300 px-2 py-1 rounded-full",
                      isSelected 
                        ? "text-green-400 bg-green-500/10 border border-green-500/20" 
                        : "text-slate-400 group-hover:text-green-300 group-hover:bg-green-500/5"
                    )}>
                      {formatTime(source.audioBuffer.duration)}
                    </div>

                    {/* Dropdown for re-uploading */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className={cn(
                          "p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:scale-110 relative overflow-hidden",
                          "hover:bg-gradient-to-r hover:from-green-500/20 hover:to-purple-500/20",
                          "hover:shadow-lg hover:shadow-green-500/30 hover:border hover:border-green-400/30",
                          isSelected 
                            ? "text-green-400 bg-green-500/10" 
                            : "text-slate-500 hover:text-green-300 focus:text-green-300"
                        )}>
                          <MoreHorizontal className="size-4" />
                          {/* Subtle glow effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="top"
                        align="center"
                        onClick={(e) => e.stopPropagation()}
                        className="glass-morphism border-green-400/30 shadow-2xl shadow-green-500/20 gradient-shift"
                      >
                        <DropdownMenuItem
                          onSelect={() =>
                            handleReupload(source.id, source.name)
                          }
                          className={cn(
                            "flex items-center gap-3 cursor-pointer text-sm font-medium transition-all duration-300",
                            "hover:bg-green-500/20 hover:text-green-300 rounded-lg p-3",
                            "focus:bg-green-500/20 focus:text-green-300",
                            source.id.startsWith("static") 
                              ? "opacity-50 cursor-not-allowed" 
                              : "hover:shadow-lg hover:shadow-green-500/20"
                          )}
                          disabled={source.id.startsWith("static")}
                        >
                          <UploadCloud className={cn(
                            "size-4 transition-colors duration-300",
                            source.id.startsWith("static") 
                              ? "text-slate-500" 
                              : "text-green-400 group-hover:text-green-300"
                          )} />
                          <span className="text-slate-200">Reupload to room</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
              "text-center py-8 px-4 select-none glass-morphism rounded-xl",
              "bg-gradient-to-br from-slate-800/50 to-slate-900/50",
              "border border-slate-700/50"
            )}
          >
            <div className={cn(
              "text-lg font-medium mb-2 transition-colors duration-300",
              isInitingSystem 
                ? "text-green-400 animate-pulse" 
                : "text-slate-400"
            )}>
              {isInitingSystem ? (
                <>
                  <div className="inline-flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>Loading tracks...</span>
                  </div>
                </>
              ) : (
                "No tracks available"
              )}
            </div>
            {!isInitingSystem && (
              <div className="text-sm text-slate-500">
                Upload some audio files to get started
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};