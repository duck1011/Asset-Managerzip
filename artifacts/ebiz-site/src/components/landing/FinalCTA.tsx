import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { fadeUp, viewportOnce } from "./motion";

export function FinalCTA() {
  const { t } = useLanguage();
  const c = t.landing.cta;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-5xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] px-8 py-16 text-center md:px-16 md:py-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(139,92,246,0.12) 50%, rgba(3,27,47,0.9) 100%)",
          }}
          whileHover={{ boxShadow: "0 0 60px rgba(0,212,255,0.12)" }}
          transition={{ duration: 0.4 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.15),transparent_55%)]" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
              {c.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">{c.subtitle}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/consultation">
                <motion.button
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D4FF] px-8 py-3.5 text-sm font-medium text-[#031B2F] shadow-[0_0_32px_rgba(0,212,255,0.3)] sm:w-auto"
                whileHover={{ y: -3, boxShadow: "0 0 48px rgba(0,212,255,0.45)" }}
                whileTap={{ scale: 0.98 }}
                data-cursor="button"
              >
                  {c.bookConsultation}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <a href="mailto:hello@northsouth.co">
                <motion.button
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white sm:w-auto"
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="button"
                >
                  {c.contactUs}
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
