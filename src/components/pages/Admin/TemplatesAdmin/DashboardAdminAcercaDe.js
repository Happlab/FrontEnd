import React, { Component } from 'react'
import { PeticionEnvioDataFrom, PeticionGet } from '../PeticionesAdmin.js'
import Notificacion from './modal.js'

export default class DashboardAdminAcercaDe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inicio: [],
      posicion: -1,
      notificacion: false,
      tituloNotificacion: "",
      mensajeNotificacion: ""
    };
    this.editar = this.editar.bind(this);
    this.funcioneditar = this.funcioneditar.bind(this);
    this.handleClickCerrarModal=this.handleClickCerrarModal.bind(this);
  }

  urlServicio='http://localhost:8080/seccion/'

  componentDidMount() {
    this.listarInformacion();
  }
  
  handleClickCerrarModal(){
    this.setState({notificacion: false});
  }

  listarInformacion() {
    const url = this.urlServicio;
    const datos = PeticionGet(url);
    datos.then(data => {
      if (data !== null) {
        this.setState({
          inicio: Array.from(data)
        });
      }
    });
  }

  editar(entrada, indice) {
    this.setState({posicion : indice});
    document.getElementById('inputTitulo').value = entrada.titulo_seccion;
    document.getElementById('inputDescripcion').value = entrada.descripcion;
  }

  funcioneditar(titulo, url_seccion, contenido, descripcion, longitud, latitud) {
    const dataform = new FormData();

    dataform.append('id', this.state.inicio[this.state.posicion].id);
    dataform.append('titulo_seccion', titulo);
    dataform.append('descripcion', descripcion);
    if(contenido!==null && url_seccion!==null ){
      dataform.append('url', url_seccion);
      if(contenido!==undefined){
        dataform.append('contenido', contenido);
      }else{
        dataform.append('contenido', new File([''],''));
      }
    }else{
      dataform.append('url', '');
      dataform.append('contenido', new File([''],''));
    }
    if(longitud!==null && latitud!==null){
      dataform.append('coordenadas', [longitud, latitud]);
    }else{
      dataform.append('coordenadas', [0, 0]);
    }

    const url = this.urlServicio+'update/' + this.state.inicio[this.state.posicion].id;
    const metodo = 'PUT';
    if(this.state.posicion!==-1){
      const peticion = PeticionEnvioDataFrom(dataform, url, metodo);
      peticion.then(data => {
        if(data){
          this.setState({notificacion: true, tituloNotificacion: "Gestion de informacion de Acerca de", mensajeNotificacion:"La informacion del apartado acerca de fue actualizada exitosamente"});
          this.listarInformacion();
        }else{
            this.setState({notificacion: true, tituloNotificacion: "Gestion de informacion de Acerca de", mensajeNotificacion:"No fue posible editar la informacion de acerca de, verifique su conexion con el servidor o a internet"});
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Notificacion show={this.state.notificacion} titulo={this.state.tituloNotificacion} mensaje={this.state.mensajeNotificacion} onclick={this.handleClickCerrarModal}/>
        <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
          {/*Lista de contenido inicio*/}
          <section className="content-header">

            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1 text-align="center">Gestion de seccion (Acerca de)</h1>
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
                      <h3 className="card-title">Listado de secciones (Acerca de)</h3>
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table className="table table-striped table-valign-middle">
                        <thead>
                          <tr>
                            <th>ID Seccion</th>
                            <th>Título</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(this.state.inicio.length)].map((e, i) => {
                            if (i > 1) {
                              return (
                                <tr>
                                  <td>{i}</td>
                                  <td>{this.state.inicio[i].titulo_seccion}</td>
                                  <td>
                                    <div className="input-group-prepend">
                                      <button onClick={() => this.editar(this.state.inicio[i], i)} className="btn btn-warning"  >
                                        Editar
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Editor de Contenido Inicio*/}

          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Editar Contenido (Inicio)</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className='card-body'>
                  {this.state.posicion!==-1 ?
                      <form  onSubmit={ev => {
                        ev.preventDefault();
                        const titulo = ev.target.titulo_seccion.value;
                        const descripcion = ev.target.descripcion.value;
                        var url=null;
                        var contenido=null;
                        var longitud=null;
                        var latitud=null;
                        if(this.state.posicion===2){
                          url = ev.target.url_seccion.value;
                          contenido = ev.target.nombre_contenido.files[0];
                        }
                        if(this.state.posicion===3){
                          longitud = ev.target.longitud.value;
                          latitud = ev.target.latitud.value;
                        }
                        
                        this.funcioneditar(titulo, url, contenido, descripcion, longitud, latitud);
                      }}>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="inputTitulo">Titulo</label>
                            <input name='titulo_seccion' type="text" id="inputTitulo" className="form-control" autoComplete='off' defaultValue={this.state.inicio[this.state.posicion].titulo_seccion} required/>
                          </div>
                          {this.state.posicion===2 ?
                          <div>
                            <div className="form-group">
                              <label htmlFor="inputContenido">Imagen</label>
                              <input type='file' name='nombre_contenido' id="inputContenido" className="form-control" autoComplete="off" defaultValue=""  />
                            </div>
                            <div className="form-group">
                              <label htmlFor="inputURL">URL</label>
                              <input name='url_seccion' type="text" id="inputURL" className="form-control" autoComplete='off' defaultValue={this.state.inicio[this.state.posicion].url} required  />
                            </div>
                            </div>
                          : null
                          }
                          <div className="form-group">
                            <label htmlFor="inputDescripcion">Descripción</label>
                            <textarea name='descripcion' id="inputDescripcion" className="form-control" rows={4} autoComplete="off" defaultValue={this.state.inicio[this.state.posicion].descripcion} required/>
                          </div>
                          
                          {this.state.posicion===3 ?
                            <div>
                              <div className="form-group">
                                <label htmlFor="labelCoordenada">Coordenada</label>
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputLongitud">Latitud</label>
                                <input name='longitud' type="text" id="inputLatitud" className="form-control" autoComplete="off" defaultValue={this.state.inicio[this.state.posicion].coordenadas[0]} required/>
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputLatitud">Longitud</label>
                                <input name='latitud' type="text" id="inputLongitud" className="form-control" autoComplete="off" defaultValue={this.state.inicio[this.state.posicion].coordenadas[1]} required/>
                              </div>
                              
                            </div>
                            : null
                          }
                        </div>
                        <div className="card-footer">
                          <button type='submit' className="btn btn-primary">Editar contenido</button>
                          <p> </p>
                        </div>
                      </form>
                      : null
                      }
                  
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    )
  }
}
