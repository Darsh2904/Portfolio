# Darsh Patel — Portfolio (MERN Stack)

>3D interactive portfolio website built with the MERN stack, Three.js, GSAP, and Framer Motion.

---

## Usage Notice

This project is shared for learning purposes only.

Please do NOT:

- Clone or replicate the full website or design
- Repost it with minor content changes
- Use this project for commercial/client work
- Create tutorials or content using this exact project

If you use parts of the code, you must provide proper credit linking back to the original repository.

Build your own version - do not just copy.

- Darsh Patel

---

---

## 🗂 Project Structure

```
darsh-portfolio/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── darsh-photo.png      # Profile photo
│   │   ├── components/
│   │   │   ├── Cursor.jsx/.css      # Custom cursor
│   │   │   ├── Loader.jsx/.css      # Animated loader
│   │   │   ├── Navbar.jsx/.css      # Sticky nav + theme toggle
│   │   │   ├── Hero.jsx/.css        # Hero section
│   │   │   ├── HeroCanvas.jsx       # Three.js hero 3D scene
│   │   │   ├── CodeRain.jsx         # Matrix code rain canvas
│   │   │   ├── Marquee.jsx/.css     # Scrolling ticker
│   │   │   ├── About.jsx/.css       # About + code card
│   │   │   ├── Skills.jsx/.css      # Skills + 3D Fibonacci orbit
│   │   │   ├── SkillsCanvas.jsx     # Three.js skill nodes
│   │   │   ├── Projects.jsx/.css    # Projects grid (API-driven)
│   │   │   ├── Creative.jsx/.css    # Creative work gallery
│   │   │   ├── Experience.jsx/.css  # Timeline
│   │   │   ├── Contact.jsx/.css     # Contact form (posts to API)
│   │   │   └── Footer.jsx/.css
│   │   ├── context/
│   │   │   └── ThemeContext.jsx     # Dark/Light theme
│   │   ├── hooks/
│   │   │   ├── useScrollReveal.js   # IntersectionObserver hook
│   │   │   └── useCursor.js         # Cursor tracking hook
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main page assembler
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css                # Global CSS variables
│   ├── .env
│   └── package.json
│
├── server/                          # Node.js + Express backend
│   ├── controllers/
│   │   ├── contactController.js     # Handle messages + email
│   │   └── projectController.js     # Projects CRUD + auto-seed
│   ├── models/
│   │   ├── Contact.js               # MongoDB Contact schema
│   │   └── Project.js               # MongoDB Project schema
│   ├── routes/
│   │   ├── contact.js
│   │   └── projects.js
│   ├── index.js                     # Express server entry
│   └── package.json
│
├── .env.example
├── .gitignore
├── package.json                     # Root: runs both concurrently
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/darshpatel/portfolio.git
cd darsh-portfolio

# Install all dependencies (root + client + server)
npm run install-all
```

### 2. Configure Environment

```bash
# Copy and fill in your values
cp .env.example server/.env
cp .env.example client/.env
```

**server/.env**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/darsh-portfolio
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=darsh@email.com
CLIENT_URL=http://localhost:3000
```

**client/.env**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run Development

```bash
# From root — runs both client (3000) and server (5000)
npm run dev
```

Or separately:
```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm start
```

### 4. Open in Browser

```
http://localhost:3000
```

---

## 📦 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js 18, React Router v6        |
| 3D         | Three.js r128                       |
| Animation  | GSAP 3, CSS Animations              |
| Styling    | CSS Variables (no Tailwind required)|
| Backend    | Node.js + Express.js                |
| Database   | MongoDB + Mongoose                  |
| Email      | Nodemailer (Gmail)                  |
| Security   | Helmet, express-rate-limit, CORS    |

---

## 🔌 API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/health       | Server health check                |
| GET    | /api/projects     | Fetch all projects (auto-seeds DB) |
| GET    | /api/projects/:slug | Fetch single project             |
| POST   | /api/contact      | Submit contact form + send email   |
| GET    | /api/contact      | Get all messages (admin)           |

---

## 🌐 Production Deployment

### Frontend → Vercel / Netlify
```bash
cd client
npm run build
# Deploy /client/build folder
```

### Backend → Railway / Render / Heroku
```bash
cd server
# Set env variables in dashboard
# Deploy server/ folder
```

### MongoDB → MongoDB Atlas
- Create free cluster at mongodb.com/atlas
- Replace `MONGODB_URI` in server `.env`

---

## ✏️ Customization

### Update Project Links
Edit `server/controllers/projectController.js` → `seedProjects` array:
```js
liveUrl: 'https://your-live-site.com',
githubUrl: 'https://github.com/darshpatel/project',
```

### Update Social Links
Edit `client/src/components/Contact.jsx` → `SOCIALS` array.

### Add Real Photos to Creative Section
Replace the emoji icons in `client/src/components/Creative.jsx` with `<img>` tags.

### Gmail App Password Setup
1. Enable 2FA on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate a password for "Mail"
4. Use that as `EMAIL_PASS` in server `.env`

---

## 🎨 Features

- ✅ Dark mode by default (toggle to Light)
- ✅ Custom animated cursor
- ✅ Loading screen with terminal animation
- ✅ Code rain (Matrix-style JS keywords)
- ✅ Three.js hero — 22 floating wireframe nodes + torus knot
- ✅ Three.js skills — 16 Fibonacci orbit nodes + DNA helix
- ✅ 3D card tilt on project cards
- ✅ Photo frame with scan-line + corner brackets
- ✅ Projects fetched from MongoDB (auto-seeds on first run)
- ✅ Contact form → saves to MongoDB + sends email
- ✅ Scroll-triggered reveal animations
- ✅ Marquee ticker
- ✅ Animated timeline
- ✅ Fully responsive (mobile + desktop)
- ✅ Rate limiting + Helmet security

Made with ❤️ by Darsh Patel · Vadodara, India