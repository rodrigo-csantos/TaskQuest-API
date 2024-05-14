const { task } = require("./db/task.model")

const listAllTasks = async () => {
    const allTasks = await task.findAll()
    return allTasks
}

const taskDetails =  async (id)=> {
    const taskDetailsById = await task.findOne({where:{id}})
    return taskDetailsById
}

const createTask = async (taskData)=> {
    const newTask = await task.create(taskData)
    return newTask
}

const updateTaskStatus = async (taskStatus, id)=> {
    const taskUpdated = await task.findOne({where: {id}})
    taskUpdated.status = taskStatus
    taskUpdated.save()
    
    return taskUpdated.affectedRows
}

const deleteTask = async (id)=> {
    const deletedTask = await task.destroy({where: {id}})
    return deletedTask
}

module.exports = {
    listAllTasks,
    taskDetails,
    createTask,
    updateTaskStatus,
    deleteTask
}