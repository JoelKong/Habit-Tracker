const mongoose = require("mongoose");

//User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

// User Model
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
