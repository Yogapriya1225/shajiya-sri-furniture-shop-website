// ---------------------------------------------------------------------------
// Product categories used across the app.
// ---------------------------------------------------------------------------

import { CATEGORY_IMAGES } from "./imageConstants";

export interface CategoryDef {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string; // Lucide icon name
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: 1,
    name: "Sofas",
    slug: "sofas",
    description: "Plush sofas for your living room comfort",
    image: CATEGORY_IMAGES.sofas,
    icon: "Sofa",
  },
  {
    id: 2,
    name: "Beds",
    slug: "beds",
    description: "Restful beds crafted for a good night's sleep",
    image: CATEGORY_IMAGES.beds,
    icon: "BedDouble",
  },
  {
    id: 3,
    name: "Dining Tables",
    slug: "dining-tables",
    description: "Elegant dining sets for family gatherings",
    image: CATEGORY_IMAGES.diningTables,
    icon: "UtensilsCrossed",
  },
  {
    id: 4,
    name: "Wardrobes",
    slug: "wardrobes",
    description: "Spacious wardrobes to organise your essentials",
    image: CATEGORY_IMAGES.wardrobes,
    icon: "DoorOpen",
  },
  {
    id: 5,
    name: "Office Furniture",
    slug: "office-furniture",
    description: "Professional furniture for productive workspaces",
    image: CATEGORY_IMAGES.officeFurniture,
    icon: "Briefcase",
  },
  {
    id: 6,
    name: "TV Units",
    slug: "tv-units",
    description: "Sleek media consoles for modern entertainment",
    image: CATEGORY_IMAGES.tvUnits,
    icon: "Tv",
  },
  {
    id: 7,
    name: "Premium Chairs",
    slug: "premium-chairs",
    description: "Designer chairs that elevate any space",
    image: CATEGORY_IMAGES.premiumChairs,
    icon: "Armchair",
  },
  {
    id: 8,
    name: "Center Tables",
    slug: "center-tables",
    description: "Stylish center tables as the heart of your room",
    image: CATEGORY_IMAGES.centerTables,
    icon: "Table",
  },
  {
    id: 9,
    name: "Study Tables",
    slug: "study-tables",
    description: "Focused workstations for students and professionals",
    image: CATEGORY_IMAGES.officeFurniture,
    icon: "BookOpen",
  },
  {
    id: 10,
    name: "Plastic Chairs",
    slug: "plastic-chairs",
    description: "Durable and lightweight chairs for everyday use",
    image: CATEGORY_IMAGES.premiumChairs,
    icon: "Armchair",
  },
  {
    id: 11,
    name: "Wooden Chairs",
    slug: "wooden-chairs",
    description: "Handcrafted wooden chairs with timeless appeal",
    image: CATEGORY_IMAGES.premiumChairs,
    icon: "Armchair",
  },
  {
    id: 12,
    name: "Mattresses",
    slug: "mattresses",
    description: "Premium mattresses for ultimate sleeping comfort",
    image: CATEGORY_IMAGES.beds,
    icon: "BedDouble",
  },
  {
    id: 13,
    name: "Bookshelves",
    slug: "bookshelves",
    description: "Beautiful bookshelves to display your collection",
    image: CATEGORY_IMAGES.officeFurniture,
    icon: "BookOpen",
  },
  {
    id: 14,
    name: "Coffee Tables",
    slug: "coffee-tables",
    description: "Charming coffee tables for cosy conversations",
    image: CATEGORY_IMAGES.centerTables,
    icon: "Coffee",
  },
];

/** The 8 hero categories shown on the home page */
export const HOME_CATEGORIES = CATEGORIES.filter((c) =>
  ["sofas", "beds", "dining-tables", "wardrobes", "office-furniture", "tv-units", "premium-chairs", "center-tables"].includes(c.slug)
);
