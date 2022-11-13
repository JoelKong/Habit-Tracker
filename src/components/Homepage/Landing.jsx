import React from "react";
import { useGlobalContext } from "../../context";

export const Landing = () => {
  const { openLogIn, openSignUp } = useGlobalContext();

  return (
    <article>
      <header className="headerdiv">
        <div>
          <h1 className="brand">StreakX</h1>
          <div className="underline"></div>
        </div>
      </header>
      <section className="container">
        <div className="landing-div">
          <p className="landing-p">Habit Tracking Made Easy</p>
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
