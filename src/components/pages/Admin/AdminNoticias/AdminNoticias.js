import React, { useEffect, useState } from "react";
import AdminMainPages from "../../../wrappers/adminMainPages/AdminMainPages";
import {
  PeticionEnvio,
  PeticionEnvioDataFrom,
  PeticionGet,
} from "../../../../services/AdminServices";
import { environment } from "../../../../environments/environment";
import Popup from "../../../navegation/popup/Popup";

const urlService = environment.baseUrl + "/noticia/";

const AdminNoticias = () => {
  const [news, setNews] = useState([]);
  const [messagesError, setMessagesError] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const [isEdition, setIsEdition] = useState(false);
  const [noticeSelect, setNoticeSelect] = useState({});
  const [values, setValues] = useState({
    titulo_noticia: "",
    url_noticia: "",
    imagen: new File([""], ""),
    visible: true,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    value = name === "link_contenido" ? e.target.files[0] : value;
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

  const isValidAllValues = () => {
    let newErrors = {};

    Object.keys(values).forEach((field) => {
      const error = validField(field, values[field]);
      if (error) newErrors[field] = error;
    });

    setMessagesError(newErrors);

    let isValid = Object.keys(newErrors).length === 0;

    return isValid;
  };

  const validField = (field, value) => {
    let error = null;

    const messagesForFieldError = {
      titulo_noticia: () => {
        if (!value) error = "El titulo es requerido";
        else if (value.length < 5) error = "El minimo son 5 caracteres";
        else if (value.length > 50) error = "El maximo son 50 caracteres";
      },
      link_noticia: () => {
        if (!value) error = "La url es requerida";
      },
    };

    messagesForFieldError[field]();

    return error;
  };

  const handleClickClose = () => {
    setIsEdition(false);
  };

  const handleClickCloseModal = () => setShowNotification(false);

  const deleteNewsForLink = (link) => {
    const url = urlService + "delete/" + link;
    PeticionEnvio(" ", url, "DELETE").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Noticias");
      if (data) {
        setMessageNotification("La noticia se ha eliminado correctamente");
        listNews();
      } else {
        setMessageNotification(
          "No fue posible eliminar esta noticia, verifique su conexión a internet"
        );
      }
    });
  };

  const hiddenNewsForLink = (link) => {
    const url = urlService + "changeVisible/" + link;
    PeticionEnvio(" ", url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Noticias");
      if (data) {
        setMessageNotification(
          "El estado de visibilidad de la noticia se ha alternado correctamente"
        );
        listNews();
      } else {
        setMessageNotification(
          "No fue posible actualizar el estado de visibilidad de la noticia, verifique su conexión a internet"
        );
      }
    });
  };

  const createNew = () => {
    let dataForm = new FormData();

    dataForm.append("titulo_noticia", values.titulo_noticia);
    dataForm.append("url_noticia", values.url_noticia);
    dataForm.append("imagen", values.imagen);
    dataForm.append("visible", values.visible);

    const url = urlService + "create";

    PeticionEnvioDataFrom(dataForm, url, "POST").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Noticias");
      if (data) {
        setMessageNotification("La noticia fue creada exitosamente");
        listNews();
      } else {
        setMessageNotification(
          "No fue posible crear la noticia, verifique su conexión a internet"
        );
      }
    });
  };

  const editNew = () => {
    let dataForm = new FormData();

    dataForm.append("titulo_noticia", values.titulo_noticia);
    dataForm.append("url_noticia", values.url_noticia);
    dataForm.append("imagen", values.imagen);
    dataForm.append("visible", noticeSelect.visible);

    const url = urlService + "update/" + noticeSelect.link_contenido;

    PeticionEnvioDataFrom(dataForm, url, "PUT").then((data) => {
      setShowNotification(true);
      setTitleNotification("Gestión de Noticias");
      if (data) {
        setMessageNotification("La noticia fue editada exitosamente");
        listNews();
      } else {
        setMessageNotification(
          "No fue posible editar la noticia, verifique su conexión a internet"
        );
      }
    });
  };

  useEffect(() => listNews(), []);

  const listNews = () => {
    PeticionGet(urlService, "No hay noticias").then((data) => {
      if (data) setNews(Array.from(data));
    });
  };

  return (
    <AdminMainPages option="noticia">
      <Popup
        show={showNotification}
        title={titleNotification}
        message={messageNotification}
        accept={handleClickCloseModal}
      />
      <div>
        <h1>Módulo Administrador - Página de Noticias</h1>
        <br />
        <section className="content-news-admin">
          <div className="card-news-admin card-news-primary-admin">
            <div className="card-header-news-admin">
              <h3 className="card-title-news-admin">Editar Noticia</h3>
              <div className="card-tools-news-admin">
                <button className="btn-news-admin btn-tools-news-admin">
                  -
                </button>
              </div>
            </div>
            <div className="card-body-news-admin">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isValidAllValues()) createNew();
                }}
              >
                <div className="group-form-news-admin">
                  <label>Título</label>
                  <input
                    name="titulo_noticia"
                    type="text"
                    placeholder="Ingresa el titulo de la noticia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {messagesError.titulo_noticia && (
                    <span className="invalid-news-admin">
                      messagesError.titulo_noticia
                    </span>
                  )}
                </div>
                <div className="group-form-news-admin">
                  <label>Url Noticia</label>
                  <input
                    name="url_noticia"
                    type="text"
                    placeholder="Ingresa el link de la noticia"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {messagesError.url_noticia && (
                    <span className="invalid-news-admin">
                      messagesError.url_noticia
                    </span>
                  )}
                </div>
                <div className="group-form-news-admin">
                  <label>Imagen</label>
                  <input
                    name="imagen"
                    type="file"
                    placeholder="Inserta una imagen"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {messagesError.imagen && (
                    <span className="invalid-news-admin">
                      messagesError.imagen
                    </span>
                  )}
                </div>
                <button type="submit">Enviar</button>
                <button onClick={handleClickClose}>Cerrar</button>
              </form>
            </div>
          </div>
        </section>
        <section className="content-header-news-admin">
          <div className="row-news-admin">
            <div className="col-news-admin">
              <h1>Gestión de Noticias</h1>
            </div>
          </div>
        </section>
        <section className="content-news-admin">
          <div className="row-news-admin">
            <div className="col-news-admin">
              <div className="card-news-admin">
                <div className="card-header-news-admin">
                  <h3 className="card-title-news-admin">Listado de Noticias</h3>
                </div>
                <div className="card-body-news-admin table-responsive-news-admin">
                  <table className="table-news-admin">
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
                      {news.map((notice, index) => {
                        return (
                          <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{notice.titulo_noticia}</td>
                            <td>{notice.fecha_creacion}</td>
                            <td>{notice.visible ? "Si" : "No"}</td>
                            <td>
                              <div className="input-group-prepend-news-admin">
                                <button
                                  type="button"
                                  className="btn-news-admin btn-warning-news-admin dropdown-toggle-news-admin"
                                >
                                  Acción
                                </button>
                                <ul className="dropdown-menu-news-admin">
                                  <li
                                    className="dropdown-item-news-admin"
                                    onClick={() => {
                                      setIsEdition(true);
                                      setNoticeSelect(notice);
                                    }}
                                  >
                                    Editar
                                  </li>
                                  <li
                                    className="dropdown-item-news-admin"
                                    onClick={() =>
                                      deleteNewsForLink(notice.link_contenido)
                                    }
                                  >
                                    Eliminar
                                  </li>
                                  <li
                                    className="dropdown-item-news-admin"
                                    onClick={hiddenNewsForLink(
                                      notice.link_contenido
                                    )}
                                  >
                                    {notice.visible ? "Ocultar" : "Mostrar"}
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
        </section>
        <section className="content-news-admin">
          <div className="card-news-admin card-primary-news-admin">
            <div className="card-header-news-admin">
              <h3 className="card-title-news-admin">Editar Noticia</h3>
              <div className="card-tools-news-admin">
                <button
                  type="button"
                  className="btn-news-admin btn-tool-news-admin"
                >
                  -
                </button>
              </div>
            </div>
            <div className="card-body-news-admin">
              {isEdition && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isValidAllValues()) editNew();
                  }}
                >
                  <div className="group-form-news-admin">
                    <label>Título</label>
                    <input
                      name="titulo_noticia"
                      type="text"
                      placeholder="Ingresa el titulo de la noticia"
                      value={noticeSelect.titulo_noticia}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.titulo_noticia && (
                      <span className="invalid-news-admin">
                        messagesError.titulo_noticia
                      </span>
                    )}
                  </div>
                  <div className="group-form-news-admin">
                    <label>Url noticia</label>
                    <input
                      name="url_noticia"
                      type="text"
                      placeholder="Ingresa el link de la noticia"
                      value={noticeSelect.url_noticia}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.url_noticia && (
                      <span className="invalid-news-admin">
                        messagesError.url_noticia
                      </span>
                    )}
                  </div>
                  <div className="group-form-news-admin">
                    <label>Imagen</label>
                    <input
                      name="imagen"
                      type="file"
                      placeholder="Ingresa la imagen de la noticia"
                      value={noticeSelect.imagen}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {messagesError.imagen && (
                      <span className="invalid-news-admin">
                        messagesError.imagen
                      </span>
                    )}
                  </div>
                  <button type="submit">Enviar</button>
                  <button onClick={handleClickClose}>Cerrar</button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </AdminMainPages>
  );
};

export default AdminNoticias;
