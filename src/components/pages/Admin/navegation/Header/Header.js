import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <nav className="mainadmin-header">
        <ul className="navbar-nav-admin">
          <li className="nav-item-admin">
            <a className="nav-link-admin" href="/">
              <span className="navbar-bar-icon"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header
