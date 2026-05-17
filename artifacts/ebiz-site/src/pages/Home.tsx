import { Link } from "wouter";
import { motion } from "framer-motion";
import { profile, services, mediaGallery } from "@/data/mock";
import { ServiceCard } from "@/components/ServiceCard";
import { MediaCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const localizedServices = services.map((service, i) => ({
    ...service,
    title: t.serviceData[i]?.title ?? service.title,
    description: t.serviceData[i]?.description ?? service.description,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section — Cosmic Mesh with Motion Blobs */}
      <section className="relative bg-slate-900 py-24 lg:py-40 overflow-hidden">
        {/* Blob 1 — Cyan Core (center-left, slow float) */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-[120px] pointer-events-none"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />
        {/* Blob 2 — Indigo Accent (center-right) */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"
          animate={{ x: [0, -60, 40, 0], y: [0, 30, -50, 0], scale: [1, 0.9, 1.15, 1] }}
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />
        {/* Blob 3 — Cyan Highlight (top-center) */}
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none"
          animate={{ x: [0, 30, -20, 0], y: [0, 60, 20, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-5xl md:text-7xl font-bold mb-8"
              style={{ letterSpacing: "-0.04em" }}
              data-testid="text-hero-headline"
            >
              <span className="text-white">North</span>
              <span className="text-cyan-400">South</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-300 mb-10" data-testid="text-hero-tagline">
              {t.profile.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services">
                <button
                  className="inline-flex items-center gap-2 bg-cyan-500 text-slate-900 font-semibold px-8 py-3 rounded-full hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 text-lg"
                  data-testid="button-hero-cta"
                >
                  {t.home.heroCta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/profile">
                <button
                  className="inline-flex items-center border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all text-lg"
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
