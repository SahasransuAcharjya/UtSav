// frontend/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MapPin, DollarSign, MessageCircle, Star, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-white to-pearl/80">
      {/* Hero Section */}
      <section className="pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron/5 to-emerald/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron to-gold px-6 py-3 rounded-full mb-8">
            <Star className="w-5 h-5 text-white" />
            <span className="font-jakarta text-white font-semibold uppercase tracking-wide text-sm">
              Trusted by 10K+ customers
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-playfair font-bold bg-gradient-to-r from-velvet via-saffron to-emerald bg-clip-text text-transparent mb-6 leading-tight">
            Celebrate with
            <br />
            <span className="text-8xl">UtSav</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 font-jakarta max-w-3xl mx-auto mb-12 leading-relaxed">
            Professional event management at your fingertips. Post your event, get competitive bids, 
            negotiate live, and pay securely through milestones.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/register">
              <Button className="text-2xl py-8 px-12 bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta shadow-2xl">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-xl py-7 px-10 border-2 border-velvet/50 text-velvet hover:bg-velvet hover:text-white font-jakarta">
                Vendor Login
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald font-playfair mb-2">5K+</div>
              <p className="text-gray-600 font-jakarta">Events Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-saffron font-playfair mb-2">50K+</div>
              <p className="text-gray-600 font-jakarta">Bids Placed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-velvet font-playfair mb-2">₹100Cr+</div>
              <p className="text-gray-600 font-jakarta">Transactions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold font-playfair mb-2">4.9⭐</div>
              <p className="text-gray-600 font-jakarta">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-playfair font-bold text-velvet mb-6">
              How UtSav Works
            </h2>
            <p className="text-xl text-gray-600 font-jakarta max-w-2xl mx-auto">
              Three simple steps from event idea to perfect execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl group hover:shadow-3xl transition-all border-saffron/20 hover:border-saffron/40">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald to-saffron rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-playfair text-velvet font-bold mb-4">1. Post Event</h3>
                <CardDescription className="font-jakarta text-lg">
                  Describe your dream event. AI chatbot helps refine details and suggests realistic budgets.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl group hover:shadow-3xl transition-all border-saffron/20 hover:border-saffron/40">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-saffron to-gold rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-playfair text-velvet font-bold mb-4">2. Negotiate Live</h3>
                <CardDescription className="font-jakarta text-lg">
                  Vendors bid competitively. Real-time chat lets you negotiate pricing and finalize deals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl group hover:shadow-3xl transition-all border-saffron/20 hover:border-saffron/40">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-velvet to-emerald rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-playfair text-velvet font-bold mb-4">3. Secure Payments</h3>
                <CardDescription className="font-jakarta text-lg">
                  Pay through secure milestones (advance, resources, final). Platform handles GST compliance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-velvet to-saffron/90">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl font-playfair font-bold mb-6">Ready to plan your perfect event?</h2>
          <p className="text-2xl font-jakarta mb-12 opacity-90">Join 10,000+ happy customers who celebrate with confidence.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <Button className="text-2xl py-8 px-12 bg-white text-saffron hover:bg-white/90 font-jakarta shadow-2xl">
                Start Planning <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-xl py-7 px-10 border-2 border-white/50 text-white hover:bg-white hover:text-saffron font-jakarta">
                I'm a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
