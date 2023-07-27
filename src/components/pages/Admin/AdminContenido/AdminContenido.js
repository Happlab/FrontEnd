import React, { useEffect, useState } from "react";
import AdminMainPages from "../../../wrappers/adminMainPages/AdminMainPages";
import { PeticionEnvio, PeticionGet } from "../../../../services/AdminServices";
import { environment } from "../../../../environments/environment";
import Popup from "../../../navegation/popup/Popup";

const urlService = environment.baseUrl + "/contenido/";

const AdminContenido = () => {
  const [contents, setContents] = useState([]);
  const [count, setCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");

  const handleClickCloseModal = () => {
    setShowNotification(false);
  };

  const downloadContent = (linkContent) =>
    (window.location.href = urlService + "download/" + linkContent);

  const showOrCloseContent = (content) => {
    content.visible = content.visible ? false : true;
    const url = urlService + "changeVisible/" + content.link;
    PeticionEnvio("", url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Contenidos");
      if (data) {
        setMessageNotification(
          "El estado de visibilidad del contenido se ha actualizado correctamente"
        );
        listContent();
      } else {
        setMessageNotification(
          "No fue posible cambiar estado de visibilidad del contenido, verifique su conexión a internet"
        );
      }
    });
  };

  const acceptContent = (content) => {
    content.pendiente = false;
    content.visible = true;
    const url = urlService + "changePendiente/" + content.link;
    PeticionEnvio("", url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Contenidos");
      if (data) {
        setMessageNotification(
          "La solicitud para publicar el contenido fue aceptada"
        );
        listContent();
      } else {
        setMessageNotification(
          "No fue posible aceptar la solicitud de publicar contenido, verifique su conexión a internet"
        );
      }
    });
  };

  const deleteContent = (content) => {
    const url = urlService + "delete/" + content.link;
    PeticionEnvio("", url, "DELETE").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Contenidos");
      if (data) {
        setMessageNotification(
          "La solicitud para publicar el contenido fue rechazada"
        );
        listContent();
      } else {
        setMessageNotification(
          "No fue posible rechazar la solicitud de contenido, verifique su conexión a internet"
        );
      }
    });
  };

  useEffect(() => listContent(), []);

  const listContent = () => {
    PeticionGet(urlService).then((data) => {
      if (data) {
        let dataFilter = data.filter(
          (value) => value.visible && value.pendiente
        );
        setCount(dataFilter.length);
        setContents(Array.from(data));
      }
    });
  };

  return (
    <AdminMainPages option="contenido">
      <div>
        <Popup
          show={showNotification}
          title={titleNotification}
          message={messageNotification}
          accept={handleClickCloseModal}
        />
        {/*Lista d solicitudes*/}
        <div className="content-wrapper" style={{ minHeight: "2080.12px" }}>
          <h1 align="center">Módulo Administrador - Página de Contenidos</h1>
          <br></br>
          {/* Estádisticas de Contenidos */}
          <div className="container-fluid">
            <br />
            <h3>Conteo de contenidos</h3>
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{count}</h3>
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
                  <h1 text-align="center">
                    Tablas de gestion de de contenidos
                  </h1>
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
                    </div>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: 300 }}
                    >
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Usuario</th>
                            <th>Documentación</th>
                            <th>Etiquetas</th>
                            <th>Fecha de cargue</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contents
                            .filter((content) => content.pendiente)
                            .map((contentPendiente, i) => {
                              return (
                                <tr key={i + 1}>
                                  <td>{contentPendiente.titulo}</td>
                                  <td>
                                    <textarea
                                      id="inputDescription"
                                      className="form-control"
                                      style={{ width: "300px" }}
                                      rows={4}
                                      defaultValue={contentPendiente.resumen}
                                    />
                                  </td>
                                  <td>{contentPendiente.id_autor.email}</td>
                                  <div className="btn-group btn-group-sm">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        downloadContent(contentPendiente.link)
                                      }
                                      className="btn btn-primary float-right"
                                      style={{ marginRight: 5 }}
                                    >
                                      <i className="fas fa-download" />{" "}
                                      Descargar
                                    </button>
                                  </div>
                                  <td>
                                    <textarea
                                      id="inputDescription"
                                      className="form-control"
                                      style={{ width: "150px" }}
                                      rows={4}
                                      defaultValue={contentPendiente.tags}
                                    />
                                  </td>
                                  <td>{contentPendiente.fecha_subida}</td>
                                  <td>
                                    <div className="input-group-prepend">
                                      <button
                                        type="button"
                                        className="btn btn-warning dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Acción
                                      </button>
                                      <ul className="dropdown-menu" style={{}}>
                                        <li
                                          className="dropdown-item"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            acceptContent(contentPendiente)
                                          }
                                        >
                                          Aprobar
                                        </li>
                                        <li
                                          className="dropdown-item"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            deleteContent(contentPendiente)
                                          }
                                        >
                                          Rechazar
                                        </li>
                                      </ul>
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
                    </div>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: 300 }}
                    >
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
                            <th>Fecha de cargue</th>
                            <th>Visible</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contents
                            .filter((content) => !content.pendiente)
                            .map((contentNoPendiente, i) => {
                              return (
                                <tr key={i + 1}>
                                  <td>{i + 1}</td>
                                  <td>{contentNoPendiente.titulo}</td>
                                  <td>
                                    <textarea
                                      id="inputDescription"
                                      style={{ width: "300px" }}
                                      className="form-control"
                                      cols={10}
                                      rows={4}
                                      defaultValue={contentNoPendiente.resumen}
                                    />
                                  </td>
                                  <td>{contentNoPendiente.id_autor.email}</td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          downloadContent(
                                            contentNoPendiente.link
                                          )
                                        }
                                        className="btn btn-primary float-right"
                                        style={{ marginRight: 5 }}
                                      >
                                        <i className="fas fa-download" />{" "}
                                        Descargar
                                      </button>
                                    </div>
                                  </td>
                                  <td>
                                    {contentNoPendiente.valoracion_general.toFixed(
                                      3
                                    )}
                                  </td>
                                  <td>
                                    <textarea
                                      id="inputDescription"
                                      className="form-control"
                                      style={{ width: "150px" }}
                                      rows={4}
                                      defaultValue={contentNoPendiente.tags}
                                    />
                                  </td>
                                  <td>
                                    {new Date(
                                      contentNoPendiente.fecha_subida
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {contentNoPendiente.visible ? "Si" : "No"}
                                  </td>
                                  <td>
                                    <div className="input-group-prepend">
                                      <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() =>
                                          showOrCloseContent(contentNoPendiente)
                                        }
                                        aria-expanded="false"
                                      >
                                        {contentNoPendiente.visible
                                          ? "Ocultar"
                                          : "Mostrar"}
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
        </div>
      </div>
    </AdminMainPages>
  );
};

export default AdminContenido;
