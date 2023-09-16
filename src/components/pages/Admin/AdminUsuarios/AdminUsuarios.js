import React, { useEffect, useState } from "react";
import AdminMainPages from "../../../wrappers/adminMainPages/AdminMainPages";
import { peticionEnvio, peticionGet } from "../../../../services/AdminServices";
import { environment } from "../../../../environments/environment";
import Popup from "../../../navegation/popup/Popup";
import "./AdminUsuarios.css";

const urlService = environment.baseUrl + "/persona/";

const AdminUsuarios = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const handleClickCloseModal = () => {
    setShowNotification(false);
  };

  const desactiveUser = (user) => {
    const url = urlService + "desactivar/" + user.email;
    peticionEnvio(" ", url, "DELETE").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Usuarios");
      if (data) {
        setMessageNotification(
          "El estado del usuario paso a desactivado correctamente"
        );
        listUsers();
      } else {
        setMessageNotification(
          "El estado del usuario no fue posible actualizarlo, verifique su conexión a internet"
        );
      }
    });
  };

  const deleteUser = (user) => {
    const url = urlService + "delete/" + user.email;
    peticionEnvio(" ", url, "DELETE").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Usuarios");
      if (data) {
        setMessageNotification(
          "La solicitud del usuario fue rechazada correctamente"
        );
        listUsers();
      } else {
        setMessageNotification(
          "No fue posible rechazar la solicitud al usuario, verifique su conexión a internet"
        );
      }
    });
  };

  const acceptUser = (user) => {
    user.pendiente = false;
    user.activo = true;
    user.tipoDocente = user.tipo_docente;
    const url = urlService + "update";
    peticionEnvio(user, url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Usuarios");
      if (data) {
        setMessageNotification(
          "La solicitud del usuario fue aceptada correctamente"
        );
        listUsers();
      } else {
        setMessageNotification(
          "No fue posible aceptar la solicitud de este usuario, verifique su conexión a internet"
        );
      }
    });
  };

  const updateUser = (user) => {
    user.activo = true;
    user.tipoDocente = user.tipo_docente;
    const url = urlService + "update";
    peticionEnvio(user, url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Usuarios");
      if (data) {
        setMessageNotification(
          "El estado del usuario cambio a activo correctamente"
        );
        listUsers();
      } else {
        setMessageNotification(
          "No fue posible cambiar el estado del usuario, verifique su conexión a internet"
        );
      }
    });
  };

  useEffect(() => listUsers(), []);

  const listUsers = () => {
    peticionGet(urlService).then((data) => {
      if (data) {
        let dataFilter = data.filter((user) => user.activo && !user.pendiente);
        setCount(dataFilter.length);
        setUsers(Array.from(data));
      } else {
        setShowNotification(true);
        setTitleNotification("Gestión de Usuarios");
        setMessageNotification("No hay usuarios registrados");
      }
    });
  };

  return (
    <AdminMainPages option="usuario">
      <Popup
        show={showNotification}
        title={titleNotification}
        message={messageNotification}
        accept={handleClickCloseModal}
      />
      <div className="content-user-admin">
        <h1>Módulo Administrador - Usuarios</h1>
        <h3>Estádisticas de usuarios</h3>
        <div className="row-user-admin">
          <div className="col-user-admin">
            <div className="small-box-user-admin bg-warning-user-admin">
              <div className="inner-user-admin">
                <h3>{count}</h3>
                <p>Usuarios Registrados</p>
              </div>
              <div className="icon-user-admin">
                <svg
                  className="icon-person-user-admin"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </div>
              <a className="small-box-footer-user-admin" href="/AdminUsuarios">
                More info <i className="icon-arrow-circle-right-user-admin" />
              </a>
            </div>
          </div>
        </div>
        <section className="content-header-user-admin">
          <div className="row-user-admin">
            <div className="col-user-admin">
              <h1>Tablas de gestión de usuarios</h1>
            </div>
          </div>
        </section>
        <section className="content-user-admin">
          <div className="row-user-admin">
            <div className="col-user-admin">
              <div className="card-user-admin">
                <div className="card-header-user-admin">
                  <h3 className="card-title-user-admin">
                    Solicitudes de usuarios
                  </h3>
                </div>
                <div className="card-body-user-admin table-responsive-user-admin">
                  <table className="table-user-admin">
                    <thead>
                      <tr>
                        <th>Nombre Completo</th>
                        <th>E-mail</th>
                        <th>No. Documento</th>
                        <th>Tip profesor</th>
                        <th>Solicitud</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((value) => value.pendiente)
                        .map((user, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{user.nombres + " " + user.apellidos}</td>
                              <td>{user.email}</td>
                              <td>{user.cedula}</td>
                              <td>{user.tipo_docente}</td>
                              <td>
                                <div className="btn-group-user-admin">
                                  <button
                                    type="button"
                                    className="btn-user-admin btn-danger-user-admin"
                                  >
                                    Aprobar / Rechazar
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-user-admin btn-danger-user-admin dropdown-toggle-user-admin"
                                  >
                                    <span className="caret-user-admin">
                                      Desplegar menú
                                    </span>
                                  </button>
                                  <ul className="dropdown-menu-user-admin">
                                    <li
                                      className="dropdown-item-user-admin"
                                      onClick={() => acceptUser(user)}
                                    >
                                      Aprobar
                                    </li>
                                    <li
                                      className="dropdown-item-user-admin"
                                      onClick={() => deleteUser(user)}
                                    >
                                      Rechazar
                                    </li>
                                    <li className="divider-user-admin"></li>
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
        </section>
        <section>
          <div className="row-user-admin">
            <div className="col-user-admin">
              <div className="card-user-admin">
                <div className="card-header-user-admin">
                  <h3 className="card-title-user-admin">Lista de usuarios</h3>
                </div>
                <div className="card-body-user-admin table-responsive-user-admin">
                  <table className="table-user-admin">
                    <thead>
                      <tr>
                        <th>Nombre Completo</th>
                        <th>E-mail</th>
                        <th>Estado de cuenta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((value) => !value.pendiente)
                        .map((user, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{user.nombres + " " + user.apellidos}</td>
                              <td>{user.email}</td>
                              <td>
                                <div className="btn-group-user-admin">
                                  <button
                                    type="button"
                                    className="btn-user-admin btn-danger-user-admin"
                                  >
                                    {user.activo ? "Activo" : "Inactivo"}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-user-admin btn-danger-user-admin dropdown-toggle-user-admin"
                                  >
                                    <span className="caret-user-admin">
                                      Desplegar menú
                                    </span>
                                  </button>
                                  <ul className="dropdown-menu-user-admin">
                                    <li
                                      className="dropdown-item-user-admin"
                                      onClick={() => updateUser(user)}
                                    >
                                      Activar
                                    </li>
                                    <li
                                      className="dropdown-item-user-admin"
                                      onClick={() => desactiveUser(user)}
                                    >
                                      Inactivar
                                    </li>
                                    <li className="divider-user-admin"></li>
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
        </section>
      </div>
    </AdminMainPages>
  );
};

export default AdminUsuarios;
