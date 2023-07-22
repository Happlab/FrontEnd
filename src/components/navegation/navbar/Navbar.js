import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "./_Navbar.scss";
import logo from "../../../../src/assets/images/logo3.jpg";
import user_service from "../../../services/UserServices";
import { TokenContext } from "../../../context/GlobalContext";

class NavbarCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: false,
    };
    this.eliminarCookie = this.eliminarCookie.bind(this);
    this.showMenuCollapse = this.showMenuCollapse.bind(this);
    this.resizeMode = this.showMenuCollapse.bind(this);
  }
  static contextType = TokenContext;

  eliminarCookie() {
    user_service.deleteToken();
  }

  showMenuCollapse() {
    this.setState({ isCollapse: !this.state.isCollapse });
  }

  resizeMode() {
    window.onresize = () => {
      if (!window.matchMedia("(min-width: 992px)").matches) {
        this.setState({ isCollapse: false });
      }
    };
  }

  render() {
    let token = this.context.token;
    return (
      <>
        <nav className="navbar" onLoad={this.resizeMode}>
          <div className="navbar-content">
            <div className="navbar-brand">
              <a className="nav-link" href="/">
                HappLab Home Page
              </a>
            </div>
            <button className="navbar-toggler" onClick={this.showMenuCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={
                this.state.isCollapse
                  ? "navbar-collapse without-collapse"
                  : "navbar-collapse"
              }
            >
              <div
                className={
                  this.state.isCollapse
                    ? "navbar-menu me-auto without-collapse"
                    : "navbar-menu me-auto"
                }
              >
                <ul className={this.state.isCollapse ? "without-collapse" : ""}>
                  <li>
                    <a className="nav-link" href="/">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/AboutUs">
                      Sobre Nosotros
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/Noticias">
                      Noticias
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/Contenido">
                      Contenidos
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="/Acerca">
                      Acerca de
                    </a>
                  </li>
                </ul>
              </div>
              <div
                className={
                  this.state.isCollapse
                    ? "navbar-login without-collapse"
                    : "navbar-login"
                }
              >
                {token === null ? (
                  <div
                    className={
                      this.state.isCollapse
                        ? "login-content without-collapse"
                        : "login-content"
                    }
                  >
                    <a className="nav-link" href="/Registro">
                      Registro
                    </a>
                    <a className="nav-link" href="/Login">
                      Iniciar Sesion
                    </a>
                  </div>
                ) : (
                  <div className="login-content">
                    <a className="nav-link" href="/Perfil">
                      Registro
                    </a>
                    <a className="nav-link" href="/">
                      <button
                        className="button"
                        onClick={this.eliminarCookie}
                        style={{
                          width: "100%",
                          border: "none",
                          color: "rgba(255,255,255,.55)",
                        }}
                      >
                        Cerrar Sesion
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <section>
          <div className="Logo">
            <img className="logo2" src={logo} alt="" />
          </div>
        </section>
      </>
    );
  }
}

export { NavbarCustom as Navbar };
