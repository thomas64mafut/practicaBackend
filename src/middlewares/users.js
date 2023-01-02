const User = require('../models/User');
const { body } = require('express-validator')

const createUsersValidations = async (req, res, next) => {
  try {
    const { password, email, name } = req.body;
    if (!password || !email || !name ) return res.status(400).json({ message: 'completar todos los campos' });
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: 'email en uso' });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const authUsersValidations = () => {
  return [
    body("email").isEmail()
  ];
};

module.exports = {
  createUsersValidations,
  authUsersValidations,
};