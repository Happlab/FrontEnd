import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar1 from '../../navegation/navbar/Navbar1';
import Footer from '../../navegation/footer/Footer';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: this.props.location.state.data,
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
        fetch('https://api-happlab.herokuapp.com/persona/update/')
    }

    render() {
        let data = this.state.data_user;
        data = JSON.parse(data);
        console.log(data);
        return (
            <div className="row">
                {this.state.isPassword && (
                    data = JSON.stringify(data),
                    <Navigate to="/Password" state={{ data }} />
                )}
                {this.state.isCargo && (
                    <Navigate to="/Cargo" state={{ data }} />
                )}
                <Navbar1 />
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
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
                        <div className="col-md-6">
                            <div className="p-8 py-5">
                                <div className="card mb-5">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Cedula</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.cedula}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nombre</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.nombres}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Apellido</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.apellidos}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Rol</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.rol}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Tokens</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{data.tokens}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={this.onChangedStatusAccount} className="btn btn-primary">Darme de baja</button>
                            </div>
                        </div>
                    </div>
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
