const router = require('express').Router();

const controllerLogin = require('../controllers/login.controller');

const {
	validateloginData,
	verifyAccessTokenJWT,
	verifyRefreshTokenJWT,
} = require('../middlewares/login.middleware');

router.post('/login', validateloginData, controllerLogin.login);

router.post('/logout', verifyAccessTokenJWT, controllerLogin.logout);

router.post(
	'/refresh-login',
	verifyRefreshTokenJWT,
	controllerLogin.refreshLogin,
);

module.exports = router;
