const User = require('../models/userModel');

exports.userList = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const u = await User.findById(req.params.id).lean();
  if (!u) return res.status(404).json({ error: 'Not found' });
  res.json(u);
};

exports.createUser = async (req, res) => {
  const payload = req.body || {};
  const created = await User.create({
    firstName: payload.firstName || 'Untitled',
    lastName: payload.lastName || 'Untiled',
    emailId: payload.emailId || 'Untiled',
    userName: payload.userName || 'Untitled',
    roleId: payload.roleId,
    description: payload.description || '',
  });
  res.status(201).json(created);
};

exports.updateUser = async (req, res) => {
  const payload = req.body || {};
  const updated = await User.findByIdAndUpdate(req.params.id, payload, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  const removed = await User.findByIdAndDelete(req.params.id).lean();
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
};
