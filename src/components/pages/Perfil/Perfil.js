import React from 'react'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'

class Perfil extends React.Component {
    render() {
        return (
            <div class="row">
                <Navbar1 />
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="p-5 py-5">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="d-flex flex-column align-items-center text-center p-4 py-3"><img class="rounded-circle mt-5" width="200px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt='Foto perfil' /><span class="font-weight-bold">CRISTIAN</span><span class="text-black-50">cdnarvaez@ejemplo.edu.co</span><span> </span></div>
                                        <div class="d-flex justify-content-center mb-2">
                                            <button type="button" class="btn btn-primary">Cambiar contraseña</button>
                                            <button type="button" class="btn btn-outline-primary ms-1">Editar cargo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="p-8 py-5">
                                <div class="card mb-5">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Cedula</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">106174156987</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Nombre</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">Cristian</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Apellido</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">Narvaez</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Email</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">example@example.com</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Telefono</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">3006851012</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <p class="mb-0">Direccion</p>
                                            </div>
                                            <div class="col-sm-9">
                                                <p class="text-muted mb-0">Santo Domingo, Popayan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-primary">Darme de baja</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Perfil;
