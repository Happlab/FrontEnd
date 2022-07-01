import React from 'react'
import './Footer.scss';
import LogoU from "../../../../src/assets/images/logo2.png"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {  
    return (
        <div className='footer-main'>
            <div className='without-credits'>
                <div className='columnas'>
                    {/* Redes sociales */}
                    <div className='pos1'>
                        <h4>¡Aqui puedes encontar nuestras redes sociales!</h4>
                        <FontAwesomeIcon icon={faFacebookSquare} size='2x' fixedWidth/>
                        <FontAwesomeIcon icon={faTwitter} size='2x'fixedWidth />
                        <FontAwesomeIcon icon={faInstagram} size='2x' fixedWidth />
                        <FontAwesomeIcon icon={faLinkedin} size='2x' fixedWidth />
                    </div>
                    {/* Escudo */}
                    <div className='pos2'>
                        <img 
                        src = {LogoU} alt="" width={150} height={220}
                        />
                    </div>
                    {/* Contactenos */}
                    <div className='pos3'>
                        <h3>Escribenos tu correo, nosotros te contactamos!</h3>
                        <form>
                            <label>
                                <input type="email" name="name" />
                            </label>
                            <input className='emailbtn'icon='' type="button" value="Enviar" />
                        </form>
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
