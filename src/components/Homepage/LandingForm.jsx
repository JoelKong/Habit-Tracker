import React, { useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { useGlobalContext } from "../../context";

export const LandingForm = () => {
  const {
    disable,
    isLogIn,
    attemptLogIn,
    closeLogIn,
    isSignUp,
    handleSubmit,
    handleChange,
    handleSignUp,
    formValue,
    loginFocus,
  } = useGlobalContext();

  const handleKeyDown = (e, func) => {
    if (e.key === "Enter") {
      return func();
    } else if (e.key === "Escape") {
      return closeLogIn();
    }
  };

  const userFocus = useRef(null);

  useEffect(() => {
    userFocus.current.focus();
  }, [isLogIn]);

  return (
    <div
      className={`${
        attemptLogIn ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="login-header">
          <h3 className="text">{`${isSignUp ? "Sign Up" : "Log In"}`}</h3>
          <div className="modal-div">
            <Modal />
          </div>
        </div>
        <form
          className="form-landing"
          onKeyDown={(e) =>
            isSignUp
              ? handleKeyDown(e, () => handleSignUp(e))
              : handleKeyDown(e, () => handleSubmit(e))
          }
        >
          {isSignUp && (
            <div className="form-div">
              <label htmlFor="name" className="text">
                Name:
              </label>
              <input
                disabled={disable}
                onChange={(e) => handleChange(e)}
                value={formValue.name}
                name="name"
                type="text"
                placeholder="Name"
                id="name"
                className="input-form"
                required
                autoFocus
              ></input>
            </div>
          )}

          <div className="form-div">
            <label htmlFor="username" className="text">
              Username:
            </label>
            <input
              disabled={disable}
              ref={userFocus}
              onChange={(e) => handleChange(e)}
              value={formValue.username}
              name="username"
              type="text"
              placeholder="Username"
              id="username"
              className="input-form"
              required
              autoComplete="on"
            ></input>
          </div>

          <div className="form-div">
            <label htmlFor="password" className="text">
              Password:
            </label>
            <input
              disabled={disable}
              onChange={(e) => handleChange(e)}
              value={formValue.password}
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              className="input-form"
              required
              autoComplete="on"
            ></input>
          </div>
        </form>

        <div className="login-button">
          <button className="btn1" onClick={closeLogIn} disabled={disable}>
            Cancel
          </button>
          <button
            disabled={disable}
            type="submit"
            className="btn2"
            ref={loginFocus}
            onClick={(e) => (isSignUp ? handleSignUp(e) : handleSubmit(e))}
          >
            {`${isSignUp ? "Sign Up" : "Log In"}`}
          </button>
        </div>
      </div>
    </div>
  );
};
