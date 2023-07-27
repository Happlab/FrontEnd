import React from "react";
import user_service from "../../../../../services/UserServices";
import "./Sidebar.css";

const Sidebar = ({ option }) => {

  const handleClickCerrarSesion = () => {
    user_service.deleteToken();
  };

  return (
    <div className="wraper">
      <aside className="mainadmin-sidebar">
        <div className="brand-link-admin">
          <span className="brand-text font-weight-light">Admin HappLab</span>
        </div>
        <div className="sidebar-admin">
          <div className="user-panel-admin">
            <div className="image-admin">
              <img
                src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/img/user1-128x128.jpg"
                className="img-circle-admin"
                aria-hidden
                alt="User Image"
              />
            </div>
            <div className="info-admin">
              <div className="infdes-admin">Administrador</div>
            </div>
          </div>
          <nav className="margint-2">
            <ul
              className="nav-admin"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item-admin menu-open-admin">
                <a href="/adminInicio" className="nav-link-admin active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Administrar
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav-admin nav-treeview-admin">
                  <li className="nav-item-admin">
                    <a
                      href="./AdminUsuarios"
                      id="tab-AdminUsuarios"
                      className="nav-link-admin"
                      style={{
                        backgroundColor: option === "usuario" ? "green" : "",
                      }}
                    >
                      <i className="fa fa-user nav-icon" />
                      <p>Administrar usuarios</p>
                    </a>
                  </li>
                  <li className="nav-item-admin">
                    <a
                      href="./AdminNoticias"
                      id="tab-AdminNoticias"
                      className="nav-link-admin"
                      style={{
                        backgroundColor: option === "noticia" ? "green" : "",
                      }}
                    >
                      <i className="fas fa-newspaper nav-icon" />
                      <p>Administrar noticias</p>
                    </a>
                  </li>
                  <li className="nav-item-admin">
                    <a
                      href="./AdminContenido"
                      id="tab-AdminContenido"
                      className="nav-link-admin"
                      style={{
                        backgroundColor: option === "contenido" ? "green" : "",
                      }}
                    >
                      <i className="fa fa-book nav-icon" />
                      <p>Administrar contenidos</p>
                    </a>
                  </li>
                  <li className="nav-item-admin">
                    <a
                      href="./Admininicio"
                      id="tab-Admininicio"
                      className="nav-link-admin"
                      style={{
                        backgroundColor: option === "inicio" ? "green" : "",
                      }}
                    >
                      <i className="fa fa-home nav-icon" />
                      <p>Administrar inicio</p>
                    </a>
                  </li>
                  <li className="nav-item-admin">
                    <a
                      href="./AdminAcercaDe"
                      id="tab-AdminAcercaDe"
                      className="nav-link-admin"
                      style={{
                        backgroundColor: option === "acercaDe" ? "green" : "",
                      }}
                    >
                      <i className="fa fa-location-dot nav-icon" />
                      <p>Administrar Acerca de</p>
                    </a>
                  </li>
                  <li className="nav-item-admin">
                    <a href="/" className="nav-link-admin active">
                      <i className="fa fa-sign-out nav-icon" />
                      <p onClick={handleClickCerrarSesion}>
                        Cerrar Sesion
                      </p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
