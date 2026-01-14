import mongoose from 'mongoose';

const accountBalanceSchema = new mongoose.Schema({
  loginid: String,
  currency: String,
  balance: Number,
  type: String,
  category: String,
  is_demo: Boolean,
  updatedAt: Date
});

const tokenSchema = new mongoose.Schema({
  token: String,
  account: String,
  currency: String
});

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  loginid: String,
  status: { type: String, default: 'active' },
  approved: { type: Boolean, default: false },
  
  // Deriv integration
  deriv: {
    loginid: String,
    linkedAt: Date,
    currency: String,
    token: String
  },
  
  tokens: [tokenSchema],
  copyTradingToken: String,
  copyTokenScopes: [String],
  copyTokenCreatedAt: Date,
  copyTokenAttempted: Boolean,
  copyTokenError: String,
  
  // Balances
  allAccountBalances: [accountBalanceSchema],
  realAccountBalances: [accountBalanceSchema],
  demoAccountBalances: [accountBalanceSchema],
  balanceStats: {
    total: Number,
    real: Number,
    demo: Number
  },
  lastBalanceUpdate: Date,
  lastBalanceError: String,
  
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
