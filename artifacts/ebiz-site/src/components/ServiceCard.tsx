import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  iconName: string;
}

export function ServiceCard({ id, title, description, price, iconName }: ServiceCardProps) {
  const [selected, setSelected] = useState(false);
  const Icon = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <Card className={`transition-all duration-200 border-2 ${selected ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'}`} data-testid={`card-service-${id}`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${selected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground" data-testid={`text-price-${id}`}>{price}</div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={selected ? "default" : "outline"}
          className="w-full"
          onClick={() => setSelected(!selected)}
          data-testid={`button-select-service-${id}`}
        >
          {selected ? "Selected" : "Select Service"}
        </Button>
      </CardFooter>
    </Card>
  );
}
