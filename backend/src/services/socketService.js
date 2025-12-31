// backend/src/services/socketService.js
import Negotiation from '../models/Negotiation.js';

export const handleNegotiationMessage = async (io, socket, data) => {
  try {
    const { negotiationId, message, offerAmount } = data;
    
    // Save to DB
    const negotiation = await Negotiation.findById(negotiationId);
    negotiation.history.push({
      by: socket.user.role,
      amount: offerAmount,
      message,
    });
    negotiation.currentOffer = offerAmount;
    await negotiation.save();

    // Broadcast to other party
    socket.to(`negotiation-${negotiationId}`).emit('newOffer', {
      history: negotiation.history,
      currentOffer: negotiation.currentOffer,
      user: socket.user,
    });

  } catch (error) {
    socket.emit('error', { message: 'Failed to save negotiation' });
  }
};
