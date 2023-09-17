import { useEffect, useState } from "react";
import AdminMainPages from "../../../wrappers/adminMainPages/AdminMainPages";
import { peticionEnvioDataFrom, peticionGet } from "../../../../services/AdminServices";
import { environment } from "../../../../environments/environment";
import Popup from "../../../navegation/popup/Popup";
import "./AdminInicio.css";

const urlService = environment.baseUrl + "/seccion/";

const AdminInicio = () => {
  const [startInformation, setStartInformation] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const [startSelected, setStartSelected] = useState({});
  const [messagesError, setMessagesError] = useState({});
  const [values, setValues] = useState({
    id: -1,
    titulo_seccion: "",
    url: "",
    contenido: new File([""], ""),
    descripcion: "",
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = validField(name, value);
    setMessagesError((prevValues) => ({
      ...prevValues,
      [name]: error,
    }));
  };

  const handleClickCloseModal = () => {
    setShowNotification(false);
  };

  const editStart = () => {
    const dataForm = new FormData();

    dataForm.append("id", values.id);
    dataForm.append("titulo_seccion", values.titulo_seccion);
    dataForm.append("url", values.url);
    dataForm.append("contenido", values.contenido);
    dataForm.append("descripcion", values.descripcion);
    dataForm.append("coordenadas", [values.latitud, values.longitud]);

    const url = urlService + "update/" + values.id;
    peticionEnvioDataFrom(dataForm, url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Información de Inicio");
      if (data) {
        setMessageNotification(
          "La Información de inicio fue actualizada correctamente"
        );
        listStartInformation();
      } else {
        setMessageNotification(
          "No fue posible editar la informacion de inicio, verifique su conexión a internet"
        );
      }
    });
  };

  useEffect(() => listStartInformation(), []);

  const listStartInformation = () => {
    peticionGet(urlService).then((data) => {
      if (data) setStartInformation(Array.from(data));
    });
  };

  const isValidAllValues = () => {
    const newErrors = {};

    Object.keys(values).forEach((field) => {
      const error = validField(field, values[field]);
      if (error) newErrors[field] = error;
    });

    setMessagesError(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    return isValid;
  };

  const validField = (field, value) => {
    let error = null;

    const messageErrorForField = {
      titulo_seccion: () => {
        if (!value) error = "El titulo de la sección es requerido";
        else if (value.length < 10) error = "El minimo son 10 caracteres";
        else if (value.length > 100) error = "El maximo son 100 caracteres";
      },
      url_seccion: () => {
        if (!value) error = "La url de la sección es requerida";
      },
      descripcion: () => {
        if (!value) error = "La descripción es requerida";
        else if (value.length < 50) error = "El minimo son 50 caracteres";
        else if (value.length > 250) error = "El maximo son 250 caracteres";
      },
    };

    messageErrorForField[field]();

    return error;
  };

  return (
    <AdminMainPages option="inicio">
      <Popup
        show={showNotification}
        title={titleNotification}
        message={messageNotification}
        accept={handleClickCloseModal}
      />
      <div className="content-wrapper-start-admin">
        <section className="content-header-start-admin">
          <div className="row-start-admin">
            <div className="col-start-admin">
              <h1>Gestión de Sección (Inicio)</h1>
            </div>
          </div>
        </section>
        <section className="content-start-admin">
          <div className="row-start-admin">
            <div className="col-start-admin">
              <div className="card-start-admin">
                <div className="card-header-start-admin">
                  <h3 className="card-title-start-admin">
                    Listado de secciones (Inicio)
                  </h3>
                </div>
                <div className="card-body-start-admin table-responsive-start-admin">
                  <table className="table-start-admin">
                    <thead>
                      <tr>
                        <th>ID Sección</th>
                        <th>Título</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {startInformation
                        .filter((value, index2) => index2 < 2)
                        .map((start, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>{start.titulo_seccion}</td>
                              <td>
                                <div className="input-group-prepend-start-admin">
                                  <button
                                    className="btn-start-admin btn-warning-start-admin"
                                    onClick={() => {
                                      start.position = index;
                                      setStartSelected(start);
                                    }}
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
        <section className="content-start-admin">
          <div className="card-start-admin">
            <div className="card-header-start-admin card-primary-start-admin">
              <h3 className="card-title-start-admin">
                Editar Contenido (Inicio)
              </h3>
              <div className="card-tools-start-admin">
                <button
                  type="button"
                  className="btn-start-admin btn-tool-start-admin"
                >
                  -
                </button>
              </div>
            </div>
            <div className="card-body-start-admin">
              {startSelected.position === 0 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isValidAllValues()) editStart();
                  }}
                >
                  <div className="group-form-start-admin">
                    <label>Título</label>
                    <input
                      name="titulo_seccion"
                      type="text"
                      placeholder="Ingresa el título del apartado inicio"
                      value={startSelected.titulo_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.titulo_seccion && (
                      <span className="invalid-start-admin">
                        {messagesError.titulo_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-start-admin">
                    <label>URL</label>
                    <input
                      name="url_seccion"
                      type="text"
                      placeholder="Ingresa la url de un video para el apartado inicio"
                      value={startSelected.url_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.url_seccion && (
                      <span className="invalid-start-admin">
                        {messagesError.url_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-start-admin">
                    <label>Archivo</label>
                    <input
                      name="contenido"
                      type="file"
                      placeholder="Ingresa el archivo para el apartado inicio"
                      value={startSelected.contenido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.contenido && (
                      <span className="invalid-start-admin">
                        {messagesError.contenido}
                      </span>
                    )}
                  </div>
                  <div className="group-form-start-admin">
                    <label>Descripción</label>
                    <input
                      name="descripcion"
                      type="text"
                      placeholder="Ingresa la descripción para el apartado inicio"
                      value={startSelected.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.descripcion && (
                      <span className="invalid-start-admin">
                        {messagesError.descripcion}
                      </span>
                    )}
                  </div>
                  <button type="submit">Enviar</button>
                </form>
              )}
              {startSelected.position === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isValidAllValues()) editStart();
                  }}
                >
                  <div className="group-form-start-admin">
                    <label>Título</label>
                    <input
                      name="titulo_seccion"
                      type="text"
                      placeholder="Ingresa el título del apartado inicio"
                      value={startSelected.titulo_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.titulo_seccion && (
                      <span className="invalid-start-admin">
                        {messagesError.titulo_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-start-admin">
                    <label>URL</label>
                    <input
                      name="titulo_seccion"
                      type="text"
                      placeholder="Ingresa el título del apartado"
                      value={startSelected.titulo_seccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.titulo_seccion && (
                      <span className="invalid-start-admin">
                        {messagesError.titulo_seccion}
                      </span>
                    )}
                  </div>
                  <div className="group-form-start-admin">
                    <label>Archivo</label>
                    <input
                      name="contenido"
                      type="file"
                      placeholder="Ingresa el archivo para el apartado inicio"
                      value={startSelected.contenido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.contenido && (
                      <span className="invalid-start-admin">
                        {messagesError.contenido}
                      </span>
                    )}
                  </div>
                  <div className="group-form-start-admin">
                    <label>Descripción</label>
                    <input
                      name="descripcion"
                      type="text"
                      placeholder="Ingresa la descripción para el apartado inicio"
                      value={startSelected.descripcion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.descripcion && (
                      <span className="invalid-start-admin">
                        {messagesError.descripcion}
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

export default AdminInicio;
