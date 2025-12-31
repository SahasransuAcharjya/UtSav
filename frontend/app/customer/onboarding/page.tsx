// frontend/app/(customer)/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Users, Calendar, MapPin, DollarSign } from 'lucide-react';

export default function CustomerOnboarding() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Hi! 👋 Tell me about your event. Wedding? Birthday? How many guests?',
    },
  ]);
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    // Call Gemini API
    try {
      const res = await fetch('http://localhost:5000/api/gemini/refine-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawDescription: input,
          guestCount: 150,
          location: 'Delhi',
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await res.json() as { summary: string };
      setMessages(prev => [...prev, { role: 'ai', content: data.summary }]);
      setSummary(data.summary);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'Sorry, AI assistant is temporarily unavailable. Please describe your event manually.'
      }]);
    }

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gemini Chat */}
        <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl h-[700px] flex flex-col">
          <CardContent className="p-8 pt-6 flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${msg.role === 'user'
                      ? 'bg-gradient-to-r from-saffron to-gold text-white'
                      : 'bg-white/50 border border-saffron/30'
                      }`}
                  >
                    <p className="text-sm font-jakarta">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Describe your event..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon" className="bg-saffron hover:bg-saffron/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Summary Card */}
        <Card className="backdrop-blur-xl bg-gradient-to-b from-white/80 to-pearl/70 border-0 shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-playfair text-velvet font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" /> Event Summary
            </h2>

            {summary ? (
              <div className="space-y-6">
                <div className="glow-price bg-gradient-to-r from-emerald to-gold p-6 rounded-2xl shadow-lg text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-emerald" />
                  <div className="text-4xl font-bold text-emerald mb-1">₹48,500</div>
                  <p className="text-sm text-emerald/90 font-jakarta">Suggested Budget</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl">
                    <Calendar className="w-4 h-4 text-velvet" />
                    <span>Dec 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl">
                    <MapPin className="w-4 h-4 text-velvet" />
                    <span>Delhi</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/50 rounded-xl col-span-2">
                    <Users className="w-4 h-4 text-velvet" />
                    <span>150 Guests • Wedding</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90">
                  Post Event for Vendors
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p>Chat with AI to generate your event summary</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
