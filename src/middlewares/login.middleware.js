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

const verifyToken = async (token, secret, expectedType) => {
	if (!token) {
		throw new Error('Token not provided');
	}

	const tokenParts = token.split(' ');
	if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
		throw new Error('Malformed token');
	}
	const actualToken = tokenParts[1];

	const blockListed = await JWTBlockLists.findOne({
		where: { token: actualToken },
	});
	if (blockListed) {
		throw new Error('Unauthenticated user - Invalid token');
	}

	try {
		const decoded = jwt.verify(actualToken, secret);

		if (decoded.type !== expectedType) {
			throw new Error('Invalid token type');
		}

		decoded.token = actualToken;

		return decoded;
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			throw new Error('Token expired');
		}

		if (err.name === 'JsonWebTokenError') {
			throw new Error('Invalid token');
		}

		throw new Error('Token verification failed');
	}
};

const verifyAccessTokenJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const refreshToken = req.headers['x-refresh-token'];
	const rToken = refreshToken.split(' ')[1];
	
	try {
		const decoded = await verifyToken(
			authHeader,
			process.env.JWT_SECRET,
			'access',
		);
		req.userId = decoded.id;
		req.token = decoded.token;
		req.refreshToken = rToken
		next();
	} catch (error) {
		return res.status(401).json({ message: error.message });
	}
};

const verifyRefreshTokenJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const accessToken = authHeader.split(' ')[1];
	const refreshToken = req.headers['x-refresh-token'];
	try {
		const decoded = await verifyToken(
			refreshToken,
			process.env.JWT_SECRET,
			'refresh',
		);
		req.userId = decoded.id;
		req.refreshToken = decoded.token;
		req.token = accessToken;
		next();
	} catch (error) {
		return res.status(401).json({ message: error.message });
	}
};

module.exports = {
	validateloginData,
	verifyAccessTokenJWT,
	verifyRefreshTokenJWT,
};
