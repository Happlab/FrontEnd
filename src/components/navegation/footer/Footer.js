import React from 'react'
import "../colores.scss"
import LogoU from "../../../../src/assets/images/logo2.png"; 
import imagenes from '../../../assets/imagenes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const redireccionF = () => {
    window.open('https://www.facebook.com/AInteligentePop', '_blank');
  }

const redireccionT = () => {
    window.open('https://twitter.com/jorgeadrianmu', '_blank');
  }

const redireccionI = () => {
    window.open('https://www.instagram.com/explore/tags/happlab/?hl=es', '_blank');
  }

const redireccionL = () => {
    window.open('https://www.linkedin.com/company/happlabs/about/', '_blank');
  }

const redireccionUni = () => {
    window.open('http://www.unicauca.edu.co/versionP/', '_blank');
  }

const redireccionGico = () => {
    window.open('https://www.unicauca.edu.co/gico/', '_blank');
  }

const Footer = () => {  
    return (
        <div className='footer-main'>
            <div className='without-credits'>
                <div className='columnas'>
                    {/* Redes sociales */}
                    <div className='pos1'>
                        <h4>¡Aqui puedes encontar nuestras redes sociales!</h4>
                        <FontAwesomeIcon icon={faFacebookSquare} size='2x' onClick={redireccionF} style={{ cursor: "pointer" }} fixedWidth/>
                        <FontAwesomeIcon icon={faTwitter} size='2x' onClick={redireccionT} style={{ cursor: "pointer" }} fixedWidth />
                        <FontAwesomeIcon icon={faInstagram} size='2x' onClick={redireccionI} style={{ cursor: "pointer" }} fixedWidth />
                        <FontAwesomeIcon icon={faLinkedin} size='2x' onClick={redireccionL} style={{ cursor: "pointer" }} fixedWidth />
                    </div>
                    {/* Escudo */}
                    <div className='pos2'>
                        <img className='images-footer'
                        src = {LogoU} alt="" width={150} height={220}
                        onClick={redireccionUni} style={{ cursor: "pointer" }}
                        />
                    </div>
                    {/* Contactenos */}
                    <div className='pos3'>
                    <img className='images-footer'
                        src = {imagenes.imgGico} alt="" width={250} height={150}
                        onClick={redireccionGico} style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>
            </div>
            <div className='credits'>
                &copy;{new Date().getFullYear()} Prohibida su reproducción total o parcial, así como su traducción a cualquier idioma sin autorización escrita de su titular.
            </div>
     </div>
    
    )
}
export default Footer;
