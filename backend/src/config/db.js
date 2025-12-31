// backend/src/config/db.js
import mongoose from 'mongoose';
import { MONGODB_URI, NODE_ENV } from './env.js';

export const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host} (${NODE_ENV})`
    );
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
