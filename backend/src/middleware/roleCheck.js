// backend/src/middleware/roleCheck.js

// allowedRoles: array like ['customer'] or ['vendor', 'admin']
export const requireRole = (allowedRoles = []) => {
    return (req, res, next) => {
      try {
        if (!req.user || !req.user.role) {
          return res.status(401).json({ message: 'Not authenticated' });
        }
  
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
  
        return next();
      } catch (err) {
        console.error('Role check error:', err);
        return res.status(500).json({ message: 'Authorization error' });
      }
    };
  };
  