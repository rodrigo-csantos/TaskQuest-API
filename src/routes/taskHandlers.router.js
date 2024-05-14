const router = require('express').Router()

const controllerTaskHandlers = require('../controllers/taskHandlers.controller')

router.get('/tasks', controllerTaskHandlers.listAllTasks)

router.get('/task/:id', controllerTaskHandlers.taskDetails)

router.post('/task', controllerTaskHandlers.createTask)

router.put('/task/:id', controllerTaskHandlers.updateTaskStatus)

router.delete('/task/:id', controllerTaskHandlers.deleteTask)

module.exports = router
    
