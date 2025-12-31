// backend/src/utils/validators.js
export const validateEventData = (data) => {
    const required = ['title', 'description', 'eventType', 'date', 'location', 'guestCount'];
    const errors = [];
  
    required.forEach((field) => {
      if (!data[field]) {
        errors.push(`${field} is required`);
      }
    });
  
    if (data.guestCount && data.guestCount < 1) {
      errors.push('Guest count must be at least 1');
    }
  
    if (data.budgetMin >= data.budgetMax) {
      errors.push('Budget min must be less than max');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateNegotiationOffer = (amount) => {
    return amount >= 1000 && amount <= 5000000; // ₹1k to ₹50L
  };
  