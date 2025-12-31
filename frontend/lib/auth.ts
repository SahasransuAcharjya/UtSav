// frontend/lib/auth.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedUser {
  id: string;
  name?: string;
  email?: string;
  role: 'customer' | 'vendor' | 'admin';
  iat: number;
  exp: number;
}

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const decodeToken = (token: string): DecodedUser | null => {
  try {
    return jwtDecode<DecodedUser>(token);
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return false;
  return decoded.exp * 1000 > Date.now();
};

export const getUserFromToken = (token: string): DecodedUser | null => {
  const decoded = decodeToken(token);
  return decoded && isTokenValid(token) ? decoded : null;
};

export const requireAuth = (callback: () => void): void => {
  const token = getToken();
  if (!token || !isTokenValid(token)) {
    window.location.href = '/login';
    return;
  }
  callback();
};

export const redirectIfAuthenticated = (to: string): void => {
  const token = getToken();
  if (token && isTokenValid(token)) {
    window.location.href = to;
  }
};
