const { loginData } = require('../validations/login.validation');
const jwt = require('jsonwebtoken');
const { JWTBlockLists } = require('../models');
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

const verifyAccessTokenJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: 'Token not provided' });
	}

	const tokenParts = authHeader.split(' ');
	if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
		return res.status(401).json({ message: 'Malformed token' });
	}

	const token = tokenParts[1];
	req.token = token;

	const blockListed = await JWTBlockLists.findOne({
		where: { token: token },
	});

	if (blockListed) {
		return res
			.status(401)
			.json({ message: 'unauthenticated user - Invalid token' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.json({ message: 'unauthenticated user - Invalid or expired token' });
		}

		if (decoded.type !== 'access') {
            return res.status(401).json({ message: 'Invalid token type' });
        }

		req.userId = decoded.id;
		
		next();
	});
};

module.exports = {
	validateloginData,
	verifyAccessTokenJWT,
};
