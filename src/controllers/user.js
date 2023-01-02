const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addUser = async(req,res) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const encryptedPass = await bcryptjs.hash(req.body.password, salt);
    const userToSave = {
      ...req.body,
      password: encryptedPass,
    }
    const newUser = new User(userToSave);
    await newUser.save();

    const payload = { user: { id: newUser._id }, };
    jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.status(200).json({ message: 'usuario creado correctamente', token });
    });

  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    const loginSuccesful = await bcryptjs.compare(password, userFound?.password);
    if(!loginSuccesful || !userFound) return res.status(400).json({ message: 'datos incorrectos' });

    const payload = { user: { id: userFound._id, isAdmin: userFound.isAdmin }, };
    jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.status(200).json({ message: 'logueo exitoso', token });
    });

  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const getUserData = async (req, res) => {
  try {
    const userFound  = await User.findById(req.userId).select('-password -_id');
    res.json(userFound);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  } 
}

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, paginated = false } = req.query;
    const usersCount = await User.count();
    const pagesCount = Math.ceil(usersCount / limit);
    const skip = (page - 1) * limit;
    if (page > pagesCount) return res.status(400).json({ message: 'pagina no encontrada'});
    if (!paginated) {
      const usersFound  = await User.find( { deleted: false }).select('-password -_id -deleted');
      return res.status(200).json({ message: 'usuarios extraidos de forma exitosa', users: usersFound })
    }

    const usersFound  = await User.find( { deleted: false }).skip(skip).limit(limit).select('-password -_id -deleted');
    return res.status(200).json({ message: 'usuarios extraidos de forma exitosa',usersCount, pagesCount, currentPage: page, users: usersFound })

  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted  = await User.findByIdAndUpdate(id, { deleted: true }, { new: true }).select('-password -_id');
    res.status(200).json({ message: 'usuario eliminado de forma exitosa', user: userDeleted })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const updateBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.userId, { $inc: { walletBalance: balance } }, { new: true }).select('-password -_id');
    res.status(200).json({ message: 'operacion realizada con exito', user: updatedUser })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const authStatus = async (req, res) => {
  try {
    res.status(200).json({ message: 'Estado del usuario validado', isAdmin: req.isAdmin })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.status(200).json({ message: 'usuario editado correctamente', updatedUser })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

module.exports = {
  addUser,
  authUser,
  getUserData,
  getAllUsers,
  deleteUser,
  updateBalance,
  authStatus,
  updateUser,
}