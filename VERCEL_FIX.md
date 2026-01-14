# 🔧 Fixing Vercel Build Error

## Error
```
sh: line 1: vite: command not found
Error: Command "vite build" exited with 127
```

## Problem
Vercel is trying to run `vite build` directly instead of using the npm script `npm run build`.

## ✅ Solution Applied

Updated `frontend/vercel.json` to explicitly tell Vercel:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`

## 🚀 Vercel Configuration

### Option 1: Using vercel.json (Already Done)

File: `frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option 2: Configure in Vercel Dashboard

If vercel.json doesn't work, configure directly in Vercel:

1. **Go to Project Settings:**
   - https://vercel.com/your-username/your-project/settings

2. **Build & Development Settings:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Root Directory:**
   - Set to: `frontend`

4. **Save and Redeploy**

## 📁 Project Structure for Vercel

Since your project has both backend and frontend:

### Method 1: Deploy Frontend Only (Recommended)

**In Vercel Dashboard:**
1. Root Directory: `frontend`
2. Build Command: `npm run build`
3. Output Directory: `dist`

### Method 2: Monorepo Setup

**File:** `vercel.json` (in project root)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

## 🔍 Verify package.json

Make sure `frontend/package.json` has the build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

✅ Already correct in your project!

## 🚀 Deploy Steps

### Quick Fix (Recommended):

1. **Push the updated vercel.json:**
   ```bash
   git add frontend/vercel.json VERCEL_FIX.md
   git commit -m "Fix: Update Vercel build configuration"
   git push
   ```

2. **Trigger Redeploy in Vercel:**
   - Go to Vercel Dashboard
   - Click "Redeploy" on latest deployment
   - Or wait for auto-deploy from git push

### Alternative: Configure in Dashboard

If the above doesn't work:

1. **Go to Vercel Project Settings**
2. **General → Root Directory:**
   - Set to: `frontend`
   - Save

3. **Build & Development Settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Save

4. **Redeploy:**
   - Deployments → Latest → Redeploy

## 🐛 Troubleshooting

### Build Still Fails?

**Check Node Version:**
- Vercel default: Node 18.x
- Your project needs: Node 18+
- ✅ Should be compatible

**Check Build Logs:**
1. Go to Vercel Dashboard
2. Click on failed deployment
3. View build logs
4. Look for specific error

**Common Issues:**

1. **Wrong Root Directory:**
   - Should be: `frontend`
   - Not: `.` (project root)

2. **Missing Dependencies:**
   - Check `frontend/package.json` includes all deps
   - Run locally: `cd frontend && npm install && npm run build`

3. **Environment Variables:**
   - Add in Vercel Dashboard → Settings → Environment Variables
   - `VITE_API_URL`
   - `VITE_DERIV_APP_ID`

## ✅ Expected Build Output

Successful build should show:
```
> npm run build

> digit-hacker-frontend@1.0.0 build
> vite build

vite v5.4.21 building for production...
✓ 175 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-xxxxx.css      xx.xx kB │ gzip: xx.xx kB
dist/assets/index-xxxxx.js      xxx.xx kB │ gzip: xx.xx kB
✓ built in 2.34s
```

## 🎯 Quick Checklist

- [x] ✅ `vercel.json` updated with buildCommand
- [x] ✅ `package.json` has build script
- [ ] ⏳ Committed and pushed to GitHub
- [ ] ⏳ Vercel auto-deploys or manual redeploy
- [ ] ⏳ Build succeeds
- [ ] ⏳ App loads without 404

## 📝 Vercel Dashboard Settings

**Recommended Settings:**

```
Project Settings:
├── General
│   ├── Root Directory: frontend
│   └── Node.js Version: 18.x
├── Build & Development
│   ├── Framework: Vite
│   ├── Build Command: npm run build
│   ├── Output Directory: dist
│   └── Install Command: npm install
└── Environment Variables
    ├── VITE_API_URL: https://your-backend.onrender.com
    └── VITE_DERIV_APP_ID: 80437
```

## 🔄 After Fix

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Fix: Configure Vercel build settings"
   git push
   ```

2. **Wait for auto-deploy** (1-2 minutes)

3. **Check build logs** in Vercel Dashboard

4. **Test deployed app**

## 📞 Still Having Issues?

**Check these:**
1. Root directory is set to `frontend` in Vercel
2. Build command is `npm run build` (not `vite build`)
3. Output directory is `dist`
4. Node version is 18.x or higher
5. All dependencies are in `package.json`

**Get build logs:**
```bash
# In Vercel Dashboard
Deployments → Click failed deployment → View Function Logs
```

---

**✅ Fix Applied!**

Push the changes and Vercel should build successfully!
