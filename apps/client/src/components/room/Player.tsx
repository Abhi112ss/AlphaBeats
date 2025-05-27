import { cn, formatTime } from "@/lib/utils";

import { useGlobalStore } from "@/store/global";
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect, useState } from "react";
import { Slider } from "../ui/slider";

export const Player = () => {
  const posthog = usePostHog();
  const broadcastPlay = useGlobalStore((state) => state.broadcastPlay);
  const broadcastPause = useGlobalStore((state) => state.broadcastPause);
  const isPlaying = useGlobalStore((state) => state.isPlaying);
  const getCurrentTrackPosition = useGlobalStore(
    (state) => state.getCurrentTrackPosition
  );
  const selectedAudioId = useGlobalStore((state) => state.selectedAudioId);
  const audioSources = useGlobalStore((state) => state.audioSources);
  const currentTime = useGlobalStore((state) => state.currentTime);
  const skipToNextTrack = useGlobalStore((state) => state.skipToNextTrack);
  const skipToPreviousTrack = useGlobalStore(
    (state) => state.skipToPreviousTrack
  );
  const isShuffled = useGlobalStore((state) => state.isShuffled);
  const toggleShuffle = useGlobalStore((state) => state.toggleShuffle);

  // Local state for slider
  const [sliderPosition, setSliderPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Find the selected audio source and its duration
  useEffect(() => {
    if (!selectedAudioId) return;

    const audioSource = audioSources.find(
      (source) => source.id === selectedAudioId
    );
    if (audioSource?.audioBuffer) {
      setTrackDuration(audioSource.audioBuffer.duration);
      // Reset slider position when track changes
      setSliderPosition(0);
    }
  }, [selectedAudioId, audioSources]);

  // Sync with currentTime when it changes (e.g., after pausing)
  useEffect(() => {
    if (!isPlaying) {
      setSliderPosition(currentTime);
    }
  }, [currentTime, isPlaying]);

  // Update slider position during playback
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!isDragging) {
        const currentPosition = getCurrentTrackPosition();
        setSliderPosition(currentPosition);
      }
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [isPlaying, getCurrentTrackPosition, isDragging]);

  // Handle slider change
  const handleSliderChange = useCallback((value: number[]) => {
    const position = value[0];
    setIsDragging(true);
    setSliderPosition(position);
  }, []);

  // Handle slider release - seek to that position
  const handleSliderCommit = useCallback(
    (value: number[]) => {
      const newPosition = value[0];
      setIsDragging(false);
      // If currently playing, broadcast play at new position
      // If paused, just update position without playing
      if (isPlaying) {
        broadcastPlay(newPosition);
      } else {
        setSliderPosition(newPosition);
      }

      // Log scrub event
      posthog.capture("scrub_confirm", {
        position: newPosition,
        track_id: selectedAudioId,
        track_duration: trackDuration,
      });
    },
    [
      broadcastPlay,
      isPlaying,
      setSliderPosition,
      posthog,
      selectedAudioId,
      trackDuration,
    ]
  );

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      broadcastPause();
      posthog.capture("pause_track", { track_id: selectedAudioId });
    } else {
      broadcastPlay(sliderPosition);
      posthog.capture("play_track", {
        position: sliderPosition,
        track_id: selectedAudioId,
      });
    }
  }, [
    isPlaying,
    broadcastPause,
    broadcastPlay,
    sliderPosition,
    posthog,
    selectedAudioId,
  ]);

  const handleSkipBack = useCallback(() => {
    if (!isShuffled) {
      skipToPreviousTrack();
      posthog.capture("skip_previous", {
        from_track_id: selectedAudioId,
      });
    }
  }, [skipToPreviousTrack, isShuffled, posthog, selectedAudioId]);

  const handleSkipForward = useCallback(() => {
    skipToNextTrack();
    posthog.capture("skip_next", {
      from_track_id: selectedAudioId,
    });
  }, [skipToNextTrack, posthog, selectedAudioId]);

  const handleShuffle = useCallback(() => {
    toggleShuffle();
    posthog.capture("toggle_shuffle", {
      shuffle_enabled: !isShuffled,
      queue_size: audioSources.length,
    });
  }, [toggleShuffle, posthog, isShuffled, audioSources.length]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if space is pressed and we're not in an input field
      if (
        e.code === "Space" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          (e.target as HTMLElement).isContentEditable
        )
      ) {
        e.preventDefault();
        handlePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlay]);

  return (
    <div className="w-full flex justify-center relative">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 via-violet-500/8 to-emerald-500/5 rounded-2xl blur-xl opacity-60" />
      
      <div className="w-full max-w-[37rem] relative z-10">
        {/* Control buttons with futuristic styling */}
        <div className="flex items-center justify-center gap-8 mb-6 relative">
          {/* Background glow for controls */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/30 to-transparent rounded-full blur-lg" />
          
          {/* Shuffle button */}
          <button
            className={cn(
              "relative group transition-all duration-300 cursor-pointer",
              "hover:scale-110 active:scale-95",
              isShuffled ? "text-emerald-400" : "text-slate-400 hover:text-emerald-300",
              audioSources.length <= 1 && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleShuffle}
            disabled={audioSources.length <= 1}
          >
            {/* Button glow effect */}
            <div className={cn(
              "absolute inset-0 rounded-full transition-opacity duration-300 blur-md",
              isShuffled 
                ? "bg-emerald-400/30 opacity-100" 
                : "bg-emerald-400/20 opacity-0 group-hover:opacity-100"
            )} />
            
            <div className="relative p-2">
              <Shuffle className="size-4 relative z-10" />
              {/* Active indicator */}
              {isShuffled && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-1 h-1 bg-emerald-300/50 rounded-full animate-ping" />
                </div>
              )}
            </div>
          </button>

          {/* Skip back button */}
          <button
            className={cn(
              "relative group transition-all duration-300 cursor-pointer",
              "text-slate-400 hover:text-violet-300 hover:scale-110 active:scale-95",
              (isShuffled || audioSources.length <= 1) && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleSkipBack}
            disabled={isShuffled || audioSources.length <= 1}
          >
            <div className="absolute inset-0 rounded-full bg-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            <div className="relative p-2">
              <SkipBack className="w-7 h-7 md:w-5 md:h-5 fill-current relative z-10" />
            </div>
          </button>

          {/* Play/Pause button - the centerpiece */}
          <button
            className="relative group transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            onClick={handlePlay}
          >
            {/* Multi-layer glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/40 via-emerald-500/60 to-emerald-400/40 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/30 to-emerald-500/30 rounded-full blur-md animate-pulse" />
            
            {/* Button background */}
            <div className="relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-full p-4 md:p-3 shadow-xl shadow-emerald-500/30 group-hover:shadow-emerald-400/50 transition-all duration-300">
              {/* Inner glow */}
              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
              
              {/* Play/Pause icon */}
              <div className="relative z-10">
                {isPlaying ? (
                  <Pause className="w-6 h-6 md:w-5 md:h-5 fill-slate-900 stroke-1 relative z-10" />
                ) : (
                  <Play className="w-6 h-6 md:w-5 md:h-5 fill-slate-900 relative z-10 ml-0.5" />
                )}
              </div>
              
              {/* Pulsing ring for playing state */}
              {isPlaying && (
                <div className="absolute inset-0 border-2 border-emerald-300/60 rounded-full animate-ping" />
              )}
            </div>
          </button>

          {/* Skip forward button */}
          <button
            className={cn(
              "relative group transition-all duration-300 cursor-pointer",
              "text-slate-400 hover:text-violet-300 hover:scale-110 active:scale-95",
              audioSources.length <= 1 && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleSkipForward}
            disabled={audioSources.length <= 1}
          >
            <div className="absolute inset-0 rounded-full bg-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            <div className="relative p-2">
              <SkipForward className="w-7 h-7 md:w-5 md:h-5 fill-current relative z-10" />
            </div>
          </button>

          {/* Repeat button */}
          <button className="relative group transition-all duration-300 cursor-default hover:scale-110 active:scale-95 text-emerald-400">
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 opacity-100 blur-md" />
            <div className="relative p-2">
              <Repeat className="w-4 h-4 relative z-10" />
              {/* Active indicator */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-1 h-1 bg-emerald-300/50 rounded-full animate-ping" />
              </div>
            </div>
          </button>
        </div>

        {/* Progress bar section with enhanced styling */}
        <div className="relative">
          {/* Background glow for progress section */}
          <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent rounded-lg blur-sm" />
          
          <div className="flex items-center gap-4 relative z-10">
            {/* Current time */}
            <span className="text-xs font-mono min-w-11 select-none bg-gradient-to-r from-emerald-200 to-emerald-100 bg-clip-text text-transparent">
              {formatTime(sliderPosition)}
            </span>
            
            {/* Custom styled slider container */}
            <div className="relative flex-1 group">
              {/* Glow effect under slider */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-violet-500/15 to-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              <Slider
                value={[sliderPosition]}
                min={0}
                max={trackDuration}
                step={0.1}
                onValueChange={handleSliderChange}
                onValueCommit={handleSliderCommit}
                className="relative z-10"
              />
            </div>
            
            {/* Duration time */}
            <span className="text-xs font-mono min-w-11 text-right select-none bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text text-transparent">
              {formatTime(trackDuration)}
            </span>
          </div>
        </div>

        {/* Floating ambient particles */}
        <div className="absolute top-4 right-8 w-px h-px bg-emerald-300 rounded-full animate-pulse opacity-40" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute bottom-4 left-12 w-0.5 h-0.5 bg-violet-300 rounded-full animate-pulse opacity-30" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-8 left-16 w-px h-px bg-emerald-400 rounded-full animate-pulse opacity-35" 
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
    </div>
  );
};