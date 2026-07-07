// ---------------------------------------------------------------------------
// Central place for real business information.
// Update these values if the business details ever change.
// ---------------------------------------------------------------------------

export const BUSINESS = {
  name: "Shajiya Sri Furniture Mart",
  tagline: "Elegant Furniture For Every Home",
  subTagline: "Quality Furniture Crafted For Comfort And Style",
  phone: "+91 73052 38752",
  phoneDigitsOnly: "917305238752",
  whatsappNumber: "917305238752",
  email: "info@shajiyasrifurniture.com",
  rating: 5.0,
  address: {
    line1: "H98H+MVF",
    line2: "Malagalapuram, Mangalapuram",
    city: "Salem",
    state: "Tamil Nadu",
    pincode: "636202",
    full: "H98H+MVF, Malagalapuram, Mangalapuram, Salem, Tamil Nadu – 636202",
  },
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.5!2d78.3796817!3d11.5666815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShajiya+Sri+Furniture+Mart!5e0!3m2!1sen!2sin!4v1700000000000",
  mapDirectionsUrl:
    "https://www.google.com/maps/place/Shajiya+Sri+Furniture+Mart/@11.5666815,78.3796817",
  businessHours: [
    { day: "Monday – Sunday", hours: "9:00 AM – 9:00 PM" },
  ],
  socialLinks: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
  stats: {
    products: 500,
    happyCustomers: 1000,
    designs: 100,
  },
} as const;

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encoded}`;
}

export function buildCallLink(): string {
  return `tel:${BUSINESS.phone.replace(/\s+/g, "")}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `Hello,\nI visited your website and would like to know more about your furniture collection.`;

export function productEnquiryMessage(productName: string): string {
  return `Hi, I'm interested in "${productName}" from Shajiya Sri Furniture Mart. Could you share more details?`;
}
