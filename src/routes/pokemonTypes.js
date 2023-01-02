const express = require('express');
const { createType, editType, deleteType } = require('../controllers/pokemonTypes');
const router = express.Router();

const { verifyJwt } = require('./../middlewares/auth')

router.post('/', createType);
router.patch('/:id', editType);
router.delete('/:id', deleteType);

module.exports = router; 