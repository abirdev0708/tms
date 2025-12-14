const mongoose = require('mongoose');
const statusEnum = require('../config/statusEnum');

const UserRoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  status: { type: String, default: statusEnum.active},
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const UserRole = mongoose.model('UserRole', UserRoleSchema);

module.exports = UserRole;
