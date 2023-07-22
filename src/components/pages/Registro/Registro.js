import React, { useState } from "react";
import MainPages from "../../wrappers/mainpages/MainPages";
import { Link } from "react-router-dom";
import Alert from "../../navegation/alert/Alert";
import { environment } from "../../../environments/environment";
import "./Registro.css";

const Registro = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [messagesError, setMessagesError] = useState({});
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    documentId: "",
    email: "",
    password: "",
    repeatPassword: "",
    teacherType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = validField(name, value);
    setMessagesError((prevValues) => ({ ...prevValues, [name]: error }));
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
      name: () => {
        if (!value) error = "El nombre es requerido";
      },
      lastName: () => {
        if (!value) error = "El apellido es requerido";
      },
      teacherType: () => {
        if (!value) error = "El tipo de docente es requerido";
      },
      email: () => {
        if (!value) error = "El correo es requerido";
        else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value))
          error = "Correo inválido";
      },
      documentId: () => {
        if (!value) error = "El documento de identidad es requerido";
        else if (isNaN(value)) error = "Ingresa solo números";
        else if (value.toString().length < 10)
          error = "Debe tener al menos 10 caracteres";
      },
      password: () => {
        if (!value) error = "La contraseña es requerida";
        else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&'/*'"{}=+-_()])(?=.{8,})/.test(
            value
          )
        )
          error =
            "Debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial";
      },
      repeatPassword: () => {
        if (!value) error = "La repeticion de contraseña es requerida";
        else if (values.password !== value)
          error = "Las contraseñas deben coincidir";
      },
    };

    fieldMessages[field]();

    return error;
  };

  const sendRegister = () => {
    const data = {
      email: values.email,
      password: values.password,
      cedula: values.documentId,
      nombres: values.name,
      apellidos: values.lastName,
      tipo_docente: values.teacherType,
      tokens: 0,
    };
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
    fetch(environment.baseUrl + "/persona/registro", requestOptions)
      .then((response) => {
        if (response.status === 200) setSuccess(true);
        else setError(true);
      })
      .catch((error) => {
        setError(true);
        console.log("Error", error);
      });
  };

  return (
    <div className="main-registro">
      <MainPages>
        <div className="messages-alert-content">
          <Alert variant="success" show={success}>
            Usuario creado con éxito. Haz click{" "}
            {
              <Link className="alert-link" to="/Login">
                aquí
              </Link>
            }{" "}
            para iniciar sesión
          </Alert>
          <Alert variant="error" show={error}>
            Error registrando el usuario, Correo electronico ya registrado.
          </Alert>
        </div>
        <div className="form-registro">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isValidAllValues()) sendRegister();
            }}
          >
            <div className="group-registro">
              <label>Nombre</label>
              <input
                className={messagesError.name ? "is-invalid" : ""}
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu nombre"
              />
              {messagesError.name && (
                <div className="invalid-field">{messagesError.name}</div>
              )}
            </div>
            <div className="group-registro">
              <label>Apellido</label>
              <input
                className={messagesError.lastName ? "is-invalid" : ""}
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu apellido"
              />
              {messagesError.lastName && (
                <div className="invalid-field">{messagesError.lastName}</div>
              )}
            </div>
            <div className="group-registro">
              <label>Documento de Identidad</label>
              <input
                className={messagesError.documentId ? "is-invalid" : ""}
                type="text"
                name="documentId"
                value={values.documentId}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu numero de documento de identidad"
              />
              {messagesError.documentId && (
                <div className="invalid-field">{messagesError.documentId}</div>
              )}
            </div>
            <div className="group-registro">
              <label>Correo</label>
              <input
                className={messagesError.email ? "is-invalid" : ""}
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu correo"
              />
              {messagesError.email && (
                <div className="invalid-field">{messagesError.email}</div>
              )}
            </div>
            <div className="group-registro">
              <label>Contraseña</label>
              <input
                className={messagesError.password ? "is-invalid" : ""}
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingresa tu contraseña"
              />
              {messagesError.password && (
                <div className="invalid-field">{messagesError.password}</div>
              )}
            </div>
            <div className="group-registro">
              <label>Repite la contraseña</label>
              <input
                className={messagesError.repeatPassword ? "is-invalid" : ""}
                type="password"
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Vuelva a ingresar tu contraseña"
              />
              {messagesError.repeatPassword && (
                <div className="invalid-field">
                  {messagesError.repeatPassword}
                </div>
              )}
            </div>
            <div className="group-registro">
              <label>Soy docente de</label>
              <select
                className={messagesError.teacherType ? "is-invalid" : ""}
                name="teacherType"
                value={values.teacherType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option hidden selected>
                  Selecciona una opción
                </option>
                <option value="Docente de Primaria">Primaria</option>
                <option value="Docente de Secundaria">Secundaria</option>
                <option value="Docente Universitario">Universidad</option>
              </select>
              {messagesError.teacherType && (
                <div className="invalid-field">{messagesError.teacherType}</div>
              )}
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </MainPages>
    </div>
  );
};

export default Registro;
