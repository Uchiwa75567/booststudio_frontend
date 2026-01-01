export interface DashboardStats {
  reservations: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  media: {
    total: number;
    images: number;
    videos: number;
  };
  revenue: {
    total: number;
  };
  recentReservations: any[];
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  description?: string;
  category?: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}