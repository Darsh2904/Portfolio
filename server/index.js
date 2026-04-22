const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Middleware ───────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// ── Rate Limiting ─────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many contact attempts. Please wait an hour.' }
});
app.use('/api/', limiter);
app.use('/api/contact', contactLimiter);

// ── Body Parser ───────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── MongoDB Connection ────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darsh-portfolio')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ── Routes ────────────────────────
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// ── Health Check ──────────────────
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'Darsh Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// ── 404 Handler ───────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global Error Handler ──────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
