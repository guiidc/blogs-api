const router = require('express').Router();

const UsersController = require('./controllers/UsersController');

router.post('/user', UsersController.createUser);

module.exports = router;