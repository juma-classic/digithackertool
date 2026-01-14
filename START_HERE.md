# 🚀 START HERE - Your App is Ready!

## ✅ What's Done

1. ✅ **Dependencies Installed**
   - Backend: 107 packages installed
   - Frontend: 175 packages installed

2. ✅ **Environment Configured**
   - Deriv App ID: **80437**
   - Backend: `backend/.env`
   - Frontend: `frontend/.env`

3. ✅ **Ready to Run**
   - All code in place
   - Configuration complete

---

## 🎯 Next Steps

### Step 1: Start MongoDB

**Option A - If you have MongoDB installed:**
```bash
# macOS/Linux
mongod

# Windows
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

**Option B - Use MongoDB Atlas (Cloud - Free):**
1. Go to https://cloud.mongodb.com
2. Create free account
3. Create cluster (M0 Free)
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digit-hacker
   ```

**Option C - Skip MongoDB for now (will cause errors but app will start):**
- The app will try to connect but fail gracefully
- You can still test the frontend

---

### Step 2: Get Your Deriv API Token

1. **Login to Deriv:**
   - Go to https://app.deriv.com
   - Login with your account

2. **Generate API Token:**
   - Go to https://app.deriv.com/account/api-token
   - Click "Create new token"
   - Name: "Digit Hacker Tool"
   - Scopes: ✅ Read, ✅ Trade, ✅ Admin
   - Click "Create"
   - **Copy the token** (you'll need it when you login)

3. **Configure OAuth Callback:**
   - In the same page, find your app (ID: 80437)
   - Add redirect URL: `http://localhost:5000/auth/deriv/callback`
   - Save

---

### Step 3: Start the Application

**Windows (Easiest):**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Manual Start (if scripts don't work):**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

---

### Step 4: Access the App

1. **Open Browser:**
   - Go to: http://localhost:5173

2. **Login:**
   - Click "Login with Deriv"
   - Authorize the application
   - You'll be redirected to the dashboard

3. **Watch the Magic:**
   - Tick data will start streaming
   - After 10+ ticks, predictions will appear
   - See Even/Odd, Over/Under, and Digit Match signals

---

## 🔍 Verify Everything Works

### Backend Health Check
```bash
# In a new terminal
curl http://localhost:5000/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Check Logs
- Backend terminal should show:
  - ✅ "MongoDB connected" (if MongoDB is running)
  - ✅ "Server running on port 5000"
  - ✅ "Connected to Deriv WebSocket"

- Frontend terminal should show:
  - ✅ "VITE ready in XXXms"
  - ✅ "Local: http://localhost:5173"

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB or use MongoDB Atlas (see Step 1)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill
```

### Deriv OAuth Error
```
Error: Invalid callback URL
```
**Solution:** 
- Go to https://app.deriv.com/account/api-token
- Add callback URL: `http://localhost:5000/auth/deriv/callback`

### No Predictions Showing
- Wait for at least 10 ticks (about 10-30 seconds)
- Check browser console (F12) for errors
- Verify WebSocket connection in Network tab

---

## 📊 What You'll See

### Landing Page
- Modern gradient design
- "Login with Deriv" button
- Feature highlights

### Dashboard (After Login)
- 5 Volatility Indices (R_10, R_25, R_50, R_75, R_100)
- Real-time tick streaming
- Predictions with confidence scores:
  - 🟢 **EVEN/ODD** - Green/Purple badges
  - 🔴 **OVER/UNDER** - Emerald/Red badges with recommended runs
  - 🟠 **DIGIT MATCH** - Orange badge with most frequent digit
- Live charts showing last 20 ticks
- Statistics panels

---

## 🎮 Test the Features

1. **Watch Tick Streaming:**
   - Numbers should update every 1-2 seconds
   - "Collecting data..." message appears initially

2. **See Predictions:**
   - After 10+ ticks, prediction cards fill in
   - Confidence percentages show (55-95%)
   - Recommended runs appear (5-15)

3. **Check Animations:**
   - Prediction badges pulse/animate
   - Charts update smoothly
   - Stats panels show real-time counts

4. **Test Logout:**
   - Click "Logout" button
   - Should redirect to landing page
   - Can login again

---

## 🚀 Deploy to Production

When ready to deploy:
1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Follow [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Deploy backend to Render.com
4. Deploy frontend to Vercel
5. Use MongoDB Atlas for database

**Estimated time:** 30-45 minutes
**Cost:** Free tier available ($0/month)

---

## 📞 Need Help?

### Check These First:
1. ✅ MongoDB is running
2. ✅ Both terminals show no errors
3. ✅ Ports 5000 and 5173 are free
4. ✅ Deriv API token is valid
5. ✅ Internet connection is stable

### Common Issues:
- **Can't connect to MongoDB:** Use MongoDB Atlas (cloud)
- **OAuth fails:** Check callback URL in Deriv settings
- **No data streaming:** Check Deriv API status
- **Build errors:** Delete node_modules and reinstall

---

## 🎉 You're All Set!

Your Digit Hacker Tool is ready to use. Start the servers and begin analyzing Deriv volatility indices!

**Quick Commands:**
```bash
# Start everything (Windows)
start.bat

# Start everything (macOS/Linux)
./start.sh

# Or manually:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

**Access:** http://localhost:5173

---

*Built with ❤️ for Deriv traders*
