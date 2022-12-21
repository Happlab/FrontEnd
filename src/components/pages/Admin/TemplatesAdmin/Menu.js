import React, { Component } from "react";
import { Button } from "react-bootstrap";
import user_service from "../../../services/UserServices";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
    this.handleClickCerrarSesion = this.handleClickCerrarSesion.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
  }
  handleClickCerrarSesion() {
    user_service.deleteToken();
  }
  toggleHover() {
    this.setState({
      isHover: !this.state.isHover
    })
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
            <span className="brand-text font-weight-light" style={{
            }}>Admin HappLab</span>
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
                        <i className="fa fa-user nav-icon" />
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
                        <i className="fas fa-newspaper nav-icon" />
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
                        <i className="fa fa-book nav-icon" />
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
                        <i className="fa fa-home nav-icon" />
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
                        <i className="fa fa-location-dot nav-icon" />
                        <p>Administrar Acerca de</p>
                      </a>
                    </li>
                    <li
                      className="nav-item"
                    >
                      <a 
                        href="/"
                        className="nav-link"
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}
                        style={{
                          backgroundColor: !this.state.isHover ? "#007BFF" : "#95a9bd",
                          color: "#fff",
                        }}
                      >
                        <i className="fa fa-sign-out nav-icon" />
                        <p onClick={this.handleClickCerrarSesion}>
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
  }
}
