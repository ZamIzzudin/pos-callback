require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const callbackRoutes = require('./src/routes/callback');
const logsRoutes = require('./src/routes/logs');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', callbackRoutes);
app.use('/api/logs', logsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Callback API Logger', status: 'running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/api/webhook`);
  console.log(`Logs endpoint: http://localhost:${PORT}/api/logs`);
});
