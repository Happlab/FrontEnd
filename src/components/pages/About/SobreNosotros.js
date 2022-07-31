import React from "react";
import imagenes from "../../../assets/imagenes";
import Footer from "../../navegation/footer/Footer";
import Navbar1 from "../../navegation/navbar/Navbar1";
import "./SobreNosotros.scss";

class SobreNosotros extends React.Component {
  constructor(props) {
    super(props);
    this.getAddStylesElements = this.getAddStylesElements.bind(this);
  }

  getAddStylesElements() {
    let items = document.getElementsByClassName("content-about-info");
    for(let i = 0; i < items.length; i++) {
      let title = items[i].getElementsByTagName("h4");
      let body = items[i].getElementsByClassName("content-about-body");
      let parrafo = body[0].getElementsByTagName("p");
      let img = body[0].getElementsByTagName("img");
      if((i + 1) % 2 === 0) {
        title[0].classList.remove("content-about-title");
        title[0].classList.add("content-about-title-right");
        body[0].insertBefore(img[0], parrafo[0]);
        body[0].classList.add("content-about-body-right");
        body[0].classList.remove("content-about-body");
      }
      if((i+1) % 3 === 0) {
        body[0].insertBefore(img[0], parrafo[0]);
        body[0].insertBefore(img[1], parrafo[0]);
        title[0].classList.remove("content-about-title");
        title[0].classList.add("content-about-title-center");
        body[0].classList.add("content-about-body-center");
        body[0].classList.remove("content-about-body");
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar1 />
        <div className="content-about" onLoad={this.getAddStylesElements}>
          <div className="content-about-info">
            <h4 className="content-about-title">Que ha pasao?</h4>
            <div className="content-about-body">
              <p>
              <div>Ipsum rerum nisi impedit vero perferendis modi Architecto id repudiandae consequatur voluptatem eos. perferendis modi Architecto id repudiandae consequatur voluptatem eos</div>
              </p>
              <img src={imagenes.img1} />
            </div>
          </div>
          <div className="content-about-info">
            <h4 className="content-about-title">Que ha pasao?</h4>
            <div className="content-about-body">
              <p>
              <div>Ipsum rerum nisi impedit vero perferendis modi Architecto id repudiandae consequatur voluptatem eos. perferendis modi Architecto id repudiandae consequatur voluptatem eos</div>
              </p>
              <img src={imagenes.img1} />
            </div>
          </div>
          <div className="content-about-info">
            <h4 className="content-about-title">Que ha pasao?</h4>
            <div className="content-about-body">
              <p>
              <div>Ipsum rerum nisi impedit vero perferendis modi Architecto id repudiandae consequatur voluptatem eos. perferendis modi Architecto id repudiandae consequatur voluptatem eos</div>
              </p>
              <img src={imagenes.img1} />
              <img src={imagenes.img1} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SobreNosotros;
