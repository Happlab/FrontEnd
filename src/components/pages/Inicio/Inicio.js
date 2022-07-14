import React from 'react'
import './Inicio.scss'
import imagenes from '../../../assets/imagenes'
import ReactPlayer from 'react-player'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'
import { Carousel } from 'react-bootstrap'

const Inicio = () => {
  return (
    <div className='main-inicio'>
      <Navbar1 />
            <div className='container-inicio'>
              <hr/>
              <h3 className='title-h2'>Destacados de la semana</h3>
              <hr className='hr-line-white'/>       
              </div>
              <div className='content-video'>
              <div className='columna-inicio'>
                  <h3 className='title-dest'>Contenido destacado 1</h3>
                  <div className='columna-inicio-texto'>
                    <p className='text-lore'>
                      Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.                      
                   </p>
                  </div>
                  <div className='columna-inicio-video'>
                    <ReactPlayer
                      url='https://www.youtube.com/watch?v=N029UUlH1Dc'
                      width='100%'
                      height='100%'
                      controls
                        loop
                      />
                  </div>
                </div> 
            </div>
            <hr className='hr-line-white'/>  
            <div className='content-video'>
              <div className='columna-inicio'>
                  <h3 className='title-dest'>Contenido destacado 2</h3>
                  <div className='columna-inicio-texto'>
                    <p className='text-lore'>
                      Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.                      
                   </p>
                  </div>
                  <div className='columna-inicio-video'>
                    <ReactPlayer
                      url='https://www.youtube.com/watch?v=N029UUlH1Dc'
                      width='100%'
                      height='100%'
                      controls
                        loop
                      />
                  </div>
                </div> 
            </div>
            <hr className='hr-line-white'/>  
          <div className='carousel'>
            <Carousel fade variant="dark" indicators={false}>
              <Carousel.Item interval={1000}>
                <img
                  className="images-carousel"
                  src= {imagenes.imgUni} width={400} height={150}
                  alt="First slide" 
                />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="images-carousel"
                  src= {imagenes.imgSam} width={400} height={150}
                  alt="Second slide"
                />

              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="images-carousel"
                  src={imagenes.imgAESS} width={400} height={150}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
            <hr/>
            <Footer/>
    </div>
  )
}
export default Inicio