// backend/src/utils/emailTemplates.js
export const getNegotiationEmail = (event, offer, senderRole) => {
    return {
      subject: `New ${senderRole} offer for "${event.title}"`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #FF9933;">New Offer Received</h2>
          <h3>${event.title}</h3>
          <p><strong>Event:</strong> ${event.eventType} • ${event.guestCount} guests</p>
          <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('en-IN')}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10B981; margin-top: 0;">Offer: ₹${offer}</h3>
          </div>
          <a href="${process.env.CLIENT_URL}/negotiations/${event._id}" 
             style="background: #FF9933; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">
            Review Offer
          </a>
        </div>
      `,
    };
  };
  