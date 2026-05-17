import { services } from "@/data/mock";
import { ServiceCard } from "@/components/ServiceCard";

export default function Services() {
  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive digital solutions designed to elevate your brand and drive measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
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
        
        <div className="mt-20 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Not sure where to start?</h3>
          <p className="text-muted-foreground mb-6">
            Schedule a free consultation with our strategy team to discuss your business goals and find the right mix of services.
          </p>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8" data-testid="button-schedule-consultation">
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
