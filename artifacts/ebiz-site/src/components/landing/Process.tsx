import { memo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Lightbulb, Palette, Rocket, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, viewportOnce, easeOut } from "./motion";

const icons = [Search, Compass, Lightbulb, Palette, Rocket];

export const Process = memo(function Process() {
  const { t } = useLanguage();
  const steps = t.landing.process.steps;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, index) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(index);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0.2 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [steps.length]);

  return (
    <section id="process" ref={containerRef} className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <SectionHeading title={t.landing.process.title} />
        <div className="relative">
          <div className="absolute left-7 top-0 hidden h-full w-px bg-white/10 md:block">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-[#00D4FF] to-[#8B5CF6]"
              style={{ scaleY: lineScale }}
            />
          </div>
          <div className="flex flex-col gap-10 md:gap-12">
            {steps.map((step, i) => {
              const Icon = icons[i];
              const active = activeStep === i;
              return (
                <motion.div
                  key={step.title}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative flex gap-6 md:gap-10"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: easeOut }}
                >
                  <motion.div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-500 ${
                      active
                        ? "border-[#00D4FF]/50 bg-[#00D4FF]/15 text-[#00D4FF] shadow-[0_0_32px_rgba(0,212,255,0.25)]"
                        : "border-white/[0.08] bg-white/[0.04] text-white/50"
                    }`}
                    animate={active ? { scale: 1.06 } : { scale: 1 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div className="pb-2 pt-2">
                    <p className="text-xs font-medium uppercase tracking-widest text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className={`mt-1 text-xl font-semibold transition-colors duration-500 ${
                        active ? "text-white" : "text-white/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/65">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
});
