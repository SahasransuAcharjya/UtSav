// backend/src/models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ['wedding', 'birthday', 'corporate', 'other'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      min: 1,
      required: true,
    },
    budgetMin: {
      type: Number,
      min: 0,
      required: true,
    },
    budgetMax: {
      type: Number,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'open', 'in_progress', 'completed', 'cancelled'],
      default: 'open',
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    negotiation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Negotiation',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Event', eventSchema);
