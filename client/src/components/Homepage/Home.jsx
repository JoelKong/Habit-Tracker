import React from "react";
import { LandingForm } from "./LandingForm";
import { Landing } from "./Landing";
import { Footer } from "../Global/Footer";

export const Home = () => {
  return (
    <React.Fragment>
      <Landing />
      <LandingForm />
      <Footer />
    </React.Fragment>
  );
};
