import React from 'react';
import { motion } from 'framer-motion';

const BattingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-4">
      {/* Container representing the field action */}
      <div className="relative w-32 h-32 overflow-hidden bg-surface-container-low rounded-full border border-primary/20 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
        
        {/* Pitch / Ground arc */}
        <div className="absolute -bottom-8 w-[140%] h-20 bg-primary/10 rounded-[100%] shadow-inner"></div>

        {/* Wickets (Right side) */}
        <div className="absolute left-[70%] top-[45%] flex gap-[2px] z-0">
          <div className="w-[3px] h-10 bg-on-surface-variant rounded-t-[1px]"></div>
          <div className="w-[3px] h-10 bg-on-surface-variant rounded-t-[1px]"></div>
          <div className="w-[3px] h-10 bg-on-surface-variant rounded-t-[1px]"></div>
          {/* Bails */}
          <div className="absolute -top-[1.5px] -left-[1px] w-1.5 h-[2px] bg-tertiary"></div>
          <div className="absolute -top-[1.5px] right-[1px] w-1.5 h-[2px] bg-tertiary"></div>
        </div>

        {/* The Ball */}
        <motion.div
          className="absolute w-3 h-3 bg-error rounded-full shadow-md z-10"
          animate={{
            left: ['-10%', '55%', '-20%', '-20%'], 
            top: ['45%', '70%', '10%', '10%'],
            scale: [1, 1, 1.5, 1.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1]
          }}
        />

        {/* The Bat */}
        <motion.div
          className="absolute w-3 h-14 bg-[#e0aa6b] border border-[#c28c4f] rounded-b-sm border-t-[10px] border-t-[#8c3b3b] shadow-sm z-20 left-[60%] top-[25%] rounded-t-[2px]"
          style={{ originY: 0, originX: 0.5 }} // Hinge at top handle
          animate={{
            rotate: [-40, 70, -40, -40], // Backlift (-ve CCW), swing to left (+ve CW), follow through
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.4, 0.7, 1]
          }}
        >
          {/* Bat Handle grip lines */}
          <div className="absolute top-[-10px] w-full h-2.5 flex flex-col justify-evenly px-[0.5px]">
             <div className="w-full h-[0.5px] bg-black/40"></div>
             <div className="w-full h-[0.5px] bg-black/40"></div>
             <div className="w-full h-[0.5px] bg-black/40"></div>
          </div>
        </motion.div>
        
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h3 className="font-headline uppercase tracking-widest text-sm font-bold text-tertiary animate-pulse">
            Striking the ball...
        </h3>
        <p className="text-xs text-on-surface-variant font-body tracking-wider animate-pulse pt-1">
            Setting up your session
        </p>
      </div>
    </div>
  );
};

export default BattingLoader;
