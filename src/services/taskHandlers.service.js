const { tasks } = require('../models');

const listAllTasks = async () => {
	const allTasks = await tasks.findAll();
	return allTasks;
};

const taskDetails = async (id) => {
	const taskDetailsById = await tasks.findOne({ where: { id } });
	return taskDetailsById;
};

const createTask = async (taskData) => {
	const newTask = await tasks.create(taskData);
	return newTask;
};

const updateTaskStatus = async (taskStatus, id) => {
	const taskUpdated = await tasks.findOne({ where: { id } });
	taskUpdated.status = taskStatus;
	await taskUpdated.save();

	return taskUpdated.affectedRows;
};

const deleteTask = async (id) => {
	const deletedTask = await tasks.destroy({ where: { id } });
	return deletedTask;
};

module.exports = {
	listAllTasks,
	taskDetails,
	createTask,
	updateTaskStatus,
	deleteTask,
};
