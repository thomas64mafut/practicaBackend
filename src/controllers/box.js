const Box = require('../models/Box');

const createBox = async (req, res) => {
  try {
    const { pokemon, quantity } = req.body; 
    const boxFound = await Box.findOne({ owner: req.userId, deleted: false }); // agregar props de borrado logico
    if (!boxFound) {
      const payload = {
        pokemons: [
          req.body,
        ],
        owner: req.userId,
      }
      const box = new Box(payload); 
      await box.save();
      return res.status(200).json({ message: 'caja creada de forma exitosa', box });
    } 
   
    const pokemonInBoxFound = boxFound.pokemons?.find((pokemonToFind) => pokemonToFind.pokemon?.toString() === pokemon);
    if (pokemonInBoxFound) {
      const newPokemonList = boxFound.pokemons.map((pokemonInBox) => {
        if (pokemonInBox.pokemon?.toString() !== pokemon) return pokemonInBox; 
        return {
          pokemon,
          quantity: pokemonInBox.quantity + quantity,
        };
      }) 
      const boxUpdate = await Box.findByIdAndUpdate(boxFound._id, { pokemons: newPokemonList }, { new: true });
      return res.status(200).json({ message: 'caja creada de forma exitosa', box: boxUpdate });
    }
    const updatedBox = await Box.findByIdAndUpdate(
      boxFound._id,
      { $push: { pokemons: req.body } }, 
      { new: true }
    );
    return res.status(200).json({ message: 'caja editado forma exitosa', box: updatedBox })
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
}

const deletePokemon = async (req, res) => {
  try {
    const { pokemon, quantity } = req.body; 
    const boxFound = await Box.findOne({ owner: req.userId, deleted: false }); 
    const pokemonInBoxFound = boxFound.pokemons.find((pokemonInBox) => pokemonInBox.pokemon.toString() === pokemon);

    if (quantity >= pokemonInBoxFound.quantity) {
      const updatedBox = await Box.findByIdAndUpdate(
        boxFound._id,
        { $pull: { pokemons: req.body } }, 
        { new: true }
      );
      return res.status(200).json({ message: 'caja editado forma exitosa', box: updatedBox })
    }

    const newPokemonList = boxFound.pokemons.map((pokemonInBox) => {
        if (pokemonInBox.pokemon?.toString() !== pokemon) return pokemonInBox; 
        return {
          pokemon,
          quantity: pokemonInBox.quantity - quantity,
        };
    });

    const boxUpdate = await Box.findByIdAndUpdate(boxFound._id, { pokemons: newPokemonList }, { new: true });
    return res.status(200).json({ message: 'caja creada de forma exitosa', box: boxUpdate });
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
}

const getBox = async (req, res) => {
  try {
    const boxFound = await Box.findOne({ owner: req.userId, deleted: false });
    if (!boxFound) {
      return res.status(400).json({ message: 'el usuario no tiene carritos' });
    }
    res.status(200).json({ box: boxFound });
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
}

module.exports = {
  createBox,
  deletePokemon,
  getBox,
}
