// frontend/components/gemini/LiveSummary.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Calendar, Users, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveSummaryProps {
  summary?: string;
  eventDetails?: {
    title?: string;
    date?: string;
    guestCount?: number;
    location?: string;
    budget?: {
      min: number;
      max: number;
      recommended: number;
    };
  };
  onPostEvent?: () => void;
  loading?: boolean;
}

export default function LiveSummary({
  summary,
  eventDetails,
  onPostEvent,
  loading = false,
}: LiveSummaryProps) {
  const getBudgetDisplay = () => {
    if (!eventDetails?.budget) return null;
    
    return (
      <div className="glow-price mb-8 p-8 rounded-3xl bg-gradient-to-br from-emerald/20 to-saffron/20 border-2 border-emerald/30 backdrop-blur-xl text-center group hover:scale-[1.02] transition-all duration-500">
        <DollarSign className="w-12 h-12 text-emerald mx-auto mb-4 group-hover:animate-bounce" />
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald via-saffron to-gold bg-clip-text text-transparent mb-2">
          ₹{eventDetails.budget.recommended?.toLocaleString() || '48,500'}
        </div>
        <div className="text-lg font-semibold text-emerald/90 mb-1 font-jakarta">
          AI Suggested Budget
        </div>
        <div className="text-sm text-emerald/70 font-jakarta flex flex-wrap justify-center gap-1">
          Range: ₹{eventDetails.budget.min?.toLocaleString()} - ₹{eventDetails.budget.max?.toLocaleString()}
        </div>
      </div>
    );
  };

  if (!summary && !eventDetails) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-b from-white/80 to-pearl/70 border-0 shadow-2xl h-full flex items-center justify-center">
        <CardContent className="p-12 text-center">
          <Sparkles className="w-20 h-20 text-gray-400 mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-playfair text-gray-500 mb-2">Event Summary</h3>
          <p className="text-gray-500 font-jakarta">Chat with AI to generate your personalized event plan</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-b from-white/80 to-pearl/70 border-0 shadow-2xl h-full flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col pt-8 px-8 pb-8">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle className="w-8 h-8 text-emerald" />
          <h2 className="text-3xl font-playfair text-velvet font-bold">
            Event Summary Ready
          </h2>
        </div>

        {/* Budget Glow Card */}
        {getBudgetDisplay()}

        {/* Key Details */}
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventDetails?.date && (
              <div className="group p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-saffron/20 hover:border-saffron/40 transition-all backdrop-blur-sm flex items-center gap-4 hover:shadow-lg">
                <Calendar className="w-10 h-10 bg-gradient-to-br from-emerald to-saffron p-3 rounded-2xl text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-sm text-gray-600 uppercase tracking-wide font-jakarta mb-1">Date</div>
                  <div className="text-xl font-bold text-velvet">{new Date(eventDetails.date).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</div>
                </div>
              </div>
            )}

            {eventDetails?.guestCount && (
              <div className="group p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-saffron/20 hover:border-saffron/40 transition-all backdrop-blur-sm flex items-center gap-4 hover:shadow-lg">
                <Users className="w-10 h-10 bg-gradient-to-br from-saffron to-gold p-3 rounded-2xl text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-sm text-gray-600 uppercase tracking-wide font-jakarta mb-1">Guests</div>
                  <div className="text-xl font-bold text-velvet">{eventDetails.guestCount.toLocaleString()} guests</div>
                </div>
              </div>
            )}
          </div>

          {eventDetails?.location && (
            <div className="group p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-saffron/20 hover:border-saffron/40 transition-all backdrop-blur-sm hover:shadow-lg">
              <div className="flex items-start gap-4">
                <MapPin className="w-10 h-10 bg-gradient-to-br from-velvet to-emerald p-3 rounded-2xl text-white flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-600 uppercase tracking-wide font-jakarta mb-1">Location</div>
                  <div className="text-xl font-bold text-velvet">{eventDetails.location}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Text */}
        {summary && (
          <div className="p-6 bg-gradient-to-r from-saffron/5 to-emerald/5 border-2 border-white/50 rounded-3xl backdrop-blur-xl mb-8">
            <h4 className="font-semibold text-velvet mb-4 font-jakarta flex items-center gap-2">
              AI Generated Plan
              <Sparkles className="w-5 h-5 text-saffron animate-pulse" />
            </h4>
            <p className="text-gray-700 leading-relaxed font-jakarta text-sm">{summary}</p>
          </div>
        )}

        {/* CTA Button */}
        <Button
          onClick={onPostEvent}
          disabled={loading}
          className="w-full bg-gradient-to-r from-saffron via-gold to-emerald hover:from-saffron/90 text-white font-jakarta text-lg py-8 h-16 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 font-semibold"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Posting Event...
            </>
          ) : (
            <>
              🚀 Post Event for Vendor Bids
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
