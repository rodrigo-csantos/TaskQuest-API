const serviceLogin = require('../services/login.service');

exports.login = async (req, res) => {
	try {
		const { token } = await serviceLogin.login(
			req.body.email,
			req.body.password,
		);
		return res
			.status(200)
			.json({ auth: true, token, message: 'user successfully logged in' });
	} catch (error) {
		res
			.status(401)
			.json({ message: 'The email or password provided is incorrect' });
	}
};

exports.logout = async (req, res) => {
	try {
		const token = req.token;
		const lockedToken = await serviceLogin.logout(token);
		if (!lockedToken) {
			return res.status(400).json({ message: 'Error when logging out' });
		}
		return res.status(200).json({ message: 'user successfully logged out' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
