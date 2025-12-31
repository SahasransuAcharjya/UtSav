// backend/src/socket/socketAuth.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const authSocket = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('No token provided'));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    socket.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name || 'User',
    };

    next();
  } catch (err) {
    console.error('Socket auth error:', err.message);
    next(new Error('Invalid token'));
  }
};
