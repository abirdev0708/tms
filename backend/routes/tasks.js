const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasksController');

router.get('/', ctrl.listTasks);
router.get('/:id', ctrl.getTask);
router.post('/', ctrl.createTask);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
