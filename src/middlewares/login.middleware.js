const { loginData } = require('../validations/login.validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const verifyJWT = (req, res, next) => {
	const token = req.headers['x-acess-token'];
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).json({ message: 'unauthenticated user' });

		req.userId = decoded.id;
		next();
	});
};

module.exports = {
	validateloginData,
	verifyJWT,
};
