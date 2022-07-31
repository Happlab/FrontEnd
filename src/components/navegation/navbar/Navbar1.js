import { Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom'
import "../colores.scss"
import logo from "../../../../src/assets/images/logo3.jpg"; 
import user_service from "../../services/UserServices";

const RenderSesion = ()=> {
  return (
      <Nav className='login'>
        <Nav.Link href="/Registro">Registro</Nav.Link>
        <Nav.Link href="/Login">Iniciar Sesion</Nav.Link>
      </Nav>
  )
}

const RenderCloseSesion = () => {
  return (
      <Nav className='login'>
        <Nav.Link href="/perfil">Perfil</Nav.Link>
        <RenderBtnClose></RenderBtnClose>
      </Nav>
  )
}

const RenderBtnClose = () => {
  user_service.deleteToken();
  return (
      <Nav.Link href="/">Cerrar Sesion</Nav.Link>
  )
}


const Navbar1 = () => {
  let token = localStorage.getItem("token");
  console.log("navbar "+token);
  return (
    <>
        <Navbar className="navBg" variant="dark" sticky='top' expand="lg">
        <Container>
            <Navbar.Brand  as ={Link} to="/">HappLab Home Page</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" justify={true}>
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/AboutUs">Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/Noticias">Noticias</Nav.Link>
              <Nav.Link as={Link} to="/Contenido">Contenidos</Nav.Link>
              <Nav.Link as={Link} to="/Acerca">Acerca de</Nav.Link>
            </Nav>
              {token !== null && (
                <RenderCloseSesion></RenderCloseSesion>
              )}
              {token === null && (
                <RenderSesion></RenderSesion>
              )}
        </Navbar.Collapse>
        </Container>
        </Navbar>

        <section>
          <div className='Logo'>
            <img className = "logo2"
                 src = {logo} alt=""
            /> 
          </div>  
          <Outlet></Outlet>
        </section>

    </>
  )
}

export default Navbar1
