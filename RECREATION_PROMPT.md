# 🎯 Prompt to Recreate Digit Hacker Tool

Use this prompt with any AI coding assistant (Claude, ChatGPT, etc.) to recreate this entire project from scratch.

---

## 📋 The Prompt

```
I need you to build a complete, production-ready trading signal tool for Deriv's volatility indices. Here are the exact specifications:

## PROJECT OVERVIEW
Build a full-stack web application called "Digit Hacker Tool" that provides real-time trading signals for Deriv volatility indices by analyzing tick data patterns.

## CORE FEATURES

### 1. Real-time Tick Analysis
- Connect to Deriv WebSocket API (wss://ws.derivws.com/websockets/v3)
- Stream live tick data for multiple volatility indices simultaneously
- Maintain a rolling window of the last 30 ticks per symbol
- Support these symbols: R_10, R_25, R_50, R_75, R_100

### 2. Three Prediction Algorithms

**Even/Odd Prediction:**
- Extract the last digit from each tick price (e.g., 1234.567 → 7)
- Count even vs odd occurrences in the last 30 ticks
- Predict the majority pattern (EVEN or ODD)
- Calculate confidence: (max_count / total) * 100
- Clamp confidence between 55-95%
- Display with green badge for EVEN, purple badge for ODD

**Over/Under Prediction:**
- Define OVER range: digits [4, 5, 6, 7]
- Define UNDER range: digits [2, 3, 4, 5]
- Count occurrences in last 30 ticks
- Calculate ratio: over_count / (over_count + under_count)
- If ratio > 58%: Signal OVER with specific digit (5, 6, or 7 based on frequency)
- If ratio < 42%: Signal UNDER with specific digit (2, 3, or 4 based on frequency)
- Calculate confidence based on difference magnitude
- Recommend number of runs (5-15) based on confidence:
  - High confidence (>85%): 11-15 runs
  - Medium confidence (>55%): 8-13 runs
  - Lower confidence: 5-10 runs
- Display with emerald badge for OVER, red badge for UNDER

**Digit Match Prediction:**
- Count frequency of each digit (0-9) in last 30 ticks
- Identify the most frequently occurring digit
- Calculate confidence: (frequency / total) * 100
- Clamp to 55-95% range
- Display with orange badge

### 3. Visual Components
- Real-time line charts showing last 20 ticks (using Recharts)
- Color-coded digit display (green for even, purple for odd)
- Statistics panels showing even/odd counts and percentages
- Animated prediction cards with pulsing effects (using Framer Motion)
- Responsive grid layout for multiple symbols

### 4. User Authentication
- Deriv OAuth 2.0 integration
- Secure session management with express-session
- MongoDB for user data persistence
- Store user profile, account balances, and API tokens
- Support multiple Deriv accounts per user

## TECHNICAL STACK

### Backend (Node.js/Express)
- Express.js for REST API
- WebSocket (ws library) for Deriv API connection
- MongoDB with Mongoose for database
- Passport.js for OAuth authentication
- express-session for session management
- Helmet for security headers
- CORS for cross-origin requests
- Server-Sent Events (SSE) for streaming tick data to frontend

### Frontend (React/Vite)
- React 18 with hooks
- Vite as build tool
- TailwindCSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Lucide React for icons
- React Router v6 for routing

## PROJECT STRUCTURE

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── models/
│   │   │   └── User.js              # User schema with accounts, tokens, balances
│   │   ├── routes/
│   │   │   ├── auth.js              # OAuth endpoints
│   │   │   ├── user.js              # User profile, balances
│   │   │   └── ticks.js             # Tick streaming (SSE)
│   │   ├── services/
│   │   │   └── derivAPI.js          # Deriv WebSocket client
│   │   └── server.js                # Express app entry point
│   ├── .env.example
│   ├── package.json
│   └── render.yaml                  # Render.com deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictionCard.jsx   # Main prediction display
│   │   │   ├── StatsPanel.jsx       # Even/odd statistics
│   │   │   └── TickChart.jsx        # Line chart component
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Login page with features
│   │   │   └── Dashboard.jsx        # Main dashboard with predictions
│   │   ├── utils/
│   │   │   └── predictions.js       # All three prediction algorithms
│   │   ├── App.jsx                  # Main app with routing
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # TailwindCSS imports
│   ├── public/
│   │   └── _redirects               # SPA routing for deployment
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json                  # Vercel deployment config
│   └── netlify.toml                 # Netlify deployment config
│
├── README.md
├── QUICKSTART.md
├── DEPLOYMENT.md
├── start.sh                         # Unix startup script
└── start.bat                        # Windows startup script
```

