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
    let goUp = document.getElementByClassName("go-up");
    goUp.addEventListener('click', () => {
      goUp.animate({ scrollTop: '0px' }, 300);
    });
    window.addEventListener('scroll', () => {
      if(window.scrollTop > 0) {
        goUp.style.height = 300+"px";
      } else {
        goUp.style.height = 0+"px";
      }
    })
    // let items = document.getElementsByClassName("content-about-info");
    // for(let i = 0; i < items.length; i++) {
    //   let title = items[i].getElementsByTagName("h4");
    //   let body = items[i].getElementsByClassName("content-about-body");
    //   let parrafo = body[0].getElementsByTagName("p");
    //   let img = body[0].getElementsByTagName("img");
    //   if((i + 1) % 2 === 0) {
    //     title[0].classList.remove("content-about-title");
    //     title[0].classList.add("content-about-title-right");
    //     body[0].insertBefore(img[0], parrafo[0]);
    //     body[0].classList.add("content-about-body-right");
    //     body[0].classList.remove("content-about-body");
    //   }
    //   if((i+1) % 3 === 0) {
    //     body[0].insertBefore(img[0], parrafo[0]);
    //     body[0].insertBefore(img[1], parrafo[0]);
    //     title[0].classList.remove("content-about-title");
    //     title[0].classList.add("content-about-title-center");
    //     body[0].classList.add("content-about-body-center");
    //     body[0].classList.remove("content-about-body");
    //   }
    // }
  }

  render() {
    return (
      <div>
        <Navbar1 />
        <span class="fa-solid fa-angle-up go-up" onLoad={this.getAddStylesElements}></span>
        <header id="start" class="header">
        <div class="content head">
			<h1 class="title-about">Convert yours dreams in reality</h1>
			<p class="copy">Adipisicing maiores ab doloremque dolor cupiditate. Expedita!</p>
		</div>
        </header>
        <main>
		<section class="content" id="services">
			<h2 class="subtitle">We container</h2>
			<div class="content-service">
				<img src={imagenes.imgGico} alt="" />
				<div class="checklist-service">
					<div class="service">
						<h3 class="n-service"><span class="number">1</span>Design Web</h3>
						Lorem officia atque labore corrupti tempore! Aperiam dignissimos itaque accusantium soluta nisi iste. Error laudantium doloribus mollitia molestias eveniet possimus?
					</div>
					<div class="service">
						<h3 class="n-service"><span class="number">2</span>Design Web</h3>
						Lorem officia atque labore corrupti tempore! Aperiam dignissimos itaque accusantium soluta nisi iste. Error laudantium doloribus mollitia molestias eveniet possimus?
					</div>
					<div class="service">
						<h3 class="n-service"><span class="number">3</span>Design Web</h3>
						Lorem officia atque labore corrupti tempore! Aperiam dignissimos itaque accusantium soluta nisi iste. Error laudantium doloribus mollitia molestias eveniet possimus?
					</div>
				</div>
			</div>	
		</section>
		<section id="portfolio" class="gallery">
			<div class="content">
				<h2 class="subtitle">Gallery</h2>
				<div class="content-gallery">
					<img class="img-gallery" src={imagenes.imgTec1} alt="" />
					<img class="img-gallery" src={imagenes.imgTec2} alt="" />
					<img class="img-gallery" src={imagenes.imgTec1} alt="" />
					<img class="img-gallery" src={imagenes.imgTec2} alt="" />
					<img class="img-gallery" src={imagenes.imgTec1} alt="" />
					<img class="img-gallery" src={imagenes.imgTec2} alt="" />
				</div>
			</div>
		</section>
		<section id="xpert" class="content">
			<h2 class="subtitle">Experts in:</h2>
			<section class="xpert">
				<div class="cont-xpert">
					<img src={imagenes.imgSam} alt="" />
					<h3 class="n-xpert">SEO</h3>
				</div>
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
        {/*
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
        </div> */}
        <Footer />
      </div>
    )
  }
}

export default SobreNosotros;
