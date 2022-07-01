import { Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom'
import './Navbar.css';
import logo from "../../../../src/assets/images/logo3.jpg"; 
const Navbar1 = () => {
  return (
    <>
        <Navbar className="navBg" variant="dark" sticky='top' expand="lg">
        <Container>
            <Navbar.Brand  as ={Link} to="/">HappLab Home Page</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" justify={true}>
              <Nav.Link as={Link} to="/">Inicio </Nav.Link>
              <Nav.Link as={Link} to="/Noticias">Noticias </Nav.Link>
              <Nav.Link as={Link} to="/About">Contenidos </Nav.Link>
              <NavDropdown title="Investigacion" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/About">Lineas de Investigacion</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Investigadores">Investigadores</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Tecnologias">Tecnologias</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={Link} to="/Acerca">Acerca de </Nav.Link>
            </Nav>
            <Nav className='login'>
            <Nav.Link href="/Login">Iniciar Sesion</Nav.Link>
            <Nav.Link href="/Registro">Registro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>

        <section>
          <div className='Logo'>
            <img  className = "logo2"
                              src = {logo} alt=""
                          /> 
          </div>  
          <Outlet></Outlet>
        </section>

    </>
  )
}

export default Navbar1