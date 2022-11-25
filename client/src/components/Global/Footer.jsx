import React from "react";

export const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://www.linkedin.com/in/joel-kong/">
        <button className="link-btn-footer">About Me</button>
        <div className="underline-footer"></div>
      </a>
      <a href="https://github.com/JoelKong" className="a-footer">
        <i className="fa-brands fa-github github-footer"></i>
      </a>
      <p className="footer-p">Made by Joel Kong Boon Wei :D</p>
    </footer>
  );
};
