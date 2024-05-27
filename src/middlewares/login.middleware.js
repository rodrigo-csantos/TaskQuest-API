const { loginData } = require('../validations/login.validation');

const validateloginData = (req, res, next) => {
	const { error } = loginData.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(400).json({
			type: error.details.map((detail) => detail.type),
			message: error.details.map((detail) => detail.message),
		});
	}

	next();
};

module.exports = {
	validateloginData,
};
