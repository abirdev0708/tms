const User = require('../models/userModel');


function isContinuousSubArray(arr, sub) {
  for (let i = 0; i <= arr.length - sub.length; i++) {
    let match = true;

    for (let j = 0; j < sub.length; j++) {
      if (arr[i + j] !== sub[j]) {
        match = false;
        break;
      }
    }

    if (match) return true;
  }
  return false;
}

/* Safely creates a regex object from user input
 * Neutralizes characters like: . * + ? ^ $ { } ( ) | [ ] \
 */
const safeRegex = (userInput) => {
  const escaped = String(userInput).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return { $regex: escaped, $options: 'i' };
};

exports.userList = async (req, res) => {
  try {
  let fields = Object.keys(User.schema.paths); 
  fields = Object.keys(User.schema.paths).filter((field) => !["_id", "__v"].includes(field));
  let users=null;
   const orConditions = Object.entries(req.query)
  .filter(([key, value]) => value && fields.includes(key))
  .map(([key, value]) => ({
    [key]: safeRegex(value)
  }));

  const query = orConditions.length ? { $or: orConditions } : {};

 if(Object.keys(query).length !== 0){
      users = await User.find(query).sort({ createdAt: -1 }).lean();
  }
  else{
      users = await User.find().sort({ createdAt: -1 }).lean();
  }
  res.status(200).json(users);
  }
  catch(error){
    res.status(500).json({
      message:"Query execution exceeded time limit",
    })
  }
  
};

exports.getUser = async (req, res) => {
  const { firstname } = req.query;
  if(req.params.id){
      let  u = await User.findById(req.params.id).lean();
  }
 
  
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
