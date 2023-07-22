import React, { Component } from "react";
import {
  PeticionEnvio,
  PeticionEnvioDataFrom,
  PeticionGet,
} from "../PeticionesAdmin.js";
import * as Yup from "yup";
import { Formik } from "formik";
// import { Form, Button } from "react-bootstrap";
import { environment } from "../../../../environments/environment.js";
import Popup from "../../../navegation/popup/Popup.js";

export default class DashboardAdminInicio extends Component {
  constructor(props) {
    super();
    this.state = {
      noticias: [],
      titulo_noticia: "",
      url_noticia: "",
      link_contenido: "",
      visible: true,
      posSeleccionado: -1,
      estadoEditar: false,
      notificacion: false,
      tituloNotificacion: "",
      mensajeNotificacion: "",
    };
    this.handleEliminar = this.handleEliminar.bind(this);
    this.handleOcultar = this.handleOcultar.bind(this);
    this.handleClickEditar = this.handleClickEditar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCerrar = this.handleClickCerrar.bind(this);
    this.handleClickCerrarModal = this.handleClickCerrarModal.bind(this);
  }

  urlServicio = environment.baseUrl + "/noticia/";

  validationSchema = Yup.object().shape({
    Titulo: Yup.string()
      .required("Campo Requerido")
      .min(5, "Minimo 5 caracteres")
      .max(50, "Maximo 50 caracteres"),
    LinkNoticia: Yup.string().required("Campo requerido").url("URL no valida"),
  });

  componentDidMount() {
    this.ListarNoticias();
  }
  handleClickCerrarModal() {
    this.setState({ notificacion: false });
  }
  handleClickCerrar() {
    this.setState({ estadoEditar: false });
  }
  handleEliminar(id) {
    const url = this.urlServicio + "delete/" + id;
    const metodo = "DELETE";
    const peticion = PeticionEnvio(" ", url, metodo);
    peticion.then((data) => {
      if (data) {
        this.setState({
          notificacion: true,
          tituloNotificacion: "Gestion de noticias",
          mensajeNotificacion: "La noticia se ha eliminado correctamente",
        });
        this.ListarNoticias();
      } else {
        this.setState({
          notificacion: true,
          tituloNotificacion: "Gestion de noticias",
          mensajeNotificacion:
            "No fue posible eliminar esta noticia, verifique su conexion con el servidor o a internet",
        });
      }
    });
  }
  handleOcultar(i, posicion) {
    const url =
      this.urlServicio +
      "changeVisible/" +
      this.state.noticias[posicion].link_contenido;
    const metodo = "PUT";
    const peticion = PeticionEnvio(" ", url, metodo);
    peticion.then((data) => {
      if (data) {
        this.setState({
          notificacion: true,
          tituloNotificacion: "Gestion de noticias",
          mensajeNotificacion:
            "El estado que controla si una noticia es visible o no, se ha alternado correctamente",
        });
        this.ListarNoticias();
      } else {
        this.setState({
          notificacion: true,
          tituloNotificacion: "Gestion de noticias",
          mensajeNotificacion:
            "No fue posible actualizar el estado que controla la visibilidad de la noticia, verifique su conexion con el servidor o a internet",
        });
      }
    });
  }

  handleChange(event) {
    let name = event.target.name;
    let value;
    if (name === "link_contenido") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    this.setState((state) => ({ [name]: value }));
  }

