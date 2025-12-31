// backend/src/app.js
import express from 'express';
import cors from 'cors';
import { CLIENT_URL, NODE_ENV } from './config/env.js';
import { errorHandler } from './utils/errorHandler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';
import negotiationRoutes from './routes/negotiationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// Middleware order matters!
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/negotiations', negotiationRoutes);
app.use('/api/payments', paymentRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
