const router = require('express').Router();

const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

router.post('/user', UsersController.createUser);
router.post('/login', LoginController.login);

module.exports = router;