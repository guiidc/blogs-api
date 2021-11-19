const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users } = require('../models');

let errors = [];
const errorsIndex = {
  emailRequired: '"email" is required',
  emailEmpty: '"email" is not allowed to be empty',
  passwordRequired: '"password" is required',
  passwordEmpty: '"password" is not allowed to be empty',
  invalidFields: 'Invalid fields',
};

const validateEmail = async (email) => {
  if (email === undefined) {
    errors.push({ code: 400, error: errorsIndex.emailRequired });
    return false;
  }
  if (!email) {
    errors.push({ code: 400, error: errorsIndex.emailEmpty });
    return false;
  }
  const user = await Users.findOne({ where: { email } });
  if (!user) errors.push({ code: 400, error: errorsIndex.invalidFields });
};

const validatePassword = async (password, email) => {
  if (password === undefined) {
    errors.push({ code: 400, error: errorsIndex.passwordRequired });
    return;
  }
  if (!password) {
    errors.push({ code: 400, error: errorsIndex.passwordEmpty });
    return;
  }
  const user = await Users.findOne({ where: { email } });
  if (!user) return { code: 400, error: errorsIndex.invalidFields };
  const expectPwd = user.dataValues.password;
  if (password !== expectPwd) {
    errors.push({ code: 400, error: errorsIndex.invalidFields });
  }
};

const validateCredentials = async ({ email, password }) => {
  errors = [];
  await validateEmail(email);
  if (errors.length) return;
  await validatePassword(password, email);
};

const generateToken = async ({ email }) => {
  const user = await Users.findOne({ where: { email } });
  const { id } = user.dataValues;
  return jwt.sign({ payload: { id, email } }, process.env.JWT_SECRET);
};

const login = async (credentials) => {
 await validateCredentials(credentials);
 if (errors.length) return errors[0];
 const token = await generateToken(credentials);
 return { token };
};

module.exports = { login };