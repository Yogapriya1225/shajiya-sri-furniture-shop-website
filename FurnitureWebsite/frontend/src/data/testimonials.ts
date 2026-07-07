// ---------------------------------------------------------------------------
// 6 realistic demo testimonials with Indian names.
// Replace with actual customer reviews once collected.
// ---------------------------------------------------------------------------

export interface TestimonialData {
  id: number;
  customerName: string;
  location: string;
  rating: number;
  message: string;
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    customerName: "Lakshmi Narayanan",
    location: "Salem",
    rating: 5,
    message:
      "We furnished our entire 3BHK from Shajiya Sri Furniture Mart. The quality of wood is outstanding and the designs are exactly what we were looking for. The sofa set we purchased still looks brand new after two years. Highly recommended for anyone in Salem!",
  },
  {
    id: 2,
    customerName: "Senthil Kumar",
    location: "Mangalapuram",
    rating: 5,
    message:
      "I was looking for a durable wardrobe with a modern sliding design, and the team here showed me several options within my budget. The delivery was prompt and the installation team was very professional. Excellent service from start to finish.",
  },
  {
    id: 3,
    customerName: "Meenakshi Sundaram",
    location: "Attur",
    rating: 5,
    message:
      "Bought a king-size bed and dining table set for our new home. The craftsmanship is superb — you can feel the difference compared to mass-produced furniture. The staff was patient and helped us choose the right finish to match our interiors.",
  },
  {
    id: 4,
    customerName: "Rajesh Kannan",
    location: "Salem",
    rating: 5,
    message:
      "Furnished my entire office with desks and chairs from here. The executive chairs are very comfortable even after long working hours. The pricing is genuinely affordable for the quality they offer. Will definitely come back for our home furniture.",
  },
  {
    id: 5,
    customerName: "Priya Dharshini",
    location: "Omalur",
    rating: 5,
    message:
      "I visited many showrooms in Salem before coming here, and this one truly stands out. The collection is vast, the staff is knowledgeable, and they don't push you to buy. We finally got our dream living room setup — a beautiful L-shape sofa and a marble coffee table!",
  },
  {
    id: 6,
    customerName: "Karthikeyan Murugan",
    location: "Salem",
    rating: 5,
    message:
      "Shajiya Sri Furniture Mart has been our go-to furniture shop for years. Every time we need something — from a simple bookshelf to a premium dining set — they always deliver top quality. The owner personally ensures customer satisfaction. Truly a gem in Salem!",
  },
];
