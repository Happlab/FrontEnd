import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar1 from '../../navegation/navbar/Navbar1';
import Footer from '../../navegation/footer/Footer';
import './Perfil.scss'

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.state);
        console.log(props.location);
        this.state = {
            // data_user: props.location.state.data,
            isPassword: false,
            isCargo: false,
            isStatus: true
        };
        this.onChangedPassword = this.onChangedPassword.bind(this);
        this.onChangedCargo = this.onChangedCargo.bind(this);
        this.onChangedStatusAccount = this.onChangedStatusAccount.bind(this);
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

    onChangedStatusAccount() {
        this.setState(previousState => ({
            ...previousState, isStatus: !previousState.isStatus
        }))
    }

    render() {
        let data = this.state.data_user;
        return (
            <div className="row">
                {this.state.isPassword && (
                    <Navigate to="/Password" state={{ data }} />
                )}
                <Navbar1 />
                <hr className="mb-0"/>
                <div className="container mb-0">
                    <div className="d-flex flex-column align-items-center text-center p-4 py-3">
                        <h1 className="titulo-estandar">Perfil de usuario</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="p-5 py-5">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center p-4 py-3"><img className="rounded-circle mt-5" width="200px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt='Foto perfil' /><span className="font-weight-bold">CRISTIAN</span><span className="text-black-50">cdnarvaez@ejemplo.edu.co</span><span> </span></div>
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
                                            <div className="col-sm-3">
                                                <p className="mb-0">Cedula</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">106174156987</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nombre</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">Cristian</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Apellido</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">Narvaez</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">example@example.com</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Rol</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">Docente</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Token</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">13455</p>
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
                                        <select class="form-control" id="selectCargo" disabled={!this.state.isCargo}>
                                            <option>Primaria</option>
                                            <option>Secundaria</option>
                                            <option>Universidad</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={this.onChangedCargo} className="btn btn-outline-primary ms-1" disabled={!this.state.isCargo}>Guardar</button>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div class="col-md-0">
                            <div class="p-0 py-0">
                                <div className="d-flex justify-content-center">
                                    <button onClick={this.onChangedStatusAccount} className="btn-lg btn-primary">Darme de baja</button>
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

export default Perfil;
