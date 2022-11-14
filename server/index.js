//Import dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Import Collections
const UserModel = require("./models/Users");
const HabitModel = require("./models/Habits");

//Connect to MongoDB atlas
mongoose.connect(
  "mongodb+srv://joelkong2001:rjge7nft@cluster0.7ohyjiv.mongodb.net/habittracker?retryWrites=true&w=majority"
);

//Middleware
app.use(express.json());
app.use(cors());

//Start Server
app.listen(process.env.PORT || 3001, () =>
  console.log("Server running on port 3001")
);

//Sign Up
app.post("/signup", async (req, res) => {
  const user = req.body;
  const userExist = await UserModel.exists({ username: req.body.username });
  if (userExist) {
    res.send(true);
    return;
  }

  const newUser = new UserModel(user);
  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

//Log In
app.post("/checklogin", (req, res) => {
  const user = req.body;
  UserModel.findOne(
    { username: user.username, password: user.password },
    (err, user) => {
      if (err || !user) {
        res.send(true);
      } else {
        res.json(user);
      }
    }
  );
});

//New Habit
app.post("/sendhabit", async (req, res) => {
  const habit = req.body;
  const getDate = () => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  };

  const newHabit = new HabitModel();
  newHabit.id.push(habit[1]);
  newHabit.habit = habit[0];
  newHabit.start = getDate();

  try {
    await newHabit.save();
    res.json(newHabit.habit);
  } catch (error) {
    console.log(error);
  }
});

//List All Habits
app.post("/home", (req, res) => {
  const body = req.body;

  HabitModel.find({ id: { $all: [body._id] } }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//Update Habit
app.patch("/updatehabit", (req, res) => {
  const body = req.body;

  HabitModel.updateOne({ _id: body[0] }, { habit: body[1] }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(body[0]);
    }
  });
});

//Delete Habit
app.delete("/deletehabit", (req, res) => {
  const body = req.body;

  HabitModel.deleteOne({ _id: body.source }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(body.source);
    }
  });
});

//Track Completed
app.post("/completed", (req, res) => {
  const body = req.body;

  HabitModel.updateOne({ _id: body[0] }, { ticked: body[1] }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(body[1]);
    }
  });
});

//Progress Bar
app.post("/progress", (req, res) => {
  const body = req.body;

  UserModel.findOneAndUpdate(
    { _id: body[0] },
    { progress: body[1] },
    { new: true },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

//app.get("/", (req, res) => {
//return all info
//  UserModel.find({}, (err, result) => {
//    if (err) {
//      res.json(err);
//    } else {
//send data bck to front end
//      res.json(result);
//    }
//  });
//});

//front end send data to back
//app.post("/", async (req, res) => {
//  const user = req.body;

//add data to collection
//  const newUser = new UserModel(user);
//  await newUser.save();

//send back to front end
//  res.json(user);
//});
