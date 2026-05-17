"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Set deadline 14 days from a fixed start date to keep it consistent
const DEADLINE = new Date("2026-05-25T23:59:59Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-card rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px]">
        <span className="text-2xl md:text-4xl font-black font-heading text-white countdown-digit">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-500 mt-2 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 md:gap-4 my-8">
        <TimeBlock value={0} label="Days" />
        <span className="text-2xl md:text-4xl text-red-600 font-bold mt-[-1.5rem]">:</span>
        <TimeBlock value={0} label="Hours" />
        <span className="text-2xl md:text-4xl text-red-600 font-bold mt-[-1.5rem]">:</span>
        <TimeBlock value={0} label="Mins" />
        <span className="text-2xl md:text-4xl text-red-600 font-bold mt-[-1.5rem]">:</span>
        <TimeBlock value={0} label="Secs" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-3 md:gap-4 my-8"
    >
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-2xl md:text-4xl text-red-600 font-bold mt-[-1.5rem]">:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-2xl md:text-4xl text-red-600 font-bold mt-[-1.5rem]">:</span>
      <TimeBlock value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl md:text-4xl text-red-600 font-bold mt-[-1.5rem]">:</span>
      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
}
