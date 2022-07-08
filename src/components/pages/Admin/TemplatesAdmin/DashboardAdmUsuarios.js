import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                {/*Lista d solicitudes*/}
                <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
                {/* Estádisticas de voisitantes y usuarios */}
                    <div class="container-fluid">
                    <br/>
                    <h3>Estadísticas de usuarios</h3>
                        <div class="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>44</h3>
                                        <p>Usuarios registrados</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>65</h3>
                                        <p>Número de visitas</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <h1 text-align="center">Tablas de gestion de usuarios</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Solicitudes de usuarios</h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm" style={{ width: 150 }}>
                                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default">
                                                            <i className="fas fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre completo</th>
                                                        <th>E-mail</th>
                                                        <th>No. Documento</th>
                                                        <th>Tipo profesor</th>
                                                        <th>Codigo Profesor</th>
                                                        <th>Solicitud</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Luis Manuel Arango</td>
                                                        <td>lmarango@unicauca.edu.co</td>
                                                        <td>104616021494</td>
                                                        <td>Universidad</td>
                                                        <td>104616021494</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button type="button" className="btn btn-danger">Aprobar/Rechazar</button>
                                                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                                    <span className="caret" />
                                                                    <span className="sr-only">Desplegar menú</span>
                                                                </button>
                                                                <ul className="dropdown-menu" role="menu">
                                                                    <li><a href="#">Aprobar</a></li>
                                                                    <li><a href="#">Rechazar</a></li>
                                                                    <li className="divider" />
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Tabla de usuarios totales*/}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Lista de usuarios</h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm" style={{ width: 150 }}>
                                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-default">
                                                            <i className="fas fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre completo</th>
                                                        <th>E-mail</th>
                                                        <th>Estado de cuenta</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Luis Manuel Arango</td>
                                                        <td>lmarango@unicauca.edu.co</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button type="button" className="btn btn-danger">Activar/Desactivar</button>
                                                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                                    <span className="caret" />
                                                                    <span className="sr-only">Desplegar menú</span>
                                                                </button>
                                                                <ul className="dropdown-menu" role="menu">
                                                                    <li><a href="#">Activo</a></li>
                                                                    <li><a href="#">Inactivo</a></li>
                                                                    <li className="divider" />
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
