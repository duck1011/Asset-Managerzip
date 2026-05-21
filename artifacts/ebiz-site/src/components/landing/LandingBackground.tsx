import { memo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${6 + (i * 4.3) % 90}%`,
  top: `${10 + (i * 6.1) % 80}%`,
  size: 1.5 + (i % 2),
  duration: 12 + (i % 7),
  delay: i * 0.35,
}));

export const LandingBackground = memo(function LandingBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-hidden
    >
      {/* Layer 1 — animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 20% 20%, rgba(0,212,255,0.18), transparent 55%),
            radial-gradient(ellipse 70% 60% at 80% 30%, rgba(139,92,246,0.2), transparent 50%),
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,212,255,0.08), transparent 60%)
          `,
        }}
        animate={
          reduced
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "100% 50%", "0% 0%"],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 2 — large radial glow */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#00D4FF]/15 blur-[140px]"
        animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/18 blur-[150px]"
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3 — grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 35%, black 15%, transparent 72%)",
        }}
      />

      {/* Layer 4 — particles */}
      {!reduced &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/25"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Layer 5 — noise texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
});
