import React from "react";
import imagenes from "../../../assets/imagenes";
import Footer from "../../navegation/footer/Footer";
import { Navbar } from '../../navegation/navbar/Navbar';
import "./SobreNosotros.scss";

class SobreNosotros extends React.Component {
  constructor(props) {
    super(props);
    this.getAddStylesElements = this.getAddStylesElements.bind(this);
  }

  getAddStylesElements() {
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
  }

  render() {
    return (
      <div>
        <Navbar />
        <span
          class="fa-solid fa-angle-up go-up"
          onLoad={this.getAddStylesElements}
        ></span>
        <header id="start" class="header">
          <div class="content head">
            <h1 class="title-about">Convert yours dreams in reality</h1>
            <p class="copy">
              Adipisicing maiores ab doloremque dolor cupiditate. Expedita!
            </p>
          </div>
        </header>
        <main>
          <section class="content" id="services">
            <h2 class="subtitle">Nuestros Proyectos</h2>
            <div class="content-service">
              <img src={imagenes.imgGico} alt="" />
              <div class="checklist-service">
                <div class="service">
                  <h3 class="n-service">
                    <span class="number">1</span>Cohetiria
                  </h3>
                  Construccion de un cohete con combustible solido
                </div>
                <div class="service">
                  <h3 class="n-service">
                    <span class="number">2</span>Astronautas Analogos
                  </h3>
                  Diseño y fabricacion de un Rovert para agronomia
                </div>
                <div class="service">
                  <h3 class="n-service">
                    <span class="number">3</span>Aess
                  </h3>
                  Diseño y fabricacion de Alas Zaji
                </div>
              </div>
            </div>
          </section>
          <section id="portfolio" class="gallery">
            <div class="content">
              <h2 class="subtitle">Galería</h2>
              <div class="content-gallery">
                <img class="img-gallery" src={imagenes.imgTec1} alt="" />
                <img class="img-gallery" src={imagenes.imgTec2} alt="" />
                <img class="img-gallery" src={imagenes.imgTec3} alt="" />
                <img class="img-gallery" src={imagenes.imgTec4} alt="" />
                <img class="img-gallery" src={imagenes.imgTec5} alt="" />
                <img class="img-gallery" src={imagenes.imgTec6} alt="" />
              </div>
            </div>
          </section>
          <section id="xpert" class="content">
            <h2 class="subtitle">Quienes nos ayudan:</h2>
            <section class="xpert">
              <div class="cont-xpert">
                <img src={imagenes.imgAESS} alt="" />
                <h3 class="n-xpert">Analytics</h3>
              </div>
              <div class="cont-xpert">
                <img src={imagenes.img1} alt="" />
                <h3 class="n-xpert">Security</h3>
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default SobreNosotros;
