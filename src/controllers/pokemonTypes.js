const PokemonType = require('../models/PokemonType');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createType = async (req, res) => {
  try {
    const type = new PokemonType(req.body)
    await type.save();
    res.status(200).json({ message: 'tipo de pokemon creado correctamente', data: type });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const editType = async (req, res) => {
  try {
    const { id } = req.params;
    const editedPokemonType = await PokemonType.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'tipo editado exitosamente', type: editedPokemonType }); 
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}

const deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    await PokemonType.deleteOne({ _id: id });
    res.status(200).json({ message: 'tipo eliminado exitosamente' }); 
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
}
module.exports = {
  createType,
  editType,
  deleteType,
}
