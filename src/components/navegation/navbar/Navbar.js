import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import "../colores.scss";
import logo from "../../../../src/assets/images/logo3.jpg";
import user_service from "../../../services/UserServices";
import { TokenContext } from "../../../context/GlobalContext";

class NavbarCustom extends React.Component {
  constructor(props) {
    super(props);
    this.eliminarCookie = this.eliminarCookie.bind(this);
  }
  static contextType = TokenContext;

  eliminarCookie() {
    user_service.deleteToken();
  }
  render() {
    let token = this.context.token;
    return (
      <>
        <Navbar className="navBg" variant="dark" sticky="top" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              HappLab Home Page
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" justify={true}>
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/AboutUs">
                  Sobre Nosotros
                </Nav.Link>
                <Nav.Link as={Link} to="/Noticias">
                  Noticias
                </Nav.Link>
                <Nav.Link as={Link} to="/Contenido">
                  Contenidos
                </Nav.Link>
                <Nav.Link as={Link} to="/Acerca">
                  Acerca de
                </Nav.Link>
              </Nav>
              <Nav className="login justified" style={token ? {width: '21%'} : { width: '25%' }}>
              {token === null ? (
                  <>
                    <Nav.Link href="/Registro">Registro</Nav.Link>
                    <Nav.Link href="/Login">Iniciar Sesion</Nav.Link>
                  </>
                )
                :
                  <>
                  <Nav.Link href="/perfil">Perfil</Nav.Link>
                  <Nav.Link href="/">
                    <button
                      className="button"
                      onClick={this.eliminarCookie}
                      style={{
                        width: "100%",
                        border: "none",
                        color: "rgba(255,255,255,.55)",
                      }}
                    >
                      Cerrar Sesion
                    </button>
                  </Nav.Link>
                  </>
              }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <section>
          <div className="Logo">
            <img className="logo2" src={logo} alt="" />
          </div>
          <Outlet></Outlet>
        </section>
      </>
    );
  }
}

export { NavbarCustom as Navbar };
