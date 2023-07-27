import React, {useContext, useState} from "react";
import { TokenContext } from "../../../context/GlobalContext";
import user_service from "../../../services/UserServices";
import logo from "../../../../src/assets/images/logo3.jpg";
import "./_Navbar.scss";

const Navbar = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  const { tokenUser } = useContext(TokenContext);

  const deleteCookie = () => {
    user_service.deleteToken();
  };

  const showMenuCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const resizeMode = () => {
    window.onresize = () => {
      if (!window.matchMedia("(min-width: 992px)").matches) setIsCollapse(false);
    };
  };

    return (
      <>
        <nav className="navbar" onLoad={resizeMode}>
          <div className="navbar-content">
            <div className="navbar-brand">
              <a className="nav-link" href="/">
                HappLab Home Page
              </a>
            </div>
            <button className="navbar-toggler" onClick={showMenuCollapse}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={
                isCollapse
                  ? "navbar-collapse without-collapse"
                  : "navbar-collapse"
              }
            >
              <div
                className={
                  isCollapse
                    ? "navbar-menu me-auto without-collapse"
                    : "navbar-menu me-auto"
                }
              >
                <ul className={isCollapse ? "without-collapse" : ""}>
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
                  isCollapse
                    ? "navbar-login without-collapse"
                    : "navbar-login"
                }
              >
                {tokenUser === null ? (
                  <div
                    className={
                      isCollapse
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
                      Perfil
                    </a>
                    <a className="nav-link" href="/">
                      <button
                        className="button"
                        onClick={deleteCookie}
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

export default Navbar;
