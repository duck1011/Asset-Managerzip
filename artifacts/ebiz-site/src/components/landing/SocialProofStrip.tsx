import { memo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LOGOS = ["Google", "Spotify", "Notion", "Adobe", "Netflix"];

export const SocialProofStrip = memo(function SocialProofStrip() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const items = [...LOGOS, ...LOGOS];

  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-white/45">
          {t.landing.socialProof.label}
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex w-max gap-16 px-8"
          animate={reduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="cursor-default select-none text-xl font-semibold tracking-tight text-white/35 grayscale transition-all duration-500 hover:scale-105 hover:text-white/90 hover:grayscale-0"
              data-cursor="link"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
