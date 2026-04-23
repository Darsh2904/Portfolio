const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const hasEmailConfig = () => Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
const hasTelegramConfig = () => Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

const createEmailTransporter = () => {
  if (!hasEmailConfig()) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const escapeHtml = (unsafe = '') => String(unsafe)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const sendOwnerEmailNotification = async (transporter, payload) => {
  if (!transporter) return false;

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject || 'No subject');
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br>');

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `[Portfolio] ${payload.subject || 'New Message'} - from ${payload.name}`,
    headers: {
      'X-Priority': '1',
      Priority: 'urgent',
      Importance: 'high',
    },
    html: `
      <div style="font-family:monospace;background:#030712;color:#e2e8f0;padding:2rem;border-radius:8px;border:1px solid #00f5ff22">
        <h2 style="color:#00f5ff;margin-bottom:1.5rem">// new_message.received</h2>
        <p><strong style="color:#06d6a0">name:</strong> ${safeName}</p>
        <p><strong style="color:#06d6a0">email:</strong> ${safeEmail}</p>
        <p><strong style="color:#06d6a0">subject:</strong> ${safeSubject}</p>
        <p><strong style="color:#06d6a0">message:</strong></p>
        <div style="background:#0a1628;padding:1rem;border-left:2px solid #00f5ff;margin-top:.5rem">
          ${safeMessage}
        </div>
        <p style="color:#475569;font-size:0.75rem;margin-top:1.5rem">Sent at: ${new Date().toISOString()}</p>
      </div>
    `,
  });

  return true;
};

const sendAutoReply = async (transporter, payload) => {
  if (!transporter) return false;

  const safeName = escapeHtml(payload.name);

  await transporter.sendMail({
    from: `"Darsh Patel" <${process.env.EMAIL_USER}>`,
    to: payload.email,
    subject: 'Got your message! - Darsh Patel',
    html: `
      <div style="font-family:monospace;background:#030712;color:#e2e8f0;padding:2rem;border-radius:8px">
        <h2 style="color:#00f5ff">// message_received ✓</h2>
        <p>Hey ${safeName},</p>
        <p>Thanks for reaching out! I have received your message and will get back to you soon.</p>
        <br/>
        <p style="color:#94a3b8">- Darsh Patel</p>
        <p style="color:#475569;font-size:0.75rem">Full Stack Developer | Vadodara, India</p>
      </div>
    `,
  });

  return true;
};

const sendTelegramNotification = async (payload) => {
  if (!hasTelegramConfig()) return false;
  if (typeof fetch !== 'function') return false;

  const text = [
    'New portfolio contact message',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject || 'No subject'}`,
    'Message:',
    payload.message,
  ].join('\n');

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Telegram notification failed with status ${response.status}`);
  }

  return true;
};

// ── Send Contact Message ──────────
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email and message are required.' 
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject?.trim() || 'Portfolio Inquiry';
    const cleanMessage = message.trim();

    const isEmailValid = /^\S+@\S+\.\S+$/.test(cleanEmail);
    if (!isEmailValid) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    // Save to MongoDB (non-blocking reliability: alerts should still attempt even if DB is down)
    const contact = new Contact({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      ipAddress: req.ip,
    });

    let dbSaved = true;
    try {
      await contact.save();
    } catch (dbErr) {
      dbSaved = false;
      console.error('Contact DB save failed:', dbErr.message);
    }

    const payload = {
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    };

    const transporter = createEmailTransporter();
    const ownerNotificationTasks = [];

    if (transporter) {
      ownerNotificationTasks.push(sendOwnerEmailNotification(transporter, payload));
    }

    if (hasTelegramConfig()) {
      ownerNotificationTasks.push(sendTelegramNotification(payload));
    }

    let ownerAlertDelivered = false;
    if (ownerNotificationTasks.length > 0) {
      const ownerResults = await Promise.allSettled(ownerNotificationTasks);
      ownerAlertDelivered = ownerResults.some((result) => result.status === 'fulfilled' && result.value === true);

      ownerResults
        .filter((result) => result.status === 'rejected')
        .forEach((result) => console.error('Owner notification failed:', result.reason));
    } else {
      console.warn('No owner notification channel configured. Configure email or Telegram env variables.');
    }

    if (transporter) {
      sendAutoReply(transporter, payload)
        .catch((error) => console.error('Auto-reply failed:', error.message));
    }

    const statusCode = ownerAlertDelivered || dbSaved ? 201 : 500;

    res.status(statusCode).json({
      success: ownerAlertDelivered || dbSaved,
      ownerNotified: ownerAlertDelivered,
      savedToDatabase: dbSaved,
      message: ownerAlertDelivered && dbSaved
        ? 'Message sent successfully! Owner has been notified.'
        : ownerAlertDelivered && !dbSaved
          ? 'Message delivered and owner notified, but database save failed.'
          : !ownerAlertDelivered && dbSaved
            ? 'Message saved successfully, but instant notification is not fully configured yet.'
            : 'Message could not be processed. Configure at least one notification channel and verify database connection.',
    });

  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again.' 
    });
  }
};

// ── Get All Messages (admin) ──────
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
