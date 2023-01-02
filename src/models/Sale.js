const { model, Schema, mongoose } = require ('mongoose');

const SaleSchema = new Schema ({
  box: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Box'
  },
  amount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},{
  versionKey: false,
})   

const Sale = model('Sale', SaleSchema);

module.exports = Sale;