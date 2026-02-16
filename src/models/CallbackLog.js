const mongoose = require('mongoose');

const callbackLogSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object, default: {} },
  body: { type: Object, default: {} },
  query: { type: Object, default: {} },
  ip: { type: String },
  hitAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallbackLog', callbackLogSchema);
