import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdminContenido from './TemplatesAdmin/DashboardAdminContenido'
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../../context/GlobalContext';

export default class AdminContenido extends Component {
  static contextType = TokenContext;
  render() {
    let data = this.context.token;
    if(data === null) {
      return (
          <Navigate to="/login" state={{data}} />
      )
    } else if(data !== null && data.rol[0] !== "ADMIN") {
      return (
          <Navigate to="/" />
      )
    }
    return (
        <div>
            <Header/>
            <Menu opcion="contenido"/>
            <DashboardAdminContenido/>
        </div>
    )
  }
}
