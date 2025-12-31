// frontend/types/event.ts
export interface Milestone {
    _id?: string;
    title: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue';
    dueDate: string;
    paymentId?: string;
  }
  
  export interface Negotiation {
    _id: string;
    eventId: string;
    customerId: string;
    vendorId: string;
    currentOffer: number;
    status: 'open' | 'accepted' | 'rejected' | 'closed';
    history: Array<{
      type: 'message' | 'offer';
      content: string;
      amount?: number;
      timestamp: string;
      userId: string;
      userRole: 'customer' | 'vendor';
    }>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Event {
    _id: string;
    title: string;
    description: string;
    eventType: 'wedding' | 'birthday' | 'corporate' | 'anniversary' | 'other';
    date: string;
    location: string;
    guestCount: number;
    budgetMin: number;
    budgetMax: number;
    budgetRecommended?: number;
    status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
    customer: {
      _id: string;
      name: string;
      email: string;
      phone?: string;
    };
    vendors: Array<{
      _id: string;
      name: string;
      company?: string;
      rating?: number;
    }>;
    milestones: Milestone[];
    negotiations: Negotiation[];
    totalBudget: number;
    paidAmount: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateEventRequest {
    title: string;
    description: string;
    eventType: 'wedding' | 'birthday' | 'corporate' | 'anniversary' | 'other';
    date: string;
    location: string;
    guestCount: number;
    budgetMin: number;
    budgetMax: number;
  }
  
  export interface UpdateEventRequest {
    title?: string;
    description?: string;
    status?: Event['status'];
    milestones?: Milestone[];
  }
  
  export interface EventSummary {
    title: string;
    eventType: string;
    date: string;
    location: string;
    guestCount: number;
    budgetRange: string;
    urgency: 'new' | 'hot' | 'urgent' | 'stale';
    daysAgo: number;
  }
  