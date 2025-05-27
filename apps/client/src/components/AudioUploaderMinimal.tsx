"use client";

import { uploadAudioFile } from "@/lib/api";
import { cn, trimFileName } from "@/lib/utils";
import { useRoomStore } from "@/store/room";
import { CloudUpload, Plus } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { toast } from "sonner";

export const AudioUploaderMinimal = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const roomId = useRoomStore((state) => state.roomId);
  const posthog = usePostHog();

  const handleFileUpload = async (file: File) => {
    // Store file name for display
    setFileName(file.name);

    // Track upload initiated
    posthog.capture("upload_initiated", {
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      room_id: roomId,
    });

    try {
      setIsUploading(true);

      // Read file as base64
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const base64Data = e.target?.result?.toString().split(",")[1];
          if (!base64Data) throw new Error("Failed to convert file to base64");

          // Upload the file to the server
          await uploadAudioFile({
            name: file.name,
            audioData: base64Data,
            roomId,
          });

          // Track successful upload
          posthog.capture("upload_success", {
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            room_id: roomId,
          });

          setTimeout(() => setFileName(null), 3000);
        } catch (err) {
          console.error("Error during upload:", err);
          toast.error("Failed to upload audio file");
          setFileName(null);

          // Track upload failure
          posthog.capture("upload_failed", {
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            room_id: roomId,
            error: err instanceof Error ? err.message : "Unknown error",
          });
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        toast.error("Failed to read file");
        setIsUploading(false);
        setFileName(null);

        // Track file read error
        posthog.capture("upload_failed", {
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          room_id: roomId,
          error: "Failed to read file",
        });
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to process file");
      setIsUploading(false);
      setFileName(null);

      // Track upload processing error
      posthog.capture("upload_failed", {
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        room_id: roomId,
        error: err instanceof Error ? err.message : "Unknown processing error",
      });
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFileUpload(file);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const onDropEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    // make sure we only allow audio files
    if (!file.type.startsWith("audio/")) {
      toast.error("Please select an audio file");
      return;
    }

    handleFileUpload(file);
  };

  return (
    <div
      className={cn(
        // Base styling with futuristic design
        "relative mx-2 rounded-xl transition-all duration-500 overflow-hidden",
        "bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-purple-900/40",
        "border border-transparent backdrop-blur-md",
        // Hover effects
        "hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-[1.02]",
        "hover:bg-gradient-to-br hover:from-slate-900/90 hover:via-emerald-950/30 hover:to-purple-900/50",
        // Dragging state with neon green glow
        isDragging
          ? "shadow-2xl shadow-emerald-400/60 scale-105 bg-gradient-to-br from-emerald-950/70 via-slate-800/80 to-purple-900/60 border-emerald-400/50"
          : "",
        // Uploading state with pulsing effect
        isUploading
          ? "animate-pulse shadow-xl shadow-violet-500/40"
          : "",
        // Success state (when fileName exists)
        fileName && !isUploading
          ? "shadow-lg shadow-emerald-500/30 border-emerald-500/30"
          : ""
      )}
      style={{
        // Custom gradient overlay for extra depth
        background: isDragging 
          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 69, 193, 0.1) 100%), linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(88, 28, 135, 0.6) 100%)"
          : isUploading
          ? "linear-gradient(135deg, rgba(139, 69, 193, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%), linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(88, 28, 135, 0.4) 100%)"
          : fileName
          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(139, 69, 193, 0.1) 100%), linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(88, 28, 135, 0.4) 100%)"
          : "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(88, 28, 135, 0.4) 100%)"
      }}
      id="drop_zone"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnd={onDragLeave}
      onDrop={onDropEvent}
    >
      {/* Animated border glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500",
        "bg-gradient-to-r from-emerald-500/20 via-violet-500/20 to-emerald-500/20",
        "animate-pulse",
        isDragging || isUploading ? "opacity-100" : "hover:opacity-60"
      )} />
      
      {/* Inner glow effect */}
      <div className={cn(
        "absolute inset-0.5 rounded-xl opacity-0 transition-opacity duration-300",
        "bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5",
        isDragging ? "opacity-100" : "hover:opacity-70"
      )} />

      <label htmlFor="audio-upload" className="cursor-pointer block w-full relative z-10">
        <div className="p-4 flex items-center gap-4">
          {/* Icon container with futuristic design */}
          <div className={cn(
            "relative flex-shrink-0 rounded-xl transition-all duration-300",
            "p-3 flex items-center justify-center",
            // Base gradient
            "bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700",
            // Hover and state effects
            "hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-600",
            "hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-110",
            isDragging ? "from-emerald-400 via-emerald-300 to-emerald-500 shadow-xl shadow-emerald-400/60 scale-110" : "",
            isUploading ? "from-violet-500 via-purple-400 to-violet-600 shadow-lg shadow-violet-500/50" : "",
            fileName && !isUploading ? "from-emerald-400 via-emerald-300 to-emerald-500 shadow-md shadow-emerald-400/40" : ""
          )}>
            {/* Icon glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-30" />
            
            {isUploading ? (
              <CloudUpload className={cn(
                "h-5 w-5 text-white relative z-10",
                "animate-bounce drop-shadow-lg"
              )} />
            ) : (
              <Plus className={cn(
                "h-5 w-5 text-white relative z-10 transition-transform duration-300",
                "group-hover:rotate-90 drop-shadow-lg"
              )} />
            )}
            
            {/* Rotating border for upload state */}
            {isUploading && (
              <div className="absolute inset-0 rounded-xl border-2 border-violet-300/60 animate-spin" 
                   style={{ animationDuration: '2s' }} />
            )}
          </div>
          
          {/* Text content with enhanced typography */}
          <div className="flex-1 min-w-0">
            <div className={cn(
              "text-sm font-semibold truncate transition-all duration-300",
              "bg-gradient-to-r bg-clip-text text-transparent",
              isUploading 
                ? "from-violet-300 via-purple-200 to-violet-300 animate-pulse"
                : fileName
                ? "from-emerald-300 via-emerald-200 to-emerald-400"
                : "from-emerald-200 via-white to-emerald-100 hover:from-emerald-300 hover:to-white"
            )}>
              {isUploading
                ? "Uploading..."
                : fileName
                ? trimFileName(fileName)
                : "Upload audio"}
            </div>
            
            {!isUploading && !fileName && (
              <div className={cn(
                "text-sm transition-all duration-300 truncate mt-0.5",
                "bg-gradient-to-r from-slate-400 via-purple-300 to-slate-400 bg-clip-text text-transparent",
                "hover:from-emerald-400 hover:via-violet-300 hover:to-emerald-400"
              )}>
                Add music to queue
              </div>
            )}
            
            {/* Progress indication for upload */}
            {isUploading && (
              <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full animate-pulse" 
                     style={{ width: '100%' }} />
              </div>
            )}
          </div>
          
          {/* Sparkle effects on hover */}
          <div className={cn(
            "absolute top-2 right-2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 transition-opacity duration-300",
            "hover:opacity-100 animate-ping"
          )} />
          <div className={cn(
            "absolute bottom-2 left-8 w-0.5 h-0.5 bg-violet-400 rounded-full opacity-0 transition-opacity duration-500",
            "hover:opacity-100 animate-ping"
          )} style={{ animationDelay: '0.5s' }} />
        </div>
      </label>

      <input
        id="audio-upload"
        type="file"
        accept="audio/*"
        onChange={onInputChange}
        disabled={isUploading}
        className="hidden"
      />
      
      {/* Ambient glow effect */}
      <div className={cn(
        "absolute -inset-1 rounded-xl opacity-0 transition-opacity duration-500 -z-10",
        "bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-emerald-500/10 blur-xl",
        isDragging ? "opacity-100" : "hover:opacity-60"
      )} />
    </div>
  );
};