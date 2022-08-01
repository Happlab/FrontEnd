import React, { Component } from 'react'
import {PeticionEnvio, PeticionGet} from '../PeticionesAdmin.js'
import Notificacion from './modal.js'

export default class DashboardAdminContenido extends Component {
    constructor(props){
        super();
        this.state={
            contenidos:[],
            conteo: 0,
            notificacion: false,
            tituloNotificacion: "",
            mensajeNotificacion: ""
        }
        this.Eliminar=this.Eliminar.bind(this);
        this.MostrarOcultar=this.MostrarOcultar.bind(this);
        this.Aceptar=this.Aceptar.bind(this);
        this.Descargar=this.Descargar.bind(this);
        this.handleClickCerrarModal=this.handleClickCerrarModal.bind(this);
    }

    urlServicio='http://localhost:8080/contenido/';

    componentDidMount(){
        this.ListarContenido();   
    }
    handleClickCerrarModal(){
        this.setState({notificacion: false});
    }
    Descargar(contenido_link){
        window.location.href=this.urlServicio+'download/'+contenido_link;
    }
    MostrarOcultar(contenido){
        if (contenido.visible) {
            contenido.visible=false;
        } else {
            contenido.visible=true;
        }
        const url=this.urlServicio+'changeVisible/'+contenido.link;
        const metodo='PUT';
        const peticion=PeticionEnvio('', url, metodo);
        peticion.then(data =>{
            if(data){
                this.setState({notificacion: true, tituloNotificacion: "Gestion de contenidos", mensajeNotificacion:"El estado de visibilidad del contenido se ha actualizado correctamente"});
                this.ListarContenido();
            }else{
                this.setState({notificacion: true, tituloNotificacion: "Gestion de contenidos", mensajeNotificacion:"No fue posible cambiar estado de visibilidad del contenido, verifique su conexion con el servidor o a internet"});
            }
        });
    }
    Aceptar(contenido){
        contenido.pendiente=false;
        contenido.visible=true;
        const url=this.urlServicio+'changePendiente/'+contenido.link;
        const metodo='PUT';
        const peticion=PeticionEnvio('', url, metodo);
        peticion.then(data =>{
            if(data){
                this.setState({notificacion: true, tituloNotificacion: "Gestion de contenidos", mensajeNotificacion:"La solicitud para publicar el contenido fue aceptada"});
                this.ListarContenido();
            }else{
                this.setState({notificacion: true, tituloNotificacion: "Gestion de contenidos", mensajeNotificacion:"No fue posible aceptar la solicitud de publicar contenido, verifique su conexion con el servidor o a internet"});
            }
        });
    }
    Eliminar(contenido){ 
        const url=this.urlServicio+'delete/'+contenido.link;
        const metodo='DELETE';
        const peticion=PeticionEnvio('', url, metodo);
        peticion.then(data =>{
            if(data){
                this.setState({notificacion: true, tituloNotificacion: "Gestion de contenidos", mensajeNotificacion:"La solicitud para publicar el contenido fue rechazada"});
                this.ListarContenido();
            }else{
                this.setState({notificacion: true, tituloNotificacion: "Gestion de contenidos", mensajeNotificacion:"No fue posible rechazar la solicitud de contenido, verifique su conexion con el servidor o a internet"});
            }
        });  
    }
    ListarContenido() {
        let cont=0;
        const url=this.urlServicio;
            const datos=PeticionGet(url);
            datos.then(data =>{
                if(data!==null){
                    for (let i = 0; i < data.length; i++) {
                        if(data[i].visible && !data[i].pendiente){
                            cont=cont+1;
                        }
                    } 
                    this.setState({contenidos: Array.from(data), conteo: cont});
                }
            });
    }

