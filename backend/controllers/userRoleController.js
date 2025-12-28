const UserRole = require('../models/userRoleModel');

exports.userRoleList = async (req, res) => {
  const roleList = await UserRole.find().sort({ createdAt: -1 }).lean();
  res.json(roleList);
};

exports.getUserRole = async (req, res) => {
  const u = await UserRole.findById(req.params.id).lean();
  if (!u) return res.status(404).json({ error: 'Not found' });
  res.json(u);
};

exports.createUserRole = async (req, res) => {
  const payload = req.body || {};
  const created = await UserRole.create({
    roleName: payload.roleName || 'Untitled'
  });
  res.status(201).json(created);
};

exports.updateUserRole = async (req, res) => {
  const payload = req.body || {};
  const updated = await UserRole.findByIdAndUpdate(req.params.id, payload, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

exports.deleteUserRole = async (req, res) => {
  const removed = await UserRole.findByIdAndDelete(req.params.id).lean();
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
};
