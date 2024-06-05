require('dotenv').config();
const { users, JWTBlockLists } = require('../models');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
	return jwt.sign({ ...user, type: 'access' }, process.env.JWT_SECRET, {
		expiresIn: '15m',
	});
};

const generateRefreshToken = (user) => {
	return jwt.sign({ ...user, type: 'refresh' }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});
};

const login = async (email, password) => {
	const loggedUser = await users.findOne({
		where: { email: email, password: password },
	});
	if (!loggedUser) {
		throw new Error('Invalid email or password');
	}

	const user = { id: loggedUser.id, email: loggedUser.email };
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);
	return { accessToken, refreshToken };
};

const logout = async (token) => {
	const loggedOutUser = await JWTBlockLists.create({ token: token });
	return loggedOutUser ? loggedOutUser : null;
};

const refreshLogin = async (token, userId) => {
	const userFound = await users.findByPk(userId, {
		attributes: { exclude: ['password'] },
	});

	if (!userFound) {
		throw new Error('User not found');
	}

	await JWTBlockLists.create({ token: token });

	const user = { id: userFound.id, email: userFound.email };
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	return { accessToken, refreshToken };
};

module.exports = {
	login,
	logout,
	refreshLogin,
};