## DETAILED IMPLEMENTATION REQUIREMENTS

### Backend API Endpoints

**Authentication:**
- GET /auth/deriv - Initiate OAuth flow
- GET /auth/deriv/callback - OAuth callback handler
- GET /auth/me - Get current user
- POST /auth/logout - Logout user

**User:**
- GET /user/profile - Get user profile
- GET /user/balances - Fetch all account balances from Deriv

**Ticks:**
- GET /ticks/symbols - List available symbols
- GET /ticks/stream/:symbol - Stream tick data via SSE

### Frontend Pages

**Landing Page:**
- Modern gradient background (gray-900 to black)
- Large heading with gradient text (blue-400 to purple-500)
- Feature cards with icons (Zap, TrendingUp, BarChart3, Shield)
- "Login with Deriv" button with hover effects
- Fully responsive design

**Dashboard:**
- Header with user email and logout button
- Grid layout for prediction cards (3 columns on desktop)
- Each card shows:
  - Symbol name
  - Even/Odd prediction with confidence
  - Over/Under signal with recommended runs
  - Digit Match prediction
  - Statistics panel (even count, odd count, total ticks)
  - Line chart of last 20 ticks
  - Color-coded digit display
- Real-time updates every 1-2 seconds

### Prediction Algorithm Implementation

**File: frontend/src/utils/predictions.js**

```javascript
// Helper: Extract last digit
const getLastDigit = (quote) => Math.floor(quote * 10) % 10;

// Helper: Clamp confidence
const clampConfidence = (value) => Math.max(55, Math.min(95, Math.round(value)));

// Helper: Calculate recommended runs
const calculateRecommendedRuns = (confidence) => {
  const normalized = (confidence - 85) / 14;
  if (normalized > 0.85) return Math.floor(Math.random() * 5) + 11;
  if (normalized > 0.55) return Math.floor(Math.random() * 6) + 8;
  return Math.floor(Math.random() * 6) + 5;
};

// Even/Odd Analysis
export const analyzeEvenOdd = (ticks) => {
  if (!ticks || ticks.length < 10) return null;
  const digits = ticks.map(t => getLastDigit(t.quote)).slice(-30);
  const evenCount = digits.filter(d => d % 2 === 0).length;
  const oddCount = digits.length - evenCount;
  const prediction = evenCount > oddCount ? 'EVEN' : 'ODD';
  const ratio = Math.max(evenCount, oddCount) / digits.length;
  const confidence = clampConfidence(ratio * 100);
  return { prediction, confidence };
};

// Over/Under Analysis
export const analyzeOverUnder = (ticks) => {
  if (!ticks || ticks.length < 10) return null;
  const digits = ticks.map(t => getLastDigit(t.quote)).slice(-30);
  const OVER_RANGE = [4, 5, 6, 7];
  const UNDER_RANGE = [2, 3, 4, 5];
  const overCount = digits.filter(d => OVER_RANGE.includes(d)).length;
  const underCount = digits.filter(d => UNDER_RANGE.includes(d)).length;
  const totalRelevant = overCount + underCount;
  
  if (totalRelevant === 0) {
    const prediction = Math.random() > 0.5 ? 'OVER' : 'UNDER';
    const digit = prediction === 'OVER' ? 6 : 3;
    return { prediction, label: `${prediction} ${digit}`, confidence: 55, recommendedRuns: 5 };
  }
  
  const overRatio = overCount / totalRelevant;
  let prediction = 'NEUTRAL';
  let digit = null;
  
  if (overRatio > 0.58) {
    prediction = 'OVER';
    digit = overCount > 18 ? 7 : overCount > 13 ? 6 : 5;
  } else if (overRatio < 0.42) {
    prediction = 'UNDER';
    digit = underCount > 18 ? 2 : underCount > 13 ? 3 : 4;
  }
  
  if (prediction === 'NEUTRAL') return null;
  
  const difference = Math.abs(overCount - underCount);
  const confidenceRaw = (difference / digits.length) * 100;
  const confidence = clampConfidence(confidenceRaw);
  const recommendedRuns = calculateRecommendedRuns(confidence);
  
  return { prediction, label: `${prediction} ${digit}`, confidence, recommendedRuns };
};

// Digit Match Analysis
export const analyzeDigitMatch = (ticks) => {
  if (!ticks || ticks.length < 10) return null;
  const digits = ticks.map(t => getLastDigit(t.quote)).slice(-30);
  const frequency = {};
  digits.forEach(d => frequency[d] = (frequency[d] || 0) + 1);
  
  let maxCount = 0;
  let prediction = 0;
  Object.entries(frequency).forEach(([digit, count]) => {
    if (count > maxCount) {
      maxCount = count;
      prediction = parseInt(digit);
    }
  });
  
  const confidenceRaw = (maxCount / digits.length) * 100;
  const confidence = clampConfidence(confidenceRaw);
  return { prediction, confidence };
};
```

