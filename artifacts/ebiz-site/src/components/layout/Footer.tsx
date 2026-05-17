import { Link } from "wouter";
import { profile } from "@/data/mock";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-slate-900 py-12 text-slate-300" data-testid="footer">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo-icon.png" alt="NorthSouth icon" className="h-9 w-9 object-contain" />
            <span
              className="text-2xl font-bold"
              style={{ letterSpacing: "-0.04em" }}
            >
              <span className="text-white">North</span>
              <span style={{ color: "#22D3EE" }}>South</span>
            </span>
          </div>

          <p className="text-slate-400 max-w-sm mb-6">
            {t.profile.tagline}
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <Twitter className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" data-testid="icon-twitter" />
            <Linkedin className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" data-testid="icon-linkedin" />
            <Instagram className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" data-testid="icon-instagram" />
            <Mail className="w-5 h-5 hover:text-cyan-400 cursor-pointer transition-colors" data-testid="icon-mail" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">{t.footer.company}</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-home">{t.nav.home}</Link></li>
            <li><Link href="/profile" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-about">{t.nav.about}</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-services">{t.nav.services}</Link></li>
            <li><Link href="/media" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-media">{t.nav.media}</Link></li>
            <li><Link href="/booking" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm" data-testid="footer-link-booking">{t.nav.booking}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">{t.footer.contact}</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>hello@northsouth.co</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Digital Way<br/>San Francisco, CA 94107</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} {profile.companyName}. {t.footer.rights}
      </div>
    </footer>
  );
}
