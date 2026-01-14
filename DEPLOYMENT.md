# Production Deployment Guide

## Overview

This guide covers deploying the Digit Hacker Tool to production using:
- **Backend**: Render.com (or Railway)
- **Frontend**: Vercel (or Netlify)
- **Database**: MongoDB Atlas

## Prerequisites

- GitHub account
- Render.com account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)
- Deriv API credentials

---

## Part 1: MongoDB Atlas Setup

1. **Create Account**
   - Go to https://cloud.mongodb.com
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to your users
   - Name: `digit-hacker-cluster`

3. **Configure Access**
   - Database Access → Add New User
   - Username: `digit-hacker-admin`
   - Password: Generate secure password (save it!)
   - Role: Atlas Admin
   
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0` (for production, restrict this)

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://digit-hacker-admin:<password>@cluster.xxxxx.mongodb.net/digit-hacker?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

---

## Part 2: Backend Deployment (Render)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/digit-hacker-tool.git
   git push -u origin main
   ```

2. **Create Render Service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `digit-hacker-backend`
     - Root Directory: `backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your_mongodb_atlas_connection_string>
   DERIV_APP_ID=<your_deriv_app_id>
   SESSION_SECRET=<generate_random_64_char_string>
   FRONTEND_URL=https://your-app.vercel.app
   DERIV_WS_URL=wss://ws.derivws.com/websockets/v3?app_id=
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://digit-hacker-backend.onrender.com`

---

## Part 3: Frontend Deployment (Vercel)

1. **Update vercel.json**
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://digit-hacker-backend.onrender.com/:path*"
       }
     ]
   }
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**
   ```
   VITE_API_URL=https://digit-hacker-backend.onrender.com
   VITE_DERIV_APP_ID=<your_deriv_app_id>
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Your app will be live at: `https://your-app.vercel.app`

---

## Part 4: Deriv OAuth Configuration

1. **Update Deriv App Settings**
   - Go to https://app.deriv.com/account/api-token
   - Edit your app
   - Add redirect URL:
     ```
     https://digit-hacker-backend.onrender.com/auth/deriv/callback
     ```

2. **Update Backend Environment**
   - In Render dashboard, update:
   ```
   DERIV_CALLBACK_URL=https://digit-hacker-backend.onrender.com/auth/deriv/callback
   ```

---

## Part 5: Testing

1. **Test Backend**
   ```bash
   curl https://digit-hacker-backend.onrender.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Test Frontend**
   - Visit your Vercel URL
   - Click "Login with Deriv"
   - Complete OAuth flow
   - Verify predictions are loading

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check connection string is correct
- Verify IP whitelist includes `0.0.0.0/0`
- Check username/password

**Deriv API Errors**
- Verify App ID is correct
- Check callback URL matches exactly
- Ensure API token has required scopes

**CORS Errors**
- Update FRONTEND_URL in backend env vars
- Restart backend service

### Frontend Issues

**API Calls Failing**
- Check vercel.json rewrites
- Verify backend URL is correct
- Check browser console for errors

**OAuth Not Working**
- Verify DERIV_CALLBACK_URL in backend
- Check Deriv app settings
- Ensure redirect URL is whitelisted

---

## Monitoring & Maintenance

### Render Dashboard
- Monitor logs for errors
- Check resource usage
- Set up alerts

### Vercel Dashboard
- Monitor build logs
- Check analytics
- Review error reports

### MongoDB Atlas
- Monitor database size
- Check connection metrics
- Set up backup schedule

---

## Scaling Considerations

### Free Tier Limits
- Render: Spins down after 15 min inactivity
- Vercel: 100GB bandwidth/month
- MongoDB Atlas: 512MB storage

### Upgrade Path
1. Render: $7/month for always-on
2. Vercel: $20/month for Pro
3. MongoDB: $9/month for 2GB

---

## Security Checklist

- [ ] Strong SESSION_SECRET (64+ characters)
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] MongoDB IP whitelist configured
- [ ] API tokens stored securely
- [ ] CORS origins restricted
- [ ] Rate limiting enabled
- [ ] Error messages don't leak sensitive info

---

## Backup Strategy

1. **Database Backups**
   - MongoDB Atlas: Automatic daily backups
   - Manual export: Use `mongodump`

2. **Code Backups**
   - GitHub repository
   - Tag releases: `git tag v1.0.0`

3. **Environment Variables**
   - Store securely in password manager
   - Document in team wiki

---

## Support

For issues:
1. Check logs in Render/Vercel dashboards
2. Review MongoDB Atlas metrics
3. Test API endpoints with curl/Postman
4. Check GitHub issues

---

## Next Steps

- Set up custom domain
- Configure SSL certificate
- Add monitoring (Sentry, LogRocket)
- Implement analytics
- Add automated tests
- Set up CI/CD pipeline
