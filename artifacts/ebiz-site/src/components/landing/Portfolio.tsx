import { memo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, staggerContainer, viewportOnce, easeOut } from "./motion";

const gradients = [
  "from-[#00D4FF]/35 via-[#031B2F] to-[#8B5CF6]/45",
  "from-[#8B5CF6]/40 via-[#14002E] to-[#00D4FF]/30",
  "from-emerald-500/25 via-[#031B2F] to-[#00D4FF]/35",
];

export const Portfolio = memo(function Portfolio() {
  const { t } = useLanguage();
  const projects = t.landing.portfolio.items;

  return (
    <section id="work" className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading title={t.landing.portfolio.title} subtitle={t.landing.portfolio.subtitle} />
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              custom={i}
              className="group relative grid overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] md:grid-cols-2"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: easeOut }}
              data-cursor="card"
            >
              <div
                className={`relative min-h-[220px] overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} md:min-h-[280px]`}
              >
                <motion.div
                  className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiLz48L3N2Zz+')] opacity-50"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: easeOut }}
                />
                <motion.div
                  className="absolute inset-0 bg-[#031B2F]/0 transition-colors duration-500 group-hover:bg-[#031B2F]/40"
                />
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-xs font-medium uppercase tracking-widest text-[#00D4FF]">
                  {project.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
                <p className="mt-3 text-sm font-medium text-[#00D4FF]">{project.result}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{project.description}</p>
                <Link href="/media">
                  <motion.button
                    type="button"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    whileHover={{ y: -3, borderColor: "rgba(0,212,255,0.4)" }}
                    data-cursor="button"
                  >
                    {t.landing.portfolio.viewProject}
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div className="mt-12 text-center" variants={fadeUp} custom={0}>
          <Link href="/media">
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/[0.06]"
              whileHover={{ y: -3 }}
              data-cursor="button"
            >
              {t.landing.portfolio.viewAll}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
});
