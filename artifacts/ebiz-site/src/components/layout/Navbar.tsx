import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { profile } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/profile", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/media", label: t.nav.media },
  ];

  const otherLang = lang === "en" ? "id" : "en";
  const langLabel = lang === "en" ? "ID" : "EN";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="navbar">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">B</span>
          </div>
          <span className="font-bold text-lg tracking-tight">{profile.companyName}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-desktop-${link.href === "/" ? "home" : link.href.slice(1)}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(otherLang)}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border rounded-md px-2.5 py-1"
            data-testid="button-lang-switch"
            title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5" />
            {langLabel}
          </button>

          <Button data-testid="button-nav-contact">{t.nav.contact}</Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <button
            onClick={() => setLang(otherLang)}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-border rounded px-2 py-1"
            data-testid="button-mobile-lang-switch"
          >
            <Globe className="w-3 h-3" />
            {langLabel}
          </button>

          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-background" data-testid="mobile-menu">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium p-2 rounded transition-colors ${
                  location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-${link.href === "/" ? "home" : link.href.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full mt-2" onClick={() => setIsOpen(false)} data-testid="button-mobile-contact">
              {t.nav.contact}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
