import { Link } from "wouter";
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
      {/* Hero Section */}
      <section
        className="relative py-24 lg:py-40 overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient scrim — dark at bottom, fades up */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        {/* Subtle cyan glow centre */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-5xl md:text-7xl font-bold mb-8"
              style={{ letterSpacing: "-0.04em" }}
              data-testid="text-hero-headline"
            >
              <span className="text-white">North</span>
              <span style={{ color: "#06B6D4" }}>South</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-300 mb-10" data-testid="text-hero-tagline">
              {t.profile.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services">
                <button
                  className="inline-flex items-center gap-2 bg-cyan-500 text-slate-900 font-semibold px-8 py-3 rounded-full hover:bg-cyan-400 transition-colors text-lg"
                  data-testid="button-hero-cta"
                >
                  {t.home.heroCta}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/profile">
                <button
                  className="inline-flex items-center bg-white/10 text-white border border-white/30 backdrop-blur-sm px-8 py-3 rounded-full hover:bg-white/20 transition-colors text-lg"
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
