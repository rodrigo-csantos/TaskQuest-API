const router = require('express').Router();

const controllerLogin = require('../controllers/login.controller');

const {
	validateloginData,
	verifyJWT,
} = require('../middlewares/login.middleware');

router.post('/login', validateloginData, controllerLogin.login);

router.post('/logout', verifyJWT, controllerLogin.logout);

module.exports = router;
