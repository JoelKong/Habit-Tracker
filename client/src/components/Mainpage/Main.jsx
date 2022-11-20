import React, { useEffect } from "react";
import { Header } from "../Global/Header";
import { Habits } from "./Habits";
import { Overview } from "./Overview";
import { DateTimeDisplay } from "../Global/DateTimeDisplay";
import { useCountdown } from "../Global/useCountdown";
import { Footer } from "../Global/Footer";
import { useGlobalContext } from "../../context";

export const Main = ({ user, targetDate }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  const ShowCounter = ({ hours, minutes, seconds }) => {
    return (
      <div className="show-counter countdown-link">
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={hours <= 1} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={hours <= 1} />
        <p>:</p>
        <DateTimeDisplay
          value={seconds}
          type={"Seconds"}
          isDanger={hours <= 1}
        />
        <p>till reset</p>
      </div>
    );
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (hours + minutes + seconds <= 0) {
    return <Overview />;
  } else {
    return (
      <main>
        <Header />
        <div className="headerhabit">
          <p className="habit-header">{`Welcome ${capitalizeFirstLetter(
            user.name
          )}`}</p>
          <div className="underline-habit"></div>
          <div className="habit-reset">
            <ShowCounter hours={hours} minutes={minutes} seconds={seconds} />
          </div>
        </div>
        <Habits />
      </main>
    );
  }
};
