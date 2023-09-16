import MainPages from "../../wrappers/mainpages/MainPages";
import imagenes from "../../../assets/images/imagenes";
import "./SobreNosotros.scss";

const SobreNosotros = () => {
  const getAddStylesElements = () => {
    let goUp = document.getElementByClassName("go-up");
    goUp.addEventListener("click", () => {
      goUp.animate({ scrollTop: "0px" }, 300);
    });
    window.addEventListener("scroll", () => {
      if (window.scrollTop > 0) {
        goUp.style.height = 300 + "px";
      } else {
        goUp.style.height = 0 + "px";
      }
    });
  };

  return (
    <MainPages>
      <span
        className="fa-solid fa-angle-up go-up"
        onLoad={getAddStylesElements}
      ></span>
      <header id="start" className="header">
        <div className="content head">
          <h1 className="title-about">Convert yours dreams in reality</h1>
          <p className="copy">
            Adipisicing maiores ab doloremque dolor cupiditate. Expedita!
          </p>
        </div>
      </header>
      <main>
        <section className="content" id="services">
          <h2 className="subtitle">Nuestros Proyectos</h2>
          <div className="content-service">
            <img src={imagenes.imgGico} alt="" />
            <div className="checklist-service">
              <div className="service">
                <h3 className="n-service">
                  <span className="number">1</span>Cohetiria
                </h3>
                Construccion de un cohete con combustible solido
              </div>
              <div className="service">
                <h3 className="n-service">
                  <span className="number">2</span>Astronautas Analogos
                </h3>
                Diseño y fabricacion de un Rovert para agronomia
              </div>
              <div className="service">
                <h3 className="n-service">
                  <span className="number">3</span>Aess
                </h3>
                Diseño y fabricacion de Alas Zaji
              </div>
            </div>
          </div>
        </section>
        <section id="portfolio" className="gallery">
          <div className="content">
            <h2 className="subtitle">Galería</h2>
            <div className="content-gallery">
              <img className="img-gallery" src={imagenes.imgTec1} alt="" />
              <img className="img-gallery" src={imagenes.imgTec2} alt="" />
              <img className="img-gallery" src={imagenes.imgTec3} alt="" />
              <img className="img-gallery" src={imagenes.imgTec4} alt="" />
              <img className="img-gallery" src={imagenes.imgTec5} alt="" />
              <img className="img-gallery" src={imagenes.imgTec6} alt="" />
            </div>
          </div>
        </section>
        <section id="xpert" className="content">
          <h2 className="subtitle">Quienes nos ayudan:</h2>
          <section className="xpert">
            <div className="cont-xpert">
              <img src={imagenes.imgAESS} alt="" />
              <h3 className="n-xpert">Analytics</h3>
            </div>
            <div className="cont-xpert">
              <img src={imagenes.img1} alt="" />
              <h3 className="n-xpert">Security</h3>
            </div>
          </section>
        </section>
      </main>
    </MainPages>
  );
};

export default SobreNosotros;
