import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmNoticias from './TemplatesAdmin/DashboardAdminNoticias'
export default class AdminNoticias extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Menu/>
        <DashboardAdmNoticias/>
      </div>
    )
  }
}