## STYLING REQUIREMENTS

### Color Scheme
- Background: Gradient from gray-900 via black to gray-800
- Primary: Blue-400 to purple-500 gradient
- Even: Green-400/500
- Odd: Purple-400/500
- Over: Emerald-400/500
- Under: Red-400/500
- Digit Match: Orange-400

### UI Components
- Glassmorphism: bg-white/10 with backdrop-blur-xl
- Borders: border-white/20
- Rounded corners: rounded-2xl for cards
- Shadows: shadow-xl, shadow-2xl
- Animations: Pulsing scale effect for active predictions

## DEPLOYMENT CONFIGURATIONS

### Environment Variables

**Backend (.env):**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
DERIV_APP_ID=your_app_id
DERIV_CALLBACK_URL=https://your-backend.com/auth/deriv/callback
SESSION_SECRET=random_64_char_string
FRONTEND_URL=https://your-frontend.com
DERIV_WS_URL=wss://ws.derivws.com/websockets/v3?app_id=
```

**Frontend (.env):**
```
VITE_API_URL=https://your-backend.com
VITE_DERIV_APP_ID=your_app_id
```

### Deployment Configs

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**netlify.toml:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
[build]
  command = "npm run build"
  publish = "dist"
```

**render.yaml (backend):**
```yaml
services:
  - type: web
    name: digit-hacker-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
```

## DOCUMENTATION TO CREATE

1. **README.md** - Project overview, features, tech stack, quick start
2. **QUICKSTART.md** - 5-minute setup guide
3. **DEPLOYMENT.md** - Production deployment guide (Render + Vercel)
4. **FEATURES.md** - Detailed feature documentation
5. **SETUP.md** - Detailed installation instructions
6. **start.sh** - Unix startup script for both servers
7. **start.bat** - Windows startup script for both servers

## CRITICAL REQUIREMENTS

1. **Code Quality:**
   - Clean, readable code with comments
   - Proper error handling
   - Graceful fallbacks (e.g., MongoDB connection failure)
   - Security best practices (Helmet, CORS, session security)

2. **Performance:**
   - Efficient WebSocket connection management
   - Rolling window to prevent memory leaks
   - Optimized React re-renders
   - Debounced prediction calculations

3. **User Experience:**
   - Smooth animations (60fps)
   - Loading states ("Collecting data...")
   - Real-time updates without lag
   - Mobile-responsive design
   - Clear visual feedback

4. **Production Ready:**
   - Environment variable templates
   - Deployment configurations for multiple platforms
   - Comprehensive documentation
   - Startup scripts for easy local development
   - Git-ready with proper .gitignore

## TESTING CHECKLIST

After building, verify:
- [ ] Backend connects to MongoDB
- [ ] Backend connects to Deriv WebSocket
- [ ] Frontend loads landing page
- [ ] OAuth login flow works
- [ ] Dashboard shows 5 symbols
- [ ] Tick data streams in real-time
- [ ] Predictions appear after 10+ ticks
- [ ] All three prediction types work
- [ ] Charts render correctly
- [ ] Animations are smooth
- [ ] Logout works
- [ ] Mobile responsive
- [ ] Production build succeeds
- [ ] Deployment configs work

## DELIVERABLES

Provide:
1. Complete source code for backend and frontend
2. All configuration files (.env.example, vercel.json, etc.)
3. Comprehensive documentation (7+ markdown files)
4. Startup scripts (start.sh, start.bat)
5. Deployment configurations for Render, Vercel, Netlify
6. Git-ready project structure with .gitignore

