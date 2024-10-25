const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  name: String,
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('Owner', OwnerSchema);
