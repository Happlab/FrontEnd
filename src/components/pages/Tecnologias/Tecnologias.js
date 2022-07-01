import React from 'react'
import './Tecnologias.css'
import Footer from '../../navegation/footer/Footer'
import Navbar1 from '../../navegation/navbar/Navbar1'
import imagenes from '../../../assets/imagenes'

const Tecnologias = () => {
  return (
    <div className='main'>
        <Navbar1/>
        <hr/>
        <h2 className='title-standar'>Tecnologias</h2>
        <p className='text-standar'>  Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.</p>
        <hr/>
        <div className='row-cont'>
            <div className='col-text'>
                <h2> Teconologia 1</h2>
                <p className='text-lore'>
                    Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                </p>
            </div>
            <div className='col-img'>
                 <img 
                    src = {imagenes.imgTec1} alt="" width={500} height={400}
                  />
             </div>
        </div>
        <hr/>
        <div className='row-cont-left'>
        <div className='col-img'>
                 <img 
                    src = {imagenes.imgTec2} alt="" width={500} height={500}
                  />
             </div>
            <div className='col-text'>
            <h2> Teconologia 2</h2>
                <p className='text-lore'>
                    Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                </p>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Tecnologias