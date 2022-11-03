import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";

export const Main = ({ user }) => {
  useEffect(() => {
    console.log("done");
    sessionStorage.setItem("user", JSON.stringify(user));
  }, []);

  const { account } = useGlobalContext();
  const { name } = user;

  return (
    <div className="headerdiv">
      <p>Welcome {name}</p>
    </div>
  );
};
