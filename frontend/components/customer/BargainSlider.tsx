// frontend/components/customer/BargainSlider.tsx
'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { DollarSign, AlertTriangle } from 'lucide-react';

interface BargainSliderProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function BargainSlider({
  initialValue = 50000,
  min = 25000,
  max = 100000,
  onChange,
}: BargainSliderProps) {
  const [value, setValue] = useState(initialValue);
  const [feedback, setFeedback] = useState('');

  const getRiskLevel = (val: number) => {
    const suggested = 75000;
    if (val >= suggested * 0.9) return 'safe';
    if (val >= suggested * 0.8) return 'medium';
    return 'risky';
  };

  const getFeedbackText = (val: number) => {
    const suggested = 75000;
    const diff = ((suggested - val) / suggested * 100).toFixed(0);
    
    if (getRiskLevel(val) === 'safe') {
      return `Vendors usually accept ${diff}% below suggested`;
    } else if (getRiskLevel(val) === 'medium') {
      return `Risky: ${diff}% below. May take longer`;
    } else {
      return `Very risky: ${diff}% below. Few vendors accept`;
    }
  };

  const handleValueChange = (newValue: number[]) => {
    const val = newValue[0];
    setValue(val);
    setFeedback(getFeedbackText(val));
    onChange?.(val);
  };

  return (
    <div className="space-y-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100">
      {/* Current Offer Display */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-saffron px-6 py-3 rounded-full">
          <DollarSign className="w-5 h-5" />
          <span className="text-2xl font-bold text-white">₹{value.toLocaleString()}</span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className="flex justify-center">
        <Badge 
          className={`text-lg px-6 py-2 font-jakarta font-semibold ${
            getRiskLevel(value) === 'safe' ? 'bg-emerald text-white' :
            getRiskLevel(value) === 'medium' ? 'bg-saffron text-white' :
            'bg-red-500 text-white'
          }`}
        >
          {getRiskLevel(value) === 'safe' ? 'Quick Accept' :
           getRiskLevel(value) === 'medium' ? 'Medium Risk' : 'High Risk'}
        </Badge>
      </div>

      {/* Slider with Gradient Track */}
      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          max={max}
          min={min}
          step={1000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 font-jakarta">
          <span>₹{min.toLocaleString()}</span>
          <span>Suggested: ₹75,000</span>
          <span>₹{max.toLocaleString()}</span>
        </div>
      </div>

      {/* Feedback */}
      <div className="p-4 bg-gradient-to-r rounded-xl text-center">
        {getRiskLevel(value) === 'risky' && (
          <AlertTriangle className="w-5 h-5 text-red-500 mx-auto mb-2" />
        )}
        <p className="text-sm font-jakarta">{feedback}</p>
      </div>
    </div>
  );
}
