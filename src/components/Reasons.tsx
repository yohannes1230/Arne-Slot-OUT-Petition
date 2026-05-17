"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/card";
import { Brain, Link2, TrendingDown } from "lucide-react";
import { assetPath } from "@/lib/assets";

const reasons = [
  {
    title: "Tactical Confusion",
    emoji: "🧠",
    description: "Pressing efficiency down 32% vs last season — we concede 4.7 high-turnover chances per game (was 8.1 under Klopp). The high-intensity identity that made Liverpool feared across Europe has completely vanished.",
    stat: "32%",
    statLabel: "Drop in pressing efficiency",
    icon: <Brain className="w-8 h-8 text-red-500" />
  },
  {
    title: "Lack of Identity",
    emoji: "🔗",
    description: "The connection between the team on the pitch and the fans in the stands is fading. No clear tactical philosophy, no recognisable style of play. Players look confused and without direction week after week.",
    stat: "0",
    statLabel: "Clear tactical identity",
    icon: <Link2 className="w-8 h-8 text-red-500" />
  },
  {
    title: "Poor Performances",
    emoji: "📉",
    description: "Unacceptable dropped points against relegation-threatened sides. Losses to Ipswich and Brentford, draws against Wolves and Southampton where we led. The fighting spirit has drained from this squad.",
    stat: "42%",
    statLabel: "Win rate this season",
    icon: <TrendingDown className="w-8 h-8 text-red-500" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function Reasons() {
  return (
    <section id="reasons" className="py-24 relative z-10 w-full max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black font-heading mb-4 tracking-tight">
          Why Fans Are <span className="text-red-600">Signing</span>
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The standard has dropped. We are Liverpool, and we demand better on and off the pitch.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {reasons.map((reason, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <GlassCard className="h-full flex flex-col items-center text-center p-8 relative overflow-hidden hover:shadow-[0_0_30px_rgba(200,16,46,0.3)] hover:border-red-500/30 transition-all duration-300 hover:scale-105">
              {/* Optional Watermark for the first card */}
              {idx === 0 && (
                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-luminosity">
                  <img src={assetPath("/images/arne-slot-main.webp")} alt="" className="w-full h-full object-cover grayscale" />
                </div>
              )}

              {/* Icon with emoji */}
              <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-500/20 flex items-center justify-center mb-6 text-2xl relative z-10">
                {reason.emoji}
              </div>

              <h3 className="text-xl font-bold font-heading mb-3 text-white">{reason.title}</h3>

              {/* Stat highlight */}
              <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-red-950/30 border border-red-500/15">
                <span className="text-red-400 font-bold text-sm">{reason.stat}</span>
                <span className="text-gray-500 text-xs">{reason.statLabel}</span>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm">{reason.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
