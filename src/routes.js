const router = require('express').Router();
const validateToken = require('./middlewares/validateToken');

const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

router.post('/user', UsersController.createUser);
router.get('/user/', validateToken, UsersController.getUsers);
router.get('/user/:id', validateToken, UsersController.getUserById);
router.post('/login', LoginController.login);

module.exports = router;