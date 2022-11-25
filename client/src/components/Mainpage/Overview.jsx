import React from "react";
import { useGlobalContext } from "../../context";
import { Header } from "../Global/Header";
import { useCountdown } from "../Global/useCountdown";
import { Footer } from "../Global/Footer";
import { DateTimeDisplay } from "../Global/DateTimeDisplay";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export const Overview = ({ targetDate }) => {
  const { account, resetDay, habits } = useGlobalContext();
  const { lastsubmitted: lastSubmitted, sortedoverview: sortedOverview } =
    account;
  const lastSubmittedSubStr = lastSubmitted.substr(0, 10);

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

  const getDate = () => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    return yourDate.toISOString().split("T")[0];
  };

  const currentDate = getDate().substr(8, 9);
  const submittedDate = lastSubmittedSubStr.substr(8, 9);

  return (
    <main>
      <Header />
      <div className="headerhabit">
        <p className="habit-header">{`Day Overview for ${lastSubmittedSubStr}`}</p>
        <div className="underline-overview" />
      </div>
      <div className="habit-reset">
        <ShowCounter hours={hours} minutes={minutes} seconds={seconds} />
      </div>

      <section className="overview-section">
        {sortedOverview &&
          sortedOverview.map((sortOverview) => {
            const { tickedon: tickedOn, habit, _id } = sortOverview;
            return (
              <div key={_id} className="overview-div">
                <span className="tick-on">{tickedOn}</span>
                <p className="habit-overview">{`Finished "${habit}"`}</p>
              </div>
            );
          })}

        {habits.map((habitt) => {
          const { tickedon: tickedOn, habit, _id } = habitt;
          return (
            !tickedOn && (
              <div key={_id} className="overview-div">
                <p className="habit-overview-incomplete">{`Did not complete "${habit}"`}</p>
              </div>
            )
          );
        })}

        {currentDate - submittedDate > 1 && (
          <div className="overview-div">
            <p className="habit-overview-incomplete">
              {`You did not do anything the past ${
                currentDate - submittedDate
              } days :C`}
            </p>
          </div>
        )}
      </section>
      {getDate() === lastSubmittedSubStr && (
        <button className="finish-day" onClick={() => resetDay()}>
          Next
          <span className="finish-day-icon">
            <BsFillArrowRightCircleFill />
          </span>
        </button>
      )}
      <Footer />
    </main>
  );
};
