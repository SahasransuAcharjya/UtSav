// backend/src/socket/chatHandler.js
import { Server } from 'socket.io';
import Negotiation from '../models/Negotiation.js';
import { authSocket } from './socketAuth.js';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.use(authSocket); // JWT auth for sockets

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.id} (${socket.user.role})`);

    // Join negotiation room when entering chat
    socket.on('joinNegotiation', async ({ negotiationId }) => {
      const negotiation = await Negotiation.findById(negotiationId)
        .populate('customer vendor', 'name email');
      
      if (!negotiation) {
        socket.emit('error', { message: 'Negotiation not found' });
        return;
      }

      // Join room for this negotiation
      socket.join(`negotiation-${negotiationId}`);
      
      // Send current negotiation state to newly joined user
      socket.emit('negotiationLoaded', {
        negotiation,
        history: negotiation.history,
        currentOffer: negotiation.currentOffer,
      });
    });

    // Handle new offer/counter-offer
    socket.on('sendOffer', async (data) => {
      await handleNewOffer(socket, data);
    });

    // Handle chat message (separate from offers)
    socket.on('sendMessage', async (data) => {
      await handleChatMessage(socket, data);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.id}`);
    });
  });

  return io;
};

export const getIO = () => io;

// Send new offer to negotiation room
const handleNewOffer = async (socket, { negotiationId, amount, message }) => {
  try {
    const negotiation = await Negotiation.findById(negotiationId);
    if (!negotiation) {
      socket.emit('error', { message: 'Negotiation not found' });
      return;
    }

    // Update negotiation
    negotiation.currentOffer = amount;
    negotiation.history.push({
      by: socket.user.role,
      amount,
      message: message || `Offer: ₹${amount}`,
    });
    await negotiation.save();

    // Broadcast to room (other party)
    io.to(`negotiation-${negotiationId}`).emit('newOffer', {
      history: negotiation.history,
      currentOffer: amount,
      user: {
        id: socket.user.id,
        role: socket.user.role,
        name: socket.user.name,
      },
    });
  } catch (error) {
    socket.emit('error', { message: 'Failed to send offer' });
  }
};

// Handle regular chat messages
const handleChatMessage = async (socket, { negotiationId, message }) => {
  try {
    // Broadcast chat message to room
    io.to(`negotiation-${negotiationId}`).emit('newMessage', {
      negotiationId,
      message,
      user: {
        id: socket.user.id,
        name: socket.user.name || 'Anonymous',
        role: socket.user.role,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    socket.emit('error', { message: 'Failed to send message' });
  }
};
