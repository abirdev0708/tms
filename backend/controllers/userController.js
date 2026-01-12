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

exports.userList = async (req, res) => {
    const { firstname } = req.query;
    let fields = Object.keys(User.schema.paths);
   
    fields = Object.keys(User.schema.paths).filter((field) => !["_id", "__v"].includes(field));
  //const isEmpty = Object.keys(fields).length === 0; 
   console.log("fields====>",fields);
       console.log("req===>",req.query);

    let users=null;

     // const reqKeys  = Object.keys(req.query);
              //const obj = {};

     // if(isContinuousSubArray(fields,reqKeys)){
   const obj = Object.entries(req.query).reduce((acc, [key, value]) => {
    console.log("[key, value]===>",[key, value])
  if (value !== undefined && fields.includes(key)) {
    acc[key]=value.trim();
  }
  return acc;
}, {});
    //  }
console.log("obj====>",obj);
 if(Object.keys(obj).length !== 0){
  console.log(1);
      users = await User.find(obj).sort({ createdAt: -1 }).lean();
  }
  else{
      users = await User.find().sort({ createdAt: -1 }).lean();
  }
  res.json(users);
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
