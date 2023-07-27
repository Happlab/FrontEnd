import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../../context/GlobalContext";
import MainPages from "../../wrappers/mainpages/MainPages";
import user_service from "../../../services/UserServices";
import Popup from "../../navegation/popup/Popup";
import "./Perfil.scss";

const Perfil = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [titleNotification, setTitleNotification] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const [profession, setProfession] = useState("");
  const [isProfession, setIsProfession] = useState(true);
  const { tokenUser, setTokenUser } = useContext(TokenContext);

  const handleChange = (e) => {
    setProfession(e.target.value);
  };

  const onChangedPassword = () => {
    return <Navigate to="/Password" />;
  };

  const onChangedProfession = () => {
    setIsProfession(!isProfession);
  };

  const onChangedStatus = () => {
    onChangedStatusAccount(tokenUser.email);
  };

  const onChangedStatusAccount = (email) => {
    user_service.disabledUser(email).then((response) => {
      setShowNotification(true);
      setTitleNotification("Perfil del Usuario");
      if (response === 200)
        setMessageNotification("La cuenta ha sido desactivada correctamente");
      else
        setMessageNotification(
          "La cuenta no pudo ser desactivada, verifique su conexión a internet"
        );
    });
  };

  const saveChange = (dataUpdate) => {
    user_service.updateUser(dataUpdate).then((data) => {
      setShowNotification(true);
      setTitleNotification("Perfil de usuario");
      if (data) {
        setMessageNotification("Cargo modificado exitosamente");
      } else
        setMessageNotification(
          "El cargo no pudo ser modificado, verifique su conexión a internet"
        );
    });
  };

  const handleClickCloseModal = () => {
    setShowNotification(false);
    // if (!this.state.isStatus) this.eliminarCookie();
    // if (this.state.cargo !== "") this.onUpdateToken();
  };

  const deleteCookie = () => {
    user_service.deleteToken();
  };

  const onUpdateToken = () => {
    user_service.onLogin(tokenUser.email, tokenUser.password).then((data) => {
      if (data) setTokenUser(data);
    });
  };

  let data = tokenUser;
  if (data === null) return <Navigate to="/Login" />;
  data.tipo_docente = profession !== "" ? profession : data.tipo_docente;
  return (
    <MainPages>
      <Popup
        show={showNotification}
        title={titleNotification}
        message={messageNotification}
        accept={handleClickCloseModal}
      />
      <div className="content-perfil">
        <div className="header-perfil">
          <h1 className="title-perfil">Perfil de usuario</h1>
        </div>
        <div className="row-perfil">
          <div className="col-perfil border-right-perfil">
            <div className="padding-5">
              <div className="card-perfil">
                <div className="card-body-perfil">
                  <div className="bodycard-perfil-photo">
                    <img
                      className="rounded-circle"
                      width="200px"
                      src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                      alt="Foto perfil"
                    />
                    <span className="font-weight-bold">{data.nombres}</span>
                    <span className="text-black-50">{data.email}</span>
                    <span> </span>
                  </div>
                  <div className="bodycard-perfil-photo-options">
                    <button
                      onClick={onChangedPassword}
                      className="btn-perfil btn-perfil-primary"
                    >
                      Cambiar contraseña
                    </button>
                    <button
                      onClick={onChangedProfession}
                      className="btn-perfil btn-perfil-outline-primary ms-1"
                    >
                      Editar cargo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-perfil border-right-perfil">
            <div className="padding-5">
              <div className="card-perfil">
                <div className="card-body-perfil">
                  <div className="row-perfil">
                    <div className="col-perfil col-perfil-sm">
                      <p className="mb-0">Cedula</p>
                    </div>
                    <div className="col-perfil-lg col-perfil-sm">
                      <p className="text-muted-perfil mb-0">{data.cedula}</p>
                    </div>
                  </div>
                  <hr className="hr-perfil" />
                  <div className="row-perfil">
                    <div className="col-perfil col-perfil-sm">
                      <p className="mb-0">Nombre</p>
                    </div>
                    <div className="col-perfil-lg col-perfil-sm">
                      <p className="text-muted-perfil mb-0">{data.nombres}</p>
                    </div>
                  </div>
                  <hr className="hr-perfil" />
                  <div className="row-perfil">
                    <div className="col-perfil col-perfil-sm">
                      <p className="mb-0">Apellido</p>
                    </div>
                    <div className="col-perfil-lg col-perfil-sm">
                      <p className="text-muted-perfil mb-0">{data.apellidos}</p>
                    </div>
                  </div>
                  <hr className="hr-perfil" />
                  <div className="row-perfil">
                    <div className="col-perfil col-perfil-sm">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-perfil-lg col-perfil-sm">
                      <p className="text-muted-perfil mb-0">{data.email}</p>
                    </div>
                  </div>
                  <hr className="hr-perfil" />
                  <div className="row-perfil">
                    <div className="col-perfil col-perfil-sm">
                      <p className="mb-0">Rol</p>
                    </div>
                    <div className="col-perfil-lg col-perfil-sm">
                      <p className="text-muted-perfil mb-0">
                        {data.tipo_docente}
                      </p>
                    </div>
                  </div>
                  <hr className="hr-perfil" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-perfil">
            <div className="padding-3">
              <div className="card-perfil">
                <div className="card-body-perfil">
                  <div className="profesion-card-perfil">
                    <h4>Cargo Actual</h4>
                  </div>
                  <br />
                  <label htmlFor="selectCargo">Usted es docente de</label>
                  <select
                    className="form-control-perfil"
                    id="selectCargo"
                    disabled={isProfession}
                    value={data.tipo_docente}
                    onChange={handleChange}
                  >
                    <option value="Docente de Primaria">Primaria</option>
                    <option value="Docente de Secundaria">Secundaria</option>
                    <option value="Docente Universitario">Universidad</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="btn-end">
              <button
                onClick={() => saveChange(data)}
                className="btn-perfil btn-perfil-outline-primary"
                disabled={isProfession}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
        <div className="btn-end">
          <div className="">
            <div className="">
              <div className="btn-end">
                <button
                  onClick={onChangedStatus}
                  className="btn-lg-perfil btn-perfil-primary"
                >
                  Darme de baja
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </MainPages>
  );
};

export default Perfil;
