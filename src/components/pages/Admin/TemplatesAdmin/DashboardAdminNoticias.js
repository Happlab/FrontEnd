import React, { Component } from 'react'
import {PeticionEnvio, PeticionEnvioDataFrom, PeticionGet} from '../PeticionesAdmin.js'
import * as Yup from 'yup';
import { Formik} from 'formik';
import Form from 'react-bootstrap/Form';

const validationSchema=Yup.object().shape({
  Titulo: Yup.string()
  .required("Campo Requerido")
  .lowercase("caracteres minuscula")
  .max(50, "Maximo 50 caracteres")
  .min(5, "Minimo 5 caracteres"),
  LinkNoticia: Yup.string()
  .required("Campo requerido")
  .url("URL no valida"),
  ImgNoticia: Yup.string()
  .required("Campo Requerido")
});

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
  
  urlServicio='http://localhost:8080/noticia/';

  componentDidMount(){
    this.ListarNoticias();
  }
  handleEliminar(id){
    const url=this.urlServicio+'delete/'+id;
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
    const url=this.urlServicio+'Update';
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
    const link_contenido=document.getElementById('inputFileEdit').files[0];
    const user={'id_noticia': this.state.noticias[this.state.posSeleccionado].id_noticia,
                'titulo_noticia': titulo,
                'url_noticia': url_noticia,
                'imagen': link_contenido,
                'visible': this.state.noticias[this.state.posSeleccionado].visible};
    const url=this.urlServicio+'Update';
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
  handleSubmitAgregar(datos){
    console.log("hola");
    /*
    var formdata = new FormData();
        const coordenadas=[
          0
        ];
        formdata.append("titulo_seccion", "Nuevas tecnologías clave para mejorar la eficiencia logística");
        formdata.append("url", "https://www.youtube.com/watch?v=OBA1EJWhpxA");
        formdata.append("contenido", document.getElementById('inputFileAdd').files[0]);
        formdata.append("descripcion", "En esta nueva entrada sobre la Guía Práctica del Borrador de nueva Constitución te contamos cómo la propuesta constitucional reconoce los desafíos que traen los avances de la ciencia y la tecnología para el Chile del presente y futuro. Ineditamente, se incorporan normas como el derecho a la participación política digital, a la información, al conocimiento, a la educación y conectividad digital, y a la protección de los datos personales, para contribuir al desarrollo de las comunidades, sin ser vulnerar de sus derechos.");
        formdata.append("coordenadas", coordenadas);
        const url='http://localhost:8080/seccion/update/0';
        const mensajeError='no fue posible actualizar estado del contenido';
        const metodo='PUT';
        const peticion=PeticionEnvioDataFrom(formdata, url, mensajeError, metodo);
        peticion.then(data =>{
            if(data){

            }
        });
        var formdata = new FormData();
        formdata.append("titulo_noticia", datos.Titulo);
        formdata.append("url_noticia", datos.LinkNoticia);
        formdata.append("imagen", document.getElementById('inputFileAdd').files[0]);
        formdata.append("visible", true);
        console.log(formdata);
        const url=this.urlServicio+'create';
        const mensajeError='no fue posible agregar noticia';
        const metodo='POST';
        const peticion=PeticionEnvioDataFrom(formdata, url, mensajeError, metodo);
        peticion.then(data =>{
            if(data){
                this.ListarNoticias();
            }
        });*/
    
  }
  handleClickEditar(i,posicion){
    this.setState({posSeleccionado: posicion});
    document.getElementById('inputNameEdit').value=this.state.noticias[posicion].titulo_noticia;
    //document.getElementById('inputFileEdit').files[0]=this.state.noticias[posicion].link_contenido;
    document.getElementById('inputClientCompanyEdit').value=this.state.noticias[posicion].url_noticia;
  }
  ListarNoticias() {
    const url=this.urlServicio;
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
                  <Formik initialValues={{
                    Titulo: '',
                    LinkNoticia: '',
                    ImgNoticia: ''
                  }} 
                  validationSchema={validationSchema}
                  onSubmit={values=> {
                    var formdata = new FormData();
                    formdata.append("titulo_noticia", values.Titulo);
                    formdata.append("url_noticia", values.LinkNoticia);
                    formdata.append("imagen", document.getElementById('inputFileAdd').files[0]);
                    formdata.append("visible", true);
                    console.log(formdata);
                    const url=this.urlServicio+'create';
                    const mensajeError='no fue posible agregar noticia';
                    const metodo='POST';
                    const peticion=PeticionEnvioDataFrom(formdata, url, mensajeError, metodo);
                    peticion.then(data =>{
                        alert(data);
                    });
                    }}
                  >
                      <Form>
                          <div className="form-group">
                            <label htmlFor="inputName">Título</label>
                            <input name='Titulo' type="text" id="inputName" className="form-control" onChange={this.handleChange} required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="inputClientCompany">Link de la noticia</label>
                            <input name='LinkNoticia' type="text" id="inputClientCompany" className="form-control" onChange={this.handleChange} required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="inputProjectLeader">Imagén de la noticia</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input name='ImgNoticia'  type="file" className="custom-file-input" id="inputFileAdd" accept='image/*' onChange={this.handleChange} required/>
                                <label className="custom-file-label" htmlFor="exampleInputFile">Subir imagen</label>
                              </div>
                            </div>
                          </div>
                          <div className="card-footer">
                            <button type="submit" onSubmit={this.handleSubmitAgregar} className="btn btn-primary">Crear noticia</button>
                          </div>
                      </Form>
                    </Formik>
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
                                    <li className="dropdown-item"><a href='#' onClick={()=>this.handleEliminar(this.state.noticias[i].link_contenido)}>Eliminar</a></li>
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
