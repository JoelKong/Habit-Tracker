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

app.listen(3001, () => console.log("Server running on port 3001"));

//Sign Up
app.post("/", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  try {
    await newUser.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
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
