import React, {useState} from "react";
import "./Header.css";

const Header = () => {
  const [marginOn, setMarginOn] = useState(true);

  const handleClick = () => {
    setMarginOn(!marginOn);
    let root = document.getElementById("root");
    let sidebar = document.querySelector(".mainadmin-sidebar");
    let header = document.querySelector(".mainadmin-header");
    
    let container = root.children[root.children.length - 1];

    sidebar.classList.toggle("sidebar-admin-collapse");
    header.classList.toggle("header-admin-collapse");
    container.style.marginLeft = marginOn ? "4.6rem" : "250px";
  };

  return (
    <nav className="mainadmin-header">
      <ul className="navbar-header-nav-admin">
        <li className="nav-header-item-admin">
          <a className="nav-header-link-admin" onClick={handleClick}>
            <span className="navbar-header-bar-icon"></span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
