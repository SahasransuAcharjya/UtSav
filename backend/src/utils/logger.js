// backend/src/utils/logger.js
import { NODE_ENV } from '../config/env.js';

const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta,
    environment: NODE_ENV,
  };

  if (NODE_ENV === 'development') {
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta);
  }

  // In production, send to external service (later)
};

export const logger = {
  info: (msg, meta) => log('info', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
};
