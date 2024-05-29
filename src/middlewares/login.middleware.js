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
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: 'Token not provided' });
	}

	const tokenParts = authHeader.split(' ');
	if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
		return res.status(401).json({ message: 'Malformed token' });
	}

	const token = tokenParts[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err)
			return res
				.status(401)
				.json({ message: 'unauthenticated user - Invalid or expired token' });

		req.userId = decoded.id;
		next();
	});
};

module.exports = {
	validateloginData,
	verifyJWT,
};
