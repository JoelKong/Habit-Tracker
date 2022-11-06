import React, { useEffect } from "react";
import { Header } from "../Global/Header";
import { Habits } from "./Habits";
import { Footer } from "../Global/Footer";
import { useGlobalContext } from "../../context";

export const Main = ({ user }) => {
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, []);

  const { account } = useGlobalContext();
  const { name } = user;

  return (
    <main>
      <Header />
      <div className="headerhabit">
        <p className="habit-header">My Habits</p>
        <div className="underline-habit"></div>
      </div>
      <Habits />
    </main>
  );
};
