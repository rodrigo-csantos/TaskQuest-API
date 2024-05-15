const router = require('express').Router()

const controllerTaskHandlers = require('../controllers/taskHandlers.controller')

const {validateTaskData} = require('../middlewares/taskHandlers.middleware')

router.get('/tasks', controllerTaskHandlers.listAllTasks)

router.get('/task/:id', controllerTaskHandlers.taskDetails)

router.post('/task', validateTaskData, controllerTaskHandlers.createTask)

router.put('/task/:id', controllerTaskHandlers.updateTaskStatus)

router.delete('/task/:id', controllerTaskHandlers.deleteTask)

module.exports = router
    
