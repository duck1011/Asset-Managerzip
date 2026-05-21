import { motion } from "framer-motion";
import { BarChart3, Headphones, Palette, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "./motion";

const icons = [Zap, BarChart3, Palette, Headphones];

export function WhyChooseUs() {
  const { t } = useLanguage();
  const items = t.landing.whyChoose.items;

  return (
    <section id="about" className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading title={t.landing.whyChoose.title} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-md transition-shadow duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,212,255,0.12)]"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
