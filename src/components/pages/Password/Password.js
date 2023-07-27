import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../../context/GlobalContext";
import MainPages from "../../wrappers/mainpages/MainPages";
import user_service from "../../../services/UserServices";
import Popup from "../../navegation/popup/Popup";
import "./Password.scss";

const Password = () => {
  const [dataUpdate, setDataUpdate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const [messagesError, setMessagesError] = useState({});
  const [values, setValues] = useState({
    passwordOld: "",
    passwordNew: "",
    repeatPasswordNew: "",
  });
  const { tokenUser, setTokenUser } = useContext(TokenContext);

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
    const fieldMessages = {
      passwordOld: () => {
        if (!value) error = "La contraseña actual es requerida";
      },
      passwordNew: () => {
        if (!value) error = "La contraseña nueva es requerida";
        else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&'/*'"{}=+-_()])(?=.{8,})/.test(
            value
          )
        )
          error =
            "La contraseña nueva debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial";
      },
      repeatPasswordNew: () => {
        if (!value) error = "La validacion de la nueva contraseña es requerida";
        else if (this.state.values.passwordNew !== value)
          error = "Las contraseñas no coinciden";
      },
    };

    fieldMessages[field]();

    return error;
  };

  const handleSubmit = (dataChanged) => {
    user_service.onLogin(tokenUser.email, values.passwordOld).then((data) => {
      setShowNotification(true);
      setTitleNotification("Cambio de Contraseña");
      if (data) {
        onSendUpdateRequest(dataChanged);
        setMessageNotification("Contraseña cambiada exitosamente");
      } else
        setMessageNotification(
          "No se pudo cambiar la contraseña, verifique las credenciales ingresadas o su conexión a internet"
        );
    });
  };

  const onSendUpdateRequest = (dataChanged) => {
    dataChanged.password = values.passwordNew;
    user_service.updateUser(dataChanged).then((data) => {
      setShowNotification(true);
      setTitleNotification("Cambio de contraseña");
      if (data) {
        setDataUpdate(JSON.parse(data));
        setMessageNotification("Contraseña cambiada correctamente");
      } else setMessageNotification("No se pudo cambiar la contraseña");
    });
  };

  const handleClickCloseModal = () => {
    setShowNotification(false);
    let data = tokenUser;
    if (data === null) window.location.replace("/");
    else if (data.rol[0] === "ADMIN" && this.state.isUpdate)
      window.location.replace("/adminInicio");
    else if (data.rol[0] === "USER" && this.state.isUpdate)
      window.location.replace("/perfil");
  };

  const onUpdateToken = () => {
    if (!dataUpdate) return;

    user_service.onLogin(dataUpdate.email, dataUpdate.password).then((data) => {
      if (data) setTokenUser(data);
    });
  };

  useEffect(onUpdateToken, [dataUpdate, setTokenUser]);

  let data = tokenUser;
  if (data === null) return <Navigate to="/" />;

  return (
    <MainPages>
      <Popup
        show={showNotification}
        title={titleNotification}
        message={messageNotification}
        accept={handleClickCloseModal}
      />
      <div className="content-pass">
        <span className="anchor" id="formChangePassword"></span>
        <hr className="password-hr" />
        <div className="password-card">
          <div className="header-tarjeta">
            <h3 className="titulo-form">Actualizar Contraseña</h3>
          </div>
          <div className="password-card-body">
            <form
              className="password-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (isValidAllValues()) handleSubmit(data);
              }}
            >
              <div className="password-form-group">
                <label
                  htmlFor="inputPasswordOld"
                  className={messagesError.passwordOld ? "error-label" : ""}
                >
                  Contraseña actual
                </label>
                <input
                  name="passwordOld"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className={
                    messagesError.passwordOld
                      ? "password-form-control error-input"
                      : "password-form-control"
                  }
                  id="inputPasswordOld"
                />
                {messagesError.passwordOld && (
                  <div className="error-message-invalid">
                    {messagesError.passwordOld}
                  </div>
                )}
              </div>
              <div className="password-form-group">
                <label
                  htmlFor="inputPasswordNew"
                  className={messagesError.passwordNew ? "error-label" : ""}
                >
                  Nueva contraseña
                </label>
                <input
                  name="passwordNew"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className={
                    messagesError.passwordNew
                      ? "error-input password-form-control"
                      : "password-form-control"
                  }
                  id="inputPasswordNew"
                />
                {messagesError.passwordNew ? (
                  <div className="error-message-invalid">
                    {messagesError.passwordNew}
                  </div>
                ) : (
                  <span className="password-text-muted">
                    La contraseña debe contener almenos 8 caracteres, una
                    mayuscula, una minuscula, un numero y un caracter especial.
                  </span>
                )}
              </div>
              <div className="password-form-group">
                <label
                  htmlFor="inputPasswordNewVerify"
                  className={
                    messagesError.repeatPasswordNew ? "error-label" : ""
                  }
                >
                  Verificar contraseña
                </label>
                <input
                  name="repeatPasswordNew"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className={
                    messagesError.repeatPasswordNew
                      ? "error-input password-form-control"
                      : "password-form-control"
                  }
                  id="inputPasswordNewVerify"
                />
                {messagesError.repeatPasswordNew ? (
                  <div className="error-message-invalid">
                    {messagesError.repeatPasswordNew}
                  </div>
                ) : (
                  <span className="password-text-muted">
                    Para confirmar, escriba la nueva contraseña.
                  </span>
                )}
              </div>
              <div className="password-form-group">
                <button
                  type="submit"
                  className="password-btn btn-outline-primary ms-1"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr className="password-hr" />
      </div>
    </MainPages>
  );
};

export default Password;
