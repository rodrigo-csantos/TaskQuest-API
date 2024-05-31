require('dotenv').config();
const { users, JWTBlockLists } = require('../models');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
	const loggedUser = await users.findOne({
		where: { email: email, password: password },
	});
	if (!loggedUser) {
		throw new Error('Invalid email or password');
	}

	const payload = { id: loggedUser.id, email: loggedUser.email };
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
	return { loggedUser, token };
};

const logout = async (token) => {
	const loggedOutUser = await JWTBlockLists.create({ token: token });
	return loggedOutUser ? loggedOutUser : null;
};

module.exports = {
	login,
	logout,
};
