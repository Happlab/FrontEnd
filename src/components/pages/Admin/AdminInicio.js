import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import DashboardAdmInicio from './TemplatesAdmin/DashboardAdminInicio'
export default class AdminInicio extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Menu/>
        <DashboardAdmInicio/>
      </div>
    )
  }
}
