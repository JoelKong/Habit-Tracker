const mongoose = require("mongoose");

//Habit Schema
const HabitSchema = new mongoose.Schema({
  id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
    },
  ],
  habit: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  ticked: {
    type: Boolean,
    default: false,
  },
  tickedon: {
    type: String,
    default: null,
  },
});

//Habit Model
const HabitModel = mongoose.model("habits", HabitSchema);
module.exports = HabitModel;
