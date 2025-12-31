// frontend/types/user.ts
export interface BaseUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'customer' | 'vendor' | 'admin';
    verified: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CustomerUser extends BaseUser {
    role: 'customer';
    events: string[]; // Event IDs
    totalSpent: number;
    averageRating: number;
  }
  
  export interface VendorUser extends BaseUser {
    role: 'vendor';
    companyName?: string;
    companyLogo?: string;
    services: Array<{
      name: string;
      description: string;
      priceRange: [number, number];
    }>;
    rating: number;
    totalRatingCount: number;
    responseTime: string; // "2 hours"
    location: string;
    negotiationCount: number;
    completedEvents: number;
    certifications?: string[];
  }
  
  export interface AdminUser extends BaseUser {
    role: 'admin';
    permissions: string[];
  }
  
  export type User = CustomerUser | VendorUser | AdminUser;
  
  export interface RegisterRequest {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'customer' | 'vendor';
    companyName?: string;
    companyLogo?: string;
    services?: Array<{
      name: string;
      description: string;
      priceRange: [number, number];
    }>;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
    refreshToken?: string;
  }
  
  export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    companyName?: string;
    companyLogo?: string;
    services?: Array<{
      name: string;
      description: string;
      priceRange: [number, number];
    }>;
    location?: string;
  }
  
  export interface UserStats {
    totalEvents: number;
    totalRevenue: number;
    avgRating: number;
    responseRate: number;
    activeNegotiations: number;
  }
  
  export interface VendorStats extends UserStats {
    servicesOffered: number;
    avgCompletionTime: string;
    customerRetention: number;
  }
  