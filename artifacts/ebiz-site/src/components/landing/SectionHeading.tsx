import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "./motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-14 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-xl"}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
