// backend/src/routes/eventRoutes.js
import express from 'express';
import { 
  createEvent, 
  getMyEvents, 
  getVendorFeed, 
  updateEventStatus 
} from '../controllers/eventController.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Customer: create event requisition
router.post('/', auth, requireRole(['customer']), createEvent);

// Customer: my events
router.get('/my', auth, requireRole(['customer']), getMyEvents);

// Vendor: see open events feed
router.get('/feed', auth, requireRole(['vendor']), getVendorFeed);

// Vendor/Admin: update status (booking -> in_progress -> completed)
router.patch('/:id/status', auth, requireRole(['vendor', 'admin']), updateEventStatus);

export default router;
