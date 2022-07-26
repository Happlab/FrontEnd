import React, { Component } from 'react'
import {PeticionEnvio, PeticionEnvioDataFrom, PeticionGet} from '../PeticionesAdmin.js'

export default class DashboardAdminInicio extends Component {
  constructor (props){
      super();
      this.state={
        noticias: [],
        titulo_noticia: '',
        url_noticia: '',
        link_contenido: '',
        visible: true,
        posSeleccionado: 0
      }
      this.handleSubmitAgregar=this.handleSubmitAgregar.bind(this);
      this.handleSubmitEditar=this.handleSubmitEditar.bind(this);
      this.handleEliminar=this.handleEliminar.bind(this);
      this.handleOcultar=this.handleOcultar.bind(this);
      this.handleClickEditar=this.handleClickEditar.bind(this);
      this.handleChange=this.handleChange.bind(this);
  }
  componentDidMount(){
    this.ListarNoticias();
  }
  handleEliminar(e, id){
    const url='http://api-happlab.herokuapp.com/noticia/delete/'+id;
    const mensajeError='no fue posible eliminar noticia';
    const metodo='DELETE';
    const peticion=PeticionEnvio(' ', url, mensajeError, metodo);
    peticion.then(data =>{
        if(data){
          this.ListarNoticias();
        }
    });
  }
  handleOcultar(i,posicion){
    
    const user=this.state.noticias[posicion];
    user.visible=!this.state.noticias[posicion].visible;
    const url='http://api-happlab.herokuapp.com/noticia/Update';
    const mensajeError='no fue posible ocultar noticia';
    const metodo='PUT';
    const peticion=PeticionEnvio(user, url, mensajeError, metodo);
    peticion.then(data =>{
        if(data){
          this.ListarNoticias();
        }
    });
  }
  handleSubmitEditar(){
    const titulo=document.getElementById('inputNameEdit').value;
    const url_noticia=document.getElementById('inputClientCompanyEdit').value
    const link_contenido=document.getElementById('inputFileEdit').value;
    const user={'id_noticia': this.state.noticias[this.state.posSeleccionado].id_noticia,
                'titulo_noticia': titulo,
                'url_noticia': url_noticia,
                'link_contenido': link_contenido,
                'visible': this.state.noticias[this.state.posSeleccionado].visible};
    const url='http://api-happlab.herokuapp.com/noticia/Update';
    const mensajeError='no fue posible actualizar noticia';
    const metodo='PUT';
    const peticion=PeticionEnvio(user, url, mensajeError, metodo);
    peticion.then(data =>{
        if(data){
          this.ListarNoticias();
        }
    });
  }
  handleChange(event){
    let name=event.target.name;
    let value;
    if(name==="link_contenido"){
      value=event.target.files[0];
    }else{
      value=event.target.value;
    }
    this.setState((state)=>({[name]: value}));
  }
  handleSubmitAgregar(){
    /*
    var formdata = new FormData();
    formdata.append("email_autor", "andrescd@gmail");
    formdata.append("archivo", this.state.link_contenido);
    formdata.append("resumen", "ETE SECHHH");
    formdata.append("autores", "sech, juan");
    formdata.append("tags", "tag1,tag2");
    const url='http://localhost:8080/contenido/create';
    const mensajeError='no fue posible agregar noticia';
    const metodo='POST';
    const peticion=PeticionEnvioDataFrom(formdata, url, mensajeError, metodo);
    peticion.then(data =>{
        if(data){
            this.ListarNoticias();
        }
    });*/
    
    const user={'titulo_noticia': this.state.titulo_noticia,
                'url_noticia': this.state.url_noticia,
                'link_contenido': this.state.link_contenido,
                'visible': this.state.visible};
    const url='http://api-happlab.herokuapp.com/noticia/create';
    const mensajeError='no fue posible agregar noticia';
    const metodo='POST';
    const peticion=PeticionEnvio(user, url, mensajeError, metodo);
    peticion.then(data =>{
        if(data){
            this.ListarNoticias();
        }
    });
  }
  handleClickEditar(i,posicion){
    this.setState({posSeleccionado: posicion});
    document.getElementById('inputNameEdit').value=this.state.noticias[posicion].titulo_noticia;
    document.getElementById('inputClientCompanyEdit').value=this.state.noticias[posicion].url_noticia;
  }
  ListarNoticias() {
    const url='https://api-happlab.herokuapp.com/noticia/';
        const mensajeError='no hay noticias';
        const datos=PeticionGet(url, mensajeError);
        datos.then(data =>{
            if(data!==null){
                this.setState({noticias: Array.from(data)});
            }
        });
  }
  render() {
    return (
      <div>
        
        <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
        <h1 align="center">Módulo Administrador - Página de Noticias</h1>
        <br></br>
          {/* Añadir Noticias*/}
          <section className="content">
            <div className="container-fluid">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Añadir noticia</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputName">Título</label>
                    <input name='titulo_noticia' type="text" id="inputName" className="form-control" onChange={this.handleChange} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputClientCompany">Link de la noticia</label>
                    <input name='url_noticia' type="text" id="inputClientCompany" className="form-control" onChange={this.handleChange} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputProjectLeader">Imagén de la noticia</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input name='link_contenido'  type="file" className="custom-file-input" id="exampleInputFile" accept='image/*' onChange={this.handleChange} required/>
                        <label className="custom-file-label" htmlFor="exampleInputFile">Subir imagen</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" formMethod='post' onClick={this.handleSubmitAgregar} className="btn btn-primary">Crear noticia</button>
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
                  <h1 text-align="center">Gestion de Noticias</h1>
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
                      <h3 className="card-title">Listado de noticias</h3>
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table className="table table-striped table-valign-middle">
                        <thead>
                          <tr>
                            <th>ID Noticia</th>
                            <th>Título</th>
                            <th>Fecha de publicación</th>
                            <th>Visible</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                        {[...Array(this.state.noticias.length)].map((e, i) => {
                          return(
                            <tr>
                              <td>{i+1}</td>
                              <td>{this.state.noticias[i].titulo_noticia}</td>
                              <td>en espera</td>
                              <td>{this.state.noticias[i].visible ? 'Si' : 'No'}</td>
                              <td>
                                <div className="input-group-prepend">
                                  <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    Acción
                                  </button>
                                  <ul className="dropdown-menu" style={{}}>
                                    <li className="dropdown-item"><a href='#' onClick={()=>this.handleClickEditar(this, i)}> Editar</a></li>
                                    <li className="dropdown-item"><a href='#' onClick={()=>this.handleEliminar(this, this.state.noticias[i].id_noticia)}>Eliminar</a></li>
                                    <li className="dropdown-item"><a href='#'onClick={()=>this.handleOcultar(this, i)} >{this.state.noticias[i].visible ? 'Ocultar' : 'Mostrar'}</a></li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                        </tbody>
                      </table>
                    </div>
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
                  <h3 className="card-title">Editar noticia</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputName">Título</label>
                    <input type="text" id="inputNameEdit" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputClientCompany">Link de la noticia</label>
                    <input type="text" id="inputClientCompanyEdit" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputProjectLeader">Imagén de la noticia</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputFileEdit" required/>
                        <label className="custom-file-label" htmlFor="exampleInputFile">Subir imagen</label>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" onClick={this.handleSubmitEditar} className="btn btn-primary">Actualizar noticia</button>
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
