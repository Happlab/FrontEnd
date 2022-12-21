import React from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '../../navegation/navbar/Navbar';
import Footer from '../../navegation/footer/Footer';
import user_service from '../../services/UserServices';
import Notificacion from '../Admin/TemplatesAdmin/modal';
import { TokenContext } from '../../../context/GlobalContext';
import './Password.scss';

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputPasswordOld: "",
            inputPasswordNew: "",
            inputPasswordVerified: "",
            userVerified: false,
            updateVerified: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSendUpdateRequest = this.onSendUpdateRequest.bind(this);
        this.handleClickCerrarModal = this.handleClickCerrarModal.bind(this);
        this.eliminarCookie = this.eliminarCookie.bind(this);
    }

	static contextType = TokenContext;

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState(values => ({
            ...values, [name]: value
        }))
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.inputPasswordNew === this.state.inputPasswordVerified) {
            let email = this.context.token.email;
            let passNew = user_service.onLogin(email, this.state.inputPasswordOld);
            passNew.then(data => {
                if (data !== null) {
                    this.setState(values => ({ ...values, userVerified: !this.state.userVerified }));
                    this.setState({
                        notificacion: true, tituloNotificacion: "Cambio de contraseña",
                        mensajeNotificacion: "Contraseña cambiada exitosamente"
                    });
                } else this.setState({
                    notificacion: true, tituloNotificacion: "Cambio de contraseña",
                    mensajeNotificacion: "La contraseña actual ingresada no es correcta"
                });
            })
        } else this.setState({
            notificacion: true, tituloNotificacion: "Cambio de contraseña",
            mensajeNotificacion: "La contraseña nueva no coincide, verifique nuevamente"
        });
    }

    onSendUpdateRequest(data) {
        data.password = this.state.inputPasswordNew;
        let update = user_service.updateUser(data);
        update.then(data => {
            if (data !== null) {
                this.setState(values => ({ ...values, updateVerified: !this.state.updateVerified}));
                this.setState({
                    notificacion: true, tituloNotificacion: "Cambio de contraseña",
                    mensajeNotificacion: "Contraseña cambiada exitosamente"
                });
                this.eliminarCookie();
            } else this.setState({
                notificacion: true, tituloNotificacion: "Cambio de contraseña",
                mensajeNotificacion: "No se pudo cambiar la contraseña"
            });
        })
    }

    handleClickCerrarModal() {
        if (this.state.userVerified) {
            window.location.href = "/Login"
        }
        this.setState({ notificacion: false });
    }

    eliminarCookie(){
        user_service.deleteToken();
    }

    render() {
        let data = this.context.token;
        if(data === null) {
            return (<Navigate replace to="/" />);
        }
        return (
            <div className="main-pass">
                <Notificacion show={this.state.notificacion} titulo={this.state.tituloNotificacion} mensaje={this.state.mensajeNotificacion} onclick={this.handleClickCerrarModal} />
                {this.state.userVerified && (
                    this.onSendUpdateRequest(data)
                )}
                {this.state.updateVerified && (
                    data = JSON.stringify(data)
                )}
                <Navbar />
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
                                    <input name='inputPasswordOld' onChange={this.handleChange} type="password" className="form-control" id="inputPasswordOld" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordNew">Nueva contraseña</label>
                                    <input name="inputPasswordNew" onChange={this.handleChange} type="password" className="form-control" id="inputPasswordNew" required />
                                    <span className="form-text small text-muted">
                                        La contraseña debe tener al menos 8 caracteres, y <em>no</em> debe tener espacios.
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordNewVerify">Verificar contraseña</label>
                                    <input name='inputPasswordVerified' onChange={this.handleChange} type="password" className="form-control" id="inputPasswordNewVerify" required />
                                    <span className="form-text small text-muted">
                                        Para confirmar, escriba la contraseña nuevamente.
                                    </span>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-outline-primary ms-1">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr className="mb-5" />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Password;
