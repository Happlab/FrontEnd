import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmAcercaDe from './TemplatesAdmin/DashboardAdminAcercaDe'
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../../context/GlobalContext';

export default class AdminAcercaDe extends Component {
  static contextType = TokenContext;
  render() {
    let data = this.context.token;
    if(data === null && data.rol[0] !== 'ADMIN') {
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
        <Menu opcion="acercaDe"/>
        <DashboardAdmAcercaDe/>
      </div>
    )
  }
}
