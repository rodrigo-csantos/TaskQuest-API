const router = require('express').Router();

const controllerLogin = require('../controllers/login.controller');

const {
	validateloginData,
	verifyAccessTokenJWT,
} = require('../middlewares/login.middleware');

router.post('/login', validateloginData, controllerLogin.login);

router.post('/logout', verifyAccessTokenJWT, controllerLogin.logout);

module.exports = router;
