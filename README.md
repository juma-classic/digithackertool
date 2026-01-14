# 🎯 Digit Hacker Tool - Complete Production Clone

> **AI-powered trading signal tool for Deriv's volatility indices**

A full-stack, production-ready application that provides real-time Even/Odd, Over/Under, and Digit Match predictions with confidence scoring and recommended trade runs.

![Status](https://img.shields.io/badge/status-production%20ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)
![React](https://img.shields.io/badge/react-18-blue)

---

## ✨ Features

### Core Functionality
- 🎯 **Real-time Tick Analysis** - Live streaming from Deriv WebSocket API
- 📊 **Even/Odd Predictions** - Analyzes digit parity patterns
- 🔢 **Digit Match** - Identifies most frequent digits (0-9)
- ⬆️⬇️ **Over/Under Signals** - Smart threshold predictions with recommended runs
- 📈 **Visual Analytics** - Real-time charts and statistics
- 🔐 **Secure OAuth** - Deriv account integration
- 💰 **Multi-Account Support** - Track real and demo balances
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop

### Technical Highlights
- ✅ Server-Sent Events for efficient streaming
- ✅ Rolling 30-tick analysis window
- ✅ Confidence scoring (55-95% range)
- ✅ Animated UI with Framer Motion
- ✅ MongoDB for user persistence
- ✅ Production deployment configs included

---

## 🚀 Quick Start

### Option 1: Automated (Recommended)

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
start.bat
```

### Option 2: Manual

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Deriv credentials
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

**Access:** http://localhost:5173

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | Get running in 5 minutes |
| [SETUP.md](SETUP.md) | Detailed installation guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment (Render + Vercel) |
| [FEATURES.md](FEATURES.md) | Complete feature documentation |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Technical overview |

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **WebSocket:** ws library
- **Auth:** Passport.js (OAuth2)
- **Security:** Helmet, CORS, Rate Limiting

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6

### Infrastructure
- **Backend:** Render.com / Railway
- **Frontend:** Vercel / Netlify
- **Database:** MongoDB Atlas
- **Version Control:** Git / GitHub

---

## 📊 Prediction Algorithms

### Even/Odd
Analyzes last 30 ticks to predict next digit parity with confidence scoring.

### Over/Under
- **OVER:** Digits 4, 5, 6, 7
- **UNDER:** Digits 2, 3, 4, 5
- Recommends specific digit and number of runs (5-15)

### Digit Match
Identifies most frequently occurring digit with confidence percentage.

---

## 🔐 Security

- ✅ OAuth 2.0 with Deriv
- ✅ Secure session management
- ✅ HTTPS enforced in production
- ✅ Environment variable isolation
- ✅ CORS protection
- ✅ Security headers (Helmet)

---

## 🚢 Deployment

### Free Tier (MVP)
- Render: Free (with sleep)
- Vercel: Free (100GB bandwidth)
- MongoDB Atlas: Free (512MB)
- **Total: $0/month**

### Production Tier
- Render: $7/month (always-on)
- Vercel: $20/month (Pro)
- MongoDB: $9/month (2GB)
- **Total: $36/month**

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step guide.

---

## 📁 Project Structure

```
digit-hacker-tool/
├── backend/              # Express API + WebSocket
│   ├── src/
│   │   ├── config/      # Database config
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Deriv API client
│   │   └── server.js    # Entry point
│   └── package.json
│
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route pages
│   │   ├── utils/       # Prediction algorithms
│   │   └── App.jsx
│   └── package.json
│
└── docs/               # Documentation
```

---

## 🎨 Screenshots

### Landing Page
Modern gradient design with feature highlights and Deriv OAuth login.

### Dashboard
Real-time predictions for 5+ volatility indices with animated cards, charts, and statistics.

---

## 🧪 Testing

```bash
# Backend health check
curl http://localhost:5000/health

# Frontend
npm run build
npm run preview
```

---

## 🔮 Roadmap

- [ ] Trade history tracking
- [ ] Win/loss statistics
- [ ] Strategy backtesting
- [ ] Mobile app (React Native)
- [ ] Telegram bot integration
- [ ] ML-based predictions

---

## 🤝 Contributing

1. Fork the repository: https://github.com/juma-classic/digithackertool
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - Free to use, modify, and distribute.

---

## 🙏 Acknowledgments

- [Deriv API](https://api.deriv.com) for market data
- Original Digit Hacker Tool for inspiration
- Open source community

---

## 📞 Support

- 📖 Read the [documentation](QUICKSTART.md)
- 🐛 Report [issues](https://github.com/juma-classic/digithackertool/issues)
- 💬 Join discussions
- ⭐ Star the repo: https://github.com/juma-classic/digithackertool

---

**Built with ❤️ for Deriv traders**

*Ready to deploy to production!*
