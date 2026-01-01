// frontend/app/(customer)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/customer/EventCard';
import { Event } from '@/types/event';
import { apiClient } from '@/lib/api';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await apiClient.get<Event[]>('/events/customer');
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['customer']}>
      <div className="min-h-screen bg-gradient-to-br from-pearl via-white to-pearl/80 dark:from-black dark:via-neutral-950 dark:to-black transition-colors duration-300 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-5xl font-playfair font-bold text-velvet dark:text-white mb-3">
                Welcome back, {user?.name.split(' ')[0]}!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-jakarta">
                Manage your events and track payments
              </p>
            </div>
            <Button asChild className="bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-bold px-8 h-14 shadow-xl">
              <Link href="/customer/onboarding">
                + New Event
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <Card className="backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-0 shadow-xl dark:border-white/10">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-emerald mb-2">{events.length}</div>
                <p className="text-gray-600 dark:text-gray-400 font-jakarta">Active Events</p>
              </CardContent>
            </Card>
            {/* Add more stat cards */}
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {loading ? (
              <div>Loading...</div>
            ) : events.length === 0 ? (
              <Card className="backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-0 shadow-xl p-12 text-center dark:border-white/10">
                <CardContent>
                  <p className="text-2xl text-gray-500 dark:text-gray-400 font-jakarta">No events yet</p>
                  <Button asChild className="mt-6 bg-gradient-to-r from-saffron to-gold">
                    <Link href="/customer/onboarding">Create First Event</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
