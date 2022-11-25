import React, { useState, useEffect, useContext, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //Global States
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [buttonState, setButtonState] = useState(false);
  const [disable, setDisable] = useState(false);
  const [sortedHabits, setSortedHabits] = useState([]);

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  //Form States (Home)
  const [isLogIn, setisLogIn] = useState(false);
  const [attemptLogIn, setAttemptLogIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openLogIn = () => {
    setAttemptLogIn(true);
    setisLogIn(true);
  };
  const closeLogIn = () => {
    setUser({ name: "", username: "", password: "" });
    setAlert({ show: false, msg: "", type: "" });
    setAttemptLogIn(false);
    setIsSignUp(false);
    setisLogIn(false);
  };

  const openSignUp = () => {
    setIsSignUp(true);
    setAttemptLogIn(true);
  };
  const closeSignUp = () => {
    setUser({ name: "", username: "", password: "" });
    setAlert({ show: false, msg: "", type: "" });
    setIsSignUp(false);
    setAttemptLogIn(false);
  };

  const loginFocus = useRef(null);

  //User States (Home)
  const [user, setUser] = useState({ name: "", username: "", password: "" });
  const formValue = user;
  const [account, setAccount] = useState(() => {
    const saved = sessionStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!user.name || !user.username || !user.password) {
      setButtonState(true);
      showAlert(true, "All Fields Are Required", "danger");
      return;
    }

    const registerUser = async () => {
      try {
        const userData = await Axios.post(
          "https://streakx.herokuapp.com/signup",
          user
        );
        // const userData = await Axios.post(
        //   "https://streakx.herokuapp.com/signup",
        //   user
        // );

        if (userData.data === true) {
          setButtonState(true);
          showAlert(true, "Username Already Exists", "danger");
          return;
        } else {
          setDisable(true);
          setAccount(userData.data);
          setButtonState(true);
          showAlert(true, "Successfully Created", "success");
          setUser({ name: "", username: "", password: "" });
          loginFocus.current.innerText = "";
          loginFocus.current.classList.add("button--loading");
          await new Promise((r) => setTimeout(r, 3000));
          setDisable(false);
          setisLogIn(false);
          setAttemptLogIn(false);
          setIsSignUp(false);
          showAlert(false, "", "");
          navigate("/home");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    registerUser();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUser = async () => {
      try {
        const postData = await Axios.post(
          "https://streakx.herokuapp.com/checklogin",
          user
        );
        if (postData.data === true) {
          setButtonState(true);
          showAlert(true, "Invalid User", "danger");
          return;
        } else {
          setDisable(true);
          setAccount(postData.data);
          setButtonState(true);
          showAlert(true, "Successful", "success");
          loginFocus.current.classList.add("button--loading");
          loginFocus.current.classList.add("btn-load");
          await new Promise((r) => setTimeout(r, 3000));
          setDisable(false);
          setisLogIn(false);
          setAttemptLogIn(false);
          setIsSignUp(false);
          showAlert(false, "", "");
          navigate("/home");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    checkUser();
    setUser({ name: "", username: "", password: "" });
  };

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [target]: value });
  };

  //States (Main Page)
  let incompleteSubmission = false;
  const [newHabit, setNewHabit] = useState(false);
  const habitRef = useRef(null);
  const editRef = useRef(null);
  const [habitText, setHabitText] = useState(false);
  const [editText, setEditText] = useState(false);
  const [deletedHabit, setDeletedHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [disableActions, setDisableActions] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [overview, setOverview] = useState(false);
  const [incomplete, setIncomplete] = useState(false);

  //New Habit (Main Page)
  const addHabit = () => {
    setNewHabit(true);
    setDisableActions(true);
  };

  const confirmHabit = () => {
    const sendHabit = async () => {
      try {
        if (habitRef.current.value) {
          const postHabit = await Axios.post(
            "https://streakx.herokuapp.com/sendhabit",
            [habitRef.current.value, account._id]
          );
          setHabitText(true);
        } else {
          return;
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    sendHabit();
    setDisableActions(false);
    setNewHabit(false);
  };

  //List All Habits
  const fetchHabits = async () => {
    try {
      let complete = 0;
      const array = [];
      const getHabits = await Axios.post(
        "https://streakx.herokuapp.com/home",
        account
      );
      const reversedKeys = Object.keys(getHabits.data).reverse();
      reversedKeys.forEach((key) => {
        array.push(getHabits.data[key]);
      });
      for (let arr of array) {
        arr.modify = false;
        if (arr.ticked === true) {
          complete += 1;
        }
      }
      setCompleted(complete);
      setHabits(array);
      setHabitText(false);
      setEditText(false);
      setIsChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [account, habitText, editText, deletedHabit, isChecked]);

  //Edit Habit
  const editHabit = (id) => {
    setHabits(
      habits.map((obj) => {
        if (obj._id === id) {
          if (obj.modify || newHabit) {
            setDisable(false);
            setDisableActions(false);
            if (editRef.current.value !== obj.habit) {
              const patchHabit = async () => {
                const updateHabit = await Axios.patch(
                  "https://streakx.herokuapp.com/updatehabit",
                  [id, editRef.current.value]
                );
                setEditText(true);
              };
              patchHabit();
            }
            return { ...obj, modify: false };
          }
          setDisable(true);
          setDisableActions(true);
          return { ...obj, modify: true };
        } else {
          return { ...obj, modify: false };
        }
      })
    );
  };

  //Delete Habit
  const deleteHabit = (id) => {
    const findHabit = habits.find((hab) => {
      return hab._id === id;
    });

    const index = sortedHabits.findIndex((obj) => {
      return obj._id === id;
    });

    if (index > -1) {
      sortedHabits.splice(index, 1);
    }

    const deletedHabit = async () => {
      const habitDeleted = await Axios.delete(
        "https://streakx.herokuapp.com/deletehabit",
        {
          data: {
            source: findHabit._id,
          },
        }
      );
      setDeletedHabit(habitDeleted.data);
    };
    deletedHabit();
  };

  //Track number of completed habits
  const handleCompletedChange = async (id) => {
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

    const findHabit = habits.find((hab) => {
      return hab._id === id;
    });
    if (findHabit.ticked) {
      const index = sortedHabits.findIndex((obj) => {
        return obj._id === findHabit._id;
      });
      if (index > -1) {
        sortedHabits.splice(index, 1);
      }
      await Axios.post("https://streakx.herokuapp.com/completed", [
        id,
        false,
        sortedHabits,
        account._id,
      ]);
    } else {
      findHabit.tickedon = formatAMPM(new Date());
      findHabit.ticked = true;
      sortedHabits.push(findHabit);

      await Axios.post("https://streakx.herokuapp.com/completed", [
        id,
        true,
        sortedHabits,
        account._id,
      ]);
    }

    setIsChecked(true);
  };

  //Progress Bar
  const fetchProgress = async (formula) => {
    const newProgress = await Axios.post(
      "https://streakx.herokuapp.com/progress",
      [account._id, formula]
    );
    setAccount(newProgress.data);
  };

  useEffect(() => {
    let progressFormula = Math.round((completed / habits.length) * 100);
    fetchProgress(progressFormula);
  }, [completed, habitText]);

  //Finish Day
  const allCompleted = () => {
    if (account.progress === 100 || incompleteSubmission) {
      const updateOverview = async () => {
        const patchOverview = await Axios.patch(
          "https://streakx.herokuapp.com/updateoverview",
          [account._id, sortedHabits]
        );
        setAccount(patchOverview.data);
      };
      updateOverview();
      setOverview(true);
    } else {
      setIncomplete(true);
    }
  };

  const confirmIncomplete = () => {
    incompleteSubmission = true;
    allCompleted();
  };

  //Reset Day
  const resetDay = async () => {
    await Axios.patch("https://streakx.herokuapp.com/resetday", [
      account._id,
      false,
    ]);
    for (let habit of habits) {
      habit.ticked = false;
    }
    setCompleted(0);
    setSortedHabits([]);
    setIncomplete(false);
    setOverview(false);
    window.location.reload(false);
  };

  //Protected Route
  const ProtectedRoute = ({ children, user }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <AppContext.Provider
      value={{
        //HomePage
        disable,
        account,
        ProtectedRoute,
        alert,
        showAlert,
        buttonState,
        setButtonState,
        isLogIn,
        attemptLogIn,
        isSignUp,
        openLogIn,
        closeLogIn,
        openSignUp,
        closeSignUp,
        handleSubmit,
        handleChange,
        handleSignUp,
        formValue,
        loginFocus,
        //Main Page
        newHabit,
        addHabit,
        confirmHabit,
        habitRef,
        fetchHabits,
        habits,
        editHabit,
        deleteHabit,
        editRef,
        disableActions,
        handleCompletedChange,
        incomplete,
        confirmIncomplete,
        allCompleted,
        overview,
        setIncomplete,
        resetDay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
