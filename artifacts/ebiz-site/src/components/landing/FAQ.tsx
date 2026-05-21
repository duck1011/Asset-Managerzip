import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, viewportOnce } from "./motion";

export function FAQ() {
  const { t } = useLanguage();
  const items = t.landing.faq.items;

  return (
    <section className="relative py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-3xl px-4 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <SectionHeading title={t.landing.faq.title} />
        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 backdrop-blur-sm border-b-0 data-[state=open]:border-[#00D4FF]/20"
            >
              <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/75 leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
