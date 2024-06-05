require('dotenv').config();
const { users, JWTBlockLists } = require('../models');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
	return jwt.sign({ ...user, type: 'access' }, process.env.JWT_SECRET, { expiresIn: '15m' });
 }

 const generateRefreshToken = (user) => {
	return jwt.sign({ ...user, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: '1d' });
 }

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
	return { loggedUser, accessToken, refreshToken };
};

const logout = async (token) => {
	const loggedOutUser = await JWTBlockLists.create({ token: token });
	return loggedOutUser ? loggedOutUser : null;
};

module.exports = {
	login,
	logout,
};
