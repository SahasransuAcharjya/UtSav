// backend/src/controllers/geminiController.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/env.js';

const genAI = GEMINI_API_KEY
  ? new GoogleGenerativeAI(GEMINI_API_KEY)
  : null;

// POST /api/gemini/refine-event
export const refineEventDetails = async (req, res) => {
  try {
    if (!genAI) {
      return res.status(500).json({ message: 'Gemini API key not configured' });
    }

    const { rawDescription, guestCount, location, eventType, budgetHint } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an assistant for an event management platform called UtSav.

User description: ${rawDescription}
Event type: ${eventType || 'unknown'}
Guests: ${guestCount || 'unknown'}
Location: ${location || 'unknown'}
Budget hint: ${budgetHint || 'not provided'}

1. Rewrite a clean summary of the event.
2. Suggest a realistic budget range in INR.
3. List key requirements (venue type, decor, catering, logistics) in bullet points.
Keep it short and professional.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.json({ summary: text });
  } catch (err) {
    console.error('Gemini refine error:', err);
    return res.status(500).json({ message: 'Gemini error' });
  }
};
