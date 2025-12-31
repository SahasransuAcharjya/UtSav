// backend/src/utils/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error('🚨 Error:', err.stack);
  
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors,
      });
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate field value entered',
      });
    }
  
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    // Default
    res.status(err.statusCode || 500).json({
      message: err.message || 'Server Error',
    });
  };
  