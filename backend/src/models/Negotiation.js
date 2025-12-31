// backend/src/models/Negotiation.js
import mongoose from 'mongoose';

const negotiationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currentOffer: {
      type: Number,
      required: true,
    },
    history: [
      {
        by: {
          type: String,
          enum: ['customer', 'vendor'],
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        message: {
          type: String,
          default: 'Offer',
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Negotiation', negotiationSchema);
