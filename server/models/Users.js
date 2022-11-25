const mongoose = require("mongoose");

const getDate = () => {
  let yourDate = new Date();
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

  return yourDate.toISOString().split("T")[0];
};
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
  overview: {
    type: Boolean,
    default: false,
  },
  lastsubmitted: {
    type: Date,
    default: null,
  },
  lastlogin: {
    type: Date,
    default: null,
  },
  sortedoverview: {
    type: Array,
    default: null,
  },
});

// User Model
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
