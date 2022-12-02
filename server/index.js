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
  process.env.MONGODB_URI ||
    "ADD MONGODB SERVER HERE"
);

//Middleware
app.use(express.json());
app.use(cors());

//Start Server
app.listen(process.env.PORT || 3001, () =>
  console.log("Server running on port 3001")
);

//Functions
const getDate = () => {
  let yourDate = new Date();
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

  return yourDate.toISOString().split("T")[0];
};

//Sign Up
app.post("/signup", async (req, res) => {
  const user = req.body;
  const userExist = await UserModel.exists({ username: req.body.username });
  if (userExist) {
    res.send(true);
    return;
  }

  const newUser = new UserModel(user);
  newUser.lastlogin = getDate();
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
    (err, userr) => {
      if (err || !userr) {
        res.send(true);
      } else {
        UserModel.updateOne(
          { username: user.username, password: user.password },
          { lastlogin: getDate() },
          (err, res) => {
            if (err) {
              res.json(err);
            } else {
              return;
            }
          }
        );
        res.json(userr);
      }
    }
  );
});

//New Habit
app.post("/sendhabit", async (req, res) => {
  const habit = req.body;

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

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  HabitModel.updateOne(
    { _id: body[0] },
    { ticked: body[1], tickedon: formatAMPM(new Date()) },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        UserModel.updateOne(
          { _id: body[3] },
          { sortedoverview: body[2] },
          (err, result) => {
            if (err) {
              res.json(err);
            } else {
              res.json(body[2]);
            }
          }
        );
      }
    }
  );
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

//Finish Day
app.patch("/updateoverview", (req, res) => {
  const body = req.body;
  const getDate = () => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    return yourDate.toISOString().split("T")[0];
  };

  UserModel.findByIdAndUpdate(
    { _id: body[0] },
    { overview: true, lastsubmitted: getDate(), sortedoverview: body[1] },
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

//Reset Day
app.patch("/resetday", (req, res) => {
  const body = req.body;

  HabitModel.updateMany(
    { id: { $all: [body[0]] } },
    { ticked: body[1], tickedon: null },
    { multi: true, upsert: true },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        UserModel.updateOne(
          { _id: body[0] },
          { overview: false, sortedoverview: null, lastlogin: getDate() },
          (err, result) => {
            if (err) {
              res.json(err);
            } else {
              res.json(true);
            }
          }
        );
      }
    }
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
