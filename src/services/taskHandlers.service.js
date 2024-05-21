const {taskHandler} = require('../models')

const listAllTasks = async () => {
    const allTasks = await taskHandler.findAll()
    return allTasks
}

const taskDetails =  async (id)=> {
    const taskDetailsById = await taskHandler.findOne({where:{id}})
    return taskDetailsById
}

const createTask = async (taskData)=> {
    const newTask = await taskHandler.create(taskData)
    return newTask
}

const updateTaskStatus = async (taskStatus, id)=> {
    const taskUpdated = await taskHandler.findOne({where: {id}})
    taskUpdated.status = taskStatus
    await taskUpdated.save()
    
    return taskUpdated.affectedRows
}

const deleteTask = async (id)=> {
    const deletedTask = await taskHandler.destroy({where: {id}})
    return deletedTask
}

module.exports = {
    listAllTasks,
    taskDetails,
    createTask,
    updateTaskStatus,
    deleteTask
}