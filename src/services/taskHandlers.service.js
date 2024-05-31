const { ActivityLogs, tasks, users } = require('../models');

const logActivity = async (userId, action, taskId) => {
	await ActivityLogs.create({ userId, action, taskId });
};

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
	try {
		const newTask = await tasks.create(taskData);
		await logActivity(taskData.owner, 'CREATE', newTask.id);
		return newTask;
	} catch (error) {
		console.error('Error creating task:', error);
		return null;
	}
};

const updateTaskStatus = async (taskStatus, id) => {
	try {
		const taskUpdated = await tasks.findOne({
			where: { id },
			include: { model: users },
		});
		taskUpdated.status = taskStatus;
		await taskUpdated.save();
		await logActivity(taskUpdated.user.id, 'UPDATE', id);
		return taskUpdated;
	} catch (error) {
		console.error('Error updating task:', error);
		return null;
	}
};

const deleteTask = async (id) => {
	const getUserId = await tasks.findOne({
		where: { id },
		include: { model: users },
	});
	await logActivity(getUserId.user.id, 'DELETE', id);
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
