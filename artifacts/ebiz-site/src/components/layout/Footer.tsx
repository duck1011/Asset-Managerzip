import { Link } from "wouter";
import { profile } from "@/data/mock";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/40 py-12" data-testid="footer">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">

          {/* Logo — Variation 3: crops to dark-bg logo (bottom-right of brand image) */}
          <div className="mb-4">
            <div style={{ width: "112px", height: "40px", overflow: "hidden", borderRadius: "4px" }}>
              <img
                src="/logo.png"
                alt={profile.companyName}
                style={{ width: "249px", height: "120px", marginLeft: "-136px", marginTop: "-80px" }}
              />
            </div>
          </div>

          <p className="text-muted-foreground max-w-sm mb-6">
            {t.profile.tagline}
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Twitter className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-twitter" />
            <Linkedin className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-linkedin" />
            <Instagram className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-instagram" />
            <Mail className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-mail" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">{t.footer.company}</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-home">{t.nav.home}</Link></li>
            <li><Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-about">{t.nav.about}</Link></li>
            <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-services">{t.nav.services}</Link></li>
            <li><Link href="/media" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-media">{t.nav.media}</Link></li>
            <li><Link href="/booking" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-booking">{t.nav.booking}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">{t.footer.contact}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@northsouth.co</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Digital Way<br/>San Francisco, CA 94107</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {profile.companyName}. {t.footer.rights}
      </div>
    </footer>
  );
}
