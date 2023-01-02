const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'token no encontrado' });
    jwt.verify(token, process.env.SECRET_WORD);
    next(); 
  } catch (error) {
    if (error.message === 'jwt expired') 
      return res.status(401).json({ message: 'token expirado, loguearse nuevamente' });
    res.status(error.code || 500).json({ message: error.message });
  }
}

const decodeToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'token no encontrado' });
    const { user } = jwt.verify(token, process.env.SECRET_WORD);
    req.userId = user.id; 
    req.isAdmin = user.isAdmin;
    next(); 
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message }); 
  }
}

const adminRequiredVal = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'token no encontrado' });
    const { user } = jwt.verify(token, process.env.SECRET_WORD);
    req.userId = user.id; 
    req.isAdmin = user.isAdmin;
    if (!user.isAdmin) return res.status(400).json({ message: 'usuario sin privilegios requeridos' });
    next(); 
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message }); 
  }
}

module.exports = {
  verifyJwt,
  decodeToken,
  adminRequiredVal,
};
