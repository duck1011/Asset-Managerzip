import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { reducedMotionViewport, sectionReveal, viewportOnce } from "./motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const SectionReveal = memo(function SectionReveal({
  children,
  className,
  id,
  delay = 0,
}: SectionRevealProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={reduced ? reducedMotionViewport : viewportOnce}
      variants={sectionReveal}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
});
