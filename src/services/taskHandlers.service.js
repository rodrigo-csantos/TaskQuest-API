const modelsTasksHandlers = require('../models/taskHandlers.model')

const listAllTasks = async () => {
    const allTasks  = await modelsTasksHandlers.listAllTasks()
    return allTasks
}

const taskDetails = async (id) => {
    const taskDetailsById  = await modelsTasksHandlers.taskDetails(id)
    return taskDetailsById
}

const createTask = async (taskData) => {
    const newTask  = await modelsTasksHandlers.createTask(taskData)
    return newTask
}

const updateTaskStatus = async (taskStatus, id) => {
    const taskUpdated  = await modelsTasksHandlers.updateTaskStatus(taskStatus, id)
    return taskUpdated
}

const deleteTask = async (id) => {
    const deletedTask  = await modelsTasksHandlers.deleteTask(id)
    return deletedTask
}

module.exports = {
    listAllTasks,
    taskDetails,
    createTask,
    updateTaskStatus,
    deleteTask
}