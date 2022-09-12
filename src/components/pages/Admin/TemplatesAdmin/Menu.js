import React, { Component } from "react";
import { Button } from "react-bootstrap";
import user_service from "../../../services/UserServices";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleClickCerrarSesion = this.handleClickCerrarSesion.bind(this);
  }
  handleClickCerrarSesion() {
    user_service.deleteToken();
  }
  render() {
    return (
      <div className="wraper">
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <div
            className="brand-link"
            style={{
              textDecoration: "none",
              cursor: "default",
              color: "rgba(255,255,255,.8)",
            }}
          >
            <span className="brand-text font-weight-light">Admin HappLab</span>
          </div>
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0/img/user1-128x128.jpg"
                  className="img-circle elevation-2"
                  aria-hidden
                  alt="User Image"
                />
              </div>
              <div className="info">
                <div
                  className="d-block"
                  style={{
                    textDecoration: "none",
                    cursor: "default",
                    color: "rgba(255,255,255,.8)",
                  }}
                >
                  Administrador
                </div>
              </div>
            </div>
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item menu-open">
                  <a href="#" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Administrar
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        href="./AdminUsuarios"
                        id="tab-AdminUsuarios"
                        className="nav-link"
                        style={{
                          backgroundColor:
                            this.props.opcion === "usuario" ? "green" : "",
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Administrar usuarios</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="./AdminNoticias"
                        id="tab-AdminNoticias"
                        className="nav-link"
                        style={{
                          backgroundColor:
                            this.props.opcion === "noticia" ? "green" : "",
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Administrar noticias</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="./AdminContenido"
                        id="tab-AdminContenido"
                        className="nav-link"
                        style={{
                          backgroundColor:
                            this.props.opcion === "contenido" ? "green" : "",
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Administrar contenidos</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="./Admininicio"
                        id="tab-Admininicio"
                        className="nav-link"
                        style={{
                          backgroundColor:
                            this.props.opcion === "inicio" ? "green" : "",
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Administrar inicio</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="./AdminAcercaDe"
                        id="tab-AdminAcercaDe"
                        className="nav-link"
                        style={{
                          backgroundColor:
                            this.props.opcion === "acercaDe" ? "green" : "",
                        }}
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Administrar Acerca de</p>
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                      }}
                    >
                      <a href="/">
                        <Button onClick={this.handleClickCerrarSesion}>
                          Cerrar Sesion
                        </Button>
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
  }
}
