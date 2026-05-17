"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/card";
import { MessageCircle, Heart, Repeat2, BadgeCheck } from "lucide-react";
import { assetPath } from "@/lib/assets";

const reactions = [
  {
    handle: "@Kopite1892",
    name: "LFC Fanatic",
    verified: false,
    content: "This isn't the Liverpool we know. The pressing is gone, the passion is missing. It's time for a change before the season is completely lost. #SlotOut",
    time: "2h",
    date: "May 10, 2026",
    likes: "4.2k",
    rts: "1.1k",
    replies: "342"
  },
  {
    handle: "@AnfieldVoice",
    name: "Voice of Anfield",
    verified: true,
    content: "We backed him, gave him time, but the tactics are baffling. You can't play slow possession football at Anfield. The Kop wants intensity, not a coaching masterclass in nothingness. #SlotOut",
    time: "4h",
    date: "May 10, 2026",
    likes: "8.9k",
    rts: "2.4k",
    replies: "1.2k"
  },
  {
    handle: "@RedScouser",
    name: "True Red",
    verified: false,
    content: "I've seen enough. The players look lost, the manager looks out of ideas. Every press conference is the same empty words. The board needs to act now before we lose everything. #LFC #SlotOut",
    image: "/images/arne-slot-main.webp",
    time: "1h",
    date: "May 11, 2026",
    likes: "3.1k",
    rts: "800",
    replies: "256"
  }
];

// X (Twitter) logo SVG
function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z" />
    </svg>
  );
}

export function Reactions() {
  return (
    <section id="reactions" className="py-24 relative z-10 w-full max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <XLogo className="w-6 h-6 text-white" />
          <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight">
            Trending Across <span className="text-red-600">The Fanbase</span>
          </h2>
        </div>
        <p className="text-gray-400 text-base md:text-lg">
          Real reactions from fans who have had enough
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {reactions.map((reaction, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          >
            <GlassCard className="p-6 tweet-card">
              {/* Tweet header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center font-bold text-lg shrink-0">
                    {reaction.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold font-heading text-white">{reaction.name}</h4>
                      {reaction.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-400 verified-badge" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{reaction.handle} · {reaction.date}</p>
                  </div>
                </div>
                <XLogo className="w-5 h-5 text-gray-600 shrink-0" />
              </div>

              {/* Tweet content */}
              <p className={`text-gray-200 text-base md:text-lg leading-relaxed ${reaction.image ? 'mb-4' : 'mb-6'}`}>
                {reaction.content}
              </p>

              {reaction.image && (
                <div className="mb-6 rounded-xl overflow-hidden border border-white/10 relative h-48 md:h-64 w-full">
                  <img src={assetPath(reaction.image)} alt="Tweet attachment" className="absolute inset-0 w-full h-full object-cover object-top grayscale" />
                </div>
              )}

              {/* Tweet actions */}
              <div className="flex items-center gap-8 text-gray-500 text-sm border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer group">
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{reaction.replies}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer group">
                  <Repeat2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{reaction.rts}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-red-400 transition-colors cursor-pointer group">
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{reaction.likes}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
