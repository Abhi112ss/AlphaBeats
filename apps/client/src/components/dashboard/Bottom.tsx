import { motion } from "motion/react";
import { Player } from "../room/Player";

export const Bottom = () => {
  return (
    <motion.div 
      className="relative flex-shrink-0 z-10 overflow-hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Enhanced animated background with cyber aesthetic */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              transparent 0%, 
              rgba(15, 23, 42, 0.8) 20%,
              rgba(75, 0, 110, 0.3) 60%,
              rgba(0, 0, 0, 0.95) 100%
            )
          `
        }}
      />
      
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 204, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 204, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      {/* Dynamic glowing top border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: `
            linear-gradient(90deg,
              transparent 0%,
              rgba(0, 255, 204, 0.3) 25%,
              rgba(0, 255, 170, 0.8) 50%,
              rgba(123, 58, 237, 0.6) 75%,
              transparent 100%
            )
          `,
          boxShadow: `
            0 0 10px rgba(0, 255, 204, 0.5),
            0 0 20px rgba(0, 255, 170, 0.3),
            0 0 30px rgba(123, 58, 237, 0.2)
          `
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          filter: ['blur(0px)', 'blur(0.5px)', 'blur(0px)']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Enhanced ambient glow layers - reduced positioning */}
      <motion.div 
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-[500px] h-32 rounded-full pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center,
              rgba(0, 255, 204, 0.25) 0%,
              rgba(0, 255, 170, 0.15) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -top-12 left-1/4 w-80 h-28 rounded-full pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center,
              rgba(123, 58, 237, 0.3) 0%,
              rgba(75, 0, 110, 0.2) 50%,
              transparent 80%
            )
          `,
          filter: 'blur(50px)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute -top-10 right-1/4 w-60 h-24 rounded-full pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center,
              rgba(0, 255, 204, 0.2) 0%,
              rgba(123, 58, 237, 0.15) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Main container with enhanced glassmorphism - reduced padding */}
      <motion.div 
        className="relative backdrop-blur-3xl p-3"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(15, 23, 42, 0.6) 0%,
              rgba(75, 0, 110, 0.4) 25%,
              rgba(0, 255, 204, 0.05) 50%,
              rgba(123, 58, 237, 0.3) 75%,
              rgba(0, 0, 0, 0.8) 100%
            )
          `,
          border: '1px solid rgba(0, 255, 204, 0.2)',
          boxShadow: `
            0 -12px 40px rgba(0, 255, 204, 0.15),
            0 -6px 20px rgba(123, 58, 237, 0.1),
            0 -2px 8px rgba(0, 255, 170, 0.2),
            inset 0 1px 0 rgba(0, 255, 204, 0.3),
            inset 0 -1px 0 rgba(123, 58, 237, 0.2)
          `
        }}
        whileHover={{
          boxShadow: `
            0 -16px 50px rgba(0, 255, 204, 0.25),
            0 -8px 25px rgba(123, 58, 237, 0.2),
            0 -4px 12px rgba(0, 255, 170, 0.3),
            inset 0 1px 0 rgba(0, 255, 204, 0.4),
            inset 0 -1px 0 rgba(123, 58, 237, 0.3)
          `,
          scale: 1.002,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      >
        {/* Enhanced floating particles system */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Cyber particles with enhanced glow */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${0.5 + (i % 3) * 0.3}rem`,
                height: `${0.5 + (i % 3) * 0.3}rem`,
                left: `${10 + i * 7}%`,
                top: `${20 + (i % 4) * 15}%`,
                background: i % 3 === 0 
                  ? 'rgba(0, 255, 204, 0.8)' 
                  : i % 3 === 1 
                    ? 'rgba(123, 58, 237, 0.7)'
                    : 'rgba(0, 255, 170, 0.6)',
                boxShadow: i % 3 === 0 
                  ? '0 0 15px rgba(0, 255, 204, 0.8), 0 0 30px rgba(0, 255, 204, 0.4)' 
                  : i % 3 === 1 
                    ? '0 0 12px rgba(123, 58, 237, 0.7), 0 0 25px rgba(123, 58, 237, 0.3)'
                    : '0 0 10px rgba(0, 255, 170, 0.6), 0 0 20px rgba(0, 255, 170, 0.3)'
              }}
              animate={{ 
                y: [-15 - i * 2, 15 + i * 2, -15 - i * 2],
                x: [-8 + (i % 2) * 16, 8 - (i % 2) * 16, -8 + (i % 2) * 16],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{ 
                duration: 4 + i * 0.3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        {/* Enhanced scanning line effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{
            background: `
              linear-gradient(90deg,
                transparent 0%,
                rgba(0, 255, 204, 0.3) 20%,
                rgba(0, 255, 204, 1) 50%,
                rgba(123, 58, 237, 0.8) 80%,
                transparent 100%
              )
            `,
            boxShadow: `
              0 0 10px rgba(0, 255, 204, 0.8),
              0 0 20px rgba(0, 255, 204, 0.4)
            `
          }}
          animate={{ 
            x: ['-100%', '200%']
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 2
          }}
        />
        
        {/* Content container with enhanced styling - reduced inset */}
        <motion.div 
          className="max-w-4xl mx-auto relative"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Enhanced inner glow for content area - reduced inset */}
          <div 
            className="absolute -inset-2 rounded-2xl"
            style={{
              background: `
                radial-gradient(ellipse at center,
                  rgba(0, 255, 204, 0.08) 0%,
                  rgba(123, 58, 237, 0.05) 50%,
                  transparent 100%
                )
              `,
              filter: 'blur(20px)'
            }}
          />
          
          {/* Player component wrapper with enhanced hover effects */}
          <motion.div
            className="relative"
            whileHover={{ 
              scale: 1.008,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <Player />
            
            {/* Enhanced hover sparkle effects */}
            <motion.div
              className="absolute top-3 right-6 w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                background: 'rgba(0, 255, 204, 0.9)',
                boxShadow: '0 0 8px rgba(0, 255, 204, 0.8)'
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-4 left-8 w-1 h-1 rounded-full pointer-events-none"
              style={{
                background: 'rgba(123, 58, 237, 0.8)',
                boxShadow: '0 0 6px rgba(123, 58, 237, 0.7)'
              }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.3, 1.2, 0.3],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                delay: 0.5,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute top-1/2 right-12 w-0.5 h-0.5 rounded-full pointer-events-none"
              style={{
                background: 'rgba(0, 255, 170, 0.9)',
                boxShadow: '0 0 4px rgba(0, 255, 170, 0.8)'
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.2, 1, 0.2],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: 1,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Enhanced bottom edge glow */}
        <motion.div 
          className="absolute bottom-0 left-1/4 right-1/4 h-0.5"
          style={{
            background: `
              linear-gradient(90deg,
                transparent 0%,
                rgba(0, 255, 204, 0.4) 25%,
                rgba(0, 255, 170, 0.8) 50%,
                rgba(123, 58, 237, 0.4) 75%,
                transparent 100%
              )
            `,
            filter: 'blur(1px)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Enhanced corner accent lights - reduced size */}
        <motion.div 
          className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-2xl pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at bottom left,
                rgba(0, 255, 204, 0.4) 0%,
                rgba(0, 255, 170, 0.2) 50%,
                transparent 100%
              )
            `,
            filter: 'blur(8px)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-2xl pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at bottom right,
                rgba(123, 58, 237, 0.4) 0%,
                rgba(75, 0, 110, 0.2) 50%,
                transparent 100%
              )
            `,
            filter: 'blur(8px)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
      </motion.div>
      
      {/* Enhanced outer glow effect - reduced inset */}
      <div 
        className="absolute -inset-2 -z-10 rounded-lg"
        style={{
          background: `
            radial-gradient(ellipse at center bottom,
              rgba(0, 255, 204, 0.12) 0%,
              rgba(123, 58, 237, 0.08) 50%,
              transparent 100%
            )
          `,
          filter: 'blur(40px)'
        }}
      />
      
      {/* Cyber data stream effect - reduced height */}
      <motion.div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-0.5 h-12 opacity-30 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              transparent 0%,
              rgba(0, 255, 204, 0.8) 50%,
              transparent 100%
            )
          `
        }}
        animate={{
          height: [48, 64, 48],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};