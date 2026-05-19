import { useEffect } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const northLetters = "North".split("");
const southLetters = "South".split("");

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2700);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 overflow-hidden"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ambient blobs — mirror the hero palette */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-[40%] w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* Logo mark */}
        <motion.img
          src="/logo-icon.png"
          alt="NorthSouth"
          className="w-16 h-16 object-contain"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        />

        {/* Brand name — North drops from top, South rises from bottom */}
        <div
          className="flex items-baseline overflow-hidden"
          style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          {northLetters.map((letter, i) => (
            <motion.span
              key={`n-${i}`}
              className="text-white inline-block"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25 + i * 0.065,
                duration: 0.55,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
          {southLetters.map((letter, i) => (
            <motion.span
              key={`s-${i}`}
              className="text-cyan-400 inline-block"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.42 + i * 0.065,
                duration: 0.55,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="text-slate-400 text-xs tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        >
          Digital Agency
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.65, duration: 0.9, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
