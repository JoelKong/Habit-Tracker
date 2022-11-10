import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";

export const Modal = () => {
  const { alert, showAlert, buttonState, setButtonState } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
      setButtonState(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [buttonState]);

  return (
    <React.Fragment>
      {alert.show && <p className={`alert alert-${alert.type}`}>{alert.msg}</p>}
    </React.Fragment>
  );
};
