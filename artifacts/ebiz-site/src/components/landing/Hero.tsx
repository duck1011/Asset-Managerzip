import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LandingBackground } from "./LandingBackground";
import { HeroDashboard } from "./HeroDashboard";
import { fadeUp, easeOut } from "./motion";

export function Hero() {
  const { t } = useLanguage();
  const h = t.landing.hero;
  const lines = h.titleLines;

  return (
    <section id="hero" className="relative min-h-[calc(100vh-70px)] overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(165deg, #031B2F 0%, #0a1628 45%, #14002E 100%)" }}
      />
      <LandingBackground />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
      >
        <div>
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#00D4FF]"
          >
            NorthSouth Digital Agency
          </motion.p>

          <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[4.25rem] lg:leading-[1.05]">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                className="block"
                variants={fadeUp}
                custom={i + 1}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            custom={lines.length + 1}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={lines.length + 2}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/consultation">
              <motion.button
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D4FF] px-8 py-3.5 text-sm font-medium text-[#031B2F] shadow-[0_0_32px_rgba(0,212,255,0.35)] sm:w-auto"
                whileHover={{ y: -3, boxShadow: "0 0 48px rgba(0,212,255,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeOut }}
                data-cursor="button"
              >
                {h.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </Link>
            <a href="#work">
              <motion.button
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm sm:w-auto"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeOut }}
                data-cursor="button"
              >
                {h.ctaSecondary}
              </motion.button>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={lines.length + 3} className="mt-10">
            <p className="text-sm font-medium text-amber-300/90">{h.trustStars}</p>
            <p className="mt-1 text-sm text-white/60">{h.trustText}</p>
            <p className="mt-3 text-xs tracking-wide text-white/45">{h.trustTags}</p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={lines.length + 4}>
          <HeroDashboard />
        </motion.div>
      </motion.div>
    </section>
  );
}
