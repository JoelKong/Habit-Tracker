const mongoose = require("mongoose");

//Schemas
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
});

//Models
const UserModel = mongoose.model("users", UserSchema);

//Exports
module.exports = UserModel;
