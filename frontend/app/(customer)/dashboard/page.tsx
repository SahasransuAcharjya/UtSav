// frontend/app/(customer)/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, DollarSign, MessageCircle, Plus } from 'lucide-react';

export default function CustomerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/events/my', {
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

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-emerald',
      in_progress: 'bg-saffron',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500',
      draft: 'bg-gray-300',
    };
    return colors[status] || 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-playfair text-velvet font-bold mb-2">
              My Events
            </h1>
            <p className="text-xl text-gray-600 font-jakarta">
              Manage your event requisitions and negotiations
            </p>
          </div>
          <Link href="/customer/onboarding">
            <Button className="bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 h-12 px-8 text-lg font-jakarta">
              <Plus className="w-5 h-5 mr-2" />
              New Event
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-3xl font-bold text-emerald mb-2">{events.filter(e => e.status === 'open').length}</div>
              <p className="text-gray-600 font-jakarta text-sm uppercase tracking-wide">Open for Bids</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-3xl font-bold text-saffron mb-2">{events.filter(e => e.status === 'in_progress').length}</div>
              <p className="text-gray-600 font-jakarta text-sm uppercase tracking-wide">In Progress</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-3xl font-bold text-gray-600 mb-2">{events.length}</div>
              <p className="text-gray-600 font-jakarta text-sm uppercase tracking-wide">Total Events</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron mx-auto mb-4"></div>
              <p>Loading your events...</p>
            </div>
          ) : events.length === 0 ? (
            <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl text-center py-20">
              <Users className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-playfair text-velvet mb-2">No events yet</h3>
              <p className="text-gray-600 mb-8 font-jakarta">Create your first event requisition to get vendor quotes.</p>
              <Link href="/customer/onboarding">
                <Button className="bg-gradient-to-r from-saffron to-gold hover:from-saffron/90">
                  Create First Event
                </Button>
              </Link>
            </Card>
          ) : (
            events.map((event) => (
              <Card key={event._id} className="backdrop-blur-xl bg-white/70 border-0 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={`${getStatusColor(event.status)} text-white font-jakarta`}>
                          {event.status === 'open' ? 'Open for Bids' : event.status.replace('_', ' ')}
                        </Badge>
                        {event.negotiation && (
                          <Badge variant="secondary" className="bg-saffron/20 text-saffron border-saffron/30">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Negotiation Active
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-playfair text-velvet font-bold mb-3">
                        {event.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-velvet" />
                          <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-velvet" />
                          <span>{event.guestCount} guests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-velvet" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald" />
                          <span>₹{event.budgetMin} - ₹{event.budgetMax}</span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/customer/events/${event._id}`}>
                      <Button className="bg-gradient-to-r from-velvet to-saffron hover:from-velvet/90 text-white font-jakarta w-full lg:w-auto">
                        Manage Event
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
