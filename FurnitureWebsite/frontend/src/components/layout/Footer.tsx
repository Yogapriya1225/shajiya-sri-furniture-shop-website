import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  MessageCircle,
  Mail,
  Globe,
  Camera,
  PlayCircle,
} from "lucide-react";

import Logo from "@/components/common/Logo";
import {
  BUSINESS,
  buildCallLink,
  buildWhatsAppLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/utils/constants";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const CATEGORY_LINKS = [
  "Sofas",
  "Beds",
  "Dining Tables",
  "Wardrobes",
  "TV Units",
  "Office Furniture",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl container-px py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + rating */}
          <div>
            <Logo className="[&_span]:text-cream" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              A trusted furniture showroom in Salem bringing quality craftsmanship
              and premium design to every home, office, and hotel.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" strokeWidth={0} />
              ))}
              <span className="ml-2 text-sm font-semibold text-cream/80">
                {BUSINESS.rating.toFixed(1)} Google Rating
              </span>
            </div>

            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                { icon: Camera, href: BUSINESS.socialLinks.instagram, label: "Instagram" },
                { icon: Globe, href: BUSINESS.socialLinks.facebook, label: "Facebook" },
                { icon: PlayCircle, href: BUSINESS.socialLinks.youtube, label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/70 transition-all duration-200 hover:bg-gold hover:text-charcoal"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream">Our Collections</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORY_LINKS.map((category) => (
                <li key={category}>
                  <Link
                    to="/products"
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream">Visit Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{BUSINESS.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={buildCallLink()} className="hover:text-gold">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {BUSINESS.businessHours.map((b) => `${b.day}: ${b.hours}`).join(" · ")}
                </span>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 px-4 py-2 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/25"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Map in footer */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-cream/10">
          <iframe
            src={BUSINESS.mapEmbedSrc}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shajiya Sri Furniture Mart location"
            className="w-full opacity-80 transition-opacity hover:opacity-100"
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} {BUSINESS.name}. All rights reserved.</p>
          <p>Showroom visits by appointment or walk-in — every day.</p>
        </div>
        <p className="mt-4 text-center text-xs text-cream/40">
          Designed by{" "}
          <a
            href="https://web2hub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold/70 transition-colors hover:text-gold"
          >
            Web2Hub
          </a>
        </p>
      </div>
    </footer>
  );
}
