const CategoriesService = require('../services/CategoriesService');

const createCategory = async (req, res) => {
  const { name } = req.body;
    const categories = await CategoriesService.createCategory(name);
    if (categories.error) return res.status(categories.code).json({ message: categories.error });
    res.status(201).json(categories);
};

const getCategories = async (req, res) => {
  const categories = await CategoriesService.getCategories();
  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getCategories,
};
