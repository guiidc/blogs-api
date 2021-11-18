const UsersService = require('../services/UsersService');

const createUser = async (req, res) => {
  const user = await UsersService.createUser(req.body);
  if (user.error) return res.status(user.code).json({ message: user.error });
  res.status(201).json(user);
};

module.exports = {
  createUser,
};