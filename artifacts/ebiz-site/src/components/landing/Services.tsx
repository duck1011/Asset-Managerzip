import { memo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  Globe,
  Megaphone,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, staggerContainer, viewportOnce, easeOut } from "./motion";

const icons = [Globe, Palette, Megaphone, Search, Sparkles, BarChart2];

export const Services = memo(function Services() {
  const { t } = useLanguage();
  const items = t.landing.services.items;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading title={t.landing.services.title} subtitle={t.landing.services.subtitle} />
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(0,212,255,0.35)",
                  boxShadow: "0 0 48px rgba(0,212,255,0.14)",
                }}
                transition={{ duration: 0.45, ease: easeOut }}
                data-cursor="card"
              >
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#8B5CF6]/20 text-[#00D4FF]"
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <motion.p
                  className="mt-2 flex-1 text-sm leading-relaxed text-white/75"
                  initial={{ opacity: 0.85, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  {item.description}
                </motion.p>
                <Link href="/services">
                  <motion.span
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#00D4FF]"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    data-cursor="link"
                  >
                    {t.landing.services.learnMore}
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
});
