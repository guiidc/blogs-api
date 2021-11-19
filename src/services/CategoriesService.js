const { Categories } = require('../models');

const getCategories = async (name) => {
  if (!name) return { code: 400, error: '"name" is required' };
  const categories = await Categories.create({ name });
  return categories;
};

module.exports = {
  getCategories,
};
