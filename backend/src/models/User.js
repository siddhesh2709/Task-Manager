const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  prefs: {
    timeOfDayWindows: { type: [String], default: ['morning','afternoon','evening'] },
    quickTaskBias: { type: Number, default: 1.0 } // multiplier
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
