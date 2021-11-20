const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { BlogPosts, Categories, Users } = require('../models');

let errors = [];

const validateData = (title, content, categoryIds) => {
  errors = [];
  if (!title) errors.push({ code: 400, error: '"title" is required' });
  if (!content) errors.push({ code: 400, error: '"content" is required' });
  if (!categoryIds) errors.push({ code: 400, error: '"categoryIds" is required' });
};
const validateCategories = async (categoryIds) => {
  errors = [];
  const categoriesList = await Categories.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (categoryIds.length !== categoriesList.length) {
    errors.push({ code: 400, error: '"categoryIds" not found' });
  }
};

const insertCategories = async (post, categoryIds) => {
  await post.addCategories(categoryIds);
};

const createPost = async (token, title, content, categoryIds) => {
  validateData(title, content, categoryIds);
  if (errors.length) return errors[0];
  await validateCategories(categoryIds);
  if (errors.length) return errors[0];
  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET).payload;
  const post = await BlogPosts.create({ userId, title, content });
  insertCategories(post, categoryIds);
  return post;
};

const getPosts = async () => {
  const posts = await BlogPosts.findAll({
      include: [
        { model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { model: Categories,
          as: 'categories',
          through: { attributes: [] },
        }],
    });

  return posts;
};

const getPostById = async (pk) => {
  const post = await BlogPosts.findByPk(pk, {
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { code: 404, error: 'Post does not exist' };
  return post;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
