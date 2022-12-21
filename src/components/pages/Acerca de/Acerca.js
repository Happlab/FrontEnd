import React from "react";
import Footer from "../../navegation/footer/Footer";
import { Navbar } from '../../navegation/navbar/Navbar';
import ReactPlayer from "react-player";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./Acerca.scss";
import { PeticionGet } from "../Admin/PeticionesAdmin";
import { environment } from "../../../environments/environment";;

class Acerca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acerca: [],
    };
  }

  componentDidMount() {
    this.listarAcerca();
  }

  listarAcerca() {
    const url = environment.baseUrl + "/seccion/";
    const mensajeError = "No hay informacion de inicio";
    const datos = PeticionGet(url, mensajeError);
    datos.then((data) => {
      if (data !== null && data !== undefined) {
        this.setState({
          acerca: Array.from(data),
        });
      }
    });
  }

  render() {
    return (
      <div className="main">
        <Navbar />
        <hr />
        {this.state.acerca.length === 0 && <p className="notAvalaible">La informacion no se encuentra disponible</p>}
        {this.state.acerca.length !== 0 && <h2 className="titulo-estandar">Bienvenido a HappLab</h2>}
        {this.state.acerca.filter((value, index) => index === 2).map((acerca, i) => {
            return (
              <div key={i + 1} className="columna-acerca">
                <div className="columna-acerca-text">
                  <h3 className="title-dest" style={{ color: "black" }}>
                    {acerca.titulo_seccion}
                  </h3>
                  <p className="text-lore">
                    {acerca.descripcion}
                  </p>
                </div>
                <div className="columna-acerca-video">
                  {acerca.url !== "" ? (
                    <ReactPlayer
                      url={acerca.url}
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
                        environment.baseUrl +
                        "/seccion/contenido/" +
                        acerca.nombre_contenido
                      }
                      width={400}
                      height={150}
                      alt="Third slide"
                    />
                  )}
                </div>
              </div>
            );
        })}
        {this.state.acerca.length !== 0 && <h2 className="title-map">¿Dónde nos encuentras?</h2>}
        {this.state.acerca.filter((content, index) => index === 3).map((acerca, i) => {
          const position = [
            acerca.coordenadas[0],
            acerca.coordenadas[1],
          ];
            return (
              <div key={i+1} className="row-map">
                <div className="col-map">
                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                    crossOrigin=""
                  />
                  <MapContainer
                    center={position}
                    zoom={25}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={position}
                      icon={
                        new Icon({
                          iconUrl: markerIconPng,
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                        })
                      }
                    >
                      <Popup>HappLab</Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="col-text">
                  <h3 className="title-dest" style={{ color: "black" }}>
                    {acerca.titulo_seccion}
                  </h3>
                  <p className="text-lore">
                    {acerca.descripcion}
                  </p>
                </div>
              </div>
            );
        })}
        <hr />
        <Footer />
      </div>
    );
  }
}
export default Acerca;

