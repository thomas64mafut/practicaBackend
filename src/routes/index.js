const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/pokemons', require('./pokemons'));
router.use('/pokemonTypes', require('./pokemonTypes'));
router.use('/box', require('./box'));
router.use('/sale', require('./sale'));

module.exports = router; 
