const router = require('express').Router();
const validateToken = require('./middlewares/validateToken');

const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const CategoriesController = require('./controllers/CategoriesControllers');

router.post('/user', UsersController.createUser);
router.get('/user/', validateToken, UsersController.getUsers);
router.get('/user/:id', validateToken, UsersController.getUserById);
router.post('/login', LoginController.login);
router.post('/categories', validateToken, CategoriesController.createCategory);
router.get('/categories', validateToken, CategoriesController.getCategories);

module.exports = router;