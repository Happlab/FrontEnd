import React, { Component } from "react";
import user_service from "../../../../services/UserServices";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClickCerrarSesion = this.handleClickCerrarSesion.bind(this);
  }
  handleClickCerrarSesion() {
    user_service.deleteToken();
  }
  render() {
    return (
      <div>
        <nav className="main-header navbar navbar-expand sidebar-close navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
