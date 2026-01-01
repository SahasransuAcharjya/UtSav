// backend/src/routes/geminiRoutes.js
import express from 'express';
import { refineEventDetails } from '../controllers/geminiController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Customer: AI chat refinement (can use without auth for demo)
router.post('/refine-event', refineEventDetails);

export default router;
