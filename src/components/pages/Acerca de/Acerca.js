import { useEffect, useState } from "react";
import MainPages from "../../wrappers/mainpages/MainPages";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import { Icon } from "leaflet";
import { peticionGet } from "../../../services/AdminServices";
import { environment } from "../../../environments/environment";
import Player from "../../navegation/player/Player";
import Loader from "../../navegation/loader/Loader";
import NotAvalaible from "../../navegation/notavalaible/NotAvalaible";
import "./Acerca.scss";

const urlService = environment.baseUrl + "/seccion/";

const Acerca = () => {
  const [abouts, setAbouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listAbout();
  }, []);

  const listAbout = () => {
    const mensajeError = "No hay informacion de inicio";
    peticionGet(urlService, mensajeError)
      .then((data) => {
        if (data) setAbouts(Array.from(data));
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <MainPages>
      {isLoading ? (
        <div style={{ padding: "20px 10rem" }}>
          <Loader />
        </div>
      ) : (
        <div style={{ padding: "20px 10rem" }}>
          {abouts.length === 0 ? (
            <NotAvalaible>
              La informacion no se encuentra disponible
            </NotAvalaible>
          ) : (
            <>
              <h2 className="titulo-estandar">Bienvenido a HappLab</h2>
              {abouts
                .filter((value, index) => index === 2)
                .map((about, i) => {
                  return (
                    <div key={i + 1} className="columna-acerca">
                      <div className="columna-acerca-text">
                        <h3 className="title-dest" style={{ color: "black" }}>
                          {about.titulo_seccion}
                        </h3>
                        <p className="text-lore">{about.descripcion}</p>
                      </div>
                      <div className="columna-acerca-video">
                        {about.url !== "" ? (
                          <Player url={about.url} />
                        ) : (
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "10px",
                            }}
                            className="images-carousel"
                            src={
                              urlService + "contenido/" + about.nombre_contenido
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
              <h2 className="title-map">¿Dónde nos encuentras?</h2>
              {abouts
                .filter((content, index) => index === 3)
                .map((about, i) => {
                  const position = [about.coordenadas[0], about.coordenadas[1]];
                  return (
                    <div key={i + 1} className="row-map">
                      <div className="col-map">
                        <link
                          rel="stylesheet"
                          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                          crossOrigin=""
                        />
                        {/* <MapContainer */}
                        {/*   center={position} */}
                        {/*   zoom={25} */}
                        {/*   scrollWheelZoom={false} */}
                        {/* > */}
                        {/*   <TileLayer */}
                        {/*     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' */}
                        {/*     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
                        {/*   /> */}
                        {/*   <Marker */}
                        {/*     position={position} */}
                        {/*     icon={ */}
                        {/*       new Icon({ */}
                        {/*         iconUrl: markerIconPng, */}
                        {/*         iconSize: [25, 41], */}
                        {/*         iconAnchor: [12, 41], */}
                        {/*       }) */}
                        {/*     } */}
                        {/*   > */}
                        {/*     <Popup>HappLab</Popup> */}
                        {/*   </Marker> */}
                        {/* </MapContainer> */}
                      </div>

                      <div className="col-text">
                        <h3 className="title-dest" style={{ color: "black" }}>
                          {about.titulo_seccion}
                        </h3>
                        <p className="text-lore">{about.descripcion}</p>
                      </div>
                    </div>
                  );
                })}
              <div className="aboutme"></div>
            </>
          )}
        </div>
      )}
    </MainPages>
  );
};

export default Acerca;
