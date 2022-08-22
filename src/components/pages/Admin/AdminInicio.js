import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmInicio from './TemplatesAdmin/DashboardAdminInicio'
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../../context/GlobalContext';

export default class AdminInicio extends Component {
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
        <Menu opcion="inicio"/>
        <DashboardAdmInicio/>
      </div>
    )
  }
}
