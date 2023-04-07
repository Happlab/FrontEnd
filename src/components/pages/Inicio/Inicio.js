import React from "react";
import "./Inicio.scss";
import imagenes from "../../../assets/imagenes";
import { Navbar } from "../../navegation/navbar/Navbar";
import Footer from "../../navegation/footer/Footer";
import { Carousel } from "react-bootstrap";
import { PeticionGet } from "../Admin/PeticionesAdmin";
import { environment } from "../../../environments/environment";
import Loader from "../../navegation/loader/Loader";
import Player from "../../navegation/player/Player";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inicio: [],
      estaCargando: true,
    };
  }

  componentDidMount() {
    this.setState({
      estaCargando: true,
    })
    this.ListarInicio();
  }

  ListarInicio() {
    const url = environment.baseUrl+"/seccion/";
    const mensajeError = "no hay informacion de inicio";
    const datos = PeticionGet(url, mensajeError);
    datos.then((data) => {
      if (data !== null && data !== undefined) {
        this.setState({ inicio: Array.from(data), estaCargando: false });
      }
    }).finally(() => {
      this.setState({
        estaCargando: false,
      })
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
        {this.state.estaCargando 
          ? <Loader />
          :
        <div>
        {this.state.inicio.length === 0 && <p className="notAvalaible">No hay noticias destacadas</p>}
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
                      <Player
                        src={inicio.url}
                      />
                    ) : (
                      <img
                        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                        className="images-carousel"
                        src={
                          environment.baseUrl +
                          "/seccion/contenido/" +
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
        </div>
        }
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
        <hr className="br-carousel"/>
        <Footer />
      </div>
    );
  }
}
export default Inicio;
