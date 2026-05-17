import { Link } from "wouter";
import { profile, services, mediaGallery } from "@/data/mock";
import { ServiceCard } from "@/components/ServiceCard";
import { MediaCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6" data-testid="text-hero-headline">
              {profile.companyName}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8" data-testid="text-hero-tagline">
              {profile.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8" data-testid="button-hero-cta">
                  Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8" data-testid="button-hero-secondary">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade digital strategy and execution tailored for growing businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
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
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of our latest projects driving measurable growth for clients.
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
                Explore Media Studio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
