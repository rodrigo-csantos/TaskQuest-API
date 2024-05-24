const Joi = require('joi');

const userData = Joi.object({
	userName: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,15}$/)
		.required(),
	idAvatar: Joi.number().integer().required(),
});

module.exports = {
	userData,
};
