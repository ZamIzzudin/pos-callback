const mongoose = require('mongoose');

const callbackLogSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: mongoose.Schema.Types.Mixed, default: {} },
  body: { type: mongoose.Schema.Types.Mixed, default: {} },
  query: { type: mongoose.Schema.Types.Mixed, default: {} },
  ip: { type: String, default: '' },
  hitAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallbackLog', callbackLogSchema);
