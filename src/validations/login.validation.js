const Joi = require('joi');

const loginData = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

module.exports = {
	loginData,
};
