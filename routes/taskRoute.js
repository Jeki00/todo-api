const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/auth')

router.get('/', authenticate(['admin','normal']),taskController.index);
router.get('/:task', taskController.show);
router.post('/create', taskController.store);
router.put('/update/:id', taskController.update);
router.delete('/delete/:id', taskController.destroy);

module.exports = router;
