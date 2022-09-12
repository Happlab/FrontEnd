import React from "react";
import "./Inicio.scss";
import imagenes from "../../../assets/imagenes";
import ReactPlayer from "react-player";
import { Navbar } from "../../navegation/navbar/Navbar";
import Footer from "../../navegation/footer/Footer";
import { Carousel } from "react-bootstrap";
import { PeticionGet } from "../Admin/PeticionesAdmin";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inicio: [],
    };
  }

  urlServicio = "https://api-happlab.herokuapp.com/seccion/";
  
  componentDidMount() {
    this.ListarInicio();
  }
  ListarInicio() {
    const url = this.urlServicio;
    const mensajeError = "no hay informacion de inicio";
    const datos = PeticionGet(url, mensajeError);
    datos.then((data) => {
      if (data !== null) {
        this.setState({ inicio: Array.from(data) });
      }
    });
  }
  render() {
    return (
      <div className="main-inicio">
        <Navbar />
        <div className="container-inicio">
          <hr />
          <h3 className="title-h2">Destacados de la semana</h3>
          <hr className="hr-line-white" />
        </div>
        {this.state.inicio
          .filter((content, index) => index < 2)
          .map((inicio, i) => {
            return (
              <div className="content-video" key={i}>
                <div className="columna-inicio">
                  <h3 className="title-dest">
                    {inicio.titulo_seccion}
                  </h3>
                  <div className="columna-inicio-texto">
                    <p className="text-lore">
                      {inicio.descripcion}
                    </p>
                  </div>
                  <div className="columna-inicio-video">
                    {inicio.url !== "" ? (
                      <ReactPlayer
                        url={inicio.url}
                        width="100%"
                        height="100%"
                        controls
                        loop
                      />
                    ) : (
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="images-carousel"
                        src={
                          this.urlServicio +
                          "contenido/" +
                          inicio.nombre_contenido
                        }
                        width={400}
                        height={150}
                        alt="Third slide"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        <hr className="hr-line-white" />

        <div className="carousel">
          <Carousel fade variant="dark" indicators={false}>
            <Carousel.Item interval={1000}>
              <img
                className="images-carousel"
                src={imagenes.imgUni}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="images-carousel"
                src={imagenes.imgSam}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="images-carousel"
                src={imagenes.imgAESS}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <hr />
        <Footer />
      </div>
    );
  }
}
export default Inicio;
