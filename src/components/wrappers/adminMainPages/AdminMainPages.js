import React, { Component } from "react";
import Header from "../../pages/Admin/TemplatesAdmin/Header";
import Menu from "../../pages/Admin/TemplatesAdmin/Menu";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../../context/GlobalContext";

export default class AdminMainPages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.props.option,
      children: this.props.children,
    };
  }

  static contextType = TokenContext;

  render() {
    let data = this.context.token;
    if (data === null) {
      return <Navigate to="/login" state={{ data }} />;
    } else if ((data !== null) & (data.rol[0] !== "ADMIN")) {
      return <Navigate to="/" />;
    }
    return (
      <div>
        <Header />
        <Menu opcion={this.state.option} />
        {this.state.children}
      </div>
    );
  }
}
