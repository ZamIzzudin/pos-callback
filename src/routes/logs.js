const express = require('express');
const router = express.Router();
const CallbackLog = require('../models/CallbackLog');

// List semua log callback
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, method, endpoint } = req.query;
    const query = {};
    
    if (method) query.method = method.toUpperCase();
    if (endpoint) query.endpoint = { $regex: endpoint, $options: 'i' };

    const logs = await CallbackLog.find(query)
      .sort({ hitAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await CallbackLog.countDocuments(query);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Detail log by ID
router.get('/:id', async (req, res) => {
  try {
    const log = await CallbackLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    res.json({ success: true, data: log });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Hapus semua log
router.delete('/all', async (req, res) => {
  try {
    const result = await CallbackLog.deleteMany({});
    res.json({ success: true, message: `Deleted ${result.deletedCount} logs` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Hapus log by ID
router.delete('/:id', async (req, res) => {
  try {
    const log = await CallbackLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    res.json({ success: true, message: 'Log deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
