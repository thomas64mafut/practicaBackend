const { model, Schema } = require('mongoose');

const UserSchema = new Schema ({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
  }
},{
  versionKey: false
})

const User = model('User', UserSchema);

module.exports = User; 