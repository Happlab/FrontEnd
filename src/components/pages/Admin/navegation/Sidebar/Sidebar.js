import React from "react";
import user_service from "../../../../../services/UserServices";
import "./Sidebar.css";
import {
  TachometerIcon,
  AngleLeftIcon,
  UserIcon,
  NewsIcon,
  BookIcon,
  LocationIcon,
  SignoutIcon,
  HomeIcon,
} from "../../../../../assets/icons/Icons";

const Sidebar = ({ option }) => {
  const handleCloseMenu = (e) => {
    e.preventDefault();
    let menu = document.querySelector(".nav-item-admin");
    menu.classList.toggle("menu-open-admin");
  };

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
                <a href="/" onClick={handleCloseMenu} className="nav-link-admin active">
                  <TachometerIcon />
                  <p>Administrar</p>
                  <AngleLeftIcon className="second-icon-admin"/>
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
                      <UserIcon />
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
                      <NewsIcon />
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
                      <BookIcon />
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
                      <HomeIcon />
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
                      <LocationIcon />
                      <p>Administrar Acerca de</p>
                    </a>
                  </li>
                  <li className="nav-item-admin">
                    <a href="/" className="nav-link-admin active">
                      <SignoutIcon />
                      <p onClick={handleClickCerrarSesion}>Cerrar Sesion</p>
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
