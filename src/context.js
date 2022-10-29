import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //Form States
  const [attemptLogIn, setAttemptLogIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openLogIn = () => {
    setAttemptLogIn(true);
  };
  const closeLogIn = () => {
    setAttemptLogIn(false);
    setIsSignUp(false);
  };

  const openSignUp = () => {
    setIsSignUp(true);
    setAttemptLogIn(true);
  };
  const closeSignUp = () => {
    setIsSignUp(false);
    setAttemptLogIn(false);
  };

  //Use effects
  //Log in

  //User States
  const [user, setUser] = useState({ name: "", username: "", password: "" });
  const [account, setAccount] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    const registerUser = async () => {
      try {
        const userData = await Axios.post("http://localhost:3001/", user);
        console.log(userData);
        setError(true);
      } catch (error) {
        console.log("error", error);
      }
    };
    setUser({ name: "", username: "", password: "" });
    registerUser();
    // Axios.get("http://localhost:3001/").then((response) => {
    // setState(response.data);
    // });
    //  }, []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkUser = async () => {
      try {
        //post first
        const postData = await Axios.get("http://localhost:3001/");
      } catch (error) {}
    };
  };

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [target]: value });
  };

  //Pages States
  const [error, setError] = useState(false);

  return (
    <AppContext.Provider
      value={{
        attemptLogIn,
        isSignUp,
        openLogIn,
        closeLogIn,
        openSignUp,
        closeSignUp,
        handleSubmit,
        handleChange,
        handleSignUp,
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
