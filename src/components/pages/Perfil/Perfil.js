import React from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '../../navegation/navbar/Navbar';
import Footer from '../../navegation/footer/Footer';
import './Perfil.scss'
import user_service from '../../../services/UserServices';
import { TokenContext } from '../../../context/GlobalContext';
import Popup from '../../navegation/popup/Popup';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPassword: false,
            isCargo: false,
            isStatus: false,
            cargo: "",
            updateVerified: false,
            notificacion: false,
            tituloNotificacion: "",
            mensajeNotificacion: ""
        };
        this.onChangedPassword = this.onChangedPassword.bind(this);
        this.onChangedCargo = this.onChangedCargo.bind(this);
        this.onChangedStatusAccount = this.onChangedStatusAccount.bind(this);
        this.onChangedStatus = this.onChangedStatus.bind(this);
        this.onChangedUpdate = this.onChangedUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.handleClickCerrarModal=this.handleClickCerrarModal.bind(this);
        this.eliminarCookie = this.eliminarCookie.bind(this);
    }

	static contextType = TokenContext;

    onChangedPassword() {
        this.setState(previousState => ({
            ...previousState, isPassword: !previousState.isPassword
        }));
    }

    onChangedCargo() {
        this.setState(previousState => ({
            ...previousState, isCargo: !previousState.isCargo
        }))
    }

    onChangedStatus() {
        this.setState(previousState => ({
            ...previousState, isStatus: !previousState.isStatus
        }));
    }

    onChangedUpdate() {
        this.setState(previousState => ({
            ...previousState, updateVerified: !previousState.updateVerified
        }));
    }

    onChangedStatusAccount(email) {
        let disable = user_service.disabledUser(email);
        disable.then(response => {
            if (response === 200) {
                this.setState({
                    isStatus: false,
                    notificacion: true, tituloNotificacion: "Perfil del usuario",
                    mensajeNotificacion: "La cuenta ha sido desactivada exitosamente"
                });
            }
            else this.setState({
                notificacion: true, tituloNotificacion: "Perfil del usuario",
                mensajeNotificacion: "La cuenta no pudo ser desactivada"
            });
        })
    }

    handleChange(event) {
        this.setState(previousState => ({
            ...previousState, cargo: event.target.value
        }))
    }

    saveChange(data) {
        let update = user_service.updateUser(data);
        update.then(data_user => {
            if (data_user !== null && data_user !== undefined) {
                this.setState({
                    updateVerified: !this.state.updateVerified,
                    isCargo: !this.state.isCargo,
                    notificacion: true, tituloNotificacion: "Perfil del usuario",
                    mensajeNotificacion: "Cargo modificado exitosamente"
                });
            } else this.setState({
                notificacion: true, tituloNotificacion: "Perfil del usuario",
                mensajeNotificacion: "El cargo no pudo ser modificado"
            });
        })
    }

    handleClickCerrarModal() {
        this.setState({ notificacion: false });
        if(!this.state.isStatus) this.eliminarCookie();
        if(this.state.cargo !== "") this.onUpdateToken();
    }

    eliminarCookie(){
        user_service.deleteToken();
    }

    onUpdateToken() {
        let data = this.context.token;
        let login = user_service.onLogin(data.email, data.password);
        login.then(dataEnd => {
            if(dataEnd !== null && dataEnd !== undefined) {
                this.context.setToken(dataEnd);
            }
        })
    }

    render() {
        let data = this.context.token;
        if(data === null) {
            return ( <Navigate to="/Login" /> )
        }
        data.tipo_docente = (this.state.cargo !== "") ? this.state.cargo : data.tipo_docente;
        return (
            <div className='main-perfil'>
                <Popup show={this.state.notificacion} title={this.state.tituloNotificacion} message={this.state.mensajeNotificacion} accept={this.handleClickCerrarModal} />
                {this.state.isPassword && (
                    <Navigate to="/Password" />
                )}
                {this.state.isStatus && (
                    this.onChangedStatusAccount(data.email)
                )}
                {this.state.updateVerified && (
                    this.saveChange(data)
                )}
                <Navbar />
                <div className="container-fluid content-perfil">
                    <div className="d-flex flex-column align-items-center text-center p-4 py-3">
                        <h1 className="titulo-estandar">Perfil de usuario</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="p-5 py-5">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center p-4 py-3"><img className="rounded-circle" width="200px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt='Foto perfil' /><span className="font-weight-bold">{data.nombres}</span><span className="text-black-50">{data.email}</span><span> </span></div>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button onClick={this.onChangedPassword} className="btn btn-primary">Cambiar contraseña</button>
                                            <button onClick={this.onChangedCargo} className="btn btn-outline-primary ms-1">Editar cargo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 border-right">
                            <div className="p-5 py-5">
                                <div className="card mb-5">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="mb-0">Cedula</p>
                                            </div>
                                            <div className="col-sm-8">
                                                <p className="text-muted mb-0">{data.cedula}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="mb-0">Nombre</p>
                                            </div>
                                            <div className="col-sm-8">
                                                <p className="text-muted mb-0">{data.nombres}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="mb-0">Apellido</p>
                                            </div>
                                            <div className="col-sm-8">
                                                <p className="text-muted mb-0">{data.apellidos}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-8">
                                                <p className="text-muted mb-0">{data.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="mb-0">Rol</p>
                                            </div>
                                            <div className="col-sm-8">
                                                <p className="text-muted mb-0">{data.tipo_docente}</p>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="p-3 py-5">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center cargo"><h4>Cargo Actual</h4></div><br />
                                        <label htmlFor="selectCargo">Usted es docente de</label>
                                        <select className="form-control" id="selectCargo" disabled={!this.state.isCargo} value={data.tipo_docente} onChange={this.handleChange}>
                                            <option value="Docente de Primaria">Primaria</option>
                                            <option value="Docente de Secundaria">Secundaria</option>
                                            <option value="Docente Universitario">Universidad</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={this.onChangedUpdate} className="btn btn-outline-primary ms-1" disabled={!this.state.isCargo}>Guardar</button>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="">
                            <div className="">
                                <div className="d-flex justify-content-center">
                                    <button onClick={this.onChangedStatus} className="btn-lg btn-primary">Darme de baja</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Perfil;
