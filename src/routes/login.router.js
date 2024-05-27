const router = require('express').Router();

const controllerLogin = require('../controllers/login.controller');

const { validateloginData } = require('../middlewares/login.middleware');

router.post('/login', validateloginData, controllerLogin.login);

module.exports = router;
