import React from 'react'
import Footer from '../../navegation/footer/Footer'
import Navbar1 from '../../navegation/navbar/Navbar1'
import ReactPlayer from 'react-player'
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import './Acerca.scss'
const position = [2.4419732373785012, -76.60481317573857]

const Acerca = () => {
    return (
        <div className='main'>
            <Navbar1/>
                <hr/>
                <h2 className='titulo-estandar'>Bienvenido a HappLab</h2> 
                    <div className='columna-acerca'>
                        <div className='columna-acerca-text'>
                            <p className='text-lore'>
                            Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.Lorem fistrum por la gloria de mi madre esse jarl aliqua llevame al sircoo. De la pradera ullamco qué dise usteer está la cosa muy malar.
                            </p>
                        </div>
                        <div className='columna-acerca-video'>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=N029UUlH1Dc'
                            width='100%'
                            height='100%'
                            controls
                            loop
                            />
                        </div>
                    </div>
                <h2 className='title-map'>¿Donde nos encuentras?</h2>
                <div className='row-map'>
                        <div className='col-map'>
                            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                            integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                            crossorigin=""/>
                            <MapContainer center={position} zoom={25} scrollWheelZoom={false}>
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[2.4419732373785012, -76.60481317573857]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                <Popup>
                                    Claustro De Santo Domingo
                                </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                        <div className='col-text'>
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
export default Acerca