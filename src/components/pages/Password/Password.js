import React from "react";
import MainPages from "../../wrappers/mainpages/MainPages";
import { Navigate } from "react-router-dom";
import user_service from "../../../services/UserServices";
import { TokenContext } from "../../../context/GlobalContext";
import "./Password.scss";
import Popup from "../../navegation/popup/Popup";

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPasswordOld: "",
      inputPasswordNew: "",
      inputPasswordVerified: "",
      userVerified: false,
      isUpdate: false,
      dataUpdate: null,
      isVerifiedPassword: true,
      isVerifiedTwoPassword: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSendUpdateRequest = this.onSendUpdateRequest.bind(this);
    this.handleClickCerrarModal = this.handleClickCerrarModal.bind(this);
    this.verifiedPassword = this.verifiedPassword.bind(this);
    this.verifiedTwoPasswordNew = this.verifiedTwoPasswordNew.bind(this);
  }

  static contextType = TokenContext;

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState((values) => ({
      ...values,
      [name]: value,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.isVerifiedPassword) {
      this.setState({
        notificacion: true,
        tituloNotificacion: "Cambio de contraseña",
        mensajeNotificacion:
          "La contraseña no cumple con las especificaciones, revisela e intente nuevamente",
      });
    } else if (
      this.state.inputPasswordNew === this.state.inputPasswordVerified
    ) {
      let email = this.context.token.email;
      let passNew = user_service.onLogin(email, this.state.inputPasswordOld);
      passNew.then((data) => {
        if (data !== null && data !== undefined) {
          this.setState({
            userVerified: !this.state.userVerified,
            notificacion: true,
            tituloNotificacion: "Cambio de contraseña",
            mensajeNotificacion: "Contraseña cambiada exitosamente",
          });
        } else
          this.setState({
            notificacion: true,
            tituloNotificacion: "Cambio de contraseña",
            mensajeNotificacion:
              "La contraseña actual ingresada no es correcta",
          });
      });
    } else
      this.setState({
        notificacion: true,
        tituloNotificacion: "Cambio de contraseña",
        mensajeNotificacion:
          "La contraseña nueva no coincide con la contraseña de verificación, verifique e intente nuevamente",
      });
  }

  onSendUpdateRequest(data) {
    data.password = this.state.inputPasswordNew;
    let update = user_service.updateUser(data);
    update.then((dataUpdate) => {
      if (dataUpdate !== null && dataUpdate !== undefined) {
        this.setState({
          isUpdate: true,
          dataUpdate: JSON.parse(dataUpdate),
          userVerified: !this.state.userVerified,
          notificacion: true,
          tituloNotificacion: "Cambio de contraseña",
          mensajeNotificacion: "Contraseña cambiada exitosamente",
        });
      } else
        this.setState({
          notificacion: true,
          tituloNotificacion: "Cambio de contraseña",
          mensajeNotificacion: "No se pudo cambiar la contraseña",
        });
    });
  }

  handleClickCerrarModal() {
    this.setState({ notificacion: false });
    let data = this.context.token;
    if (data === null) window.location.replace("/");
    else if (data.rol[0] === "ADMIN" && this.state.isUpdate)
      window.location.replace("/adminInicio");
    else if (data.rol[0] === "USER" && this.state.isUpdate)
      window.location.replace("/perfil");
  }

  onUpdateToken() {
    if (this.state.dataUpdate === null || this.state.dataUpdate === undefined)
      return;
    let login = user_service.onLogin(
      this.state.dataUpdate.email,
      this.state.dataUpdate.password
    );
    login.then((dataLogin) => {
      if (dataLogin !== null && dataLogin !== undefined) {
        this.context.setToken(dataLogin);
      }
    });
  }

  verifiedPassword() {
    let pass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&'/*'"{}=+-_()])(?=.{8,})/;
    this.setState({
      isVerifiedPassword: pass.test(this.state.inputPasswordNew),
    });
  }

  verifiedTwoPasswordNew() {
    this.setState({
      isVerifiedTwoPassword:
        this.state.inputPasswordNew === this.state.inputPasswordVerified,
    });
  }

  componentDidMount() {
    this.onUpdateToken();
  }

  render() {
    let data = this.context.token;
    if (data === null) {
      return <Navigate to="/" />;
    }
    return (
      <div className="main-pass">
        <MainPages>
          <Popup
            show={this.state.notificacion}
            title={this.state.tituloNotificacion}
            message={this.state.mensajeNotificacion}
            accept={this.handleClickCerrarModal}
          />
          {this.state.userVerified && this.onSendUpdateRequest(data)}
          <div className="col-md-6 offset-md-3 content-pass">
            <span className="anchor" id="formChangePassword"></span>
            <hr className="mb-5" />
            <div className="card card-outline-secondary">
              <div className="header-tarjeta">
                <h3 className="titulo-form">Actualizar Contraseña</h3>
              </div>
              <div className="card-body">
                <form className="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputPasswordOld">Contraseña actual</label>
                    <input
                      name="inputPasswordOld"
                      onChange={this.handleChange}
                      type="password"
                      className="form-control"
                      id="inputPasswordOld"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputPasswordNew"
                      className={
                        this.state.isVerifiedPassword ? "" : "error-label"
                      }
                    >
                      Nueva contraseña
                    </label>
                    <input
                      name="inputPasswordNew"
                      onChange={this.handleChange}
                      onBlur={this.verifiedPassword}
                      type="password"
                      className={
                        this.state.isVerifiedPassword
                          ? "form-control"
                          : "error-input form-control"
                      }
                      id="inputPasswordNew"
                      required
                    />
                    <span className="form-text small text-muted">
                      La contraseña debe contener almenos 8 caracteres, una
                      mayuscula, una minuscula, un numero y un caracter
                      especial.
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="inputPasswordNewVerify"
                      className={
                        this.state.isVerifiedTwoPassword ? "" : "error-label"
                      }
                    >
                      Verificar contraseña
                    </label>
                    <input
                      name="inputPasswordVerified"
                      onChange={this.handleChange}
                      onBlur={this.verifiedTwoPasswordNew}
                      type="password"
                      className={
                        this.state.isVerifiedTwoPassword
                          ? "form-control"
                          : "error-input form-control"
                      }
                      id="inputPasswordNewVerify"
                      required
                    />
                    <span
                      className={
                        this.state.isVerifiedTwoPassword
                          ? "hidden"
                          : "error-label"
                      }
                    >
                      Las contraseña nuevas no coinciden, por favor verifique
                    </span>
                    <span className="form-text small text-muted">
                      Para confirmar, escriba la nueva contraseña.
                    </span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-outline-primary ms-1"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <hr className="mb-5" />
          </div>
        </MainPages>
      </div>
    );
  }
}

export default Password;
