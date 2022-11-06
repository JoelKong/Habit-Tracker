import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";

export const Habits = () => {
  const { addHabit, newHabit, confirmHabit, habitRef, habits } =
    useGlobalContext();

  return (
    <section className="table-section">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>Daily Habits</th>
            <th>Started On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {newHabit && (
            <tr>
              <td className="table-data">
                <textarea
                  ref={habitRef}
                  autoFocus
                  className="text-area"
                  rows="2"
                  cols="42"
                  maxLength="80"
                />
              </td>
            </tr>
          )}
          {habits.map((habitt) => {
            const { _id, start, habit } = habitt;
            const startsub = start.substr(0, 10);
            return (
              <tr key={_id}>
                <td className="table-data">{habit}</td>
                <td className="table-data">{startsub}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="table-footer">
              <button
                className="add-habit"
                onClick={newHabit ? confirmHabit : addHabit}
              >
                {newHabit ? "+ Confirm" : "+ Add Habit"}
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};