Build this as a production-ready, professional application that can be deployed immediately and used by real traders.
```

---

## 🎯 How to Use This Prompt

### With Claude (Anthropic)
1. Start a new conversation
2. Paste the entire prompt above
3. Claude will build the complete project step by step

### With ChatGPT (OpenAI)
1. Use GPT-4 or GPT-4 Turbo
2. Paste the prompt
3. May need to ask for specific files if it doesn't generate everything

### With GitHub Copilot
1. Create project structure manually
2. Use prompt sections as comments in files
3. Let Copilot generate the code

### With Cursor AI
1. Create new project
2. Use prompt in chat
3. Cursor will generate files directly

---

## 📝 Tips for Best Results

### 1. Be Specific About What You Want First
Start with: "I want you to build the backend first, then frontend"

### 2. Ask for Files Individually if Needed
"Now create the backend/src/services/derivAPI.js file"

### 3. Request Documentation Last
"Now create all the documentation files (README, QUICKSTART, etc.)"

### 4. Verify Each Component
Test each part before moving to the next

### 5. Ask for Fixes
If something doesn't work: "The WebSocket connection is failing, fix it"

---

## 🔄 Variations of the Prompt

### Minimal Version (Quick Build)
```
Build a Deriv trading signal tool with:
- Backend: Node.js/Express, MongoDB, Deriv WebSocket
- Frontend: React/Vite, TailwindCSS, Framer Motion
- Features: Even/Odd, Over/Under, Digit Match predictions
- Real-time tick streaming and analysis
- OAuth authentication
- Production-ready with deployment configs
```

### Detailed Version (Step by Step)
```
I need a trading signal tool. Let's build it step by step:

Step 1: Create backend structure with Express, MongoDB, and Deriv WebSocket integration
Step 2: Implement three prediction algorithms (Even/Odd, Over/Under, Digit Match)
Step 3: Build React frontend with real-time dashboard
Step 4: Add authentication with Deriv OAuth
Step 5: Create deployment configurations
Step 6: Write comprehensive documentation

Start with Step 1.
```

### Feature-Focused Version
```
Build a tool that:
1. Connects to Deriv WebSocket API
2. Analyzes last 30 ticks for patterns
3. Predicts Even/Odd with 55-95% confidence
4. Predicts Over/Under with recommended runs
5. Shows most frequent digit
6. Displays real-time charts and statistics
7. Has beautiful animated UI
8. Is production-ready

Use: Node.js, React, MongoDB, TailwindCSS, Framer Motion
```

---

## 🎨 Customization Ideas

### Add These to the Prompt for Variations:

**Different Trading Pairs:**
```
Also support forex pairs: EUR/USD, GBP/USD, USD/JPY
```

**Additional Predictions:**
```
Add a fourth prediction: High/Low (predicts if next tick will be higher or lower)
```

**More Visualizations:**
```
Add candlestick charts and heatmaps for digit frequency
```

**Mobile App:**
```
Also create a React Native mobile app version
```

**Advanced Features:**
```
Add trade history tracking, win/loss statistics, and strategy backtesting
```

---

## 📦 What You'll Get

Using this prompt, you'll receive:

1. **Complete Backend** (~10 files)
   - Express server
   - MongoDB models
   - Deriv API integration
   - Authentication system
   - API routes

2. **Complete Frontend** (~15 files)
   - React components
   - Prediction algorithms
   - Beautiful UI
   - Charts and animations
   - Responsive design

3. **Configuration Files** (~10 files)
   - Environment templates
   - Deployment configs
   - Build configurations
   - Git files

4. **Documentation** (~7 files)
   - README
   - Setup guides
   - Deployment guides
   - Feature docs

5. **Scripts** (~2 files)
   - Startup scripts
   - Build scripts

**Total: ~44 files, 10,000+ lines of code**

---

## ⚡ Quick Recreation Steps

1. **Copy the main prompt** (the big code block above)
2. **Paste into your AI assistant**
3. **Wait for generation** (5-10 minutes)
4. **Test locally** (npm install, npm run dev)
5. **Deploy** (Render + Vercel)
6. **Done!** 🎉

---

## 🎓 Learning from This

This prompt teaches:
- Full-stack development
- WebSocket integration
- Real-time data processing
- Pattern recognition algorithms
- OAuth authentication
- Production deployment
- Professional documentation

---

**Save this prompt and use it anytime to recreate the tool!**

*Perfect for learning, teaching, or building similar projects.*
