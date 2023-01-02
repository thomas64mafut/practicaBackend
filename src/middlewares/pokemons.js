const jwt = require('jsonwebtoken');
const { verifyJwt } = require('./auth');
const Pokemon = require('../models/Pokemon');
const PokemonType = require('../models/PokemonType');

const addPokemonMiddleware = async (req, res, next) => {
  try {
    const { name, flavorText, type } = req.body;
    if (!type) return res.status(400).json({ message: 'ingresar tipo porfavor'});
    if (!name) return res.status(400).json( { message: 'ingresar nombre porfavor' });
    if (!flavorText) return res.status(400).json( { message: 'ingresar flavorText  porfavor' });
    
    const typeFound = await PokemonType.findById(type);
    if (!typeFound) return res.status(400).json({ message: 'el tipo ingresado no existe' });
    next();
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

const deletePokemonMiddleware = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'el parametro id es requerido' });
    const pokemon = await Pokemon.findById(id);
    if (!pokemon) return res.status(400).json({ message: 'el pokemon seleccionado no existe' });
    next();
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

module.exports = {
  addPokemonMiddleware,
  deletePokemonMiddleware,
}