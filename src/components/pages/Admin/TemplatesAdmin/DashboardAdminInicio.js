import React, { Component } from "react";
import { PeticionEnvioDataFrom, PeticionGet } from "../PeticionesAdmin.js";
import Notificacion from "./modal.js";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  titulo_seccion: Yup.string()
    .required("Campo Requerido")
    .min(10, "Minimo 10 caracteres")
    .max(100, "Maximo 100 caracteres"),
  url_seccion: Yup.string().url("URL no valida"),
  descripcion: Yup.string()
    .required("Campo Requerido")
    .min(50, "Minimo 50 caracteres")
    .max(250, "Maximo 250 caracteres"),
});

export default class DashboardAdminInicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inicio: [],
      posicion: -1,
      notificacion: false,
      tituloNotificacion: "",
      mensajeNotificacion: "",
    };
    this.handleClickCerrarModal = this.handleClickCerrarModal.bind(this);
    this.editar = this.editar.bind(this);
    this.funcioneditar = this.funcioneditar.bind(this);
  }
  urlServicio = "http://localhost:8080/seccion/";
  componentDidMount() {
    this.listarInformacion();
  }

  listarInformacion() {
    const url = this.urlServicio;
    const datos = PeticionGet(url);
    datos.then((data) => {
      if (data !== null) {
        this.setState({ inicio: Array.from(data) });
      }
    });
  }
  handleClickCerrarModal() {
    this.setState({ notificacion: false });
  }
  editar(entrada, indice) {
    this.setState({ posicion: indice });
  }

  funcioneditar(titulo, url_seccion, contenido, descripcion) {
    const dataform = new FormData();

    dataform.append("id", this.state.inicio[this.state.posicion].id);
    dataform.append("titulo_seccion", titulo);
    dataform.append("url", url_seccion);
    if (contenido === undefined) {
      dataform.append("contenido", new File([""], ""));
    } else {
      dataform.append("contenido", contenido);
    }
    dataform.append("descripcion", descripcion);
    dataform.append("coordenadas", [0, 0]);

    const url =
      this.urlServicio + "update/" + this.state.inicio[this.state.posicion].id;
    const metodo = "PUT";

    const peticion = PeticionEnvioDataFrom(dataform, url, metodo);
    peticion.then((data) => {
      if (data) {
        this.setState({
          notificacion: true,
          tituloNotificacion: "Gestion de informacion de inicio",
          mensajeNotificacion:
            "La informacion de inicio fue actualizada exitosamente",
        });
        this.listarInformacion();
      } else {
        this.setState({
          notificacion: true,
          tituloNotificacion: "Gestion de informacion de inicio",
          mensajeNotificacion:
            "No fue posible editar la informacion de inicio, verifique su conexion con el servidor o a internet",
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Notificacion
          show={this.state.notificacion}
          titulo={this.state.tituloNotificacion}
          mensaje={this.state.mensajeNotificacion}
          onclick={this.handleClickCerrarModal}
        />
        <div className="content-wrapper" style={{ minHeight: "2080.12px" }}>
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
                      <h3 className="card-title">
                        Listado de secciones (Inicio)
                      </h3>
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
                          {[...Array(this.state.inicio.length)]
                            .filter((value, index) => index < 2)
                            .map((e, i) => {
                              return (
                                <tr>
                                  <td>{i}</td>
                                  <td>{this.state.inicio[i].titulo_seccion}</td>
                                  <td>
                                    <div className="input-group-prepend">
                                      <button
                                        onClick={() =>
                                          this.editar(this.state.inicio[i], i)
                                        }
                                        className="btn btn-warning"
                                      >
                                        Editar
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
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
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  {this.state.posicion === 0 ? (
                    <Formik
                      initialValues={{
                        titulo_seccion: this.state.inicio[0].titulo_seccion,
                        url_seccion: this.state.inicio[0].url,
                        descripcion: this.state.inicio[0].descripcion,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values, errors) => {
                        const titulo = values.titulo_seccion;
                        const url = values.url_seccion;
                        var contenido;
                        if (values.nombre_contenido !== "") {
                          contenido =
                            document.getElementById("inputContenido").files[0];
                        } else {
                          contenido = new File([""], "");
                        }
                        const descripcion = values.descripcion;

                        if (
                          values.url_seccion === "" ||
                          document.getElementById("inputContenido").files[0] ===
                            undefined
                        ) {
                          if (
                            values.url_seccion === "" &&
                            document.getElementById("inputContenido")
                              .files[0] === undefined
                          ) {
                            errors.setFieldError(
                              "url_seccion",
                              "Ingrese una url o un archivo"
                            );
                          } else {
                            this.funcioneditar(
                              titulo,
                              url,
                              contenido,
                              descripcion
                            );
                          }
                        } else {
                          errors.setFieldError(
                            "url_seccion",
                            "No es posible ingresar una url y un archivo, escoja solo uno"
                          );
                        }
                      }}
                    >
                      {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                          <Form.Group className="mb-3" controlId="inpuTitulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                              name="titulo_seccion"
                              type="text"
                              required
                              placeholder="Ingresa el titulo del apartado Inicio"
                              isInvalid={
                                props.touched.titulo_seccion &&
                                !!props.errors.titulo_seccion
                              }
                              value={props.values.titulo_seccion}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.titulo_seccion}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="inputURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                              name="url_seccion"
                              type="text"
                              placeholder="Ingresa la url de un video para el apartado Inicio"
                              isInvalid={
                                props.touched.url_seccion &&
                                !!props.errors.url_seccion
                              }
                              value={props.values.url_seccion}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.url_seccion}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="inputContenido"
                          >
                            <Form.Label>Archivo</Form.Label>
                            <Form.Control
                              name="nombre_contenido"
                              type="file"
                              placeholder="Ingresa el archivo del apartado Inicio"
                              isInvalid={
                                props.touched.nombre_contenido &&
                                !!props.errors.nombre_contenido
                              }
                              value={props.values.nombre_contenido}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.nombre_contenido}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="inputDescripcion"
                          >
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                              name="descripcion"
                              type="text"
                              required
                              placeholder="Ingresa la descripcion del apartado Inicio"
                              isInvalid={
                                props.touched.descripcion &&
                                !!props.errors.descripcion
                              }
                              value={props.values.descripcion}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.descripcion}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button type="submit">Enviar</Button>
                        </Form>
                      )}
                    </Formik>
                  ) : null}

                  {this.state.posicion === 1 ? (
                    <Formik
                      initialValues={{
                        titulo_seccion: this.state.inicio[1].titulo_seccion,
                        url_seccion: this.state.inicio[1].url,
                        descripcion: this.state.inicio[1].descripcion,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values, errors) => {
                        const titulo = values.titulo_seccion;
                        const url = values.url_seccion;
                        var contenido;
                        if (values.nombre_contenido !== "") {
                          contenido =
                            document.getElementById("inputContenido").files[0];
                        } else {
                          contenido = new File([""], "");
                        }
                        const descripcion = values.descripcion;

                        if (
                          values.url_seccion === "" ||
                          document.getElementById("inputContenido").files[0] ===
                            undefined
                        ) {
                          if (
                            values.url_seccion === "" &&
                            document.getElementById("inputContenido")
                              .files[0] === undefined
                          ) {
                            errors.setFieldError(
                              "url_seccion",
                              "Ingrese una url o un archivo"
                            );
                          } else {
                            this.funcioneditar(
                              titulo,
                              url,
                              contenido,
                              descripcion
                            );
                          }
                        } else {
                          errors.setFieldError(
                            "url_seccion",
                            "No es posible ingresar una url y un archivo, escoja solo uno"
                          );
                        }
                      }}
                    >
                      {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                          <Form.Group className="mb-3" controlId="inpuTitulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                              name="titulo_seccion"
                              type="text"
                              required
                              placeholder="Ingresa el titulo del apartado Inicio"
                              isInvalid={
                                props.touched.titulo_seccion &&
                                !!props.errors.titulo_seccion
                              }
                              value={props.values.titulo_seccion}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.titulo_seccion}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="inputURL">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                              name="url_seccion"
                              type="text"
                              placeholder="Ingresa la url de un video para el apartado Inicio"
                              isInvalid={
                                props.touched.url_seccion &&
                                !!props.errors.url_seccion
                              }
                              value={props.values.url_seccion}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.url_seccion}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="inputContenido"
                          >
                            <Form.Label>Archivo</Form.Label>
                            <Form.Control
                              name="nombre_contenido"
                              type="file"
                              placeholder="Ingresa el archivo del apartado Inicio"
                              isInvalid={
                                props.touched.nombre_contenido &&
                                !!props.errors.nombre_contenido
                              }
                              value={props.values.nombre_contenido}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.nombre_contenido}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="inputDescripcion"
                          >
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                              name="descripcion"
                              type="text"
                              required
                              placeholder="Ingresa la descripcion del apartado Acerca De"
                              isInvalid={
                                props.touched.descripcion &&
                                !!props.errors.descripcion
                              }
                              value={props.values.descripcion}
                              onChange={props.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                              {props.errors.descripcion}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button type="submit">Enviar</Button>
                        </Form>
                      )}
                    </Formik>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
