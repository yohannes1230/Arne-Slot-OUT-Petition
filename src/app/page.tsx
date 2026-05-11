import { Counter } from "@/components/Counter";
import { SignButton } from "@/components/SignButton";
import { Reasons } from "@/components/Reasons";
import { Reactions } from "@/components/Reactions";
import { SocialShare } from "@/components/SocialShare";
import { LiveFeed } from "@/components/LiveFeed";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Footer } from "@/components/Footer";
import { getSignatureCount } from "@/lib/db";

import Image from "next/image";

export const revalidate = 0; // Disable static caching for this page to get fresh count on load

export default async function Page() {
  const initialCount = await getSignatureCount();

  return (
    <main className="relative min-h-screen flex flex-col w-full selection:bg-red-600 selection:text-white">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
        {/* Arne Slot Photo - Large, prominent background */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/arne-slot-main.webp"
            alt="Arne Slot on the touchline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right grayscale opacity-70"
          />
        </div>

        {/* Red tint over the photo */}
        <div className="absolute inset-0 bg-red-950/25" />
        {/* Bottom gradient fade to black for content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        {/* Subtle red gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 via-transparent to-transparent" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,#000000_90%)]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      </div>

      <LiveFeed />

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20 pb-10">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-sm font-semibold tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE PETITION — FANS DEMAND CHANGE
          </div>

          {/* Arne Slot caption badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-gray-400 text-xs font-medium">
              <span>📸</span>
              <span>Arne Slot — Appointed June 2024 · 60 matches · 52% win rate</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black font-heading tracking-tighter mb-6 uppercase text-glow leading-[1.05]">
            Arne Slot <br />
            <span className="text-red-600">OUT</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl font-light mb-4 leading-relaxed">
            The standard has dropped. Join <span className="text-white font-semibold">{initialCount.toLocaleString()}</span> supporters signing the petition to remove Arne Slot and restore our identity.
          </p>

          <Counter initialCount={initialCount} />

          <div className="mt-10 w-full">
            <SignButton />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-black to-black">
        <Reasons />
        <Reactions />
        <SocialShare />

        {/* Final CTA */}
        <section id="final-cta" className="py-24 px-6 text-center border-t border-white/5 bg-gradient-to-t from-red-950/20 to-transparent">
          <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 uppercase tracking-tighter">
            Time is <span className="text-red-600">Running Out</span>
          </h2>

          <CountdownTimer />

          <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Until the end of the season — every signature counts. Add your voice to the movement right now.
          </p>

          {/* Small reminder thumbnail */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-600/50 shrink-0">
              <Image
                src="/images/arne-slot-main.webp"
                alt="Arne Slot"
                width={48}
                height={48}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <span className="text-gray-400 text-sm">Remove Arne Slot as Liverpool Manager</span>
          </div>

          <SignButton />
        </section>
      </div>

      <Footer />
    </main>
  );
}
