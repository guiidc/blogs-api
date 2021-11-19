const CategoriesService = require('../services/CategoriesService');

const getCategories = async (req, res) => {
  const { name } = req.body;
    const categories = await CategoriesService.getCategories(name);
    if (categories.error) return res.status(categories.code).json({ message: categories.error });
    res.status(201).json(categories);
};

module.exports = { getCategories };
