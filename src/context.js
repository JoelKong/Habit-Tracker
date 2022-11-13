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
        const userData = await Axios.post("http://localhost:3001/signup", user);
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
          "http://localhost:3001/checklogin",
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
            "http://localhost:3001/sendhabit",
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
      const getHabits = await Axios.post("http://localhost:3001/home", account);
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
                  "http://localhost:3001/updatehabit",
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
    const deletedHabit = async () => {
      const habitDeleted = await Axios.delete(
        "http://localhost:3001/deletehabit",
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
    const findHabit = habits.find((hab) => {
      return hab._id === id;
    });

    if (findHabit.ticked) {
      await Axios.post("http://localhost:3001/completed", [id, false]);
    } else {
      await Axios.post("http://localhost:3001/completed", [id, true]);
    }

    setIsChecked(true);
  };

  //Progress Bar
  const fetchProgress = async (formula) => {
    const newProgress = await Axios.post("http://localhost:3001/progress", [
      account._id,
      formula,
    ]);
    setAccount(newProgress.data);
  };

  useEffect(() => {
    let progressFormula = Math.round((completed / habits.length) * 100);
    fetchProgress(progressFormula);
  }, [completed, habitText]);

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
