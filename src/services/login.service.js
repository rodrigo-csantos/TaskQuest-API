require('dotenv').config();
const { users } = require('../models');
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

module.exports = {
	login,
};
