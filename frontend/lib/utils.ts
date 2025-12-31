// frontend/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in INR
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date for events
export const formatEventDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Truncate text
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Copy to clipboard
export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

// Get status color
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    open: 'emerald',
    'in_progress': 'saffron',
    completed: 'emerald',
    cancelled: 'red-500',
    draft: 'gray-400',
    pending: 'saffron',
    paid: 'emerald',
    overdue: 'red-500',
  };
  return colors[status] || 'gray-400';
};

// Calculate days difference
export const daysAgo = (date: string | Date): number => {
  const now = new Date();
  const target = new Date(date);
  const diffTime = Math.abs(now.getTime() - target.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
