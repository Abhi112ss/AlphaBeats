"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { generateName } from "@/lib/randomNames";
import { validateFullRoomId, validatePartialRoomId } from "@/lib/room";
import { useRoomStore } from "@/store/room";
import { LogIn, PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface JoinFormData {
  roomId: string;
}

export const Join = () => {
  const posthog = usePostHog();
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const setUsername = useRoomStore((state) => state.setUsername);
  const username = useRoomStore((state) => state.username);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<JoinFormData>({
    defaultValues: {
      roomId: "",
    },
  });

  useEffect(() => {
    // Set a random username when component mounts
    const generatedName = generateName();
    setUsername(generatedName);
  }, [setValue, setUsername, posthog]);

  const router = useRouter();

  const onSubmit = (data: JoinFormData) => {
    setIsJoining(true);
    // Validate roomId
    if (!validateFullRoomId(data.roomId)) {
      toast.error("Invalid room code. Please enter 6 digits.");
      setIsJoining(false);

      // Track validation error
      posthog.capture("join_room_validation_error", {
        room_id: data.roomId,
        error: "Invalid room code",
      });
      return;
    }

    // Track join attempt
    posthog.capture("join_room_attempt", {
      room_id: data.roomId,
      username,
    });

    console.log("Joining room with data:", {
      roomId: data.roomId,
      username,
    });
    router.push(`/room/${data.roomId}`);
  };

  const handleCreateRoom = () => {
    setIsCreating(true);

    // Generate a random 6-digit room ID
    const newRoomId = Math.floor(100000 + Math.random() * 900000).toString();

    // Track room creation
    posthog.capture("create_room", {
      room_id: newRoomId,
      username,
    });

    router.push(`/room/${newRoomId}`);
  };

  const handleRegenerateName = () => {
    const newName = generateName();
    setUsername(newName);

    // Track name regeneration
    posthog.capture("regenerate_username", {
      previous_username: username,
      new_username: newName,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating particles with fixed positions */}
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-[25%] left-[80%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-[45%] left-[5%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[60%] left-[70%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-[35%] left-[90%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-[75%] left-[20%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-[85%] left-[60%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-[20%] left-[45%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[55%] left-[35%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-[90%] left-[10%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '3.5s'}}></div>
        <div className="absolute top-[15%] left-[65%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '4.5s'}}></div>
        <div className="absolute top-[70%] left-[85%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '5.5s'}}></div>
        <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-[80%] left-[50%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-[30%] left-[75%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '2.8s'}}></div>
        <div className="absolute top-[65%] left-[40%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '3.8s'}}></div>
        <div className="absolute top-[95%] left-[30%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '4.8s'}}></div>
        <div className="absolute top-[5%] left-[55%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '5.8s'}}></div>
        <div className="absolute top-[50%] left-[95%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-[12%] left-[8%] w-1 h-1 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-ping opacity-20" style={{animationDelay: '2.2s'}}></div>
      </div>

      <div className="w-full px-1 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center p-8 max-w-[28rem] mx-auto relative group"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glassmorphism container with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-slate-900/80 to-violet-500/5 backdrop-blur-2xl rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl"></div>
          <div className="absolute inset-0 border border-emerald-400/20 rounded-3xl shadow-2xl group-hover:border-emerald-400/40 transition-colors duration-500"></div>
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
          
          {/* Content container */}
          <div className="relative z-10 w-full">
            {/* Header with premium styling */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-violet-400 bg-clip-text text-transparent mb-2">
                Join AlphaBeats Room
              </h2>
              <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full mb-4"></div>
              <p className="text-emerald-200/80 text-sm">
                Enter a room code to join or generate a new room
              </p>
            </motion.div>

            {/* Fixed: Changed div to form element and added proper onSubmit */}
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* OTP Input with futuristic styling */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Controller
                  control={control}
                  name="roomId"
                  rules={{ required: "Room code is required" }}
                  render={({ field }) => (
                    <div className="relative">
                      {/* Glow effect behind OTP */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-50"></div>
                      <InputOTP
                        autoFocus
                        maxLength={6}
                        inputMode="numeric"
                        value={field.value}
                        onChange={(value) => {
                          if (validatePartialRoomId(value)) {
                            field.onChange(value);
                          }
                        }}
                        className="gap-3 relative z-10"
                      >
                        <InputOTPGroup className="gap-3">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="relative">
                              <InputOTPSlot
                                index={index}
                                className="w-12 h-14 text-lg font-bold bg-gradient-to-br from-slate-800/60 to-slate-700/60 border-2 border-emerald-400/30 rounded-xl transition-all duration-300 focus-within:border-emerald-400/80 focus-within:bg-slate-800/80 focus-within:shadow-lg focus-within:shadow-emerald-500/25 focus-within:scale-105 text-emerald-300 backdrop-blur-sm"
                              />
                              {/* Individual slot glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-violet-400/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            </div>
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )}
                />
              </motion.div>

              {/* Error message with enhanced styling */}
              {errors.roomId && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-400/30 rounded-lg backdrop-blur-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <p className="text-sm text-red-300 font-medium">
                      {errors.roomId.message}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Username display with futuristic design */}
              <motion.div
                className="flex items-center justify-center mb-8 p-4 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl border border-emerald-400/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span className="text-emerald-200 text-sm">
                    You will join as{" "}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={username}
                        className="text-emerald-400 font-bold inline-block"
                        initial={{
                          opacity: 0,
                          filter: "blur(8px)",
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          filter: "blur(0px)",
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          filter: "blur(8px)",
                          scale: 0.8,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        {username}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <button
                    type="button"
                    onClick={handleRegenerateName}
                    className="px-3 py-1 text-xs bg-gradient-to-r from-violet-600/60 to-purple-600/60 hover:from-violet-500/80 hover:to-purple-500/80 text-violet-200 hover:text-white rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isJoining || isCreating}
                  >
                    Regenerate
                  </button>
                </div>
              </motion.div>

              {/* Action buttons with premium styling */}
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={!isJoining && !isCreating ? { scale: 1.02 } : {}}
                  whileTap={!isJoining && !isCreating ? { scale: 0.98 } : {}}
                >
                  {/* Fixed: Changed to proper submit button */}
                  <button
                    type="submit"
                    className="relative w-full group/btn overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 disabled:hover:shadow-none disabled:cursor-not-allowed"
                    disabled={isJoining || isCreating}
                  >
                    {/* Button background layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/80 via-emerald-600/80 to-green-500/80 group-hover/btn:from-emerald-500 group-hover/btn:via-emerald-600 group-hover/btn:to-green-500 disabled:from-gray-600/50 disabled:via-gray-500/50 disabled:to-gray-600/50 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 group-hover/btn:from-white/20 group-hover/btn:to-white/10 transition-all duration-300"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center px-6 py-4 text-white font-bold text-base">
                      {isJoining ? (
                        <motion.div
                          className="flex items-center gap-3"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <LogIn size={20} />
                        </motion.div>
                      ) : (
                        <LogIn size={20} className="mr-3" />
                      )}
                      <span>{isJoining ? "Joining..." : "Join Room"}</span>
                    </div>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={!isJoining && !isCreating ? { scale: 1.02 } : {}}
                  whileTap={!isJoining && !isCreating ? { scale: 0.98 } : {}}
                >
                  <button
                    type="button"
                    onClick={handleCreateRoom}
                    className="relative w-full group/btn overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 disabled:hover:shadow-none disabled:cursor-not-allowed"
                    disabled={isJoining || isCreating}
                  >
                    {/* Button background layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/60 via-purple-600/60 to-violet-600/60 group-hover/btn:from-violet-600/80 group-hover/btn:via-purple-600/80 group-hover/btn:to-violet-600/80 disabled:from-gray-600/30 disabled:via-gray-500/30 disabled:to-gray-600/30 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/0 group-hover/btn:from-white/10 group-hover/btn:to-white/5 transition-all duration-300"></div>
                    <div className="absolute inset-0 border border-violet-400/30 group-hover/btn:border-violet-400/60 rounded-2xl transition-colors duration-300"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center px-6 py-4 text-violet-200 group-hover/btn:text-white font-bold text-base transition-colors duration-300">
                      {isCreating ? (
                        <motion.div
                          className="flex items-center gap-3"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <PlusCircle size={20} />
                        </motion.div>
                      ) : (
                        <PlusCircle size={20} className="mr-3" />
                      )}
                      <span>{isCreating ? "Creating..." : "Create New Room"}</span>
                    </div>
                  </button>
                </motion.div>
              </div>
            </form>

            {/* Footer message with elegant styling */}
            <motion.div
              className="text-center mt-8 p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-xl border border-emerald-400/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-emerald-200/70 text-xs">
                  Tip : Use native device speakers for the best experience
                </p>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </motion.div>
          </div>

          {/* Corner decorative elements */}
          <div className="absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 border-emerald-400/40 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-3 h-3 border-r-2 border-t-2 border-violet-400/40 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 border-l-2 border-b-2 border-emerald-400/40 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-violet-400/40 rounded-br-lg"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};