const { users } = require('../models');

const createUser = async (userData) => {
	const newUser = await users.create(userData);
	return newUser;
};

module.exports = {
	createUser,
};
