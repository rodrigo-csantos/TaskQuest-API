const serviceTaskHandlers = require('../services/taskHandlers.service');

exports.listAllTasks = async (req, res) => {
	const id = req.userId;
	const allTasks = await serviceTaskHandlers.listAllTasks(id);

	if (allTasks === null) {
		return res
			.status(404)
			.json({ message: 'User not found or no tasks available' });
	}

	return res.status(200).json(allTasks);
};

exports.taskDetails = async (req, res) => {
	const { id } = req.params;
	const taskDetailsById = await serviceTaskHandlers.taskDetails(id);
	return res.status(200).json(taskDetailsById);
};

exports.createTask = async (req, res) => {
	try {
		const taskData = req.body;
		taskData.owner = req.userId;
		const newTask = await serviceTaskHandlers.createTask(taskData);

		if (!newTask) {
			return res.status(400).json({ message: 'Failed to create task' });
		}

		return res.status(201).json(newTask);
	} catch (error) {
		console.error('Error in createTask controller:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

exports.updateTaskStatus = async (req, res) => {
	try {
		const taskUpdated = await serviceTaskHandlers.updateTaskStatus(
			req.body.status,
			req.params.id,
		);

		if (taskUpdated === 0) {
			return res.status(404).json({ message: 'task not found' });
		}
		return res.status(200).json({ message: 'task updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTask = await serviceTaskHandlers.deleteTask(id);

		if (deletedTask === 0) {
			return res.status(404).json({ message: 'task not found' });
		}
		return res.status(200).json({ message: 'task deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
