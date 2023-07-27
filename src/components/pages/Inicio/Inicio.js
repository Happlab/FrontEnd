import React, { useEffect, useState } from "react";
import MainPages from "../../wrappers/mainpages/MainPages";
import { PeticionGet } from "../../../services/AdminServices";
import { environment } from "../../../environments/environment";
import Loader from "../../navegation/loader/Loader";
import Player from "../../navegation/player/Player";
import Carousel from "../../navegation/carousel/Carousel";
import NotAvalaible from "../../navegation/notavalaible/NotAvalaible";
import imagenes from "../../../assets/imagenes";
import "./Inicio.scss";

const urlService = environment.baseUrl + "/seccion/";

const Inicio = () => {
  const [start, setStart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listStart();
  }, []);

  const listStart = () => {
    const mensajeError = "no hay informacion de inicio";
    PeticionGet(urlService, mensajeError)
      .then((data) => {
        if (data) setStart(Array.from(data));
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainPages color={true}>
      <div className="container-inicio">
        <hr />
        <h3 className="title-h2">Destacados de la semana</h3>
        <hr className="hr-line-white" />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="inicio-content">
          {start.length === 0 && (
            <NotAvalaible>No hay noticias destacadas</NotAvalaible>
          )}
          {start
            .filter((content, index) => index < 2)
            .map((inicio, i) => {
              return (
                <div className="content-video" key={i}>
                  <div className="columna-inicio">
                    <h3 className="title-dest">{inicio.titulo_seccion}</h3>
                    <div className="columna-inicio-texto">
                      <p className="text-lore">{inicio.descripcion}</p>
                    </div>
                    <div className="columna-inicio-video">
                      {inicio.url !== "" ? (
                        <Player src={inicio.url} />
                      ) : (
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                          }}
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
      )}
      <hr className="hr-line-white" />

      <div className="main-carousel">
        <Carousel
          time={5000}
          items={[imagenes.imgUni, imagenes.imgSam, imagenes.imgAESS]}
        />
      </div>
      <hr className="br-carousel" />
    </MainPages>
  );
};
export default Inicio;
