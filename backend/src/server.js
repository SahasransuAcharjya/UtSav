// backend/src/server.js
import mongoose from 'mongoose';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { NODE_ENV, PORT } from './config/env.js';
import app from './app.js';
import { initSocket } from './socket/chatHandler.js';

// Load .env first
dotenv.config();

const server = createServer(app);

// Initialize Socket.io
const io = initSocket(server);

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Closing connections...`);
  
  server.close(async () => {
    console.log('HTTP server closed.');
    
    // Close MongoDB
    await mongoose.connection.close(false);
    console.log('MongoDB connection closed.');
    
    process.exit(0);
  });

  // Force close after 10s
  setTimeout(() => {
    console.error('Force closing server');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Connect DB and start server
const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();
    
    // Start HTTP server + Socket.io
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Socket.io ready`);
      console.log(`🐙 Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
