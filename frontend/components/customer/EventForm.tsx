// frontend/components/customer/EventForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, MapPin, DollarSign, Send, Sparkles } from 'lucide-react';
import BargainSlider from './BargainSlider';

interface EventFormData {
  title: string;
  description: string;
  eventType: string;
  date: string;
  location: string;
  guestCount: string;
  budgetMin: number;
  budgetMax: number;
}

export default function EventForm({ onSubmit }: { onSubmit?: (data: EventFormData) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    location: '',
    guestCount: '',
    budgetMin: 50000,
    budgetMax: 100000,
  });
  const [loading, setLoading] = useState(false);
  const [geminiSuggestion, setGeminiSuggestion] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeminiRefine = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/gemini/refine-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawDescription: formData.description,
          guestCount: parseInt(formData.guestCount) || 0,
          location: formData.location,
          eventType: formData.eventType,
        }),
      });

      const data = await res.json();
      setGeminiSuggestion(data.summary || 'AI suggestion generated!');
    } catch (error) {
      setGeminiSuggestion('AI temporarily unavailable. Fill form manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair text-velvet font-bold mb-2">
            Create Event Requisition
          </h2>
          <p className="text-gray-600 font-jakarta">Post your event and get vendor bids</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-saffron" />
                Event Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Priya & Rahul Wedding"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-saffron" />
                Event Date
              </label>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Event Type & Guests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-saffron" />
                Event Type
              </label>
              <Select name="eventType" onValueChange={(value: string) => setFormData({ ...formData, eventType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-saffron" />
                Guest Count
              </label>
              <Input
                name="guestCount"
                type="number"
                value={formData.guestCount}
                onChange={handleInputChange}
                placeholder="150"
                min="1"
                required
              />
            </div>
          </div>

          {/* Location & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron" />
                Location
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Delhi, India"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-saffron" />
                Budget Range
              </label>
              <Input
                name="budgetMin"
                type="number"
                value={formData.budgetMin}
                onChange={handleInputChange}
                placeholder="50000"
              />
              <Input
                name="budgetMax"
                type="number"
                value={formData.budgetMax}
                onChange={handleInputChange}
                placeholder="100000"
              />
            </div>
          </div>

          {/* Description + AI */}
          <div>
            <label className="block text-sm font-jakarta font-medium mb-2">
              Event Description
            </label>
            <div className="flex gap-3 mb-3">
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your dream event... 150 guests wedding in Delhi, modern decor, live music..."
                rows={4}
                required
              />
              <Button
                type="button"
                onClick={handleGeminiRefine}
                disabled={loading || !formData.description}
                variant="outline"
                className="w-14 h-14 p-0"
              >
                <Sparkles className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            {geminiSuggestion && (
              <div className="p-4 bg-gradient-to-r from-saffron/10 to-emerald/10 border border-saffron/20 rounded-xl text-sm font-jakarta">
                💡 AI Suggestion: {geminiSuggestion}
              </div>
            )}
          </div>

          {/* Bargain Slider */}
          <BargainSlider
            initialValue={formData.budgetMin}
            onChange={(val) => setFormData({ ...formData, budgetMin: val })}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta text-lg py-8 h-16"
            disabled={loading}
          >
            <Send className="w-6 h-6 mr-3" />
            Post Event for Vendor Bids
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
