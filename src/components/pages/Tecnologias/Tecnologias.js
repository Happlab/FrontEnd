import React from 'react'
import './Tecnologia.scss'
import Footer from '../../navegation/footer/Footer'
import { Navbar } from '../../navegation/navbar/Navbar';
import imagenes from '../../../assets/imagenes'

const Tecnologias = () => {
  return (
    <div className='main'>
        <Navbar/>
        <hr/>
        <h2 className='title-standar'>Tecnologias</h2>
        <p className='text-standar'>  Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.</p>
        <hr/>
        <div className='columna-tecno'>
            <div className='columna-tecno-text'>
                <h2> Teconologia 1</h2>
                <p className='text-tecno'>
                    Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                </p>
            </div>
            <div className='columna-tecno-img'>
                 <img 
                    src = {imagenes.imgTec1} alt="" width={500} height={400}
                  />
             </div>
        </div>
        <hr/>
        <div className='columna-tecno-2'>
            <div className='columna-tecno-img-2'>
                 <img 
                    src = {imagenes.imgTec2} alt="" width={500} height={500}
                  />
             </div>
             <div className='columna-tecno-text-2'>
             <h2> Teconologia 2</h2>
                <p className='text-lore'>
                    Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                </p>
             </div>
        </div>
        <hr/>
        <Footer/>
    </div>
  )
}

export default Tecnologias
