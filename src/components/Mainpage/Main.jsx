import React, { useEffect } from "react";
import { Header } from "../Global/Header";
import { Habits } from "./Habits";
import { Footer } from "../Global/Footer";
import { useGlobalContext } from "../../context";

export const Main = ({ user }) => {
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main>
      <Header />
      <div className="headerhabit">
        <p className="habit-header">{`Welcome ${capitalizeFirstLetter(
          user.name
        )}`}</p>
        <div className="underline-habit"></div>
      </div>
      <Habits />
    </main>
  );
};
