import express from 'express';
import User from '../models/User.js';
import DerivAPI from '../services/derivAPI.js';

const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// Get user balances
router.get('/balances', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user || !user.deriv.token) {
      return res.status(400).json({ error: 'No Deriv account linked' });
    }
    
    const api = new DerivAPI(process.env.DERIV_APP_ID);
    await api.connect();
    
    const balanceResponse = await api.getAccountBalance(user.deriv.token);
    const accountList = await api.getAccountList(user.deriv.token);
    
    const accounts = accountList.account_list || [];
    const allBalances = accounts.map(acc => ({
      loginid: acc.loginid,
      currency: acc.currency,
      balance: acc.balance,
      type: acc.account_type,
      category: acc.account_category,
      is_demo: acc.is_virtual === 1,
      updatedAt: new Date()
    }));
    
    user.allAccountBalances = allBalances;
    user.realAccountBalances = allBalances.filter(a => !a.is_demo);
    user.demoAccountBalances = allBalances.filter(a => a.is_demo);
    user.balanceStats = {
      total: allBalances.length,
      real: user.realAccountBalances.length,
      demo: user.demoAccountBalances.length
    };
    user.lastBalanceUpdate = new Date();
    
    await user.save();
    
    api.disconnect();
    
    res.json({
      allAccountBalances: user.allAccountBalances,
      realAccountBalances: user.realAccountBalances,
      demoAccountBalances: user.demoAccountBalances,
      balanceStats: user.balanceStats
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
});

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-deriv.token -tokens.token');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