  handleClickEditar(i, posicion) {
    this.setState({
      posSeleccionado: posicion,
      estadoEditar: !this.state.estadoEditar,
    });
  }
  ListarNoticias() {
    const url = this.urlServicio;
    const mensajeError = "no hay noticias";
    let datos = PeticionGet(url, mensajeError);
    datos.then((data) => {
      if (data !== null) {
        this.setState({ noticias: Array.from(data) });
      }
    });
  }
  // render() {
  //   return (
  //     <div>
  //       <Popup
  //         show={this.state.notificacion}
  //         title={this.state.tituloNotificacion}
  //         message={this.state.mensajeNotificacion}
  //         accept={this.handleClickCerrarModal}
  //       />
  //       <div className="content-wrapper" style={{ minHeight: "2080.12px" }}>
  //         <h1 align="center">Módulo Administrador - Página de Noticias</h1>
  //         <br></br>
  //         {/* Añadir Noticias*/}
  //         <section className="content">
  //           <div className="container-fluid">
  //             <div className="card card-primary">
  //               <div className="card-header">
  //                 <h3 className="card-title">Añadir noticia</h3>
  //                 <div className="card-tools">
  //                   <button
  //                     type="button"
  //                     className="btn btn-tool"
  //                     data-card-widget="collapse"
  //                     title="Collapse"
  //                   >
  //                     <i className="fas fa-minus" />
  //                   </button>
  //                 </div>
  //               </div>
  //               <div className="card-body">
  //                 <Formik
  //                   initialValues={{
  //                     Titulo: "",
  //                     LinkNoticia: "",
  //                     ImgNoticia: "",
  //                   }}
  //                   validationSchema={this.validationSchema}
  //                   onSubmit={(values) => {
  //                     var formdata = new FormData();
  //                     formdata.append("titulo_noticia", values.Titulo);
  //                     formdata.append("url_noticia", values.LinkNoticia);
  //                     formdata.append(
  //                       "imagen",
  //                       document.getElementById("inputFileAdd").files[0]
  //                     );
  //                     formdata.append("visible", true);
  //                     const url = this.urlServicio + "create";
  //                     const metodo = "POST";
  //                     const peticion = PeticionEnvioDataFrom(
  //                       formdata,
  //                       url,
  //                       metodo
  //                     );
  //                     peticion.then((data) => {
  //                       if (data) {
  //                         this.setState({
  //                           notificacion: true,
  //                           tituloNotificacion: "Gestion de noticias",
  //                           mensajeNotificacion:
  //                             "La noticia fue creada exitosamente",
  //                         });
  //                         this.ListarNoticias();
  //                       } else {
  //                         this.setState({
  //                           notificacion: true,
  //                           tituloNotificacion: "Gestion de noticias",
  //                           mensajeNotificacion:
  //                             "No fue posible crear la noticia, verifique su conexion con el servidor o a internet",
  //                         });
  //                       }
  //                     });
  //                   }}
  //                 >
  //                   {(props) => (
  //                     <Form onSubmit={props.handleSubmit}>
  //                       <Form.Group className="mb-3" controlId="formName">
  //                         <Form.Label>Titulo</Form.Label>
  //                         <Form.Control
  //                           name="Titulo"
  //                           type="text"
  //                           required
  //                           placeholder="Ingresa el titulo de la noticia"
  //                           isInvalid={
  //                             props.touched.Titulo && !!props.errors.Titulo
  //                           }
  //                           value={props.values.Titulo}
  //                           onChange={props.handleChange}
  //                         />
  //                         <Form.Control.Feedback type="invalid">
  //                           {props.errors.Titulo}
  //                         </Form.Control.Feedback>
  //                       </Form.Group>
  //                       <Form.Group className="mb-3" controlId="formLastName">
  //                         <Form.Label>Url noticia</Form.Label>
  //                         <Form.Control
  //                           name="LinkNoticia"
  //                           type="text"
  //                           required
  //                           placeholder="Ingresa el link de la noticia"
  //                           isInvalid={
  //                             props.touched.LinkNoticia &&
  //                             !!props.errors.LinkNoticia
  //                           }
  //                           value={props.values.LinkNoticia}
  //                           onChange={props.handleChange}
  //                         />
  //                         <Form.Control.Feedback type="invalid">
  //                           {props.errors.LinkNoticia}
  //                         </Form.Control.Feedback>
  //                       </Form.Group>
  //                       <Form.Group className="mb-3" controlId="inputFileAdd">
  //                         <Form.Label>Imagen</Form.Label>
  //                         <Form.Control
  //                           name="ImgNoticia"
  //                           type="file"
  //                           required
  //                           placeholder="Inserta una imagen"
  //                           isInvalid={
  //                             props.touched.ImgNoticia &&
  //                             !!props.errors.ImgNoticia
  //                           }
  //                           value={props.values.ImgNoticia}
  //                           onChange={props.handleChange}
  //                         />
  //                         <Form.Control.Feedback type="invalid">
  //                           {props.errors.ImgNoticia}
  //                         </Form.Control.Feedback>
  //                       </Form.Group>
  //                       <Button type="submit">Enviar</Button>
  //                     </Form>
  //                   )}
  //                 </Formik>
  //               </div>
  //             </div>
  //           </div>
  //         </section>
  //         {/*Lista de noticias*/}
  //         <section className="content-header">
  //           <div className="container-fluid">
  //             <div className="row mb-2">
  //               <div className="col-sm-12">
  //                 <h1 text-align="center">Gestion de Noticias</h1>
  //               </div>
  //             </div>
  //           </div>
  //         </section>
  //         <section className="content">
  //           <div className="container-fluid">
  //             <div className="row">
  //               <div className="col-12">
  //                 <div className="card">
  //                   <div className="card-header border-0">
  //                     <h3 className="card-title">Listado de noticias</h3>
  //                   </div>
  //                   <div className="card-body table-responsive p-0">
  //                     <table className="table table-striped table-valign-middle">
  //                       <thead>
  //                         <tr>
  //                           <th>ID Noticia</th>
  //                           <th>Título</th>
  //                           <th>Fecha de publicación</th>
  //                           <th>Visible</th>
  //                           <th>Acción</th>
  //                         </tr>
  //                       </thead>
  //                       <tbody>
  //                         {[...Array(this.state.noticias.length)].map(
  //                           (e, i) => {
  //                             return (
  //                               <tr key={i + 1}>
  //                                 <td>{i + 1}</td>
  //                                 <td>
  //                                   {this.state.noticias[i].titulo_noticia}
  //                                 </td>
  //                                 <td>
  //                                   {this.state.noticias[i].fecha_creacion}
  //                                 </td>
  //                                 <td>
  //                                   {this.state.noticias[i].visible
  //                                     ? "Si"
  //                                     : "No"}
  //                                 </td>
  //                                 <td>
  //                                   <div className="input-group-prepend">
  //                                     <button
  //                                       type="button"
  //                                       className="btn btn-warning dropdown-toggle"
  //                                       data-toggle="dropdown"
  //                                       aria-expanded="false"
  //                                     >
  //                                       Acción
  //                                     </button>
  //                                     <ul className="dropdown-menu" style={{}}>
  //                                       <li
  //                                         className="dropdown-item"
  //                                         style={{ cursor: "pointer" }}
  //                                         onClick={() =>
  //                                           this.handleClickEditar(this, i)
  //                                         }
  //                                       >
  //                                         {" "}
  //                                         Editar
  //                                       </li>
  //                                       <li
  //                                         className="dropdown-item"
  //                                         style={{ cursor: "pointer" }}
  //                                         onClick={() =>
  //                                           this.handleEliminar(
  //                                             this.state.noticias[i]
  //                                               .link_contenido
  //                                           )
  //                                         }
  //                                       >
  //                                         Eliminar
  //                                       </li>
  //                                       <li
  //                                         className="dropdown-item"
  //                                         style={{ cursor: "pointer" }}
  //                                         onClick={() =>
  //                                           this.handleOcultar(this, i)
  //                                         }
  //                                       >
  //                                         {this.state.noticias[i].visible
  //                                           ? "Ocultar"
  //                                           : "Mostrar"}
  //                                       </li>
  //                                     </ul>
  //                                   </div>
  //                                 </td>
  //                               </tr>
  //                             );
  //                           }
  //                         )}
  //                       </tbody>
  //                     </table>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </section>
  //         {/*Editor de Noticias*/}
  //         <section className="content">
  //           <div className="container-fluid">
  //             <div className="card card-primary">
  //               <div className="card-header">
  //                 <h3 className="card-title">Editar noticia</h3>
  //                 <div className="card-tools">
  //                   <button
  //                     type="button"
  //                     className="btn btn-tool"
  //                     data-card-widget="collapse"
  //                     title="Collapse"
  //                   >
  //                     <i className="fas fa-minus" />
  //                   </button>
  //                 </div>
  //               </div>
  //               <div className="card-body">
  //                 {this.state.posSeleccionado !== -1 &&
  //                 this.state.estadoEditar ? (
  //                   <Formik
  //                     initialValues={{
  //                       Titulo:
  //                         this.state.noticias[this.state.posSeleccionado]
  //                           .titulo_noticia,
  //                       LinkNoticia:
  //                         this.state.noticias[this.state.posSeleccionado]
  //                           .url_noticia,
  //                       ImgNoticia: "",
  //                     }}
  //                     validationSchema={this.validationSchema}
  //                     onSubmit={(values) => {
  //                       var dataform = new FormData();
  //                       dataform.append("titulo_noticia", values.Titulo);
  //                       dataform.append("url_noticia", values.LinkNoticia);
  //                       if (
  //                         document.getElementById("inputFileEdit").files[0] !==
  //                         undefined
  //                       ) {
  //                         dataform.append(
  //                           "imagen",
  //                           document.getElementById("inputFileEdit").files[0]
  //                         );
  //                       } else {
  //                         dataform.append("imagen", new File([""], ""));
  //                       }
  //                       dataform.append(
  //                         "visible",
  //                         this.state.noticias[this.state.posSeleccionado]
  //                           .visible
  //                       );

