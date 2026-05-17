import { useState } from "react";
import { mediaGallery } from "@/data/mock";
import { MediaCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function Media() {
  const [gallery, setGallery] = useState(mediaGallery);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [altText, setAltText] = useState("");
  const { t } = useLanguage();

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !category) return;

    const newImage = {
      id: Date.now(),
      src: imageUrl,
      category: category,
      alt: altText || `New ${category} image`,
    };

    setGallery([newImage, ...gallery]);
    setImageUrl("");
    setCategory("");
    setAltText("");
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t.media.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">
            {t.media.pageDesc}
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>{t.media.addTitle}</CardTitle>
              <CardDescription>{t.media.addDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddImage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">{t.media.labelUrl}</Label>
                    <Input
                      id="imageUrl"
                      placeholder={t.media.placeholderUrl}
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      data-testid="input-image-url"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t.media.labelCategory}</Label>
                    <Input
                      id="category"
                      placeholder={t.media.placeholderCategory}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      data-testid="input-category"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altText">{t.media.labelAlt}</Label>
                  <Input
                    id="altText"
                    placeholder={t.media.placeholderAlt}
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    data-testid="input-alt-text"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-add-gallery">
                  {t.media.addButton}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {gallery.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <MediaCard
                id={item.id}
                src={item.src}
                alt={item.alt}
                category={item.category}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
