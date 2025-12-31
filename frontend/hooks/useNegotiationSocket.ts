// frontend/hooks/useNegotiationSocket.ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

interface NegotiationMessage {
  negotiationId: string;
  message: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
  timestamp: Date;
}

interface NegotiationOffer {
  negotiationId: string;
  amount: number;
  message?: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
  timestamp: Date;
}

interface UseNegotiationSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  messages: NegotiationMessage[];
  offers: NegotiationOffer[];
  currentOffer: number;
  sendMessage: (negotiationId: string, message: string) => void;
  sendOffer: (negotiationId: string, amount: number, message?: string) => void;
  joinNegotiation: (negotiationId: string) => void;
  leaveNegotiation: (negotiationId: string) => void;
}

export function useNegotiationSocket(negotiationId?: string): UseNegotiationSocketReturn {
  const { isAuthenticated, user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [offers, setOffers] = useState<NegotiationOffer[]>([]);
  const [currentOffer, setCurrentOffer] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (!isAuthenticated || !user || socketRef.current) return;

    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'),
      },
      transports: ['websocket'],
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setIsConnected(true);
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('negotiationLoaded', (data) => {
      console.log('📥 Negotiation loaded:', data);
      setMessages(data.history?.filter((h: NegotiationMessage | NegotiationOffer) => !('amount' in h)) as NegotiationMessage[] || []);
      setOffers(data.history?.filter((h: NegotiationMessage | NegotiationOffer) => 'amount' in h) as NegotiationOffer[] || []);
      setCurrentOffer(data.currentOffer || 0);
    });

    newSocket.on('newMessage', (data: NegotiationMessage) => {
      setMessages(prev => [...prev, data]);
    });

    newSocket.on('newOffer', (data: NegotiationOffer) => {
      setOffers(prev => [...prev, data]);
      setCurrentOffer(data.amount);
      setMessages(prev => [...prev, {
        negotiationId: data.negotiationId,
        message: data.message || `New offer: ₹${data.amount.toLocaleString()}`,
        user: data.user,
        timestamp: data.timestamp,
      }]);
    });

    newSocket.on('error', (error: unknown) => {
      console.error('Socket error:', error);
    });

    return () => {
      newSocket.close();
    };
  }, [isAuthenticated, user]);

  // Auto-connect when negotiationId changes
  useEffect(() => {
    if (isAuthenticated && negotiationId) {
      connectSocket();
    }
  }, [isAuthenticated, negotiationId, connectSocket]);

  const joinNegotiation = useCallback((id: string) => {
    socketRef.current?.emit('joinNegotiation', { negotiationId: id });
  }, []);

  const leaveNegotiation = useCallback((id: string) => {
    socketRef.current?.emit('leaveNegotiation', { negotiationId: id });
  }, []);

  const sendMessage = useCallback((negotiationId: string, message: string) => {
    if (socketRef.current && message.trim()) {
      socketRef.current.emit('sendMessage', {
        negotiationId,
        message: message.trim(),
      });
    }
  }, []);

  const sendOffer = useCallback((negotiationId: string, amount: number, message?: string) => {
    if (socketRef.current && amount > 0) {
      socketRef.current.emit('sendOffer', {
        negotiationId,
        amount,
        message: message || `New offer: ₹${amount.toLocaleString()}`,
      });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    socket: socket,
    isConnected,
    messages,
    offers,
    currentOffer,
    sendMessage,
    sendOffer,
    joinNegotiation,
    leaveNegotiation,
  };
}
