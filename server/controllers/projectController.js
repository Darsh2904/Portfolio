const Project = require('../models/Project');

const LIVE_URL_BY_SLUG = {
  'dreamland-travel': 'https://dreamland-travel.netlify.app/',
  'no-nap-drive': '',
  'crackit-ai': 'https://crackit-ai-ueu5.onrender.com/',
  'e-auction-platform': 'https://bid-vault29.vercel.app/',
  'bidvault': 'https://bid-vault29.vercel.app/',
};

const applyLiveUrlOverrides = (project) => {
  const plain = typeof project?.toObject === 'function' ? project.toObject() : project;
  if (!plain) return plain;
  const override = LIVE_URL_BY_SLUG[plain.slug];
  if (override === undefined) return plain;
  return { ...plain, liveUrl: override };
};

const seedProjects = [
  {
    order: 1,
    title: 'Dreamland Travel',
    slug: 'dreamland-travel',
    badge: 'Travel Tech',
    description: 'Full-featured travel booking platform with destination discovery, itinerary planning, and booking management. Built for scale with a seamless user experience.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://dreamland-travel.netlify.app/',
    githubUrl: '#',
    accentColor: '#00f5ff',
    codeSnippet: "const TravelApp = () => {\n  const [trips, setTrips] = useState([])\n  return <TravelDashboard />\n}",
  },
  {
    order: 2,
    title: 'No Nap Drive',
    slug: 'no-nap-drive',
    badge: 'Safety AI',
    description: 'Real-time driver alertness detection using AI and computer vision. Prevents drowsy driving with smart mobile alerts and eye-tracking algorithms.',
    techStack: ['React', 'Python', 'OpenCV', 'Node.js'],
    liveUrl: '',
    githubUrl: '#',
    accentColor: '#ff6b6b',
    codeSnippet: "def detect_drowsiness(frame):\n  eyes = detect_eyes(frame)\n  if eyes.EAR < 0.25:\n    alert_driver()",
  },
  {
    order: 3,
    title: 'CrackIt.AI',
    slug: 'crackit-ai',
    badge: 'AI Platform',
    description: 'AI-powered interview prep platform with personalized question banks, mock interview sessions, and real-time performance feedback via language models.',
    techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    liveUrl: 'https://crackit-ai-ueu5.onrender.com/',
    githubUrl: '#',
    accentColor: '#7c3aed',
    codeSnippet: "const generateQuestion = async () => {\n  const res = await openai.chat({\n    model: 'gpt-4',\n    role: 'interviewer'\n  })\n}",
  },
  {
    order: 4,
    title: 'E-Auction Platform',
    slug: 'e-auction-platform',
    badge: 'E-Commerce',
    description: 'Real-time online auction system with live bidding via WebSocket, timer-based listings, secure payment integration, and comprehensive admin controls.',
    techStack: ['React', 'Express', 'Socket.io', 'MySQL'],
    liveUrl: 'https://bid-vault29.vercel.app/',
    githubUrl: '#',
    accentColor: '#ffd166',
    codeSnippet: "socket.on('bid', (data) => {\n  if(data.amount > currentBid) {\n    updateBid(data.amount)\n    io.emit('bid_update', data)\n  }\n})",
  },
];

// ── Get All Projects ──────────────
exports.getProjects = async (req, res) => {
  try {
    let projects = await Project.find({ featured: true }).sort({ order: 1 });

    // Auto-seed if empty
    if (projects.length === 0) {
      await Project.insertMany(seedProjects);
      projects = await Project.find({ featured: true }).sort({ order: 1 });
    }

    res.json({ success: true, data: projects.map(applyLiveUrlOverrides) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ── Get Single Project ────────────
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: applyLiveUrlOverrides(project) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
