const loginService = require('../services/LoginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await loginService.login({ email, password });
  if (response.error) return res.status(response.code).json({ message: response.error });
  res.status(200).json(response);
};

module.exports = { login };
