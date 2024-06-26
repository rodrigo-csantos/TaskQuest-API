const Joi = require('joi');

const taskData = Joi.object({
	taskName: Joi.string().required(),
	description: Joi.string().required(),
	status: Joi.string().required(),
});

const taskStatus = Joi.string().required();

module.exports = {
	taskData,
	taskStatus,
};
