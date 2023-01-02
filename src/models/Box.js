const { model, Schema, mongoose } = require ('mongoose');
const Pokemon = require('./Pokemon');

const BoxSchema = new Schema ({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pokemons: [
    {
      pokemon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
      },
      quantity: {
        type: Number,
        default: 1,
      },
      _id: false,
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
},{
  versionKey: false,
})   

const Box = model('Box', BoxSchema);

module.exports = Box;