const Joi = require('joi');

const taskData = Joi.object({
	taskName: Joi.string().required(),
	description: Joi.string().required(),
	owner: Joi.number().required(),
	status: Joi.string().required(),
});

const taskStatus = Joi.string().required();

module.exports = {
	taskData,
	taskStatus,
};
