// backend/src/config/env.js
import dotenv from 'dotenv';

dotenv.config(); // reads .env at project root

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 5000;

// Mongo
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/utsav_dev';

// JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Gemini
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// CORS
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
