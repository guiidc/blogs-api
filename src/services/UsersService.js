const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users } = require('../models');

let errors = [];

const validateName = (name) => {
  if (!name || name.length < 8) {
    errors.push({
      code: 400,
      error: '"displayName" length must be at least 8 characters long',
    });
  }
};
const validateEmail = async (email) => {
  if (!email) {
    errors.push({ code: 400, error: '"email" is required' });
    return;
  }
  if (!validator.isEmail(email)) {
    errors.push({ code: 400, error: '"email" must be a valid email' });
    return;
  }
  const rescuedEmail = await Users.findAll({ where: { email } });
  if (rescuedEmail.length) {
    errors.push({ code: 409, error: 'User already registered' });
  }
};
const validatePassword = (password) => {
  if (!password) {
    errors.push({ code: 400, error: '"password" is required' });
    return;
  }
  if (password.length !== 6) {
    errors.push({ code: 400, error: '"password" length must be 6 characters long' });
  }
};

const validations = async (userData) => {
  errors = [];
  const { displayName, email, password } = userData;
  validateName(displayName);
  await validateEmail(email);
  validatePassword(password);
};

const createUser = async (userData) => {
  const { displayName, email, password, image } = userData;
  await validations(userData);
  if (errors.length) return errors[0];

  const user = await Users.create({ displayName, email, password, image });
  const { id } = user.dataValues;

  const token = jwt.sign(
    { payload: { id, email } },
    process.env.JWT_SECRET,
  );

  return { token };
};

const getUsers = async () => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await Users.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) return { code: 404, error: 'User does not exist' };
  return user;
};

const removeMe = async (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET).payload;
  console.log('eu sou o id', id);
  await Users.destroy({ where: { id } });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeMe,
};