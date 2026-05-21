import { lazy, Suspense, useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { SocialProofStrip } from "@/components/landing/SocialProofStrip";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { Services } from "@/components/landing/Services";
import { Metrics } from "@/components/landing/Metrics";
const Portfolio = lazy(() =>
  import("@/components/landing/Portfolio").then((m) => ({ default: m.Portfolio })),
);
const Process = lazy(() =>
  import("@/components/landing/Process").then((m) => ({ default: m.Process })),
);
const Testimonials = lazy(() =>
  import("@/components/landing/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const FAQ = lazy(() => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })));
const FinalCTA = lazy(() =>
  import("@/components/landing/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("landing-page");
    return () => document.documentElement.classList.remove("landing-page");
  }, []);

  return (
    <div
      className="relative min-h-screen text-white"
      style={{ background: "linear-gradient(180deg, #031B2F 0%, #0a1220 40%, #14002E 100%)" }}
    >
      <Hero />
      <SocialProofStrip />
      <WhyChooseUs />
      <Services />
      <Metrics />
      <Suspense fallback={<SectionFallback />}>
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </Suspense>
    </div>
  );
}
