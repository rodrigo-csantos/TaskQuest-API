const router = require('express').Router();

const controllerTaskHandlers = require('../controllers/taskHandlers.controller');

const {
	validateTaskData,
	validateTaskstatus,
} = require('../middlewares/taskHandlers.middleware');

const { verifyAccessTokenJWT } = require('../middlewares/login.middleware');

router.get('/tasks', verifyAccessTokenJWT, controllerTaskHandlers.listAllTasks);

router.get('/task/:id', verifyAccessTokenJWT, controllerTaskHandlers.taskDetails);

router.post(
	'/task',
	verifyAccessTokenJWT,
	validateTaskData,
	controllerTaskHandlers.createTask,
);

router.put(
	'/task/:id',
	verifyAccessTokenJWT,
	validateTaskstatus,
	controllerTaskHandlers.updateTaskStatus,
);

router.delete('/task/:id', verifyAccessTokenJWT, controllerTaskHandlers.deleteTask);

module.exports = router;
