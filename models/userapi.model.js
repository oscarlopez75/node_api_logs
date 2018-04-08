const mongoose = require('mongoose');

const UserApiSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  access: {
    type: String,
    required: true,
  },
  status: {
    type: String
  }
});




module.exports = mongoose.model('UserApi', UserApiSchema);
