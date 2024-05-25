const router = require('express').Router();

const controllerLogin = require('../controllers/login.controller');

router.post('/login', controllerLogin.login);

module.exports = router;