import React, { Component } from 'react'
import {PeticionEnvio, PeticionEnvioDataFrom, PeticionGet} from '../PeticionesAdmin.js'
import * as Yup from 'yup';
import { Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';



export default class DashboardAdminInicio extends Component {
  constructor (props){
      super();
      this.state={
        noticias: [],
        titulo_noticia: '',
        url_noticia: '',
        link_contenido: '',
        visible: true,
        posSeleccionado: -1
      }
      this.handleSubmitEditar=this.handleSubmitEditar.bind(this);
      this.handleEliminar=this.handleEliminar.bind(this);
      this.handleOcultar=this.handleOcultar.bind(this);
      this.handleClickEditar=this.handleClickEditar.bind(this);
      this.handleChange=this.handleChange.bind(this);
  }
  
  urlServicio='http://localhost:8080/noticia/';

  validationSchema=Yup.object().shape({
    Titulo: Yup.string().required("Campo Requerido").min(5, "Minimo 5 caracteres").max(50, "Maximo 50 caracteres"),
    LinkNoticia: Yup.string().required("Campo requerido").url("URL no valida")
  });

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
                'link_contenido': this.state.noticias[this.state.posSeleccionado].link_contenido,
                'visible': this.state.noticias[this.state.posSeleccionado].visible,
                'fecha_creacion': this.state.noticias[this.state.posSeleccionado].fecha_creacion};
    const url=this.urlServicio+'Update';
    const mensajeError='no fue posible editar noticia';
    const metodo='PUT';
    if(this.state.posSeleccionado!==-1){
      const peticion=PeticionEnvio(user, url, mensajeError, metodo);
      peticion.then(data =>{
          alert(data);
       });
    }
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
                  validationSchema={this.validationSchema}
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
                        {props => (
                            <Form onSubmit={props.handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control
                                        name="Titulo"
                                        type="text"
                                        required
                                        placeholder="Ingresa el titulo de la noticia"
                                        isInvalid={props.touched.Titulo && !!props.errors.Titulo}
                                        value={props.values.Titulo} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.Titulo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Url noticia</Form.Label>
                                    <Form.Control
                                        name="LinkNoticia"
                                        type="text"
                                        required
                                        placeholder="Ingresa el link de la noticia"
                                        isInvalid={props.touched.LinkNoticia && !!props.errors.LinkNoticia}
                                        value={props.values.LinkNoticia} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.LinkNoticia}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="inputFileAdd">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control
                                        name="ImgNoticia"
                                        type="file"
                                        required
                                        placeholder="Inserta una imagen"
                                        isInvalid={props.touched.ImgNoticia && !!props.errors.ImgNoticia}
                                        value={props.values.ImgNoticia} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.ImgNoticia}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit">Enviar</Button>
                            </Form>
                        )}
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
