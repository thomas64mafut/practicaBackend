const express = require('express');
const { decodeToken } = require('../middlewares/auth');
const { createBox, deletePokemon, getBox } = require('../controllers/box');
const router = express.Router();

router.post('/', decodeToken, createBox)
router.patch('/', decodeToken, deletePokemon)
router.get('/', decodeToken, getBox)
module.exports = router; 