const serviceCreateUser = require('../services/createUser.service');

exports.createUser = async (req, res) => {
	try {
		const newUser = await serviceCreateUser.createUser(req.body);
		if (newUser) {
			return res.status(201).json({ message: 'user successfully registered' });
		}
		return res.status(400).json({ message: 'Failed to register user' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
