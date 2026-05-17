import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const stored = JSON.parse(localStorage.getItem("userBookings") || "[]");
      setBookingCount(stored.length);
    };
    refresh();
    window.addEventListener("storage", refresh);
    const interval = setInterval(refresh, 1000);
    return () => {
      window.removeEventListener("storage", refresh);
      clearInterval(interval);
    };
  }, []);

  const otherLang = lang === "en" ? "id" : "en";
  const langLabel = lang === "en" ? "ID" : "EN";

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/profile", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/media", label: t.nav.media },
    { href: "/consultation", label: t.nav.consultation },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="navbar">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" data-testid="link-logo">
          <img src="/logo-icon.png" alt="NorthSouth icon" className="h-9 w-9 object-contain" />
          <span
            className="text-2xl font-bold"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-slate-900">North</span>
            <span style={{ color: "#06B6D4" }}>South</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
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

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              location === "/dashboard" ? "text-primary" : "text-muted-foreground"
            }`}
            data-testid="link-desktop-dashboard"
          >
            <LayoutDashboard className="w-4 h-4" />
            {t.nav.dashboard}
            {bookingCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {bookingCount}
              </span>
            )}
          </Link>

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

          <Link href="/booking">
            <Button data-testid="button-nav-contact">{t.nav.booking}</Button>
          </Link>
        </div>

        {/* Mobile Row */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/dashboard" className="relative p-2 text-muted-foreground" data-testid="link-mobile-dashboard-icon">
            <LayoutDashboard className="w-5 h-5" />
            {bookingCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {bookingCount}
              </span>
            )}
          </Link>
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
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 text-sm font-medium p-2 rounded transition-colors ${
                location === "/dashboard" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              }`}
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t.nav.dashboard}
              {bookingCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-bold ml-auto">
                  {bookingCount}
                </span>
              )}
            </Link>
            <Link href="/booking" onClick={() => setIsOpen(false)}>
              <Button className="w-full mt-2" data-testid="button-mobile-contact">
                {t.nav.booking}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
