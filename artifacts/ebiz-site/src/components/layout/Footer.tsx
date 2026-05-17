import { Link } from "wouter";
import { profile } from "@/data/mock";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12" data-testid="footer">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-lg">{profile.companyName}</span>
          </div>
          <p className="text-muted-foreground max-w-sm mb-6">
            {profile.tagline}
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Twitter className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-twitter" />
            <Linkedin className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-linkedin" />
            <Instagram className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-instagram" />
            <Mail className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" data-testid="icon-mail" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-home">Home</Link></li>
            <li><Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-about">About Us</Link></li>
            <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-services">Services</Link></li>
            <li><Link href="/media" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-media">Media Studio</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@brightedgedigital.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Digital Way<br/>San Francisco, CA 94107</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {profile.companyName}. All rights reserved.
      </div>
    </footer>
  );
}
