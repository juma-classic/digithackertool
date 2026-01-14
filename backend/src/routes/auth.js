import express from 'express';
import DerivAPI from '../services/derivAPI.js';
import User from '../models/User.js';

const router = express.Router();

// Deriv OAuth login
router.get('/deriv', (req, res) => {
  const derivAuthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${process.env.DERIV_APP_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.DERIV_CALLBACK_URL)}`;
  res.redirect(derivAuthUrl);
});

// Deriv OAuth callback
router.get('/deriv/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}?error=no_code`);
  }

  try {
    // Exchange code for token (simplified - you'd use OAuth2 flow)
    const token = code; // In production, exchange code for access token
    
    const api = new DerivAPI(process.env.DERIV_APP_ID);
    await api.connect();
    
    const authResponse = await api.authorize(token);
    const accountList = await api.getAccountList(token);
    
    const { email, loginid, currency } = authResponse.authorize;
    const uid = `user_${loginid}_${Date.now()}`;
    
    // Create or update user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        uid,
        email,
        name: email.split('@')[0],
        loginid,
        deriv: {
          loginid,
          linkedAt: new Date(),
          currency,
          token
        },
        tokens: [{
          token,
          account: loginid,
          currency
        }],
        lastLogin: new Date()
      });
    } else {
      user.lastLogin = new Date();
      user.deriv = {
        loginid,
        linkedAt: new Date(),
        currency,
        token
      };
    }
    
    await user.save();
    
    req.session.userId = user._id;
    req.session.uid = user.uid;
    
    api.disconnect();
    
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error('Auth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`);
  }
});

// Get current user
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const user = await User.findById(req.session.userId).select('-deriv.token -tokens');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

export default router;
