const Pokemon = require('../models/Pokemon');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const savePokemon = async (req, res) => {
  try {
    const newPokemon = new Pokemon(req.body);
    await newPokemon.save();
    res.status(200).json({ message: 'Pokemon guardado en la pokedex con exito', data: newPokemon  })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const getPokemon = async (req, res) => {
  try {
    const { page = 1, limit = 10, paginated = false } = req.query;
    const pokemonCount = await Pokemon.count();
    const pagesCount = Math.ceil(pokemonCount / limit);
    const skip = (page - 1) * limit;
    if (page > pagesCount) return res.status(400).json({ message: 'pagina no encontrada'});

    if (!paginated) {
      const pokemons = await Pokemon.find().populate('type');
      return res.status(200).json({ pokemons })
    }
    const pokemons = await Pokemon.find().skip(skip).limit(limit).populate('type');
    return res.status(200).json({ pokemonCount, pagesCount, currentPage: page, pokemons })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const editPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPokemon = await Pokemon.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ updatedPokemon });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const deletePokemon = async (req, res) => {
  try {
    const { id }  = req.query;
    await Pokemon.deleteOne({ _id: id });
    res.status(200).json({ message: 'pokemon eliminado de la pokedex con exito' })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedPokemon = await Pokemon.findByIdAndUpdate(id, { $inc: { stock: quantity } }, { new: true });
    res.status(200).json({ message: 'cantidad de pokemon actualizada con exito', updatedPokemon })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

module.exports = {
  savePokemon,
  getPokemon,
  editPokemon,
  deletePokemon,
  updateStock,
}