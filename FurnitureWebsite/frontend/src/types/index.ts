// ---------------------------------------------------------------------------
// Domain types shared across the app.
// These mirror the backend SQLAlchemy models (see backend/app/models.py)
// so the frontend and API stay in sync.
// ---------------------------------------------------------------------------

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  categoryName: string;
  shortDescription: string;
  description?: string;
  images: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  materials?: string[];
  material?: string;
  availableColours?: string[];
  dimensions?: string;
  createdAt?: string;
}

export interface GalleryImage {
  id: number;
  imageUrl: string;
  caption?: string;
  category?: string;
}

export interface Testimonial {
  id: number;
  customerName: string;
  rating: number; // 1-5
  message: string;
  isSample?: boolean; // flags placeholder testimonials until real reviews are added
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactMessagePayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface ContactMessage extends ContactMessagePayload {
  id: number;
  createdAt: string;
  isRead: boolean;
}

// ---- Admin / Auth -----------------------------------------------------

export interface AdminUser {
  id: number;
  username: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  admin: AdminUser;
}

// ---- Generic API envelope ---------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
