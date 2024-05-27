const router = require('express').Router();

const controllerTaskHandlers = require('../controllers/taskHandlers.controller');

const {
	validateTaskData,
	validateTaskstatus,
} = require('../middlewares/taskHandlers.middleware');

const { verifyJWT } = require('../middlewares/login.middleware');

router.get('/tasks', verifyJWT, controllerTaskHandlers.listAllTasks);

router.get('/task/:id', verifyJWT, controllerTaskHandlers.taskDetails);

router.post(
	'/task',
	verifyJWT,
	validateTaskData,
	controllerTaskHandlers.createTask,
);

router.put(
	'/task/:id',
	verifyJWT,
	validateTaskstatus,
	controllerTaskHandlers.updateTaskStatus,
);

router.delete('/task/:id', verifyJWT, controllerTaskHandlers.deleteTask);

module.exports = router;
