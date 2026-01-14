# 🚀 Quick Reference Card

## ⚡ Your App is LIVE!

### 🌐 Access URLs
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

### 🔑 Deriv Configuration
```
App ID: 82255
Callback: http://localhost:5000/auth/deriv/callback
```

---

## 📋 Quick Commands

### Start Servers
```bash
# Windows
start.bat

# macOS/Linux
./start.sh

# Manual
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
```

### Stop Servers
```bash
# Press Ctrl+C in each terminal
```

### Restart
```bash
# Stop both servers, then start again
```

---

## 🔐 Login Steps

1. **Get API Token:**
   - https://app.deriv.com/account/api-token
   - Create token: Read, Trade, Admin
   - Add callback: `http://localhost:5000/auth/deriv/callback`

2. **Login:**
   - Go to http://localhost:5173
   - Click "Login with Deriv"
   - Authorize app

3. **Done!**
   - Dashboard loads
   - Predictions start after 10+ ticks

---

## 📊 What You'll See

### Predictions
- 🟢 **EVEN/ODD** - Green/Purple badges
- 🔴 **OVER/UNDER** - Emerald/Red with runs
- 🟠 **DIGIT MATCH** - Orange with digit

### Symbols
- R_10, R_25, R_50, R_75, R_100

### Data
- Real-time ticks
- Live charts
- Statistics panels
- Confidence scores (55-95%)

---

## 🐛 Quick Fixes

### No predictions?
→ Wait 10-30 seconds

### OAuth fails?
→ Check callback URL

### Port in use?
→ Kill process and restart

### MongoDB error?
→ See MONGODB_SETUP.md

---

## 📚 Documentation

| Quick | Detailed |
|-------|----------|
| START_HERE.md | SETUP.md |
| SUCCESS.md | FEATURES.md |
| This file | PROJECT_SUMMARY.md |

---

## 🚀 Deploy to Production

1. Read: DEPLOYMENT.md
2. Follow: DEPLOYMENT_CHECKLIST.md
3. Time: ~45 minutes
4. Cost: Free tier available

---

## 💡 Pro Tips

✅ Wait for 30 ticks for best accuracy
✅ Compare multiple symbols
✅ Check confidence scores
✅ Monitor recommended runs
✅ Keep servers running

---

## 📞 Need Help?

1. Check SUCCESS.md
2. Read QUICKSTART.md
3. Review troubleshooting sections
4. Check server logs

---

## ✅ Status Check

**Servers Running:**
- Backend: ✅ Port 5000
- Frontend: ✅ Port 5173

**Configuration:**
- Deriv App ID: ✅ 82255
- Environment: ✅ Configured
- Dependencies: ✅ Installed

**Ready to Use:** ✅ YES!

---

**Access Now:** http://localhost:5173

🎉 **Happy Trading!**
