const Task = require('../models/taskModel');

exports.listTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 }).lean();
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const t = await Task.findById(req.params.id).lean();
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
};

exports.createTask = async (req, res) => {
  const payload = req.body || {};
  const created = await Task.create({
    title: payload.title || 'Untitled',
    description: payload.description || '',
    completed: Boolean(payload.completed)
  });
  res.status(201).json(created);
};

exports.updateTask = async (req, res) => {
  const payload = req.body || {};
  const updated = await Task.findByIdAndUpdate(req.params.id, payload, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  const removed = await Task.findByIdAndDelete(req.params.id).lean();
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
};
