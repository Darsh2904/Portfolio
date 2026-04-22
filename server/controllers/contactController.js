const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

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

    // Save to MongoDB
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'Portfolio Inquiry',
      message: message.trim(),
      ipAddress: req.ip,
    });
    await contact.save();

    // Send email (if credentials configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email to Darsh
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `[Portfolio] ${subject || 'New Message'} — from ${name}`,
        html: `
          <div style="font-family:monospace;background:#030712;color:#e2e8f0;padding:2rem;border-radius:8px;border:1px solid #00f5ff22">
            <h2 style="color:#00f5ff;margin-bottom:1.5rem">// new_message.received</h2>
            <p><strong style="color:#06d6a0">name:</strong> ${name}</p>
            <p><strong style="color:#06d6a0">email:</strong> ${email}</p>
            <p><strong style="color:#06d6a0">subject:</strong> ${subject || 'No subject'}</p>
            <p><strong style="color:#06d6a0">message:</strong></p>
            <div style="background:#0a1628;padding:1rem;border-left:2px solid #00f5ff;margin-top:.5rem">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="color:#475569;font-size:0.75rem;margin-top:1.5rem">Sent at: ${new Date().toISOString()}</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"Darsh Patel" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Got your message! — Darsh Patel`,
        html: `
          <div style="font-family:monospace;background:#030712;color:#e2e8f0;padding:2rem;border-radius:8px">
            <h2 style="color:#00f5ff">// message_received ✓</h2>
            <p>Hey ${name},</p>
            <p>Thanks for reaching out! I've received your message and will get back to you within 24 hours.</p>
            <br/>
            <p style="color:#94a3b8">— Darsh Patel</p>
            <p style="color:#475569;font-size:0.75rem">Full Stack Developer · Vadodara, India</p>
          </div>
        `,
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll get back to you soon.' 
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
