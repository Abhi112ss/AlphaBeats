import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalStore } from "@/store/global";
import { Library, ListMusic, Rotate3D } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { TopBar } from "../room/TopBar";
import { Bottom } from "./Bottom";
import { Left } from "./Left";
import { Main } from "./Main";
import { Right } from "./Right";

interface DashboardProps {
  roomId: string;
}

export const Dashboard = ({ roomId }: DashboardProps) => {
  const isSynced = useGlobalStore((state) => state.isSynced);
  const isLoadingAudio = useGlobalStore((state) => state.isInitingSystem);

  const isReady = isSynced && !isLoadingAudio;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div 
      className="w-full h-screen flex flex-col text-white relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top center, rgba(16, 185, 129, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse at bottom left, rgba(124, 58, 237, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.10) 0%, transparent 60%),
          linear-gradient(180deg, 
            rgba(2, 6, 23, 1) 0%,
            rgba(15, 23, 42, 0.98) 20%,
            rgba(30, 41, 59, 0.95) 60%,
            rgba(15, 23, 42, 0.98) 100%
          )
        `
      }}
    >
      {/* Animated background grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/5 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-10, 10, -10],
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-24 h-24 bg-violet-500/4 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [10, -10, 10],
            y: [5, -5, 5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.4, 0.15],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
        />
      </div>

      {/* Top edge glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top bar: Fixed height */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <TopBar roomId={roomId} />
      </motion.div>

      {isReady && (
        <motion.div
          className="flex flex-1 flex-col overflow-hidden min-h-0 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* --- DESKTOP LAYOUT (lg+) --- */}
          <motion.div 
            className="hidden lg:flex lg:flex-1 lg:overflow-hidden min-h-0"
            variants={tabVariants}
          >
            <Left className="flex" />
            <Main />
            <Right className="flex lg:w-80 lg:flex-shrink-0" />
          </motion.div>

          {/* --- MOBILE LAYOUT (< lg) --- */}
          <motion.div 
            className="flex flex-1 flex-col lg:hidden min-h-0"
            variants={tabVariants}
          >
            <Tabs
              defaultValue="queue"
              className="flex-1 flex flex-col overflow-hidden min-h-0"
            >
              {/* Enhanced Tab List for mobile */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TabsList className={`
                  shrink-0 grid w-full grid-cols-3 h-12 rounded-none p-0 relative overflow-hidden
                  bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90
                  backdrop-blur-xl border-b border-emerald-400/10
                `}>
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-violet-500/10 to-purple-500/5"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <TabsTrigger
                    value="library"
                    className={`
                      flex-1 relative z-10 rounded-none text-xs h-full gap-2 
                      text-slate-400 transition-all duration-300 ease-out
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-violet-500/10
                      data-[state=active]:text-emerald-200 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/20
                      hover:text-emerald-300 hover:bg-emerald-500/5
                      data-[state=active]:border-b-2 data-[state=active]:border-emerald-400/60
                    `}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Library size={16} />
                    </motion.div>
                    Library
                  </TabsTrigger>
                  
                  <TabsTrigger
                    value="queue"
                    className={`
                      flex-1 relative z-10 rounded-none text-xs h-full gap-2 
                      text-slate-400 transition-all duration-300 ease-out
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-violet-500/10
                      data-[state=active]:text-emerald-200 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/20
                      hover:text-emerald-300 hover:bg-emerald-500/5
                      data-[state=active]:border-b-2 data-[state=active]:border-emerald-400/60
                    `}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ListMusic size={16} />
                    </motion.div>
                    Queue
                  </TabsTrigger>
                  
                  <TabsTrigger
                    value="spatial"
                    className={`
                      flex-1 relative z-10 rounded-none text-xs h-full gap-2 
                      text-slate-400 transition-all duration-300 ease-out
                      data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-violet-500/10
                      data-[state=active]:text-emerald-200 data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/20
                      hover:text-emerald-300 hover:bg-emerald-500/5
                      data-[state=active]:border-b-2 data-[state=active]:border-emerald-400/60
                    `}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 0.2 }
                      }}
                    >
                      <Rotate3D size={16} />
                    </motion.div>
                    Spatial
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              {/* Enhanced Tab Content Area */}
              <AnimatePresence mode="sync">
                <TabsContent
                  key="library"
                  value="library"
                  className="flex-1 overflow-y-auto mt-0 min-h-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Left className="flex h-full w-full" />
                  </motion.div>
                </TabsContent>
                
                <TabsContent
                  key="queue"
                  value="queue"
                  className="flex-1 overflow-y-auto mt-0 min-h-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Main />
                  </motion.div>
                </TabsContent>
                
                <TabsContent
                  key="spatial"
                  value="spatial"
                  className="flex-1 overflow-y-auto mt-0 min-h-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Right className="flex h-full w-full" />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Enhanced Bottom Player */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Bottom />
          </motion.div>
        </motion.div>
      )}

      {/* Corner accent lights */}
      <motion.div
        className="absolute top-4 left-4 w-2 h-2 bg-emerald-400/40 rounded-full blur-sm pointer-events-none"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-violet-400/50 rounded-full blur-sm pointer-events-none"
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Bottom edge glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent pointer-events-none"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};