  //                       const url =
  //                         this.urlServicio +
  //                         "Update/" +
  //                         this.state.noticias[this.state.posSeleccionado]
  //                           .link_contenido;
  //                       const metodo = "PUT";
  //                       if (this.state.posSeleccionado !== -1) {
  //                         const peticion = PeticionEnvioDataFrom(
  //                           dataform,
  //                           url,
  //                           metodo
  //                         );
  //                         peticion.then((data) => {
  //                           if (data) {
  //                             this.setState({
  //                               notificacion: true,
  //                               tituloNotificacion: "Gestion de noticias",
  //                               mensajeNotificacion:
  //                                 "La noticia fue editada exitosamente",
  //                             });
  //                             this.ListarNoticias();
  //                           } else {
  //                             this.setState({
  //                               notificacion: true,
  //                               tituloNotificacion: "Gestion de noticias",
  //                               mensajeNotificacion:
  //                                 "No fue posible editar la noticia, verifique su conexion con el servidor o a internet",
  //                             });
  //                           }
  //                         });
  //                       }
  //                     }}
  //                   >
  //                     {(props) => (
  //                       <Form id="formul" onSubmit={props.handleSubmit}>
  //                         <Form.Group className="mb-3" controlId="formNameq">
  //                           <Form.Label>Titulo</Form.Label>
  //                           <Form.Control
  //                             name="Titulo"
  //                             type="text"
  //                             required
  //                             placeholder="Ingresa el titulo de la noticia"
  //                             isInvalid={
  //                               props.touched.Titulo && !!props.errors.Titulo
  //                             }
  //                             value={props.values.Titulo}
  //                             onChange={props.handleChange}
  //                           />
  //                           <Form.Control.Feedback type="invalid">
  //                             {props.errors.Titulo}
  //                           </Form.Control.Feedback>
  //                         </Form.Group>
  //                         <Form.Group className="mb-3" controlId="formLastName">
  //                           <Form.Label>Url noticia</Form.Label>
  //                           <Form.Control
  //                             name="LinkNoticia"
  //                             type="text"
  //                             required
  //                             placeholder="Ingresa el link de la noticia"
  //                             isInvalid={
  //                               props.touched.LinkNoticia &&
  //                               !!props.errors.LinkNoticia
  //                             }
  //                             value={props.values.LinkNoticia}
  //                             onChange={props.handleChange}
  //                           />
  //                           <Form.Control.Feedback type="invalid">
  //                             {props.errors.LinkNoticia}
  //                           </Form.Control.Feedback>
  //                         </Form.Group>
  //                         <Form.Group
  //                           className="mb-3"
  //                           controlId="inputFileEdit"
  //                         >
  //                           <Form.Label>Imagen</Form.Label>
  //                           <Form.Control
  //                             name="ImgNoticia"
  //                             type="file"
  //                             placeholder="Inserta una imagen"
  //                             isInvalid={
  //                               props.touched.ImgNoticia &&
  //                               !!props.errors.ImgNoticia
  //                             }
  //                             value={props.values.ImgNoticia}
  //                             onChange={props.handleChange}
  //                           />
  //                           <Form.Control.Feedback type="invalid">
  //                             {props.errors.ImgNoticia}
  //                           </Form.Control.Feedback>
  //                         </Form.Group>
  //                         <Button type="submit">Enviar</Button>{" "}
  //                         <Button onClick={() => this.handleClickCerrar()}>
  //                           {" "}
  //                           Cerrar
  //                         </Button>
  //                       </Form>
  //                     )}
  //                   </Formik>
  //                 ) : null}
  //               </div>
  //             </div>
  //           </div>
  //         </section>
  //       </div>
  //     </div>
  //   );
  // }
}
