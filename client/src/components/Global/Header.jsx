import React from "react";
import { useGlobalContext } from "../../context";

export const Header = () => {
  const { account } = useGlobalContext();

  setTimeout(function () {
    var bars = document.getElementsByClassName("progress-bar");
    for (var i = 0; i < bars.length; i++) {
      bars[i].children[0].style.width = bars[i].dataset.percent;
      bars[i].children[1].innerHTML = bars[i].dataset.percent + " Completed";
    }
  }, 0);

  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <span>StreakX</span>
        </div>
        <ul className="nav-links">
          <li>
            <button className="link-btn">Home</button>
          </li>
          <li>
            <button className="link-btn">Profile</button>
          </li>
          <li>
            <div
              className="progress-bar"
              data-percent={account.progress ? `${account.progress}%` : "0%"}
            >
              <span className="progress-bar__slide"></span>
              <span className="progress-bar__percent"></span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
