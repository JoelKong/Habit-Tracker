//Import dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//Import Collections
const UserModel = require("./models/Users");

//Connect to MongoDB atlas
mongoose.connect(
  "mongodb+srv://joelkong2001:rjge7nft@cluster0.7ohyjiv.mongodb.net/habittracker?retryWrites=true&w=majority"
);

//Middleware
app.use(express.json());
app.use(cors());

//Start Server
app.listen(3001, () => console.log("Server running on port 3001"));

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
    res.json(user);
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
