import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from '../../../assets/icons/Icons';
import LogoU from "../../../../src/assets/images/logo2.png"; 
import imagenes from '../../../assets/images/imagenes';
import "./Footer.css";

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
                        <FacebookIcon className="icons-social-media" onClick={redireccionF} />
                        <TwitterIcon className="icons-social-media" onClick={redireccionT} />
                        <InstagramIcon className="icons-social-media" onClick={redireccionI}/>
                        <LinkedinIcon className="icons-social-media" onClick={redireccionL} />
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
