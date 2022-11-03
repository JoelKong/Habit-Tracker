import React, { useState, useEffect, useContext, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //Global States
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [buttonState, setButtonState] = useState(false);

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
        if (userData.data === true) {
          setButtonState(true);
          showAlert(true, "Username Already Exists", "danger");
          return;
        } else {
          setAccount(userData.data);
          setButtonState(true);
          showAlert(true, "Successfully Created", "success");
          setUser({ name: "", username: "", password: "" });
          loginFocus.current.innerText = "";
          loginFocus.current.classList.add("button--loading");
          await new Promise((r) => setTimeout(r, 3000));
          navigate("/home");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    registerUser();

    //setUser({ name: "", username: "", password: "" });

    // Axios.get("http://localhost:3001/").then((response) => {
    // setState(response.data);
    // });
    //  }, []);
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
          setAccount(postData.data);
          setButtonState(true);
          showAlert(true, "Successful", "success");
          loginFocus.current.innerText = "";
          loginFocus.current.classList.add("button--loading");
          await new Promise((r) => setTimeout(r, 3000));
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

  //Protected Route
  const ProtectedRoute = ({ children, user }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  //Pages States
  const [error, setError] = useState(false);

  return (
    <AppContext.Provider
      value={{
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
