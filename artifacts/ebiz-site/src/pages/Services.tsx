import { useLocation } from "wouter";
import { services } from "@/data/mock";
import { ServiceCard } from "@/components/ServiceCard";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const localizedServices = services.map((service, i) => ({
    ...service,
    title: t.serviceData[i]?.title ?? service.title,
    description: t.serviceData[i]?.description ?? service.description,
  }));

  const handleSelectService = (id: number) => {
    const service = localizedServices.find((s) => s.id === id);
    if (service) {
      localStorage.setItem("selectedService", JSON.stringify(service));
      setLocation("/booking");
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t.services.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">
            {t.services.pageDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localizedServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              iconName={service.icon}
              onSelect={handleSelectService}
            />
          ))}
        </div>

        <div className="mt-20 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">{t.services.ctaTitle}</h3>
          <p className="text-muted-foreground mb-6">
            {t.services.ctaDesc}
          </p>
          <button
            onClick={() => setLocation("/consultation")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            data-testid="button-schedule-consultation"
          >
            {t.services.ctaButton}
          </button>
        </div>
      </div>
    </div>
  );
}
