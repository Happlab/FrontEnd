import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmAcercaDe from './TemplatesAdmin/DashboardAdminAcercaDe'
export default class AdminAcercaDe extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Menu opcion="acercaDe"/>
        <DashboardAdmAcercaDe/>
      </div>
    )
  }
}
