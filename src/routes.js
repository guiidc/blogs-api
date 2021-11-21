const router = require('express').Router();
const validateToken = require('./middlewares/validateToken');

const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');
const CategoriesController = require('./controllers/CategoriesControllers');
const PostsController = require('./controllers/PostsController');

router.post('/user', UsersController.createUser);
router.get('/user/', validateToken, UsersController.getUsers);
router.get('/user/:id', validateToken, UsersController.getUserById);
router.post('/login', LoginController.login);
router.post('/categories', validateToken, CategoriesController.createCategory);
router.get('/categories', validateToken, CategoriesController.getCategories);
router.post('/post', validateToken, PostsController.createPost);
router.get('/post/search', validateToken, PostsController.searchPosts);
router.get('/post', validateToken, PostsController.getPosts);
router.get('/post/:id', validateToken, PostsController.getPostById);
router.put('/post/:id', validateToken, PostsController.updatePost);
router.delete('/post/:id', validateToken, PostsController.removePost);
router.delete('/user/me', validateToken, UsersController.removeMe);

module.exports = router;