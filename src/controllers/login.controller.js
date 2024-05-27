const serviceLogin = require('../services/login.service');

exports.login = async (req, res) => {
	try {
		const { loggedUser, token } = await serviceLogin.login(
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
