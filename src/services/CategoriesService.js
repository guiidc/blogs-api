const { Categories } = require('../models');

const createCategory = async (name) => {
  if (!name) return { code: 400, error: '"name" is required' };
  const categories = await Categories.create({ name });
  return categories;
};

const getCategories = async () => {
  const categories = await Categories.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};
