/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
export default class Menu extends Component {
    render() {
        return (
            <div class="wraper">
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="#" className="brand-link">
                        <span className="brand-text font-weight-light">Admin HappLab</span>
                    </a>
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Administrador</a>
                            </div>
                        </div>
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
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
                                            <a href='./AdminUsuarios' className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Administrar usuarios</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href='./AdminNoticias' className="nav-link active">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Administrar noticias</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="./AdminContenido" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Administrar contenidos</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="./Admininicio" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Administrar inicio</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="./AdminAcercaDe" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Administrar Acerca de</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>
        )
    }
}
