const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  order: { type: Number, default: 0 },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  badge: { type: String, default: 'Web App' },
  description: { type: String, required: true },
  techStack: [{ type: String, trim: true }],
  liveUrl: { type: String, default: '#' },
  githubUrl: { type: String, default: '#' },
  accentColor: { type: String, default: '#00f5ff' },
  codeSnippet: { type: String, default: '' },
  featured: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
