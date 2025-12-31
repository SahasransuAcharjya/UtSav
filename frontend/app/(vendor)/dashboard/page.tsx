// frontend/app/(vendor)/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, DollarSign, Clock, Star } from 'lucide-react';

export default function VendorDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, urgent, high-budget

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/events/feed', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (createdAt) => {
    const daysOld = Math.floor((Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24));
    if (daysOld >= 7) return <Badge className="bg-red-500 text-white">7+ DAYS</Badge>;
    if (daysOld >= 3) return <Badge className="bg-orange-500 text-white">URGENT</Badge>;
    return <Badge className="bg-emerald text-white">NEW</Badge>;
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return event.createdAt < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    if (filter === 'high-budget') return event.budgetMin > 50000;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-playfair text-velvet font-bold mb-2">
              New Requisitions
            </h1>
            <p className="text-xl text-gray-600 font-jakarta">
              {filteredEvents.length} events waiting for your bid
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setFilter('all')} className={filter === 'all' ? 'border-saffron text-saffron' : ''}>
              All
            </Button>
            <Button variant="outline" onClick={() => setFilter('urgent')} className={filter === 'urgent' ? 'border-orange-500 text-orange-500' : ''}>
              Urgent
            </Button>
            <Button variant="outline" onClick={() => setFilter('high-budget')} className={filter === 'high-budget' ? 'border-emerald text-emerald' : ''}>
              High Budget
            </Button>
          </div>
        </div>

        {/* Events Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="backdrop-blur-xl bg-white/70 border-0 shadow-xl animate-pulse">
                <CardContent className="p-8">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredEvents.length === 0 ? (
            <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl col-span-full text-center py-20">
              <Clock className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-playfair text-velvet mb-2">No events available</h3>
              <p className="text-gray-600 mb-8 font-jakarta">Try adjusting your filters or check back later.</p>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event._id} className="backdrop-blur-xl bg-white/70 border-0 shadow-xl hover:shadow-2xl transition-all group">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    {getUrgencyBadge(event.createdAt)}
                    <div className="text-2xl font-bold text-emerald">
                      ₹{event.budgetMax}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-playfair text-velvet font-bold mb-4 group-hover:text-saffron transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-velvet" />
                      {new Date(event.date).toLocaleDateString('en-IN')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-velvet" />
                      {event.guestCount} guests • {event.eventType}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-velvet" />
                      {event.location}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta group-hover:scale-[1.02] transition-transform">
                    <Star className="w-4 h-4 mr-2" />
                    Bid Now
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
