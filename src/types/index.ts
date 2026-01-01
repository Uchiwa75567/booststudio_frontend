import type { ServiceType, LocationType, ProjectCategory } from './enums';

// Types for reservation form
export interface ReservationFormData {
  fullName: string;
  phone: string;
  serviceType: ServiceType;
  location: LocationType;
  duration: number;
  dateTime: string;
  comments?: string;
}

// Types for pricing
export interface PricingDetails {
  baseRate: number;
  serviceName: string;
  duration: number;
  total: number;
}

// Types for portfolio items
export interface PortfolioItem {
  id: string;
  title: string;
  category: ProjectCategory;
  imageUrl: string;
  videoUrl?: string;
  description: string;
  tags: string[];
}

// Types for services
export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

// Types for testimonials
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export type { ServiceType, LocationType, ProjectCategory };