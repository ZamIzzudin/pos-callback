const express = require('express');
const router = express.Router();
const CallbackLog = require('../models/CallbackLog');

// Endpoint untuk menerima callback (semua method)
router.all('/webhook', async (req, res) => {
  try {
    const log = new CallbackLog({
      endpoint: '/webhook',
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
      ip: req.ip || req.connection.remoteAddress
    });
    await log.save();
    res.json({ success: true, message: 'Callback received', logId: log._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint untuk menerima callback dengan path dinamis
router.all('/webhook/{*path}', async (req, res) => {
  try {
    const log = new CallbackLog({
      endpoint: `/webhook/${req.params.path ? req.params.path.join('/') : ''}`,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query,
      ip: req.ip || req.connection.remoteAddress
    });
    await log.save();
    res.json({ success: true, message: 'Callback received', logId: log._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
