// controllers/authController.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const validator = require('validator');

const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  // Validação e sanitização dos dados
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }
  if (validator.isEmpty(name)) {
    return res.status(400).json({ message: 'O nome é obrigatório' });
  }

  email = validator.normalizeEmail(email);
  name = validator.escape(name);
  password = validator.escape(password);

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user)
    });
  } else {
    res.status(400).json({ message: 'Dados de usuário inválidos' });
  }
};

const authUser = async (req, res) => {
  let { email, password } = req.body;

  // Validação e sanitização dos dados
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }
  if (validator.isEmpty(password)) {
    return res.status(400).json({ message: 'Senha requerida' });
  }

  email = validator.normalizeEmail(email);
  password = validator.escape(password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user)
    });
  } else {
    res.status(401).json({ message: 'E-mail ou senha inválida' });
  }
};

module.exports = { registerUser, authUser };