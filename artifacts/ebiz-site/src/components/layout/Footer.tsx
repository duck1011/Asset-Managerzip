import { Link } from "wouter";
import { assetUrl } from "@/lib/asset-url";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const f = t.landing.footer;

  return (
    <footer
      className="border-t border-white/[0.08] bg-[#031B2F] py-16 text-white/75"
      data-testid="footer"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <img src={assetUrl("logo-icon.png")} alt="" className="h-8 w-8" />
            <span className="text-lg font-semibold text-white">NorthSouth</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{f.tagline}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {f.quickLinks}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {f.quickLinksItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#00D4FF]"
                  data-testid={`footer-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {f.servicesTitle}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {f.servicesItems.map((label) => (
              <li key={label}>
                <Link href="/services" className="transition-colors hover:text-[#00D4FF]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {f.socialTitle}
          </h3>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 transition-colors hover:border-[#00D4FF]/30 hover:text-[#00D4FF] hover:-translate-y-0.5"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm">hello@northsouth.co</p>
          <p className="text-sm">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-white/[0.08] px-4 pt-8 text-center text-sm text-white/50 lg:px-8">
        {f.copyright}
      </div>
    </footer>
  );
}
