const express = require('express');
const { createUsersValidations, authUsersValidations } = require('../middlewares/users');
const { decodeToken, verifyJwt, adminRequiredVal} = require('../middlewares/auth');
const { validate } = require('../helpers/validate');
const { 
    addUser, 
    authUser, 
    getUserData, 
    getAllUsers, 
    deleteUser, 
    updateBalance, 
    addMultipleUsers, 
    authStatus,
    updateUser, 
} = require('./../controllers/user');
const router = express.Router();

router.get('/', adminRequiredVal, getUserData);
router.get('/all', verifyJwt, decodeToken, getAllUsers);
router.post('/register', createUsersValidations, addUser);
router.post('/auth', authUsersValidations(),  validate, authUser);
router.patch('/wallet', decodeToken, updateBalance);
router.patch("/", decodeToken, updateUser)
router.patch('/:id', verifyJwt, deleteUser);
router.get("/authStatus", adminRequiredVal, authStatus)

module.exports = router; 