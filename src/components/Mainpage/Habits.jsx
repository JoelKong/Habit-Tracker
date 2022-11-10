import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

export const Habits = () => {
  const {
    addHabit,
    newHabit,
    confirmHabit,
    habitRef,
    editRef,
    habits,
    editHabit,
    deleteHabit,
    disable,
  } = useGlobalContext();

  return (
    <section className="table-section">
      <div className="table100 ver1">
        <div className="table100-head">
          <table>
            <thead>
              <tr>
                <th className="h-column1">Habits/Tasks</th>
                <th className="h-column2">Started On</th>
                <th className="h-column3">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table100-body">
          <table>
            <div className="scroll">
              <tbody>
                {newHabit && (
                  <tr>
                    <td className="table-data1">
                      <input
                        type="text"
                        className="input-habit"
                        ref={habitRef}
                        autoFocus
                        maxLength="50"
                        placeholder="e.g. Going to the gym"
                      />
                    </td>
                  </tr>
                )}
                {habits.map((habitt) => {
                  const { _id, start, habit, modify } = habitt;
                  const startsub = start.substr(0, 10);

                  return (
                    <tr key={_id}>
                      {modify ? (
                        <td className="table-data1">
                          <input
                            type="text"
                            className="input-habit "
                            ref={editRef}
                            autoFocus
                            maxLength="50"
                            placeholder="e.g. Going to the gym"
                            defaultValue={habit}
                          />
                        </td>
                      ) : (
                        <td className="table-data1">{habit}</td>
                      )}

                      <td className="table-data2">{startsub}</td>
                      <td className="table-data3">
                        <input type="checkbox" title="Complete" />
                        <button
                          className="editclass"
                          onClick={() => editHabit(_id)}
                          title="Edit"
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="deleteclass"
                          disabled={disable}
                          onClick={() => deleteHabit(_id)}
                          title="Delete"
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </div>
            <tr className="t-row">
              <td colSpan="3" className="table-footer">
                <button
                  className="add-habit"
                  disabled={disable}
                  onClick={newHabit ? confirmHabit : addHabit}
                >
                  <span className="add-icon">
                    <IoAddCircle />
                  </span>
                  {newHabit ? " Confirm" : " Add Habit"}
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  );
};
