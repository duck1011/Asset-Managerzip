import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mediaGallery } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X, Download, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface ContextMenu {
  id: number;
  x: number;
  y: number;
}

export default function Media() {
  const [gallery, setGallery] = useState<GalleryItem[]>(mediaGallery);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [altText, setAltText] = useState("");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !category) return;
    const newImage: GalleryItem = {
      id: Date.now(),
      src: imageUrl,
      category,
      alt: altText || `New ${category} image`,
    };
    setGallery([newImage, ...gallery]);
    setImageUrl("");
    setCategory("");
    setAltText("");
  };

  const handleRightClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ id, x: e.clientX, y: e.clientY });
  };

  const handleDelete = (id: number) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    setContextMenu(null);
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-background py-16" ref={containerRef}>
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{t.media.pageTitle}</h1>
          <p className="text-xl text-muted-foreground">{t.media.pageDesc}</p>
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
            <div
              key={item.id}
              className="break-inside-avoid group relative overflow-hidden rounded-xl border bg-background cursor-pointer"
              data-testid={`card-media-${item.id}`}
              onClick={() => setSelectedItem(item)}
              onContextMenu={(e) => handleRightClick(e, item.id)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-testid={`img-media-${item.id}`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <Badge variant="secondary" className="w-fit mb-2" data-testid={`badge-category-${item.id}`}>
                  {item.category}
                </Badge>
                <p className="text-white font-medium text-sm line-clamp-2" data-testid={`text-alt-${item.id}`}>
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 bg-card border rounded-lg shadow-lg py-1 min-w-[160px]"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleDelete(contextMenu.id)}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Image
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full object-cover max-h-[60vh]"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <Badge className="mb-2">{selectedItem.category}</Badge>
                  <p className="font-medium text-foreground">{selectedItem.alt}</p>
                </div>
                <a
                  href={selectedItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
