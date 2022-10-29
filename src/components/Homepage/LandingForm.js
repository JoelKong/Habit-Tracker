import React from "react";
import { useGlobalContext } from "../../context";

export const LandingForm = () => {
  const {
    attemptLogIn,
    closeLogIn,
    isSignUp,
    handleSubmit,
    handleChange,
    handleSignUp,
  } = useGlobalContext();

  return (
    <div
      className={`${
        attemptLogIn ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="login-header">
          <h3 className="text">{`${isSignUp ? "Sign Up" : "Log In"}`}</h3>
        </div>
        <form
          className="form-landing"
          onSubmit={(e) => (isSignUp ? handleSignUp(e) : handleSubmit(e))}
        >
          {isSignUp && (
            <div className="form-div">
              <label htmlFor="name" className="text">
                Name:
              </label>
              <input
                onChange={(e) => handleChange(e)}
                name="name"
                type="text"
                placeholder="Name"
                id="name"
                className="input-form"
                required
              ></input>
            </div>
          )}

          <div className="form-div">
            <label htmlFor="username" className="text">
              Username:
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="username"
              type="text"
              placeholder="Username"
              id="username"
              className="input-form"
              required
            ></input>
          </div>

          <div className="form-div">
            <label htmlFor="password" className="text">
              Password:
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              type="text"
              placeholder="Password"
              id="password"
              className="input-form"
              required
            ></input>
          </div>
        </form>

        <div className="login-button">
          <button className="btn1" onClick={closeLogIn}>
            Cancel
          </button>
          <button
            className="btn2"
            onClick={(e) => (isSignUp ? handleSignUp(e) : handleSubmit(e))}
          >
            {`${isSignUp ? "Sign Up" : "Log In"}`}
          </button>
        </div>
      </div>
    </div>
  );
};
