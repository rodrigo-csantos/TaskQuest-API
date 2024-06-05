const serviceLogin = require('../services/login.service');

exports.login = async (req, res) => {
	try {
		const { accessToken, refreshToken } = await serviceLogin.login(
			req.body.email,
			req.body.password,
		);
		return res.status(200).json({
			auth: true,
			accessToken,
			refreshToken,
			message: 'user successfully logged in',
		});
	} catch (error) {
		res
			.status(401)
			.json({ message: 'The email or password provided is incorrect' });
	}
};

exports.logout = async (req, res) => {
	try {
		const accessToken = req.token;
		const refreshToken = req.refreshToken
		const lockedToken = await serviceLogin.logout(accessToken, refreshToken);
		if (!lockedToken) {
			return res.status(400).json({ message: 'Error when logging out' });
		}
		return res.status(200).json({ message: 'user successfully logged out' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.refreshLogin = async (req, res) => {
	try {
		const accessJWT = req.token
		const refreshJWT = req.refreshToken;
		const userId = req.userId;

		const { accessToken, refreshToken } = await serviceLogin.refreshLogin(
			accessJWT,
			refreshJWT,
			userId,
		);

		return res.status(200).json({
			auth: true,
			accessToken,
			refreshToken,
			message: 'Tokens successfully refreshed',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Failed to refresh tokens', error: error.message });
	}
};