    render() {
        return (
            <div>
                <Notificacion show={this.state.notificacion} titulo={this.state.tituloNotificacion} mensaje={this.state.mensajeNotificacion} onclick={this.handleClickCerrarModal}/>
                {/*Lista d solicitudes*/}
                <div className="content-wrapper" style={{ minHeight: '2080.12px' }}>
                <h1 align="center">Módulo Administrador - Página de Contenidos</h1>
                <br></br>
                    {/* Estádisticas de Contenidos */}
                    <div class="container-fluid">
                        <br />
                        <h3>Conteo de contenidos</h3>
                        <div class="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{this.state.conteo}</h3>
                                        <p>Número de contenidos</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <h1 text-align="center">Tablas de gestion de de contenidos</h1>
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
                                            <h3 className="card-title">Solicitudes de contenido</h3>
                                        </div>
                                        <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Título</th>
                                                        <th>Descripción</th>
                                                        <th>Usuario</th>
                                                        <th>Documentación</th>
                                                        <th>Etiquetas</th>
                                                        <th>Fecha de cargue</th>
                                                        <th>Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {[...Array(this.state.contenidos.length)].map((e, i) => {
                                                    if(this.state.contenidos[i].pendiente){
                                                    return(
                                                    <tr>
                                                        <td>{this.state.contenidos[i].titulo}</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={this.state.contenidos[i].resumen} />
                                                        </td>
                                                        <td>{this.state.contenidos[i].id_autor.email}</td>
                                                        <div className="btn-group btn-group-sm">
                                                            
                                                            <button type="button" onClick={()=>this.Descargar(this.state.contenidos[i].link)} className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                                <i className="fas fa-download" /> Descargar
                                                            </button>
                                                        </div>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={this.state.contenidos[i].tags} />
                                                        </td>
                                                        <td>{this.state.contenidos[i].fecha_subida}</td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                    Acción
                                                                </button>
                                                                <ul className="dropdown-menu" style={{}}>
                                                                    <li className="dropdown-item" style={{cursor: 'pointer'}} onClick={()=>this.Aceptar(this.state.contenidos[i])}>Aprobar</li>
                                                                    <li className="dropdown-item" style={{cursor: 'pointer'}} onClick={()=>this.Eliminar(this.state.contenidos[i])}>Rechazar</li>
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
                    <br />
                    {/* Tabla de Contenidos totales*/}
                    <section className="content">
                        <div className="container-fluid">
                            <h2>Lista de contenidos</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Lista de Contenidos</h3>
                                        </div>
                                        <div className="card-body table-responsive p-0" style={{ height: 300 }}>
                                            <table className="table table-head-fixed text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Título</th>
                                                        <th>Descripción</th>
                                                        <th>Usuario</th>
                                                        <th>Documentación</th>
                                                        <th>Valoración</th>
                                                        <th>Etiquetas</th>
                                                        <th>Fecha de cargue</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {[...Array(this.state.contenidos.length)].map((e, i) => {
                                                    if(!this.state.contenidos[i].pendiente){
                                                    return(
                                                    <tr>
                                                        <td>{i}</td>
                                                        <td>Título 1</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={this.state.contenidos[i].resumen} />
                                                        </td>
                                                        <td>{this.state.contenidos[i].id_autor.email}</td>
                                                        <td>
                                                            <div className="btn-group btn-group-sm">
                                                                <a  onClick={()=>this.Eliminar(this,this.state.contenidos[i])} href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                                                                <button type="button" onClick={()=>this.Descargar(this.state.contenidos[i].link)} className="btn btn-primary float-right" style={{ marginRight: 5 }}>
                                                                    <i className="fas fa-download" /> Descargar
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>{this.state.contenidos[i].valoracion_general}</td>
                                                        <td>
                                                            <textarea id="inputDescription" className="form-control" rows={4} defaultValue={this.state.contenidos[i].tags} />
                                                        </td>
                                                        <td>{new Date(this.state.contenidos[i].fecha_subida).toLocaleDateString()+ ' A las: ' + new Date(this.state.contenidos[i].fecha_subida).toLocaleTimeString()}</td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-warning" onClick={()=>this.MostrarOcultar(this.state.contenidos[i])} aria-expanded="false">
                                                                    {this.state.contenidos[i].visible ? 'Ocultar contenido' : 'Mostrar contenido'}
                                                                </button>
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
