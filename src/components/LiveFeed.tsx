"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

const locations = [
  "Liverpool, UK", "London, UK", "New York, USA", "Sydney, AUS",
  "Dublin, IRE", "Oslo, NOR", "Cairo, EGY", "Boston, USA",
  "Manchester, UK", "Dubai, UAE", "Toronto, CAN", "Berlin, GER",
  "Lagos, NGA", "Bangkok, THA", "Tokyo, JPN", "São Paulo, BRA",
  "Chicago, USA", "Amsterdam, NLD", "Mumbai, IND", "Seoul, KOR",
  "Cape Town, RSA", "Melbourne, AUS", "Glasgow, UK", "Houston, USA"
];

const firstNames = [
  "Someone", "A fan", "A supporter", "A Kopite", "A Red"
];

function getRandomLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

interface FeedItem {
  id: number;
  name: string;
  location: string;
  timeStr: string;
}

export function LiveFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Start with 2 initial items
    setTimeout(() => {
      setFeed([
        { id: Date.now() - 1000, name: getRandomName(), location: getRandomLocation(), timeStr: "Just now" },
        { id: Date.now() - 5000, name: getRandomName(), location: getRandomLocation(), timeStr: "5 seconds ago" },
        { id: Date.now() - 12000, name: getRandomName(), location: getRandomLocation(), timeStr: "12 seconds ago" }
      ]);
    }, 0);

    // Randomly add new items to simulate live activity
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setFeed(prev => {
          const newItem = { id: Date.now(), name: getRandomName(), location: getRandomLocation(), timeStr: "Just now" };
          const updated = [newItem, ...prev].slice(0, 5); // Keep max 5
          return updated;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop - bottom left */}
      <div className="fixed bottom-6 left-6 z-20 hidden lg:flex flex-col gap-2 w-72">
        <div className="text-xs text-gray-500 mb-2 text-center">Live signatures (simulated for demo)</div>
        <AnimatePresence>
          {feed.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/8 rounded-xl p-3 shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-red-900/50 border border-red-500/20 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-gray-200 truncate">{item.name} from {item.location}</span>
                <span className="text-[10px] text-red-400 font-medium">Signed · {item.timeStr}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile - top toast style */}
      <div className="fixed top-4 left-4 right-4 z-20 lg:hidden">
        <div className="text-xs text-gray-500 mb-2 text-center">Live signatures (simulated)</div>
        <AnimatePresence>
          {feed.slice(0, 1).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/8 rounded-xl p-3 shadow-lg"
            >
              <div className="w-7 h-7 rounded-full bg-red-900/50 border border-red-500/20 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-gray-200 truncate">{item.name} from {item.location}</span>
                <span className="text-[10px] text-red-400 font-medium">Signed · {item.timeStr}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
