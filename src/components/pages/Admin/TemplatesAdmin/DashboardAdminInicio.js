import React, { Component } from 'react'
import { PeticionEnvio, PeticionEnvioDataFrom, PeticionGet } from '../PeticionesAdmin.js'

export default class DashboardAdminInicio extends Component {


  constructor(props) {
    super(props);
    this.state = {
      inicio: [],
      posicion: -1
    };
    this.editar = this.editar.bind(this);
    this.funcioneditar = this.funcioneditar.bind(this);
  }

  componentDidMount() {
    this.listarInformacion();
  }

  listarInformacion() {
    const url = 'https://api-happlab.herokuapp.com/seccion/';
    const mensajeError = 'No hay informacion de inicio';
    const datos = PeticionGet(url, mensajeError);
    datos.then(data => {
      if (data !== null) {
        this.setState({
          inicio: Array.from(data)
        });
      }
    });
  }

  editar(entrada, indice) {
    console.log("Entro a editar inicio");
    console.log("Indice", indice);
    this.setState({posicion : indice});
    console.log(this.state.posicion);
    document.getElementById('inputTitulo').value = entrada.titulo_seccion;
    document.getElementById('inputURL').value = entrada.url;
    document.getElementById('inputContenido').value = entrada.nombre_contenido;
    document.getElementById('inputDescripcion').value = entrada.descripcion;
    if (entrada.coordenadas !== null) {
      document.getElementById('inputLongitud').value = entrada.coordenadas[0];
      document.getElementById('inputLatitud').value = entrada.coordenadas[1];
    } else {
      document.getElementById('inputLongitud').value = ' ';
      document.getElementById('inputLatitud').value = ' ';
    }

  }

  funcioneditar(titulo, url_seccion, contenido, descripcion, longitud, latitud) {
    const dataform = new FormData();
    dataform.append('id', this.state.inicio[this.state.posicion].id);
    dataform.append('titulo_seccion', titulo);
    dataform.append('url', url_seccion);
    dataform.append('nombre_contenido', contenido);
    dataform.append('descripcion', descripcion);
    dataform.append('coordenadas', [' ', ' ']);

    const url = 'https://api-happlab.herokuapp.com/seccion/update/' + this.state.inicio[this.state.posicion].id;
    const mensajeError = 'No fue posible agregar informacion';
    const metodo = 'PUT';
    if(this.state.posicion!==-1){
      const peticion = PeticionEnvioDataFrom(dataform, url, mensajeError, metodo);
      peticion.then(data => {
        if (data) {
          this.listarInformacion();
        }
      });
    }else{
      alert("seleccione elemento a editar");
    }
    
  }

  render() {
    return (
      <div>

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
                  <form onSubmit={ev => {
                    ev.preventDefault();
                    const titulo = ev.target.titulo_seccion.value;
                    const url = ev.target.url_seccion.value;
                    const contenido = ev.target.nombre_contenido.value;
                    const descripcion = ev.target.descripcion.value;
                    this.funcioneditar(titulo, url, contenido, descripcion);
                  }}>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="inputTitulo">Titulo</label>
                        <input name='titulo_seccion' type="text" id="inputTitulo" className="form-control" autoComplete='off' defaultValue="" required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputURL">URL</label>
                        <input name='url_seccion' type="text" id="inputURL" className="form-control" autoComplete='off' defaultValue="" required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputContenido">Nombre contenido</label>
                        <textarea name='nombre_contenido' id="inputContenido" className="form-control" autoComplete="off" defaultValue="" required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputDescripcion">Descripción</label>
                        <textarea name='descripcion' id="inputDescripcion" className="form-control" rows={4} autoComplete="off" defaultValue="" required/>
                      </div>
                      <div className="card-footer">
                        <button type='submit' className="btn btn-primary">Editar contenido</button>
                        <p> </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    )
  }

}
