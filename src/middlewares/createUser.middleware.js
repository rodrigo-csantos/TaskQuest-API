const { userData } = require('../validations/createUser.validation');

const validateUserData = (req, res, next) => {
	const { error } = userData.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(400).json({
			type: error.details.map((detail) => detail.type),
			message: error.details.map((detail) => detail.message),
		});
	}

	next();
};

module.exports = {
	validateUserData,
};
