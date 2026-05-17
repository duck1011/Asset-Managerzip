import { Badge } from "@/components/ui/badge";

interface MediaCardProps {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export function MediaCard({ id, src, alt, category }: MediaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-background" data-testid={`card-media-${id}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-media-${id}`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <Badge variant="secondary" className="w-fit mb-2 bg-secondary text-secondary-foreground" data-testid={`badge-category-${id}`}>
          {category}
        </Badge>
        <p className="text-white font-medium text-sm line-clamp-2" data-testid={`text-alt-${id}`}>
          {alt}
        </p>
      </div>
    </div>
  );
}
