import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmAcercaDe from './TemplatesAdmin/DashboardAdminAcercaDe'
import user_service from '../../services/UserServices';
import { useLocation, Navigate } from 'react-router-dom';

export default class AdminAcercaDe extends Component {
  render() {
    const user=user_service.getToken();
    const data=user_service.getDataToken(user);
    if(data.rol[0] !== 'ADMIN') {
      return (
          <Navigate to="/login" state={{data}} />
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
