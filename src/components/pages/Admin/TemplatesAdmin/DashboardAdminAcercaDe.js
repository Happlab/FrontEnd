import React, { Component } from 'react'

export default class DashboardAdminAcercaDe extends Component {
  render() {
    return (
      <div>
        <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
          {/* Añadir Noticias*/}
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Añadir informacion</h3>
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
                    <label htmlFor="inputClientCompany">Link video</label>
                    <input type="text" id="inputClientCompany" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputProjectLeader">Subir archivo multimedia</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="exampleInputFile" />
                        <label className="custom-file-label" htmlFor="exampleInputFile">Subir archivo multimedia</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Agregar informacion</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Lista de noticias*/}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1 text-align="center">Gestion de Informacion</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header border-0">
                      <h3 className="card-title">Listado de elementos About</h3>
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table className="table table-striped table-valign-middle">
                        <thead>
                          <tr>
                            <th>ID Info</th>
                            <th>Título</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Bienvenido a Happlab</td>
                            <td>
                              <div className="input-group-prepend">
                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                  Acción
                                </button>
                                <ul className="dropdown-menu" style={{}}>
                                  <li className="dropdown-item">Editar</li>
                                  <li className="dropdown-item">Eliminar</li>
                                  <li className="dropdown-item">Ocultar</li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                          <tr>
                          <td>2</td>
                            <td>Mas informacion de Happlab</td>
                            <td>
                              <div className="input-group-prepend">
                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                  Acción
                                </button>
                                <ul className="dropdown-menu" style={{}}>
                                  <li className="dropdown-item">Editar</li>
                                  <li className="dropdown-item">Eliminar</li>
                                  <li className="dropdown-item">Ocultar</li>
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
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1 text-align="center">Gestion de Ubicacion</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header border-0">
                      <h3 className="card-title">Ubicacion</h3>
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table className="table table-striped table-valign-middle">
                        <thead>
                          <tr>
                            <th>Título</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>¿Donde nos encuentras?</td>
                            <td>
                              <div className="input-group-prepend">
                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                  Acción
                                </button>
                                <ul className="dropdown-menu" style={{}}>
                                  <li className="dropdown-item">Editar</li>
                                  <li className="dropdown-item">Ocultar</li>
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
          
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Editar ubicacion</h3>
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
                    <label htmlFor="inputName">Latitud</label>
                    <input type="text" id="inputName" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">Longitud</label>
                    <input type="text" id="inputName" className="form-control" />
                  </div>
                  
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Actualizar ubicacion</button>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/*Editor de Noticias*/}
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Editar informacion</h3>
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
                    <label htmlFor="inputClientCompany">Link video</label>
                    <input type="text" id="inputClientCompany" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputProjectLeader">Cargar multimedia</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="exampleInputFile" />
                        <label className="custom-file-label" htmlFor="exampleInputFile">Subir archivo multimedia</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Actualizar informacion</button>
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
