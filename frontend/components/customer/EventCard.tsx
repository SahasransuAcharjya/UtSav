import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Event } from '@/types/event';

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-emerald text-white';
            case 'in_progress': return 'bg-saffron text-white';
            case 'completed': return 'bg-blue-500 text-white';
            case 'cancelled': return 'bg-red-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge className={`mb-2 ${getStatusColor(event.status)}`}>
                            {event.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <CardTitle className="text-xl font-playfair font-bold text-velvet group-hover:text-saffron transition-colors">
                            {event.title}
                        </CardTitle>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-emerald">
                            ₹{event.budgetMax.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">Max Budget</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600 font-jakarta">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-saffron" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-saffron" />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-saffron" />
                    <span>{event.guestCount} Guests</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta group-hover:scale-[1.02] transition-transform">
                    <Link href={`/customer/events/${event._id}`}>
                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
