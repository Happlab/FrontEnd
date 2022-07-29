import React, { Component , useState} from 'react'
import {PeticionEnvio, PeticionGet} from '../PeticionesAdmin.js'
export default class Dashboard extends Component {
    constructor (props){
        super();
        this.state={
            usuarios: [],
            conteo: 0
        }
        var conteo=0;
        this.Actualizar=this.Actualizar.bind(this);
        this.Eliminar=this.Eliminar.bind(this);
        this.Inactivar=this.Inactivar.bind(this);
    }
    urlServicio='http://localhost:8080/persona/';
    
    componentDidMount(){
        this.ListarUsuarios();
    }
    Inactivar(user){
        const url=this.urlServicio+'desactivar/'+user.email;
        const mensajeError='no fue posible inactivar el usuario';
        const metodo='DELETE';
        const peticion=PeticionEnvio(' ', url, mensajeError, metodo);
        peticion.then(data =>{
            if(data){
                this.ListarUsuarios();
                console.log('usuarios: '+this.state.conteo);
            }
        });
        
    }
    Eliminar(user){
        const url=this.urlServicio+'delete/'+user.email;
        const mensajeError='no fue posible eliminar el usuario';
        const metodo='DELETE';
        const peticion=PeticionEnvio(' ', url, mensajeError, metodo);
        peticion.then(data =>{
            if(data){
                this.ListarUsuarios();
            }
        });  
    }
    Actualizar(user){
        user.pendiente=false;
        user.activo=true;
        user.tipoDocente='Universitario';
        const url=this.urlServicio+'update';
        const mensajeError='no fue posible actualizar estado del usuario';
        const metodo='PUT';
        const peticion=PeticionEnvio(user, url, mensajeError, metodo);
        peticion.then(data =>{
            if(data){
                this.ListarUsuarios();
            }
        });
            
    }   
    ListarUsuarios() {
        let cont=0;
        const url=this.urlServicio;
        const mensajeError='no hay usuarios';
        const datos=PeticionGet(url, mensajeError);
        datos.then(data =>{
            if(data!==null){
                for (let i = 0; i < data.length; i++) {
                    if(data[i].activo && !data[i].pendiente){
                        cont=cont+1;
                    }
                } 
                this.setState({usuarios: Array.from(data), conteo: cont});
            }
        });  
    }
    render() {
        return (
            <div>
                {/*Lista d solicitudes*/}
                <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
                <h1 align="center">Módulo Administrador - Usuarios</h1>
                <br></br>
                {/* Estádisticas de voisitantes y usuarios */}
                    <div class="container-fluid">
                    <br/>
                    <h3>Estadísticas de usuarios</h3>
                        <div class="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{this.state.conteo}</h3>
                                        <p>Usuarios registrados</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>65</h3>
                                        <p>Número de visitas</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                    <a href="./AdminUsuarios" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <h1 text-align="center">Tablas de gestión de usuarios</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Solicitudes de usuarios</h3>
                                        </div>
                                        <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre completo</th>
                                                        <th>E-mail</th>
                                                        <th>No. Documento</th>
                                                        <th>Tipo profesor</th>
                                                        <th>Solicitud</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {[...Array(this.state.usuarios.length)].map((e, i) => {
                                                    if(this.state.usuarios[i].pendiente){
                                                    return(
                                                    <tr>
                                                        <td>{this.state.usuarios[i].nombres+' '+this.state.usuarios[i].apellidos}</td>
                                                        <td>{this.state.usuarios[i].email}</td>
                                                        <td>{this.state.usuarios[i].cedula}</td>
                                                        <td>{this.state.usuarios[i].rol}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button type="button" className="btn btn-danger">Aprobar/Rechazar</button>
                                                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                                    <span className="caret" />
                                                                    <span className="sr-only">Desplegar menú</span>
                                                                </button>
                                                                <ul className="dropdown-menu" role="menu">
                                                                    <li><a href="#" onClick={()=>this.Actualizar(this.state.usuarios[i])}>Aprobar</a></li>
                                                                    <li><a href="#" onClick={()=>this.Eliminar(this.state.usuarios[i])}>Rechazar</a></li>
                                                                    <li className="divider" />
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )}
                                                    
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Tabla de usuarios totales*/}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Lista de usuarios</h3>
                                        </div>
                                        <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead> 
                                                    <tr>
                                                        <th>Nombre completo</th>
                                                        <th>E-mail</th>
                                                        <th>Estado de cuenta</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {[...Array(this.state.usuarios.length)].map((e, i) => {
                                                    if (!this.state.usuarios[i].pendiente) {
                                                    return(
                                                        
                                                            <tr>
                                                            <td>{this.state.usuarios[i].nombres+' '+this.state.usuarios[i].apellidos}</td>
                                                            <td>{this.state.usuarios[i].email}</td>
                                                            <td>
                                                                <div className="btn-group">
                                                                    <button type="button" className="btn btn-danger">{this.state.usuarios[i].activo ? 'Activo' : 'Inactivo'}</button>
                                                                    <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                                                        <span className="caret" />
                                                                        <span className="sr-only">Desplegar menú</span>
                                                                    </button>
                                                                    <ul className="dropdown-menu" role="menu">
                                                                        <li><a href="#" onClick={()=>this.Actualizar(this.state.usuarios[i])}>Activar</a></li>
                                                                        <li><a href="#" onClick={()=>this.Inactivar(this.state.usuarios[i])}>Inactivar</a></li>
                                                                        <li className="divider" />
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                            </tr>
                                                    )
                                                    }
                                                    
                                                })}
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
