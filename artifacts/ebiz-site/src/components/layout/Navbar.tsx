import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { assetUrl } from "@/lib/asset-url";
import { Menu, X, Globe, LogIn, LogOut, UserCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@workspace/replit-auth-web";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { easeOut } from "@/components/landing/motion";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `/#${id}`);
  }
}

function NavItem({
  href,
  label,
  active,
  onClick,
  testId,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  testId?: string;
}) {
  const [location, navigate] = useLocation();

  if (href.startsWith("/#")) {
    const sectionId = href.slice(2);
    return (
      <a
        href={href}
        data-testid={testId}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          if (location !== "/") {
            navigate("/");
            window.setTimeout(() => scrollToSection(sectionId), 150);
          } else {
            scrollToSection(sectionId);
          }
        }}
        className={`relative py-1 text-sm font-medium transition-colors duration-300 ${
          active ? "text-[#00D4FF]" : "text-white/75 hover:text-white"
        }`}
      >
        {label}
        <motion.span
          className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#00D4FF]"
          initial={false}
          animate={{ width: active ? "100%" : "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.35, ease: easeOut }}
        />
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} data-testid={testId}>
      <span
        className={`relative inline-block py-1 text-sm font-medium transition-colors duration-300 ${
          active ? "text-[#00D4FF]" : "text-white/75 hover:text-white"
        }`}
      >
        {label}
        <motion.span
          className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#00D4FF]"
          initial={false}
          animate={{ width: active ? "100%" : "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.35, ease: easeOut }}
        />
      </span>
    </Link>
  );
}

export function Navbar() {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { user, isLoading: authLoading, isAuthenticated, login, logout } = useAuth();

  const onHome = location === "/";
  const activeSection = useActiveSection(["contact"], onHome);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLang = lang === "en" ? "id" : "en";
  const langLabel = lang === "en" ? "ID" : "EN";

  const centerLinks = [
    { href: "/services", label: t.nav.services, id: "services" },
    { href: "/dashboard", label: t.nav.dashboard, id: "dashboard" },
    { href: "/media", label: t.nav.media, id: "media" },
    { href: "/profile", label: t.nav.about, id: "about" },
    {
      href: onHome ? "/#contact" : "/consultation",
      label: t.nav.contact,
      id: "contact",
      hashOnly: true,
    },
  ] as const;

  const linkActive = (link: (typeof centerLinks)[number]) => {
    if ("hashOnly" in link && link.hashOnly && onHome) {
      return activeSection === "contact";
    }
    if (link.href.startsWith("/#")) {
      return onHome && window.location.hash === link.href.slice(1);
    }
    return location === link.href || location.startsWith(`${link.href}/`);
  };

  const closeMobile = () => setIsOpen(false);

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? "border-white/[0.08] bg-[rgba(12,12,18,0.72)] shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-[24px]"
          : "border-transparent bg-transparent"
      }`}
      animate={{ height: scrolled ? 58 : 70 }}
      transition={{ duration: 0.45, ease: easeOut }}
      data-testid="navbar"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" data-testid="link-logo">
          <img src={assetUrl("logo-icon.png")} alt="" className="h-8 w-8 object-contain" />
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-white">North</span>
            <span className="text-[#00D4FF]">South</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {centerLinks.map((link) => (
            <NavItem
              key={link.id}
              href={link.href}
              label={link.label}
              active={linkActive(link)}
              testId={`link-desktop-${link.id}`}
            />
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => setLang(otherLang)}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
            data-testid="button-lang-switch"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="text-white/40">|</span>
            {langLabel}
          </button>

          {!authLoading &&
            (isAuthenticated ? (
              <div className="flex items-center gap-2 border-l border-white/[0.08] pl-3">
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <UserCircle className="h-7 w-7 text-white/50" />
                )}
                <span className="max-w-[100px] truncate text-sm text-white/75">{user?.firstName}</span>
                <button type="button" onClick={logout} className="text-white/50 hover:text-red-400" title="Log out">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={login}
                className="rounded-xl border border-white/[0.08] px-4 py-2 text-sm font-medium text-white/90"
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="flex items-center gap-1.5">
                  <LogIn className="h-4 w-4" />
                  {t.nav.login}
                </span>
              </motion.button>
            ))}

          <Link href="/consultation">
            <motion.button
              type="button"
              className="rounded-xl bg-[#00D4FF] px-5 py-2 text-sm font-medium text-[#031B2F] shadow-[0_0_24px_rgba(0,212,255,0.25)]"
              whileHover={{ y: -3, boxShadow: "0 0 36px rgba(0,212,255,0.45)" }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-nav-consultation"
            >
              {t.nav.consultation}
            </motion.button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setLang(otherLang)}
            className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2 py-1 text-xs text-white/75"
            data-testid="button-mobile-lang-switch"
          >
            <Globe className="h-3 w-3" />
            {langLabel}
          </button>
          <button
            type="button"
            className="p-2 text-white/80"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.08] bg-[rgba(12,12,18,0.95)] backdrop-blur-xl lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {centerLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.id}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.06]"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobile();
                      if (location !== "/") {
                        navigate("/");
                        window.setTimeout(() => scrollToSection(link.href.slice(2)), 150);
                      } else {
                        scrollToSection(link.href.slice(2));
                      }
                    }}
                    data-testid={`link-mobile-${link.id}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.06]"
                    onClick={closeMobile}
                    data-testid={`link-mobile-${link.id}`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              {!authLoading && !isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    login();
                    closeMobile();
                  }}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-white"
                >
                  <LogIn className="h-4 w-4" />
                  {t.nav.login}
                </button>
              )}
              <Link href="/consultation" onClick={closeMobile}>
                <button
                  type="button"
                  className="mt-2 w-full rounded-xl bg-[#00D4FF] py-3 text-sm font-medium text-[#031B2F]"
                  data-testid="button-mobile-consultation"
                >
                  {t.nav.consultation}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
