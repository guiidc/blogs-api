const PostsService = require('../services/PostsService');

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const token = req.headers.authorization;
  const post = await PostsService.createPost(token, title, content, categoryIds);
  if (post.error) return res.status(post.code).json({ message: post.error });
  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  // const token = req.header.authorization;
  const posts = await PostsService.getPosts();
  res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
};
