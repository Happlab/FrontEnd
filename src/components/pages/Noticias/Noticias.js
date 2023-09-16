import React, { useEffect, useState } from "react";
import MainPages from "../../wrappers/mainpages/MainPages";
import { peticionGet } from "../../../services/AdminServices";
import { environment } from "../../../environments/environment";
import Loader from "../../navegation/loader/Loader";
import NotAvalaible from "../../navegation/notavalaible/NotAvalaible";
import Fade from "../../navegation/fade/Fade";
import "./Noticias.scss";
import img from '../../../assets/images/imagenes';

const urlService = environment.baseUrl + "/noticia/";

const Noticias = () => {
  const [news, setNews] = useState([
    {
      titulo_noticia: 'hola',
      link_contenido: img.img1,
      visible: true,
      url_noticia: 'hola'
    },
    {
      titulo_noticia: 'hola2',
      link_contenido: img.img2,
      visible: true,
      url_noticia: 'hola2'
    },
    {
      titulo_noticia: 'hola2',
      link_contenido: img.imgSam,
      visible: true,
      url_noticia: 'hola2'
    },
    {
      titulo_noticia: 'hola2',
      link_contenido: img.imgUni,
      visible: true,
      url_noticia: 'hola2'
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listNews();
  }, []);

  const listNews = () => {
    const mensajeError = "no hay noticias";
    peticionGet(urlService, mensajeError)
      .then((data) => {
        if (data) {
          setNews(Array.from(data));
        }
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  /*Estructura de la noticia*/
  const ContentNews = ({ title, srcImg, linkPage }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="col-md-4 col-sm-6 mix mix-082e3a1 portfolio-item business-082e3a1 onepage-082e3a1 col-news-user">
        <span className="span-img" style={{ backgrounColor: "black" }}>
          <a
            className="vinculo-noticia"
            href={linkPage}
            target="_blank"
            rel="noreferrer"
            onMouseOut={() => setOpen(false)}
          >
            <Fade open={!open}>
                <img src={srcImg} alt="Switch Pro" onMouseEnter={()=>setOpen(true)} onMouseOut={()=>setOpen(false)}/>
            </Fade>
            <Fade open={open}>
                <h4 className='titulo-noticia' onMouseOver={()=>setOpen(true)}>{title}</h4>
            </Fade>
          </a>
        </span>
      </div>
    );
  };

  /*Formar y llenar Array de noticias listas para ser mostradas*/
  const ShowNews = () => {
    if (news.length === 0)
      return <NotAvalaible>No hay noticias disponibles</NotAvalaible>;

    let newsRender = [];
    news.filter((value2) => value2.visible).forEach((valueNew, index) => {
      newsRender.push(
        <ContentNews 
          key={index + 1}
          title={valueNew.titulo_noticia}
          // srcImg={urlService + "img/" + valueNew.link_contenido}
          srcImg={valueNew.link_contenido}
          linkPage={valueNew.url_noticia}
        />
      );
    });

    return newsRender;
  };

  return (
    <MainPages>
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-bdd763f elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="bdd763f"
        data-element_type="section"
      >
        <div
          id="shape-top"
          className="elementor-shape elementor-shape-top"
          data-negative="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <path
              className="elementor-shape-fill"
              d="M0,0v3c0,0,393.8,0,483.4,0c9.2,0,16.6,7.4,16.6,16.6c0-9.1,7.4-16.6,16.6-16.6C606.2,3,1000,3,1000,3V0H0z"
            ></path>
          </svg>
        </div>
        <div className="elementor-container elementor-column-gap-default">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b43338a"
            data-id="b43338a"
            data-element_type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              <div
                className="elementor-element elementor-element-3cfed6b elementor-widget elementor-widget-heading"
                data-id="3cfed6b"
                data-element_type="widget"
                data-widget_type="heading.default"
              >
                <div className="elementor-widget-container">
                  <h1 className="elementor-heading-title elementor-size-default">
                    Sección de noticias
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="shape-bottom"
          className="elementor-shape elementor-shape-bottom"
          data-negative="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <path
              className="elementor-shape-fill"
              d="M0,0v3c0,0,393.8,0,483.4,0c9.2,0,16.6,7.4,16.6,16.6c0-9.1,7.4-16.6,16.6-16.6C606.2,3,1000,3,1000,3V0H0z"
            ></path>
          </svg>
        </div>
      </section>
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-1a63a0d elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="1a63a0d"
        data-element_type="section"
        data-settings='{"background_background":"classic"}'
      >
        {isLoading ? (
          <div className="elementor-container-loader">
            <Loader />
          </div>
        ) : (
          <div className="elementor-container elementor-column-gap-default">
            <div
              className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-55e9d7d"
              data-id="55e9d7d"
              data-element_type="column"
            >
              <div className="elementor-widget-wrap elementor-element-populated">
                <div
                  className="elementor-element elementor-element-082e3a1 elementor-widget elementor-widget-widgetkit-for-elementor-portfolio"
                  data-id="082e3a1"
                  data-element_type="widget"
                  data-widget_type="widgetkit-for-elementor-portfolio.default"
                >
                  <div className="elementor-widget-container">
                    <div className="tgx-portfolio">
                      <div id="hover-1" className="hover-1">
                        <div id="news" className="row">
                          <ShowNews />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="news-separator"></div>
    </MainPages>
  );
};

export default Noticias;
