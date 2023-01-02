const Box = require("../models/Box");
const Pokemon = require("../models/Pokemon");
const Sale = require("../models/Sale");

const createSale = async (req, res) => {
  try {
    const { userId } = req;
    const { box } = req.body;
    const boxData = await Box.findById(box).populate("pokemons.pokemon");

    let amount = 0;
    for (const pokemon of boxData.pokemons) {
      if (pokemon.quantity > pokemon.pokemon.stock)
        return res.status(400).json({
          message: `No hay suficiente stock del pokemon ${pokemon.pokemon.name}, la cantidad disponible es de ${pokemon.pokemon.stock} unidades`,
        });
      const totalPokemonPrice = pokemon.quantity * pokemon.pokemon.price;
      amount += totalPokemonPrice;
    }
    const payload = {
      box,
      amount,
      client: userId,
    };
    const sale = new Sale(payload);
    await sale.save();
    await Box.findByIdAndUpdate(box, { delete: true });
    for await (const pokemon of boxData.pokemons) {
      await Pokemon.findByIdAndUpdate(pokemon.pokemon._id, { $inc: { stock: (product.quantity * -1) } });
    }

    res.status(200).json({ message: "Venta completada de forma exitosa" });
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  createSale,
};
