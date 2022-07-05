import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdminContenido from './TemplatesAdmin/DashboardAdminContenido'

export default class AdminContenido extends Component {
  render() {
    return (
        <div>
            <Header/>
            <Menu/>
            <DashboardAdminContenido/>
        </div>
    )
  }
}
