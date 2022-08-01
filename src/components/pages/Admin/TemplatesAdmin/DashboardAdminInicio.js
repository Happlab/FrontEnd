import React, { Component } from 'react'
import { PeticionEnvio, PeticionEnvioDataFrom, PeticionGet } from '../PeticionesAdmin.js'
import Notificacion from './modal.js'

export default class DashboardAdminInicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inicio: [],
      posicion: -1,
      notificacion: false,
      tituloNotificacion: "",
      mensajeNotificacion: ""
    };
    this.handleClickCerrarModal=this.handleClickCerrarModal.bind(this);
    this.editar = this.editar.bind(this);
    this.funcioneditar = this.funcioneditar.bind(this);
  }
  urlServicio="http://localhost:8080/seccion/"
  componentDidMount() {
    this.listarInformacion();
  }

  listarInformacion() {
    const url = this.urlServicio;
    const datos = PeticionGet(url);
    datos.then(data => {
      if (data !== null) {
        this.setState({inicio: Array.from(data)
        });
      }
    });
  }
  handleClickCerrarModal(){
    this.setState({notificacion: false});
  }
  editar(entrada, indice) {
    this.setState({posicion : indice});
  }

  funcioneditar(titulo, url_seccion, contenido, descripcion) {
    const dataform = new FormData();

    dataform.append('id', this.state.inicio[this.state.posicion].id);
    dataform.append('titulo_seccion', titulo);
    dataform.append('url', url_seccion);
    if(contenido===undefined){
      dataform.append('contenido', new File([''],''));
    }else{
      dataform.append('contenido', contenido);
    }
    dataform.append('descripcion', descripcion);
    dataform.append('coordenadas', [0, 0]);

    const url =this.urlServicio+'update/' + this.state.inicio[this.state.posicion].id;
    const metodo = 'PUT';
    if(this.state.posicion!==-1){
      const peticion = PeticionEnvioDataFrom(dataform, url, metodo);
      peticion.then(data => {
        if(data){
          this.setState({notificacion: true, tituloNotificacion: "Gestion de informacion de inicio", mensajeNotificacion:"La informacion de inicio fue actualizada exitosamente"});
          this.listarInformacion();
        }else{
            this.setState({notificacion: true, tituloNotificacion: "Gestion de informacion de inicio", mensajeNotificacion:"No fue posible editar la informacion de inicio, verifique su conexion con el servidor o a internet"});
        }
      });
    }else{
      alert("seleccione elemento a editar");
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
                  <h1 text-align="center">Gestion de seccion (Inicio)</h1>
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
                      <h3 className="card-title">Listado de secciones (Inicio)</h3>
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
                            if (i < 2) {
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
                  {(this.state.posicion===0) ?
                  <form onSubmit={ev => {
                    ev.preventDefault();
                    const titulo = ev.target.titulo_seccion.value;
                    const url = ev.target.url_seccion.value;
                    const contenido = ev.target.nombre_contenido.files[0];
                    const descripcion = ev.target.descripcion.value;
                    this.funcioneditar(titulo, url, contenido, descripcion);
                  }}>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="inputTitulo">Titulo</label>
                        <input name='titulo_seccion' type="text" id="inputTitulo" className="form-control" autoComplete='off' defaultValue={this.state.inicio[this.state.posicion].titulo_seccion} required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputURL">URL</label>
                        <input name='url_seccion' type="text" id="inputURL" className="form-control" autoComplete='off' defaultValue={this.state.inicio[this.state.posicion].url} required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputContenido">Nombre contenido</label>
                        <input name='nombre_contenido' type='file' id="inputContenido" className="form-control" autoComplete="off" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputDescripcion">Descripción</label>
                        <textarea name='descripcion' id="inputDescripcion" className="form-control" rows={4} autoComplete="off" defaultValue={this.state.inicio[this.state.posicion].descripcion} required/>
                      </div>
                      <div className="card-footer">
                        <button type='submit' className="btn btn-primary">Editar contenido</button>
                        <p> </p>
                      </div>
                    </div>
                  </form>
                  : null
                  }

                  {(this.state.posicion===1) ?
                  <form onSubmit={ev => {
                    ev.preventDefault();
                    const titulo = ev.target.titulo_seccion.value;
                    const url = ev.target.url_seccion.value;
                    const contenido = ev.target.nombre_contenido.files[0];
                    const descripcion = ev.target.descripcion.value;
                    this.funcioneditar(titulo, url, contenido, descripcion);
                  }}>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="inputTitulo">Titulo</label>
                        <input name='titulo_seccion' type="text" id="inputTitulo" className="form-control" autoComplete='off' defaultValue={this.state.inicio[this.state.posicion].titulo_seccion} required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputURL">URL</label>
                        <input name='url_seccion' type="text" id="inputURL" className="form-control" autoComplete='off' defaultValue={this.state.inicio[this.state.posicion].url} required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputContenido">Nombre contenido</label>
                        <input name='nombre_contenido' type='file' id="inputContenido" className="form-control" autoComplete="off" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputDescripcion">Descripción</label>
                        <textarea name='descripcion' id="inputDescripcion" className="form-control" rows={4} autoComplete="off" defaultValue={this.state.inicio[this.state.posicion].descripcion} required/>
                      </div>
                      <div className="card-footer">
                        <button type='submit' className="btn btn-primary">Editar contenido</button>
                        <p> </p>
                      </div>
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
