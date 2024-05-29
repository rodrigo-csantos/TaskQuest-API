const { tasks, users } = require('../models');

const listAllTasks = async (id) => {
	const getTasks = await users.findByPk(id, {
		attributes: { exclude: ['password'] },
		include: { model: tasks, as: 'tasks' },
	});
	return getTasks ? getTasks.tasks : null;
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
