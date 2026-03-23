import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Random increment for organic feel
        const diff = Math.random() * 15;
        const next = Math.min(prev + diff, 100);
        
        if (next === 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Wait a bit at 100% before finishing
        }
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-black flex items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
        {/* Large Background Number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <motion.span 
              className="text-[25vw] font-bold text-zinc-900/40 font-mono tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
                {Math.round(progress)}
            </motion.span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo/Icon - Interlocking circles */}
            <div className="relative w-20 h-20 flex items-center justify-center">
                 <motion.div 
                    className="absolute w-12 h-12 border-2 border-white rounded-full"
                    style={{ x: -8 }}
                    animate={{ x: [-8, 0, -8], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 />
                 <motion.div 
                    className="absolute w-12 h-12 border-2 border-blue-500 rounded-full mix-blend-screen"
                    style={{ x: 8 }}
                    animate={{ x: [8, 0, 8], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 />
            </div>

            {/* Text */}
            <div className="text-center flex flex-col items-center gap-4">
                <h1 className="text-white text-xs md:text-sm font-bold tracking-[0.6em] uppercase pl-2">
                    Zain Ahmed
                </h1>
                
                {/* Progress Bar */}
                <div className="h-[1px] w-24 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-500 box-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
            </div>
        </div>
    </motion.div>
  );
};
