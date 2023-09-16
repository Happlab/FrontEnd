import React, { useEffect, useState } from "react";
import AdminMainPages from "../../../wrappers/adminMainPages/AdminMainPages";
import { peticionEnvioDataFrom, peticionGet } from "../../../../services/AdminServices";
import { environment } from "../../../../environments/environment";
import Popup from "../../../navegation/popup/Popup";
import "./AdminAcercaDe.css";

const urlService = environment.baseUrl + "/seccion/";

const AdminAcercaDe = () => {
  const [aboutInformation, setAboutInformation] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const [messagesError, setMessagesError] = useState({});
  const [aboutSelect, setAboutSelect] = useState({});
  const [values, setValues] = useState({
    id: -1,
    titulo_seccion: "",
    descripcion: "",
    url: "",
    contenido: new File([""], ""),
    latitud: 0,
    longitud: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (e, schema) => {
    const { name, value } = e.target;
    let error = validField(name, value, schema);
    setMessagesError((prevValues) => ({
      ...prevValues,
      [name]: error,
    }));
  };

  const handleClickCloseModal = () => {
    setShowNotification(false);
  };

  const isValidAllValues = (schema) => {
    const newErrors = {};

    Object.keys(values).forEach((field) => {
      const error = validField(field, values[field], schema);
      if (error) newErrors[field] = error;
    });

    setMessagesError(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    return isValid;
  };

  const editAbout = () => {
    const dataForm = new FormData();

    dataForm.append("id", values.id);
    dataForm.append("titulo_seccion", values.titulo_seccion);
    dataForm.append("descripcion", values.descripcion);
    dataForm.append("url", values.url_seccion);
    dataForm.append("contenido", values.contenido);
    dataForm.append("coordenadas", [values.latitud, values.longitud]);

    const url = urlService + "update/" + values.id;
    peticionEnvioDataFrom(dataForm, url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Información de Acerca");
      if (data) {
        setMessageNotification(
          "La Información del apartado acerca fue actualizada exitosamente"
        );
        listAbout();
      } else {
        setMessageNotification(
          "No fue posible editar la informacion de acerca, verifique su conexión a internet"
        );
      }
    });
  };

  useEffect(() => listAbout(), []);

  const listAbout = () => {
    peticionGet(urlService).then((data) => {
      if (data) setAboutInformation(Array.from(data));
    });
  };

  const validField = (field, value, schema) => {
    let error = null;

    const messagesFieldErrors = {
      schema1: {
        titulo_seccion: () => {
          if (!value) error = "El titulo de la seccion es requerido";
          else if (value.length < 5) error = "El Minimo son 5 caracteres";
          else if (value.length > 50) error = "El Maximo son 50 caracteres";
        },
        url_seccion: () => {
          if (!value) error = "La url de la seccion es requerida";
        },
        descripcion: () => {
          if (!value) error = "La descripcion es requerida";
          else if (value.length < 50) error = "El Minimo son 50 caracteres";
          else if (value.length > 250) error = "El Maximo son 250 caracteres";
        },
      },
      schema2: {
        titulo_seccion: () => {
          if (!value) error = "El titulo de la seccion es requerida";
          else if (value.length < 10) error = "El Minimo son 10 caracteres";
          else if (value.length > 50) error = "El Maximo son 50 caracteres";
        },
        descripcion: () => {
          if (!value) error = "La descripcion es requerida";
          else if (value.length < 50) error = "El Minimo son 50 caracteres";
          else if (value.length > 250) error = "El Maximo son 250 caracteres";
        },
        latitud: () => {
          if (!value) error = "La latitud es requerida";
        },
        longitud: () => {
          if (!value) error = "La longitud es requerida";
        },
      },
    };

    messagesFieldErrors[schema][field]();

    return error;
  };

  return (
    <AdminMainPages option="acercaDe">
      <Popup
        show={showNotification}
        title={titleNotification}
        message={messageNotification}
        accept={handleClickCloseModal}
      />
      <div className="content-about-admin">
        <section className="header-about-admin">
          <div className="row-about-admin">
            <div className="col-about-admin">
              <h1>Gestión de Sección (Acerca de)</h1>
            </div>
          </div>
        </section>
        <section>
          <div className="row-about-admin">
            <div className="col-about-admin">
              <div className="card-about-admin">
                <div className="card-header-about-admin">
                  <h3 className="card-title-about-admin">
                    Listado de secciones
                  </h3>
                </div>
                <div className="card-body-about-admin table-responsive">
                  <table className="table-admin">
                    <thead>
                      <tr>
                        <th>ID seccion</th>
                        <th>Título</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aboutInformation
                        .filter((value, index2) => index2 > 1)
                        .map((about, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>{about.titulo_seccion}</td>
                              <td>
                                <div className="input-group-prepend">
                                  <button
                                    onClick={() => {
                                      about.position = index;
                                      setAboutSelect(about);
                                    }}
                                    className="btn-about-admin btn-warning-about-admin"
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
        </section>
        <section>
          <div className="card-about-admin row-about-admin">
            <div className="card-header-about-admin card-primary-about-admin">
              <h3 className="card-title-about-admin card-blue-about-admin">
                Editar Contenido (Inicio)
              </h3>
              <div className="card-tools-about-admin">
                <button
                  type="button"
                  className="btn-about-admin btn-tools-about-admin"
                >
                  -
                </button>
              </div>
            </div>
            <div className="card-body-about-admin card-body-primary-about-admin">
              {aboutSelect.position <= 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isValidAllValues("schema1")) editAbout();
                  }}
                >
                  <div className="group-form-about-admin">
                    <label>Título</label>
                    <input
                      name="titulo_seccion"
                      type="text"
                      placeholder="Ingresa el título del apartado"
                      value={aboutSelect.titulo_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.titulo_seccion && (
                      <span className="invalid-about-admin">
                        {messagesError.titulo_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-about-admin">
                    <label>URL</label>
                    <input
                      name="url_seccion"
                      type="text"
                      placeholder="Ingresa la url de un video para el apartado"
                      value={aboutSelect.url_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.url_seccion && (
                      <span className="invalid-about-admin">
                        {messagesError.url_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-about-admin">
                    <label>Archivo</label>
                    <input
                      name="contenido"
                      type="file"
                      placeholder="Ingresa el archivo del apartado"
                      value={aboutSelect.contenido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.contenido && (
                      <span className="invalid-about-admin">
                        {messagesError.contenido}
                      </span>
                    )}
                  </div>
                  <div className="group-form-about-admin">
                    <label>Descripción</label>
                    <input
                      name="descripcion"
                      type="text"
                      placeholder="Ingresa la descripcion del apartado"
                      value={aboutSelect.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.descripcion && (
                      <span className="invalid-about-admin">
                        {messagesError.descripcion}
                      </span>
                    )}
                  </div>
                  <button type="submit">Enviar</button>
                </form>
              )}
              {aboutSelect.position >= 2 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isValidAllValues("schema2")) editAbout();
                  }}
                >
                  <div className="group-form-about-admin">
                    <label>Título</label>
                    <input
                      name="titulo_seccion"
                      type="text"
                      placeholder="Ingresa el título del apartado"
                      value={aboutSelect.titulo_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.titulo_seccion && (
                      <span className="invalid-about-admin">
                        {messagesError.titulo_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-about-admin">
                    <label>Descripción</label>
                    <input
                      name="descripcion"
                      type="text"
                      placeholder="Ingresa la descripcion del apartado"
                      value={aboutSelect.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.descripcion && (
                      <span className="invalid-about-admin">
                        {messagesError.descripcion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-about-admin">
                    <label>Latitud</label>
                    <input
                      name="latitud"
                      type="number"
                      placeholder="Ingresa la coordenada latitud del mapa"
                      value={aboutSelect.latitud}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.latitud && (
                      <span className="invalid-about-admin">
                        {messagesError.latitud}
                      </span>
                    )}
                  </div>
                  <div className="group-form-about-admin">
                    <label>Longitud</label>
                    <input
                      name="longitud"
                      type="number"
                      placeholder="Ingresa la coordenada longitud del mapa"
                      value={aboutSelect.longitud}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.longitud && (
                      <span className="invalid-about-admin">
                        {messagesError.longitud}
                      </span>
                    )}
                  </div>
                  <button type="submit">Enviar</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </AdminMainPages>
  );
};

export default AdminAcercaDe;
