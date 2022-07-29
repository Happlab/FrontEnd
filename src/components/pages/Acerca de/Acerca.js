import React from 'react'
import Footer from '../../navegation/footer/Footer'
import Navbar1 from '../../navegation/navbar/Navbar1'
import ReactPlayer from 'react-player'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import './Acerca.scss'
import { PeticionGet } from '../Admin/PeticionesAdmin'

//const position = [2.4419732373785012, -76.60481317573857]

class Acerca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acerca: []
        };
    }

    urlServicio = 'https://api-happlab.herokuapp.com/seccion/';

    componentDidMount() {
        this.listarAcerca();
    }

    listarAcerca() {
        const url = 'https://api-happlab.herokuapp.com/seccion/';
        const mensajeError = 'No hay informacion de inicio';
        const datos = PeticionGet(url, mensajeError);
        datos.then(data => {
            if (data !== null) {
                this.setState({
                    acerca: Array.from(data)
                });
            }
        });
    }

    render() {
        return (
            <div className='main'>
                <Navbar1 />
                <hr />
                <h2 className='titulo-estandar'>Bienvenido a HappLab</h2>
                {[...Array(this.state.acerca.length)].map((e, i) => {
                    if (i === 2) {
                        return (
                            <div className='columna-acerca'>
                                <div className='columna-acerca-text'>
                                    <p className='text-lore'>
                                        {this.state.acerca[i].descripcion}
                                    </p>
                                </div>
                                <div className='columna-acerca-video'>
                                    {this.state.acerca[i].url !== '' ? <ReactPlayer url={this.state.acerca[i].url} width='100%' height='100%' controls loop />
                                        : <img style={{ width: '100%' }} className="images-carousel"
                                            src={this.urlServicio + "contenido/" + this.state.acerca[i].nombre_contenido} width={400} height={150} alt="Third slide" />}
                                </div>
                            </div>
                        )
                    }
                })}
                <h2 className='title-map'>¿Dónde nos encuentras?</h2>
                {[...Array(this.state.acerca.length)].map((e, i) => {
                    const position = [this.state.acerca[i].coordenadas[0], this.state.acerca[i].coordenadas[1]]
                    if (i === 3) {
                        return (
                            <div className='row-map'>
                                <div className='col-map'>
                                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                                        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                                        crossorigin="" />
                                    <MapContainer center={position} zoom={25} scrollWheelZoom={false}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[this.state.acerca[i].coordenadas[0], this.state.acerca[i].coordenadas[1]]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                            <Popup>
                                                Claustro De Santo Domingo
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>

                                <div className='col-text'>
                                    <p className='text-lore'>
                                        {this.state.acerca[i].descripcion}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                })}
                <hr />
                <Footer />
            </div>
        )
    }

}
export default Acerca