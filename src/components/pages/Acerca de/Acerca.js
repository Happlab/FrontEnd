import React from 'react'
import Footer from '../../navegation/footer/Footer'
import Navbar1 from '../../navegation/navbar/Navbar1'
import ReactPlayer from 'react-player'
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet'
import './Acerca.css'
const position = [2.4419732373785012, -76.60481317573857]

const Acerca = () => {
    return (
        <div className='main'>
            <Navbar1/>
            <div className='Container-main'>
                <hr className='hr-line-white'/>
                <h2 className='title-standar'>Bienvenido a HappLab</h2>
                <hr className='hr-line-white'/>   
                    <div className='row-contend'>
                        <div className='col-text'>
                            <p className='text-lore'>
                            Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                            Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.                            
                            </p>
                        </div>
                        <div className='col-video'>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=N029UUlH1Dc'
                            width='100%'
                            height='100%'
                            controls
                            loop
                            />

                        </div>
                    </div>
                    <hr className='hr-line-white'/>
                <h2 className='title-map'>¿Donde nos encuentras?</h2>
                <hr className='hr-line-white'/> 
            </div>
            <div className='container-map'>
                <div className='row-map'>
                        <div className='col-map'>
                        <MapContainer center={position} zoom={25} scrollWheelZoom={false}>
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                            <Popup>
                                Claustro De Santo Domingo
                            </Popup>
                            </Marker>
                        </MapContainer>
                        </div>
                        <div className='col-text'>
                        <p className='text-lore'>
                        Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                        Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                        
                        </p>
                        </div>
                    </div>
                </div>
                <hr/>
            <Footer/>
        </div>
    )
}
export default Acerca