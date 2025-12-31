// backend/src/services/pricingEngine.js
export const calculateSuggestedBudget = (eventDetails) => {
    const { eventType, guestCount, location, date } = eventDetails;
    
    // Base pricing by event type (₹ per guest)
    const baseRates = {
      wedding: 2500,
      birthday: 1200,
      corporate: 1800,
      other: 1500,
    };
  
    const baseRate = baseRates[eventType] || baseRates.other;
    let baseBudget = guestCount * baseRate;
  
    // Location multiplier (Delhi/Mumbai = 1.3x, Tier 2 = 1.1x, etc.)
    const locationMultipliers = {
      'delhi': 1.3, 'mumbai': 1.3, 'bangalore': 1.25,
      'tier2': 1.1, 'other': 1.0,
    };
    const locationMultiplier = locationMultipliers[location.toLowerCase()] || 1.0;
    baseBudget *= locationMultiplier;
  
    // Seasonality (wedding season +10%)
    const isPeakSeason = ['dec', 'jan', 'feb', 'oct', 'nov'].includes(
      date.toLocaleDateString('en-IN', { month: 'short' }).toLowerCase()
    );
    if (isPeakSeason && eventType === 'wedding') {
      baseBudget *= 1.1;
    }
  
    // Final range: 85% - 115% of calculated
    const minBudget = Math.round(baseBudget * 0.85 / 100) * 100;
    const maxBudget = Math.round(baseBudget * 1.15 / 100) * 100;
  
    return {
      suggestedMin: minBudget,
      suggestedMax: maxBudget,
      recommended: Math.round(baseBudget / 100) * 100,
      breakdown: {
        base: baseRate * guestCount,
        location: locationMultiplier,
        seasonality: isPeakSeason ? 1.1 : 1.0,
      },
    };
  };
  