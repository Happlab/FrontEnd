import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmUsuarios from './TemplatesAdmin/DashboardAdmUsuarios'

export default class AdminUsuarios extends Component {
  render() {
    return (
      <div class="wrapper">
        <Header/>
        <Menu opcion="usuario"/>
        <DashboardAdmUsuarios/>
      </div>
    )
  }
}
