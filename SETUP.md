# Setup Instructions

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Deriv API credentials (get from https://app.deriv.com/account/api-token)

## Step 1: Get Deriv API Credentials

1. Go to https://app.deriv.com/account/api-token
2. Create a new API token with these scopes:
   - Read
   - Trade
   - Admin (for account management)
3. Note down your App ID and tokens

## Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/digit-hacker
DERIV_APP_ID=your_app_id_here
SESSION_SECRET=generate_random_string_here
FRONTEND_URL=http://localhost:5173
DERIV_WS_URL=wss://ws.derivws.com/websockets/v3?app_id=
```

Start backend:
```bash
npm run dev
```

## Step 3: Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000
VITE_DERIV_APP_ID=your_app_id_here
```

Start frontend:
```bash
npm run dev
```

## Step 4: Access Application

Open http://localhost:5173 in your browser

## Production Deployment

### Backend (Render/Railway)

1. Create new Web Service
2. Connect your GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

### Frontend (Vercel/Netlify)

1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### MongoDB

Use MongoDB Atlas for production:
1. Create cluster at https://cloud.mongodb.com
2. Get connection string
3. Update MONGODB_URI in backend env vars

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod`
- Check connection string in .env

**Deriv API Error:**
- Verify App ID is correct
- Check API token has required scopes
- Ensure WebSocket URL is correct

**CORS Error:**
- Update FRONTEND_URL in backend .env
- Check proxy settings in vite.config.js

## Security Notes

- Never commit .env files
- Use strong SESSION_SECRET in production
- Enable HTTPS in production
- Restrict CORS origins in production
