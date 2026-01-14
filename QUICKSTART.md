# Quick Start Guide

Get the Digit Hacker Tool running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- MongoDB ([Download](https://www.mongodb.com/try/download/community))
- Deriv account ([Sign up](https://deriv.com))

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/digit-hacker-tool.git
cd digit-hacker-tool

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Get Deriv API Credentials

1. Login to Deriv: https://app.deriv.com
2. Go to Settings → API Token
3. Create a new token with these scopes:
   - ✅ Read
   - ✅ Trade
   - ✅ Admin
4. Copy your **App ID** and **API Token**

## Step 3: Configure Environment

### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digit-hacker
DERIV_APP_ID=YOUR_APP_ID_HERE
SESSION_SECRET=your_random_secret_here
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_DERIV_APP_ID=YOUR_APP_ID_HERE
```

## Step 4: Start MongoDB

**macOS/Linux:**
```bash
mongod
```

**Windows:**
```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

Or use MongoDB Compass to start the service.

## Step 5: Run the Application

### Option A: Automated Start (Recommended)

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
start.bat
```

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 6: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

Click **"Login with Deriv"** and authorize the application.

## Verify It's Working

You should see:
1. ✅ Login page loads
2. ✅ Deriv OAuth redirects successfully
3. ✅ Dashboard shows 5 volatility indices
4. ✅ Tick data starts streaming
5. ✅ Predictions appear after 10+ ticks

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
ps aux | grep mongod  # macOS/Linux
tasklist | findstr mongod  # Windows

# Start MongoDB if not running
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill  # macOS/Linux
netstat -ano | findstr :5000  # Windows (note PID, then: taskkill /PID <pid> /F)

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill  # macOS/Linux
netstat -ano | findstr :5173  # Windows
```

### Deriv OAuth Error
- Verify App ID is correct in both `.env` files
- Check API token has required scopes
- Ensure callback URL is configured in Deriv app settings

### No Predictions Showing
- Wait for at least 10 ticks to accumulate
- Check browser console for errors
- Verify WebSocket connection in Network tab

## Next Steps

- Read [FEATURES.md](FEATURES.md) for detailed feature documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [SETUP.md](SETUP.md) for advanced configuration

## Common Commands

```bash
# Backend
cd backend
npm run dev          # Development mode with auto-reload
npm start            # Production mode

# Frontend
cd frontend
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database
mongosh              # MongoDB shell
mongodump            # Backup database
mongorestore         # Restore database
```

## Support

Having issues? Check:
1. All dependencies are installed
2. MongoDB is running
3. Environment variables are set correctly
4. Ports 5000 and 5173 are available
5. Deriv API credentials are valid

Still stuck? Open an issue on GitHub with:
- Error messages
- Console logs
- Environment details (OS, Node version)
