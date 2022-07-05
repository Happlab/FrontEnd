import React, { Component } from 'react'

export default class DashboardAdminContenido extends Component {
    render() {
        return (
            <div>
                {/*Lista d solicitudes*/}
                <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
                    {/* Estádisticas de Contenidos */}
                    <div class="container-fluid">
                        <br />
                        <h3>Conteo de contenidos</h3>
                        <div class="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>100</h3>
                                        <p>Número de contenidos</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <h1 text-align="center">Tablas de gestion de de contenidos</h1>
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
                                            <h3 className="card-title">Solicitudes de contenido</h3>
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
                                                        <th>Título</th>
                                                        <th>Descripción</th>
                                                        <th>Usuario</th>
                                                        <th>Documentación</th>
                                                        <th>Etiquetas</th>
                                                        <th>Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Contenido 1</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={"Lorem ipsum dolor sit amet consectetur adipiscing elit tristique in, penatibus id rhoncus sodales inceptos torquent dis."} />
                                                        </td>
                                                        <td>lmarango@unicauca.edu.co</td>
                                                        <div className="btn-group btn-group-sm">
                                                            <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                            <button type="button" className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                                <i className="fas fa-download" /> Descargar
                                                            </button>
                                                        </div>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={'"Etiq. 1", "Etiq. 2", "Etiq. 3", "Etiq. 4", "Etiq. 5"'} />
                                                        </td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                    Acción
                                                                </button>
                                                                <ul className="dropdown-menu" style={{}}>
                                                                    <li className="dropdown-item">Aprobar</li>
                                                                    <li className="dropdown-item">Rechazar</li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Contenido 1</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={"Lorem ipsum dolor sit amet consectetur adipiscing elit tristique in, penatibus id rhoncus sodales inceptos torquent dis."} />
                                                        </td>
                                                        <td>lmarango@unicauca.edu.co</td>
                                                        <div className="btn-group btn-group-sm">
                                                            <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                            <button type="button" className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                                <i className="fas fa-download" /> Descargar
                                                            </button>
                                                        </div>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={'"Etiq. 1", "Etiq. 2", "Etiq. 3", "Etiq. 4", "Etiq. 5"'} />
                                                        </td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                    Acción
                                                                </button>
                                                                <ul className="dropdown-menu" style={{}}>
                                                                    <li className="dropdown-item">Aprobar</li>
                                                                    <li className="dropdown-item">Rechazar</li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Contenido 1</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={"Lorem ipsum dolor sit amet consectetur adipiscing elit tristique in, penatibus id rhoncus sodales inceptos torquent dis."} />
                                                        </td>
                                                        <td>lmarango@unicauca.edu.co</td>
                                                        <td>
                                                            <div className="btn-group btn-group-sm">
                                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                                <button type="button" className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                                    <i className="fas fa-download" /> Descargar
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={'"Etiq. 1", "Etiq. 2", "Etiq. 3", "Etiq. 4", "Etiq. 5"'} />
                                                        </td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                    Acción
                                                                </button>
                                                                <ul className="dropdown-menu" style={{}}>
                                                                    <li className="dropdown-item">Aprobar</li>
                                                                    <li className="dropdown-item">Rechazar</li>
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
                    <br />
                    {/* Tabla de Contenidos totales*/}
                    <section className="content">
                        <div className="container-fluid">
                            <h2>Lista de contenidos</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Lista de Contenidos</h3>
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
                                                        <th>ID</th>
                                                        <th>Título</th>
                                                        <th>Descripción</th>
                                                        <th>Usuario</th>
                                                        <th>Documentación</th>
                                                        <th>Valoración</th>
                                                        <th>Etiquetas</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Título 1</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={"Lorem ipsum dolor sit amet consectetur adipiscing elit tristique in, penatibus id rhoncus sodales inceptos torquent dis."} />
                                                        </td>
                                                        <td>lmarango@unicauca.edu.co</td>
                                                        <td>
                                                            <div className="btn-group btn-group-sm">
                                                                <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                                <button type="button" className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                                    <i className="fas fa-download" /> Descargar
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>3,8</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={'"Etiq. 1", "Etiq. 2", "Etiq. 3", "Etiq. 4", "Etiq. 5"'} />
                                                        </td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                    Acción
                                                                </button>
                                                                <ul className="dropdown-menu" style={{}}>
                                                                    <li className="dropdown-item">Editar</li>
                                                                    <li className="dropdown-item">Eliminar</li>
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
                    {/* Editor de contenido */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Crear/Editar Contenido</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="inputName">Título</label>
                                        <input type="text" id="inputName" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputDescription">Descripción</label>
                                        <textarea id="inputDescription" className="form-control" rows={4} defaultValue={""} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputProjectLeader">Imagén de la noticia</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="exampleInputFile" />
                                                <label className="custom-file-label" htmlFor="exampleInputFile">Subir imagen</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputProjectLeader">Documentación</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="exampleInputFile" />
                                                <label className="custom-file-label" htmlFor="exampleInputFile">Subir recurso (PDF, .rar, .zip, .mp4)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputDescription">Etiquetas</label>
                                        <textarea id="inputDescription" className="form-control" rows={4} defaultValue={"Ej: etiq1, etiq2, etiq3"} />
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Añadir/Actualizar noticia</button>
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
