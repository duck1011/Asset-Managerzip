import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, viewportOnce, easeOut } from "./motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function AnimatedStars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.35, ease: easeOut }}
          viewport={{ once: true }}
        >
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
}: {
  item: {
    name: string;
    company: string;
    review: string;
    avatar: string;
    companyInitial: string;
  };
}) {
  return (
    <motion.article
      className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-md"
      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.4, ease: easeOut }}
      data-cursor="card"
    >
      <Quote className="h-8 w-8 text-[#00D4FF]/35" />
      <p className="mt-4 text-sm leading-relaxed text-white/80">{item.review}</p>
      <div className="mt-4">
        <AnimatedStars />
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
        <img
          src={item.avatar}
          alt=""
          className="h-12 w-12 rounded-full object-cover ring-2 ring-[#00D4FF]/30"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-white/80">
              {item.companyInitial}
            </span>
            <p className="truncate text-xs text-white/55">{item.company}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const Testimonials = memo(function Testimonials() {
  const { t } = useLanguage();
  const items = t.landing.testimonials.items;
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused, reduced]);

  const desktopIndices = [0, 1, 2].map((o) => (index + o) % items.length);

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <SectionHeading title={t.landing.testimonials.title} />
        <div className="hidden gap-6 lg:grid lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {desktopIndices.map((idx) => (
              <motion.div
                key={`${idx}-${items[idx].name}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <TestimonialCard item={items[idx]} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.4, ease: easeOut }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) next();
                else if (info.offset.x > 50) setIndex((i) => (i - 1 + items.length) % items.length);
              }}
            >
              <TestimonialCard item={items[index]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
});
