const serviceLogin = require('../services/login.service')

exports.login = async (req, res) => {
	try {
		const loggedUser = await serviceLogin.login(req.body.email, req.body.password);
		if (loggedUser) {
			return res.status(201).json({ message: 'user successfully logged in' });
		}
		return res.status(401).json({ message: 'The email or password provided is incorrect' });
	} catch (error) {
		res.status(500).json(error.message);
	}
};