import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmUsuarios from './TemplatesAdmin/DashboardAdmUsuarios'
import user_service from '../../services/UserServices';
import { useLocation, Navigate } from 'react-router-dom';


export default class AdminUsuarios extends Component {
  render() {
    const data=user_service.getToken();
    if(data === null) {
      return (
          <Navigate to="/login" state={{data}} />
      )
    }
    return (
      <div class="wrapper">
        <Header/>
        <Menu opcion="usuario"/>
        <DashboardAdmUsuarios/>
      </div>
    )
  }
}
