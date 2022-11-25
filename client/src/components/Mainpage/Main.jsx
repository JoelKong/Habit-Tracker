import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Header } from "../Global/Header";
import { Habits } from "./Habits";
import { Overview } from "./Overview";
import { IncompletePrompt } from "./IncompletePrompt";
import { DateTimeDisplay } from "../Global/DateTimeDisplay";
import { useCountdown } from "../Global/useCountdown";
import { Footer } from "../Global/Footer";
import { useGlobalContext } from "../../context";

export const Main = ({ user, targetDate }) => {
  const {
    allCompleted,
    incomplete,
    account,
    overview,
    disable,
    disableActions,
    habits,
  } = useGlobalContext();

  const [hours, minutes, seconds] = useCountdown(targetDate);

  const getEnd = () => {
    var end = new Date();
    end.setUTCHours(23, 59, 59, 999);
    return end;
  };

  const getDate = () => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    return yourDate.toISOString().split("T")[0];
  };

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

  if (getDate() > account.lastlogin) {
    allCompleted();
  }

  if (getDate() > account.lastlogin || overview || account.overview) {
    return <Overview targetDate={getEnd()} />;
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
        {habits.length !== 0 && (
          <button
            className="finish-day"
            disabled={disable || disableActions}
            onClick={() => allCompleted()}
          >
            Finish Day
            <span className="finish-day-icon">
              <BsFillArrowRightCircleFill />
            </span>
          </button>
        )}
        {incomplete && <IncompletePrompt />}
        <Footer />
      </main>
    );
  }
};
