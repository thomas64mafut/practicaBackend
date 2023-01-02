const { model, Schema, default: mongoose } = require ('mongoose');

const PokemonSchema = new Schema ({
  name: {
    type: String,
  },
  flavorText: {
    type: String,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PokemonType',
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
    default: 0,
  },
},{
  versionKey: false,
})   

const Pokemon = model('Pokemon', PokemonSchema);

module.exports = Pokemon;