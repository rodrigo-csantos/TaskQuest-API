const { taskData, taskStatus } = require('../validations/taskValidations');

const validateTaskData = (req, res, next) => {
	const { error } = taskData.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(400).json({
			type: error.details.map((detail) => detail.type),
			message: error.details.map((detail) => detail.message),
		});
	}

	next();
};

const validateTaskstatus = (req, res, next) => {
	const { error } = taskStatus.validate(req.body.status);
	if (error) {
		return res.status(400).json({
			type: error.details.map((detail) => detail.type),
			message: error.details.map((detail) => detail.message),
		});
	}

	next();
};

module.exports = {
	validateTaskData,
	validateTaskstatus,
};
