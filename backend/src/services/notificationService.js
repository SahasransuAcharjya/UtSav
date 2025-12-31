// backend/src/services/notificationService.js
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import Event from '../models/Event.js';
import { CLIENT_URL, NODE_ENV } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Check events 7 days old without vendor
export const startNotificationCron = () => {
  if (NODE_ENV !== 'development') {
    cron.schedule('0 9 * * *', async () => { // Daily at 9AM
      await checkStaleEvents();
    });
  }
};

const checkStaleEvents = async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  const staleEvents = await Event.find({
    status: 'open',
    createdAt: { $lt: sevenDaysAgo },
    vendor: null,
  });

  for (const event of staleEvents) {
    // Send email to customer
    await sendStaleEventNotification(event);
    
    // Reduce budget by 10% to attract vendors
    const newBudgetMax = event.budgetMax * 0.9;
    await Event.findByIdAndUpdate(event._id, {
      budgetMax: newBudgetMax,
      status: 'discounted', // new status
    });
  }
};

const sendStaleEventNotification = async (event) => {
  const mailOptions = {
    to: event.customer.email, // populate needed
    subject: '📅 Your UtSav event needs attention!',
    html: `
      <h2>Your "${event.title}" event</h2>
      <p>It's been 7 days without vendor response. We've reduced the budget by 10% to attract more vendors.</p>
      <p><strong>New budget:</strong> ₹${event.budgetMin}-${event.budgetMax}</p>
      <a href="${CLIENT_URL}/dashboard" style="background:#FF9933;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;">View Dashboard</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};
