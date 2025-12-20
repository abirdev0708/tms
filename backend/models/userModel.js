const mongoose = require('mongoose');
const statusEnum = require('../config/statusEnum');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  emailId: { type: String, default: '' },
  userName: { type: String, default: '' },
  status: { type: String, default: statusEnum.active},
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole' },
  description : {type: String, default: '' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const User = mongoose.model('User', UserSchema);

module.exports = User;
