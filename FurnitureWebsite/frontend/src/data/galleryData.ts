// ---------------------------------------------------------------------------
// 32 gallery images across 7 sections.
// Replace URLs with actual showroom photographs when available.
// ---------------------------------------------------------------------------

import { GALLERY_IMAGES } from "./imageConstants";

export interface GalleryItem {
  id: number;
  imageUrl: string;
  caption: string;
  category: string;
}

const GALLERY_SECTIONS = [
  "Showroom",
  "Living Room",
  "Bedroom",
  "Dining",
  "Office",
  "Storage",
  "Decor",
] as const;

export type GallerySection = (typeof GALLERY_SECTIONS)[number];

export { GALLERY_SECTIONS };

const captions: Record<string, string[]> = {
  Showroom: [
    "Welcome to our showroom — where every piece tells a story",
    "Curated displays designed to inspire your next home makeover",
    "Walk through our premium collection on display",
    "Our spacious showroom floor — come explore in person",
    "Every corner showcases quality craftsmanship",
  ],
  "Living Room": [
    "A cosy living room setup with our best-selling sofa set",
    "Modern minimalism meets comfort in this arrangement",
    "Statement pieces that transform your living space",
    "Warm tones and soft textures for inviting interiors",
  ],
  Bedroom: [
    "Dreamlike bedroom furnished with our king-size collection",
    "Serene and stylish — the perfect bedroom retreat",
    "Luxurious bedding solutions for restful nights",
    "Compact bedroom furniture ideas for modern homes",
  ],
  Dining: [
    "Family dining made special with our Heritage 6-seater set",
    "Elegant dining arrangements for every occasion",
    "From breakfast nooks to formal dinners — we have it all",
    "Marble and wood dining sets on display",
  ],
  Office: [
    "Professional office setups that boost productivity",
    "Collaborative workspace furnished with our range",
    "Executive desks and chairs for the modern office",
    "Home office inspiration from our showroom",
  ],
  Storage: [
    "Spacious wardrobes to keep everything organised",
    "Sliding door solutions for compact bedrooms",
    "Bookshelves and display cabinets for every room",
  ],
  Decor: [
    "Decorative accents that add personality to your space",
    "Art and furniture in perfect harmony",
    "Small touches that make a big difference",
    "Finishing details that complete the look",
  ],
};

function buildGalleryData(): GalleryItem[] {
  const items: GalleryItem[] = [];
  let id = 1;

  const sectionMap: Record<string, string[]> = {
    Showroom: GALLERY_IMAGES.showroom,
    "Living Room": GALLERY_IMAGES.livingRoom,
    Bedroom: GALLERY_IMAGES.bedroom,
    Dining: GALLERY_IMAGES.dining,
    Office: GALLERY_IMAGES.office,
    Storage: GALLERY_IMAGES.storage,
    Decor: GALLERY_IMAGES.decor,
  };

  for (const section of GALLERY_SECTIONS) {
    const urls = sectionMap[section] || [];
    const caps = captions[section] || [];
    urls.forEach((url, i) => {
      items.push({
        id: id++,
        imageUrl: url,
        caption: caps[i] || `${section} — View ${i + 1}`,
        category: section,
      });
    });
  }

  return items;
}

export const GALLERY_DATA: GalleryItem[] = buildGalleryData();
