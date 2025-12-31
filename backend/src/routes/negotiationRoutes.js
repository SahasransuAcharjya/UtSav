// backend/src/routes/negotiationRoutes.js
import express from 'express';
import { 
  startNegotiation, 
  addCounterOffer, 
  acceptNegotiation 
} from '../controllers/negotiationController.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Vendor: start negotiation by accepting event
router.post('/', auth, requireRole(['vendor']), startNegotiation);

// Customer/Vendor: add counter-offer
router.post('/:id/counter', auth, addCounterOffer);

// Customer: accept final offer
router.post('/:id/accept', auth, requireRole(['customer']), acceptNegotiation);

export default router;
