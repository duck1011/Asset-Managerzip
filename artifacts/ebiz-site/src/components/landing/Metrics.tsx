import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { useCountUp } from "@/hooks/use-count-up";
import { fadeUp, staggerContainer, viewportOnce } from "./motion";

function MetricItem({
  value,
  suffix,
  label,
  decimals = 0,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  inView: boolean;
}) {
  const count = useCountUp(value, 1400, inView, decimals);
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#00D4FF]/25 hover:shadow-[0_0_40px_rgba(0,212,255,0.12)]"
      data-cursor="card"
    >
      <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-sm text-white/65">{label}</p>
    </motion.div>
  );
}

export const Metrics = memo(function Metrics() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = t.landing.metrics.items;

  return (
    <section id="metrics" className="relative py-24 md:py-32">
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading title={t.landing.metrics.title} subtitle={t.landing.metrics.subtitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MetricItem
              key={item.label}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              decimals={item.decimals}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
});
