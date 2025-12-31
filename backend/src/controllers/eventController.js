// backend/src/controllers/eventController.js
import Event from '../models/Event.js';

// POST /api/events  (customer creates event requisition)
export const createEvent = async (req, res) => {
  try {
    const customerId = req.user.id; // from auth middleware
    const {
      title,
      description,
      eventType,
      date,
      location,
      guestCount,
      budgetMin,
      budgetMax,
    } = req.body;

    const event = await Event.create({
      customer: customerId,
      title,
      description,
      eventType,
      date,
      location,
      guestCount,
      budgetMin,
      budgetMax,
      status: 'open', // open | in_progress | completed | cancelled
    });

    return res.status(201).json(event);
  } catch (err) {
    console.error('Create event error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/events/my  (customer: list own events)
export const getMyEvents = async (req, res) => {
  try {
    const customerId = req.user.id;
    const events = await Event.find({ customer: customerId }).sort({ createdAt: -1 });
    return res.json(events);
  } catch (err) {
    console.error('Get my events error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/events/feed  (vendor: requisition feed)
export const getVendorFeed = async (req, res) => {
  try {
    // Later you can filter by location, budget, etc.
    const events = await Event.find({ status: 'open' }).sort({ createdAt: -1 });
    return res.json(events);
  } catch (err) {
    console.error('Get vendor feed error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/events/:id/status  (update status: booking -> in_progress -> completed)
export const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // validate values in middleware/service if needed

    const event = await Event.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.json(event);
  } catch (err) {
    console.error('Update event status error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
