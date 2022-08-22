import React from 'react';
import Footer from '../navegation/footer/Footer';
import './About.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from 'react-rating';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { Navbar } from '../navegation/navbar/Navbar';
import Slider from "react-slick";;

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

function handleClick() {
  alert('Hello!');
} 

const About = () => {
  return (
    <div>
        <Navbar/>
        <Slider className='carrusel-cards' {...settings}>
      <div>
      <Card className='card-change' onClick={handleClick} style={{ cursor: "pointer" }}>
        <CardBody>
          <CardTitle className='title-card'>Contenido 1</CardTitle>
          <CardText className='subtittle-card'>Usuario 1</CardText>
          <CardText className='stars-card'><Rating initialRating={2.5} fractions={2} readonly emptySymbol="far fa-star fa-2x"
          fullSymbol="fas fa-star fa-2x" /></CardText>
          <CardText className='content-card'>Resumen del contenido educativo</CardText>
          <CardText className='content-card'> #Etiqueta1 #Etiqueta2</CardText>
        </CardBody>
      </Card>
      </div>
      <div>
      <Card onClick={handleClick} style={{ cursor: "pointer" }}>
        <CardBody>
          <CardTitle className='title-card'>Contenido 2</CardTitle>
          <CardText className='subtittle-card'>Usuario 2</CardText>
          <CardText className='stars-card'><Rating initialRating={3.5} fractions={2} readonly emptySymbol="far fa-star fa-2x"
          fullSymbol="fas fa-star fa-2x" /></CardText>
          <CardText className='content-card'>Resumen del contenido educativo</CardText>
          <CardText className='content-card'> #Etiqueta1 #Etiqueta2</CardText>
        </CardBody>
      </Card>
      </div>
      <div>
      <Card onClick={handleClick} style={{ cursor: "pointer" }}>
        <CardBody>This is a clickable card.</CardBody>
      </Card>
      </div>
      <div>
      <Rating
          emptySymbol="far fa-star fa-2x"
          fullSymbol="fas fa-star fa-2x"
          showInactive={false}
        />
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
      <Card>
        <CardBody>
          <CardTitle className='title-card'>Contenido 6</CardTitle>
          <CardText className='subtittle-card'>Usuario 6</CardText>
          <CardText className='stars-card'><Rating initialRating={4} onChange={e => console.log(e)} /></CardText>
          <CardText className='content-card'>Resumen del contenido educativo</CardText>
          <CardText className='content-card'> #Etiqueta1 #Etiqueta2</CardText>
          <Button>Mostrar mas</Button>
        </CardBody>
      </Card>
      </div>
    </Slider>
    <hr/>
    <Row xs={3}>
            {[...Array(11)].map((e, i) => {
                return (
                  <Col>
                      <Card>
                          <CardBody>
                              <CardTitle tag="h5">Card title #{i+1}</CardTitle>
                              <CardText>Some quick example text to build on the card title and make up the bulk of the
                                  card's
                                  content.</CardText>
                              <Button>Button</Button>
                          </CardBody>
                      </Card>
                  </Col>
                )
            })}
            </Row>
    <Footer/>
    </div>
  )
}

export default About
