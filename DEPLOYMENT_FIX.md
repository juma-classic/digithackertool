# 🔧 Fixing 404 Error on Deployed Version

## Problem

You're seeing a **404 NOT_FOUND** error on your deployed version, but it works locally.

**Cause:** Single Page Applications (SPAs) like React need special server configuration to handle client-side routing. When you refresh or directly access a route like `/dashboard`, the server looks for a file at that path instead of serving `index.html`.

---

## ✅ Solutions by Platform

### 1. Vercel (Recommended)

**File:** `frontend/vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend-url.onrender.com/$1"
    }
  ]
}
```

**Steps:**
1. ✅ File already created in your project
2. Update `your-backend-url.onrender.com` with your actual backend URL
3. Commit and push:
   ```bash
   git add frontend/vercel.json
   git commit -m "Fix: Add Vercel SPA routing configuration"
   git push
   ```
4. Vercel will auto-deploy with the fix

---

### 2. Netlify

**File:** `frontend/netlify.toml`

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

**Steps:**
1. ✅ File already created in your project
2. Commit and push:
   ```bash
   git add frontend/netlify.toml
   git commit -m "Fix: Add Netlify SPA routing configuration"
   git push
   ```
3. Netlify will auto-deploy with the fix

---

### 3. Cloudflare Pages

**File:** `frontend/public/_redirects`

```
/* /index.html 200
```

**Steps:**
1. ✅ File already created in your project
2. Commit and push:
   ```bash
   git add frontend/public/_redirects
   git commit -m "Fix: Add Cloudflare Pages SPA routing"
   git push
   ```

---

### 4. GitHub Pages

**Option A:** Use HashRouter instead of BrowserRouter

Update `frontend/src/App.jsx`:
```jsx
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // ... rest of code
  return (
    <HashRouter> {/* Changed from BrowserRouter */}
      <Routes>
        {/* ... routes */}
      </Routes>
    </HashRouter>
  );
}
```

**Option B:** Add 404.html
```bash
cp frontend/dist/index.html frontend/dist/404.html
```

---

### 5. Custom Server (Apache)

**File:** `frontend/public/.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

---

### 6. Custom Server (Nginx)

**File:** `nginx.conf`

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /var/www/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## 🚀 Quick Fix Steps

### If Deployed on Vercel:

1. **Update vercel.json with your backend URL:**
   ```bash
   # Edit frontend/vercel.json
   # Replace "your-backend-url.onrender.com" with actual URL
   ```

2. **Commit and push:**
   ```bash
   git add frontend/vercel.json
   git commit -m "Fix: Configure Vercel for SPA routing"
   git push
   ```

3. **Wait for auto-deploy** (1-2 minutes)

4. **Test:** Visit your deployed URL

---

### If Deployed on Netlify:

1. **Commit and push:**
   ```bash
   git add frontend/netlify.toml
   git commit -m "Fix: Configure Netlify for SPA routing"
   git push
   ```

2. **Wait for auto-deploy** (1-2 minutes)

3. **Test:** Visit your deployed URL

---

## 🔍 Verify the Fix

After deploying:

1. **Visit root URL:** `https://your-app.vercel.app/`
   - Should show landing page ✅

2. **Visit dashboard directly:** `https://your-app.vercel.app/dashboard`
   - Should show dashboard (or redirect to login) ✅
   - Should NOT show 404 ❌

3. **Refresh on dashboard:**
   - Should stay on dashboard ✅
   - Should NOT show 404 ❌

---

## 🐛 Still Getting 404?

### Check Build Output

1. **Verify dist folder structure:**
   ```bash
   cd frontend
   npm run build
   ls dist/
   ```
   Should see: `index.html`, `assets/`, etc.

2. **Check build command in deployment:**
   - Vercel: Should be `npm run build`
   - Output directory: `dist`

### Check Environment Variables

1. **Verify in deployment dashboard:**
   - `VITE_API_URL` is set
   - `VITE_DERIV_APP_ID` is set

2. **Rebuild after adding env vars:**
   - Trigger manual redeploy

### Check Base Path

If deployed to a subdirectory (e.g., `example.com/app/`):

Update `frontend/vite.config.js`:
```js
export default defineConfig({
  base: '/app/', // Add this line
  plugins: [react()],
  // ... rest
});
```

---

## 📝 Common Mistakes

### ❌ Wrong:
- Deploying without SPA configuration
- Using wrong output directory
- Missing environment variables
- Wrong base path

### ✅ Correct:
- SPA routing configured (vercel.json, netlify.toml, etc.)
- Output directory: `dist`
- Environment variables set
- Base path matches deployment URL

---

## 🎯 Platform-Specific Notes

### Vercel
- ✅ Auto-detects Vite projects
- ✅ Auto-installs dependencies
- ✅ Auto-deploys on git push
- ⚠️ Needs vercel.json for SPA routing

### Netlify
- ✅ Auto-detects build command
- ✅ Supports _redirects file
- ✅ Supports netlify.toml
- ⚠️ Check publish directory is `dist`

### Render
- ⚠️ Static sites need manual configuration
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add rewrite rule in dashboard

---

## 🔄 After Fixing

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Fix: Add SPA routing configuration for deployment"
   git push
   ```

2. **Wait for auto-deploy**

3. **Test all routes:**
   - `/` - Landing page
   - `/dashboard` - Dashboard
   - Refresh on any page

4. **Verify no 404 errors**

---

## 📞 Need More Help?

**Check deployment logs:**
- Vercel: Dashboard → Deployments → View logs
- Netlify: Dashboard → Deploys → Deploy log

**Common issues:**
- Build fails: Check Node version (should be 18+)
- 404 persists: Check SPA config file is in correct location
- API errors: Check backend URL in environment variables

---

**✅ Files Created:**
- `frontend/vercel.json` - Vercel configuration
- `frontend/netlify.toml` - Netlify configuration
- `frontend/public/_redirects` - Cloudflare Pages configuration

**Next:** Commit and push these files to fix the 404 error!
