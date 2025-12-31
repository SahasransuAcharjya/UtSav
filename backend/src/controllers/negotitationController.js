// backend/src/controllers/negotiationController.js
import Negotiation from '../models/Negotiation.js';
import Event from '../models/Event.js';

// POST /api/negotiations/start  (vendor accepts an event and starts negotiation)
export const startNegotiation = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { eventId, initialOffer } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Optional: ensure not already assigned
    const negotiation = await Negotiation.create({
      event: eventId,
      customer: event.customer,
      vendor: vendorId,
      currentOffer: initialOffer,
      history: [
        {
          by: 'vendor',
          amount: initialOffer,
          message: 'Initial vendor offer',
        },
      ],
      status: 'pending', // pending | accepted | rejected
    });

    return res.status(201).json(negotiation);
  } catch (err) {
    console.error('Start negotiation error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/negotiations/:id/counter  (customer or vendor counter-offer)
export const addCounterOffer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { amount, message } = req.body;

    const negotiation = await Negotiation.findById(id);
    if (!negotiation) {
      return res.status(404).json({ message: 'Negotiation not found' });
    }

    const role =
      String(negotiation.customer) === userId ? 'customer' : 'vendor';

    negotiation.currentOffer = amount;
    negotiation.history.push({
      by: role,
      amount,
      message: message || 'Counter offer',
    });

    await negotiation.save();

    return res.json(negotiation);
  } catch (err) {
    console.error('Counter-offer error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/negotiations/:id/accept
export const acceptNegotiation = async (req, res) => {
  try {
    const { id } = req.params;

    const negotiation = await Negotiation.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    );

    if (!negotiation) {
      return res.status(404).json({ message: 'Negotiation not found' });
    }

    // Later: trigger creation of Payment + Milestones
    return res.json(negotiation);
  } catch (err) {
    console.error('Accept negotiation error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
