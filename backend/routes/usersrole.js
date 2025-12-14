const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userRoleController');

router.get('/', ctrl.userRoleList);
router.get('/:id', ctrl.getUserRole);
router.post('/', ctrl.createUserRole);
router.put('/:id', ctrl.updateUserRole);
router.delete('/:id', ctrl.deleteUserRole);

module.exports = router;
