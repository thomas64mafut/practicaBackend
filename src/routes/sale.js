const express = require('express');
const { createSale,  } = require('../controllers/sale');
const { decodeToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/', decodeToken, createSale);
module.exports = router; 