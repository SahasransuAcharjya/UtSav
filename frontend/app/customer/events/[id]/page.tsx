// frontend/app/(customer)/events/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, DollarSign, MessageCircle } from 'lucide-react';

export default function EventDetail() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pearl to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto mb-4"></div>
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-playfair text-velvet font-bold mb-2">
              {event.title}
            </h1>
            <Badge className="bg-emerald text-white text-lg px-4 py-2 font-jakarta">
              {event.status === 'open' ? 'Open for Bids' : event.status.replace('_', ' ')}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald mb-1">₹{event.budgetMin} - ₹{event.budgetMax}</div>
            <p className="text-gray-600 font-jakarta">Budget Range</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-playfair text-velvet font-bold mb-6">Event Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-velvet" />
                  <div>
                    <div className="font-semibold text-gray-900">Date</div>
                    <div>{new Date(event.date).toLocaleDateString('en-IN')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                  <Users className="w-5 h-5 text-velvet" />
                  <div>
                    <div className="font-semibold text-gray-900">Guests</div>
                    <div>{event.guestCount} people</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-velvet" />
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div>{event.location}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-playfair text-velvet font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Budget Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Minimum Budget</span>
                  <span className="font-bold text-emerald">₹{event.budgetMin}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maximum Budget</span>
                  <span className="font-bold text-emerald">₹{event.budgetMax}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-4">
                  <div 
                    className="h-1 bg-gradient-to-r from-emerald to-saffron rounded-full transition-all"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {event.status === 'open' && (
            <Button className="bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta px-8 py-3 text-lg flex-1 max-w-sm">
              Repost Event
            </Button>
          )}
          {event.negotiation && (
            <Button className="bg-gradient-to-r from-velvet to-saffron hover:from-velvet/90 text-white font-jakarta px-8 py-3 text-lg flex-1 max-w-sm">
              <MessageCircle className="w-5 h-5 mr-2" />
              Continue Negotiation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
