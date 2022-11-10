import React from "react";
import { LandingForm } from "./LandingForm";
import { Landing } from "./Landing";

export const Home = () => {
  return (
    <React.Fragment>
      <Landing />
      <LandingForm />
    </React.Fragment>
  );
};
