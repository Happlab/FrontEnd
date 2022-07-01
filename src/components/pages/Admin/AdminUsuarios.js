import React, { Component } from 'react'
import Header from './TemplatesAdmin/Header'
import Menu from './TemplatesAdmin/Menu'
import Dashboard from './TemplatesAdmin/DashboardAdmUsuarios'

export default class AdminUsuarios extends Component {
  render() {
    return (
      <div class="wrapper">
        <Header/>
        <Menu/>
        <Dashboard/>
        
      </div>
    )
  }
}
