// frontend/app/(vendor)/chat/[eventId]/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, DollarSign, MessageCircle } from 'lucide-react';
import io from 'socket.io-client';

export default function VendorChat() {
  const params = useParams();
  const eventId = params.eventId;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentOffer, setCurrentOffer] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io('http://localhost:5000', {
      auth: { token },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      newSocket.emit('joinNegotiation', { negotiationId: eventId });
    });

    newSocket.on('negotiationLoaded', (data) => {
      setMessages(data.history || []);
      setCurrentOffer(data.currentOffer || 0);
    });

    newSocket.on('newOffer', (data) => {
      setMessages(data.history);
      setCurrentOffer(data.currentOffer);
    });

    newSocket.on('newMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [eventId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const sendOffer = () => {
    if (!input.trim() || !socket) return;

    socket.emit('sendOffer', {
      negotiationId: eventId,
      amount: parseInt(input),
      message: `New offer: ₹${input}`,
    });

    setInput('');
  };

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    socket.emit('sendMessage', {
      negotiationId: eventId,
      message: input,
    });

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-white to-pearl/80 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 transition-colors duration-300 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border-0 shadow-2xl mb-8 dark:border-white/10">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald to-saffron rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-playfair text-velvet dark:text-white font-bold">Negotiation</h1>
                  <Badge className="bg-saffron text-white mt-1">Live Chat</Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-1">₹{currentOffer.toLocaleString()}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-jakarta">Current Offer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border-0 shadow-2xl h-[500px] flex flex-col dark:border-white/10">
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.by === 'vendor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl ${msg.by === 'vendor'
                        ? 'bg-gradient-to-r from-saffron to-gold text-white'
                        : 'bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200'
                      }`}
                  >
                    <div className="font-bold text-sm mb-1 capitalize">{msg.by}</div>
                    <div className="text-sm font-jakarta">{msg.message}</div>
                    {msg.amount && (
                      <div className="text-2xl font-bold mt-2">₹{msg.amount.toLocaleString()}</div>
                    )}
                    <div className="text-xs opacity-75 mt-2">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-6 bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const amount = parseInt(input);
                      if (amount && amount > 0) sendOffer();
                      else sendMessage();
                    }
                  }}
                  placeholder="Enter offer amount (₹) or type message..."
                  className="flex-1 bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                />
                <Button
                  onClick={() => {
                    const amount = parseInt(input);
                    if (amount && amount > 0) sendOffer();
                    else sendMessage();
                  }}
                  size="icon"
                  className="bg-saffron hover:bg-saffron/90 w-12 h-12"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Type a number for offer • Text for messages
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
