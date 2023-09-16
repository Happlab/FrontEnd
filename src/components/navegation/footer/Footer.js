import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import LogoU from "../../../../src/assets/images/logo2.png"; 
import imagenes from '../../../assets/images/imagenes';
import "./_Footer.scss";

let showUrl = (url) => window.open(url);

let redireccionF = () => showUrl('https://www.facebook.com/AInteligentePop');

let redireccionT = () => showUrl('https://twitter.com/jorgeadrianmu');

let redireccionI = () => showUrl('https://www.instagram.com/explore/tags/happlab/?hl=es');

let redireccionL = () => showUrl('https://www.linkedin.com/company/happlabs/about/');

let redireccionUni = () => showUrl('http://www.unicauca.edu.co/versionP/');

let redireccionGico = ()=> showUrl('https://www.unicauca.edu.co/gico/');

const Footer = () => {  
    return (
        <div className='footer-main'>
            <div className='without-credits'>
                <div className='columnas'>
                    {/* Redes sociales */}
                    <div className='pos1'>
                        <h4>¡Aqui puedes encontar nuestras redes sociales!</h4>
                        <FontAwesomeIcon className="icons" icon={faFacebookSquare} size='3x' onClick={redireccionF} fixedWidth/>
                        <FontAwesomeIcon className="icons" icon={faTwitter} size='3x' onClick={redireccionT} fixedWidth />
                        <FontAwesomeIcon className="icons" icon={faInstagram} size='3x' onClick={redireccionI} fixedWidth />
                        <FontAwesomeIcon className="icons" icon={faLinkedin} size='3x' onClick={redireccionL} fixedWidth />
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
