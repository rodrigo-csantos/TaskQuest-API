const router = require('express').Router();

const { validateUserData } = require('../middlewares/createUser.middleware');

const controllerUser = require('../controllers/createUser.controller');

router.post('/users', validateUserData, controllerUser.createUser);

module.exports = router;
