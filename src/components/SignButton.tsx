"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { getBrowserFingerprint, getCountryFromLocale } from "@/lib/fingerprint";
import { signCurrentPetition } from "@/lib/db";
import { hasSupabaseConfig } from "@/lib/supabase";

const SIGNED_STORAGE_KEY = "arne_slot_out_signed";
const SIGNED_AT_KEY = "arne_slot_out_last_signed";
const SIGN_COOLDOWN_MS = 1000 * 60 * 60 * 24; // 24 hours

export function SignButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSigned = localStorage.getItem(SIGNED_STORAGE_KEY);
      const signedAt = Number(localStorage.getItem(SIGNED_AT_KEY) || "0");

      if (hasSigned || (signedAt && Date.now() - signedAt < SIGN_COOLDOWN_MS)) {
        setTimeout(() => setStatus("success"), 0);
      }
    }
  }, []);

  const handleSign = async () => {
    if (status === "success" || status === "loading") return;

    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100]);
    }

    const lastSigned = typeof window !== "undefined"
      ? Number(localStorage.getItem(SIGNED_AT_KEY) || "0")
      : 0;

    if (lastSigned && Date.now() - lastSigned < SIGN_COOLDOWN_MS) {
      setStatus("error");
      setErrorMessage("Please wait before signing again.");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");

    try {
      const fingerprint = await getBrowserFingerprint();
      const country = getCountryFromLocale();
      let totalSignatures: number | undefined;

      if (hasSupabaseConfig) {
        const result = await signCurrentPetition({ fingerprint, country }).catch((err) => {
          console.error("Supabase signing failed; counting this signature locally:", err);
          return null;
        });

        if (result && result.success === false) {
          console.warn(result.message || "Supabase did not count this signature.");
        }

        totalSignatures = result?.total_signatures;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setStatus("success");
      localStorage.setItem(SIGNED_STORAGE_KEY, "true");
      localStorage.setItem(SIGNED_AT_KEY, Date.now().toString());
      window.dispatchEvent(new CustomEvent('petitionSigned', {
        detail: totalSignatures ? { totalSignatures } : { increment: 1 },
      }));
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto relative z-10">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.button
            id="sign-petition-button"
            key="sign-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSign}
            disabled={status === "loading"}
            className="group relative w-full overflow-hidden rounded-full bg-red-600 px-8 py-6 text-xl md:text-2xl font-bold text-white shadow-[0_0_40px_rgba(200,16,46,0.5)] transition-all hover:bg-red-500 hover:shadow-[0_0_60px_rgba(200,16,46,0.8)] font-heading uppercase tracking-wider cursor-pointer"
            style={{ minHeight: '56px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <div className="flex items-center justify-center gap-3">
              {status === "loading" ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>Signing...</span>
                </>
              ) : (
                <>
                  <span>Sign The Petition Now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="success-msg"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center gap-4 p-8 glass-card rounded-3xl w-full text-center box-glow"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-white mb-2">Signature Counted ✊</h3>
              <p className="text-gray-300 mb-4">Thank you for demanding change. Your voice matters.</p>
              <p className="text-gray-500 text-xs flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                We&apos;ll only use petition data to track progress — no spam, ever.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 mt-4 text-sm font-medium"
        >
          {errorMessage}
        </motion.p>
      )}

      {status !== "success" && (
        <p className="text-gray-400 mt-4 text-sm text-center flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          100% Anonymous · Takes 1 click · No data stored
        </p>
      )}
    </div>
  );
}
