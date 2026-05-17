"use client";

import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";
import { usePetitionCount } from "@/hooks/usePetitionCount";

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 248391 }: CounterProps) {
  const { count } = usePetitionCount(initialCount);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    const handleSigned = () => {
      controls.start({
        scale: [1, 1.1, 1],
        color: ["#ffffff", "#C8102E", "#ffffff"],
        transition: { duration: 0.5 }
      });
    };

    window.addEventListener("petitionSigned", handleSigned);
    return () => {
      window.removeEventListener("petitionSigned", handleSigned);
    };
  }, [controls]);
  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView, controls]);

  // Format number with commas
  const formattedCount = count.toLocaleString();
  const percentage = Math.min(100, (count / 500000) * 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="flex flex-col items-center justify-center py-8 w-full max-w-lg mx-auto"
    >
      <p className="text-gray-400 uppercase tracking-widest text-sm md:text-base font-medium mb-2 font-heading">
        Current Signatures
      </p>
      <motion.div
        animate={controls}
        className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-glow font-heading"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {formattedCount}
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-md mt-8 relative">
        <div className="w-full h-3 bg-neutral-900/80 rounded-full overflow-hidden relative border border-white/5">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-full progress-glow"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent w-full blur-[2px] animate-pulse-slow" />

          {/* Milestone markers */}
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/30" />
          <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/30" />
          <div className="absolute top-0 left-full w-0.5 h-full bg-white/30" />
        </div>

        {/* Progress labels */}
        <div className="flex items-center justify-between mt-3 text-xs">
          <span className="text-gray-500">250k</span>
          <span className="text-gray-500">350k</span>
          <span className="text-gray-500">500k</span>
        </div>
      </div>

      {/* Momentum indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-green-950/30 border border-green-500/20"
      >
        <TrendingUp className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-xs md:text-sm font-semibold">
          +1,234 in the last 24h
        </span>
      </motion.div>
    </motion.div>
  );
}
