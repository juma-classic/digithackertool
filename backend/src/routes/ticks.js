import express from 'express';
import DerivAPI from '../services/derivAPI.js';

const router = express.Router();

// Active WebSocket connections for tick streaming
const activeConnections = new Map();

// Get available symbols
router.get('/symbols', (req, res) => {
  const symbols = [
    { symbol: 'R_10', name: 'Volatility 10 Index' },
    { symbol: 'R_25', name: 'Volatility 25 Index' },
    { symbol: 'R_50', name: 'Volatility 50 Index' },
    { symbol: 'R_75', name: 'Volatility 75 Index' },
    { symbol: 'R_100', name: 'Volatility 100 Index' },
    { symbol: '1HZ10V', name: 'Volatility 10 (1s) Index' },
    { symbol: '1HZ25V', name: 'Volatility 25 (1s) Index' },
    { symbol: '1HZ50V', name: 'Volatility 50 (1s) Index' },
    { symbol: '1HZ75V', name: 'Volatility 75 (1s) Index' },
    { symbol: '1HZ100V', name: 'Volatility 100 (1s) Index' }
  ];
  
  res.json(symbols);
});

// Subscribe to tick stream (SSE)
router.get('/stream/:symbol', async (req, res) => {
  const { symbol } = req.params;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  try {
    const api = new DerivAPI(process.env.DERIV_APP_ID);
    await api.connect();
    
    const reqId = api.subscribeTicks(symbol, (response) => {
      if (response.tick) {
        res.write(`data: ${JSON.stringify(response.tick)}\n\n`);
      }
    });
    
    activeConnections.set(res, { api, reqId });
    
    req.on('close', () => {
      const conn = activeConnections.get(res);
      if (conn) {
        conn.api.unsubscribe(conn.reqId);
        conn.api.disconnect();
        activeConnections.delete(res);
      }
    });
  } catch (error) {
    console.error('Tick stream error:', error);
    res.status(500).json({ error: 'Failed to start tick stream' });
  }
});

export default router;
