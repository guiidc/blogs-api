const PostsService = require('../services/PostsService');

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const token = req.headers.authorization;
  const post = await PostsService.createPost(token, title, content, categoryIds);
  if (post.error) return res.status(post.code).json({ message: post.error });
  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const posts = await PostsService.getPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await PostsService.getPostById(id);
  if (post.error) return res.status(post.code).json({ message: post.error });
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;
  const post = await PostsService.updatePost({ token, id, title, content, categoryIds });
  if (post.error) return res.status(post.code).json({ message: post.error });
  res.status(200).json(post);
};

const removePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const post = await PostsService.removePost(token, id);
  if (post.error) return res.status(post.code).json({ message: post.error });
  res.status(204).json();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  removePost,
};
