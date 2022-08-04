import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Cookie from 'universal-cookie'
import { useLocation, Navigate } from 'react-router-dom';
import user_service from '../../../services/UserServices';

export default class Header extends Component {
    constructor(props){
        super();
        this.handleClickCerrarSesion=this.handleClickCerrarSesion.bind(this);
    }
    cookie= new Cookie();
    handleClickCerrarSesion(){
        user_service.deleteToken();
    }
    render() {
        return (
            <div>
                <nav className="main-header navbar navbar-expand sidebar-close navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li>
                            <div style={{marginLeft: '30px'}}>
                                <a href='/'><Button onClick={this.handleClickCerrarSesion}>Cerrar Sesion</Button></a>
                            </div>  
                        </li>
                    </ul> 
                    
                </nav>
                
            </div>
            
        )
    }
}
