# MongoDB Setup Guide

You have 3 options to get MongoDB running:

## Option 1: MongoDB Atlas (Recommended - Free & Easy)

**Best for:** Quick start, no installation needed

1. **Create Account:**
   - Go to https://cloud.mongodb.com
   - Sign up (free)

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose **FREE** tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Create Database User:**
   - Security → Database Access
   - Add New User
   - Username: `digithacker`
   - Password: Generate secure password (save it!)
   - Role: Read and write to any database

4. **Allow Network Access:**
   - Security → Network Access
   - Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://digithacker:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Update Backend .env:**
   ```env
   MONGODB_URI=mongodb+srv://digithacker:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/digit-hacker?retryWrites=true&w=majority
   ```
   Replace:
   - `YOUR_PASSWORD` with your actual password
   - `cluster0.xxxxx` with your cluster address
   - Add `/digit-hacker` before the `?` to specify database name

**Time:** 5-10 minutes
**Cost:** Free forever (512MB storage)

---

## Option 2: Install MongoDB Locally

**Best for:** Development, offline work

### Windows

1. **Download:**
   - Go to https://www.mongodb.com/try/download/community
   - Select Windows
   - Download MSI installer

2. **Install:**
   - Run installer
   - Choose "Complete" installation
   - Install as Windows Service (recommended)
   - Install MongoDB Compass (GUI tool)

3. **Verify:**
   ```bash
   mongod --version
   ```

4. **Start Service:**
   - MongoDB should auto-start as Windows Service
   - Or manually: Services → MongoDB → Start

5. **Connection String:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/digit-hacker
   ```

### macOS

**Using Homebrew:**
```bash
# Install
brew tap mongodb/brew
brew install mongodb-community

# Start
brew services start mongodb-community

# Verify
mongod --version
```

**Connection String:**
```env
MONGODB_URI=mongodb://localhost:27017/digit-hacker
```

### Linux (Ubuntu/Debian)

```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongod --version
```

**Connection String:**
```env
MONGODB_URI=mongodb://localhost:27017/digit-hacker
```

---

## Option 3: Run Without MongoDB (Testing Only)

**Best for:** Quick testing, no persistence needed

The app will run but:
- ❌ User sessions won't persist
- ❌ Account data won't be saved
- ❌ Need to re-login after restart
- ✅ Tick streaming works
- ✅ Predictions work
- ✅ UI fully functional

**No setup needed** - just start the app!

---

## Verify MongoDB Connection

### Test Connection String

**Using mongosh (MongoDB Shell):**
```bash
mongosh "your_connection_string_here"
```

**Using Node.js:**
```javascript
// test-connection.js
import mongoose from 'mongoose';

mongoose.connect('your_connection_string_here')
  .then(() => console.log('✅ Connected!'))
  .catch(err => console.error('❌ Failed:', err));
```

### Check Backend Logs

When you start the backend, you should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

If you see:
```
⚠️  MongoDB connection failed
⚠️  Running without database
```
Then check your connection string.

---

## Troubleshooting

### "Connection refused"
- **Local:** MongoDB service not running
  - Windows: Check Services
  - macOS: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

### "Authentication failed"
- Check username/password in connection string
- Verify user has correct permissions in Atlas

### "Network timeout"
- **Atlas:** Check IP whitelist (0.0.0.0/0)
- Check firewall settings
- Verify internet connection

### "Database not found"
- MongoDB creates database automatically
- Just ensure database name is in connection string

---

## Recommended: MongoDB Atlas

For this project, I recommend **MongoDB Atlas** because:
- ✅ No installation needed
- ✅ Works immediately
- ✅ Free tier is generous
- ✅ Automatic backups
- ✅ Works from anywhere
- ✅ Same connection string for dev and production

**Setup time:** 5 minutes
**Cost:** $0

---

## Quick Start Commands

After MongoDB is ready:

```bash
# Start backend (will connect to MongoDB)
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev
```

Access: http://localhost:5173

---

## Need Help?

1. **MongoDB Atlas Issues:**
   - Check https://docs.atlas.mongodb.com
   - Verify IP whitelist
   - Check user permissions

2. **Local MongoDB Issues:**
   - Check service is running
   - Verify port 27017 is free
   - Check logs: `/var/log/mongodb/mongod.log`

3. **Connection String Issues:**
   - Ensure no spaces
   - Check password special characters (URL encode)
   - Verify database name is included

---

**Recommendation:** Use MongoDB Atlas for fastest setup!
