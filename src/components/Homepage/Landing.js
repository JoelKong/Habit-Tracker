import React from "react";
import { useGlobalContext } from "../../context";

export const Landing = () => {
  const { openLogIn, openSignUp } = useGlobalContext();
  return (
    <article>
      <header className="headerdiv">
        <div>
          <h1>Habit Tracker</h1>
          <div className="underline"></div>
        </div>
      </header>
      <section className="container">
        <div className="landing-div">
          <p className="landing-p">Where Habits Makes A Difference</p>
        </div>
        <div className="landing-div-btn">
          <button className="btn1" onClick={openLogIn}>
            Log in
          </button>
          <button className="btn2" onClick={openSignUp}>
            Sign Up
          </button>
        </div>
      </section>
    </article>
  );
};
