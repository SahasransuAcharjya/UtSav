// backend/src/utils/formatters.js
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };
  
  export const formatEventStatus = (status) => {
    const statusMap = {
      draft: 'Draft',
      open: 'Open for Bids',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      discounted: 'Discounted',
    };
    return statusMap[status] || status;
  };
  