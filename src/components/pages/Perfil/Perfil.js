import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar1 from '../../navegation/navbar/Navbar1';
import Footer from '../../navegation/footer/Footer';
import './Perfil.scss'
import user_service from '../../services/UserServices';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: this.props.location.state.data,
            isPassword: false,
            isCargo: false,
            isStatus: false,
            cargo: "",
            updateVerified: false
        };
        this.onChangedPassword = this.onChangedPassword.bind(this);
        this.onChangedCargo = this.onChangedCargo.bind(this);
        this.onChangedStatusAccount = this.onChangedStatusAccount.bind(this);
        this.onChangedStatus = this.onChangedStatus.bind(this);
        this.onChangedUpdate = this.onChangedUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

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
        this.setState(values => ({ ...values, isStatus: !this.state.isStatus}));
        let disable = user_service.disabledUser(email);
        disable.then(response => {
            if(response === 200) {
                user_service.deleteToken();
                alert("Cuenta Desactivada");
            }
            else alert("No se pudo desactivar la cuenta");
        });
    }

    handleChange(event) {
        this.setState(previousState => ({
            ...previousState, cargo: event.target.value
        }))
    }

    saveChange(data) {
        this.setState(values => ({ ...values, updateVerified: !this.state.updateVerified, isCargo: !this.state.isCargo}));
        let update = user_service.updateUser(data);
        update.then(data_user => {
            if (data_user !== null) {
                this.setState(values => ({ ...values, data_user: data_user}));
                user_service.deleteToken();
                alert("Cargo modificado");
            } else alert("No se pudo modificar el cargo");
        })
    }

    render() {
        let data = this.state.data_user;
        data.rol = (this.state.cargo !== "") ? this.state.cargo : data.rol;
        if (user_service.getToken() === null) return (<Navigate to="/Login" />)
        return (
            <div className="row">
                {this.state.isPassword && (
                    data = JSON.stringify(data),
                    <Navigate to="/Password" state={{ data }} />
                )}
                {this.state.isStatus && (
                    this.onChangedStatusAccount(data.email)
                )}
                {this.state.updateVerified && (
                    this.saveChange(data)
                )}
                <Navbar1 />
                <div className="container m-0">
                    <div className="d-flex flex-column align-items-center text-center p-4 py-3">
                        <h1 className="titulo-estandar">Perfil de usuario</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="p-5 py-5">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center p-4 py-3"><img className="rounded-circle mt-5" width="200px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt='Foto perfil' /><span className="font-weight-bold">{data.nombres}</span><span className="text-black-50">{data.email}</span><span> </span></div>
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
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <p className="mb-0">Tokens</p>
                                            </div>
                                            <div className="col-sm-8">
                                                <p className="text-muted mb-0">{data.tokens}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-5 py-5">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div class="d-flex justify-content-between align-items-center cargo"><h4>Cargo Actual</h4></div><br />
                                        <label for="selectCargo">Usted es docente de</label>
                                        <select class="form-control" id="selectCargo" disabled={!this.state.isCargo} value={data.rol} onChange={this.handleChange}>
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
                        <div class="col-md-0">
                            <div class="p-0 py-0">
                                <div className="d-flex justify-content-center">
                                    <button onClick={this.onChangedStatus} className="btn-lg btn-primary">Darme de baja</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default function WithRoutePerfil(props) {
    let location = useLocation();
    return <Perfil {...props} location={location}/>
}
