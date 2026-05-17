import { Link } from "wouter";
import { services, mediaGallery } from "@/data/mock";
import { ServiceCard } from "@/components/ServiceCard";
import { MediaCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();

  const localizedServices = services.map((service, i) => ({
    ...service,
    title: t.serviceData[i]?.title ?? service.title,
    description: t.serviceData[i]?.description ?? service.description,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section — Fluid Gradient + Glassmorphism */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">

        {/* Blob 1 — Electric Cyan */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/60 rounded-full blur-[150px]"
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 60, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blob 2 — Deep Purple */}
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/50 rounded-full blur-[150px]"
          animate={{ x: [0, -70, 40, 0], y: [0, 50, -60, 0], scale: [1, 0.9, 1.2, 1] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blob 3 — Vibrant Orange */}
        <motion.div
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-orange-500/40 rounded-full blur-[150px]"
          animate={{ x: [0, 80, -50, 0], y: [0, -70, 30, 0], scale: [1, 1.2, 0.85, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glassmorphism Frame */}
        <div className="relative z-10 w-full max-w-3xl mx-6 rounded-[2rem] p-12 md:p-16 text-center bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl">

          {/* Internal color glows — makes the glass feel refractive */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500 blur-[80px] opacity-30" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600 blur-[80px] opacity-30" />
          </div>

          {/* Content — sits above the internal glows */}
          <div className="relative z-10">
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              data-testid="text-hero-headline"
            >
              Think. Plan. Grow.<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                All in one.
              </span>
            </h1>

            <p
              className="text-lg text-slate-300 mb-10 max-w-lg mx-auto"
              data-testid="text-hero-tagline"
            >
              {t.profile.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services">
                <button
                  className="inline-flex items-center gap-2 bg-cyan-500 text-slate-900 font-semibold px-8 py-3.5 rounded-full hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 text-base"
                  data-testid="button-hero-cta"
                >
                  {t.home.heroCta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/profile">
                <button
                  className="inline-flex items-center border border-white/20 text-white px-8 py-3.5 rounded-full hover:bg-white/10 transition-all text-base"
                  data-testid="button-hero-secondary"
                >
                  {t.home.heroSecondary}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.home.capabilitiesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.capabilitiesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localizedServices.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                iconName={service.icon}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="outline" data-testid="button-view-all-services">
                {t.home.viewAllServices}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.home.recentWorkTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.recentWorkDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaGallery.slice(0, 4).map((item) => (
              <MediaCard
                key={item.id}
                id={item.id}
                src={item.src}
                alt={item.alt}
                category={item.category}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/media">
              <Button variant="outline" data-testid="button-view-media-studio">
                {t.home.exploreMedia}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
