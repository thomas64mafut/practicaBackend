const { model, Schema } = require ('mongoose');

const PokemonTypeSchema = new Schema ({
  name: {
    type: String,
  },
},{
  versionKey: false,
})   

const PokemonType = model('PokemonType', PokemonTypeSchema);

module.exports = PokemonType;