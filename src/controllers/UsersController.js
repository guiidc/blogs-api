const UsersService = require('../services/UsersService');

const createUser = async (req, res) => {
  const user = await UsersService.createUser(req.body);
  if (user.error) return res.status(user.code).json({ message: user.error });
  res.status(201).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UsersService.getUserById(id);
  if (user.error) return res.status(user.code).json({ message: user.error });
  return res.status(200).json(user);
};

module.exports = {
  createUser,
  getUserById,
};