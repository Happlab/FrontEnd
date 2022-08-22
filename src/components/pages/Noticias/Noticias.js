import React, {useState} from 'react';
import { Navbar } from '../../navegation/navbar/Navbar';
import Footer from '../../navegation/footer/Footer';
import './Noticias.scss';
import { Fade } from 'react-bootstrap';
import { PeticionGet } from '../Admin/PeticionesAdmin.js';

class Noticias extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayNoticias: [],
            cambioEnNoticias: false
        };
        this.handleClick=this.handleCambioEnNoticias.bind(this);
    }

    urlServicio='http://localhost:8080/noticia/';
    componentDidMount(){
        this.ListarNoticias();
    }
    ListarNoticias(){
        const url=this.urlServicio;
        const mensajeError='no hay noticias';
        const datos=PeticionGet(url, mensajeError);
        datos.then(data =>{
            if(data!==null){
                this.setState({arrayNoticias: Array.from(data)});
            }
        });
    }
    handleCambioEnNoticias(){
       this.setState(()=>({cantidadNoticias:true}));
    }
    
    render(){
        /*Estructura de la noticia*/
        const ContenidoNoticias=(props)=>{
            const [open,setOpen]=useState(false);
            return(
            <div className="col-md-4 col-sm-6 mix mix-082e3a1 portfolio-item business-082e3a1 onepage-082e3a1" >
                <span className='span-img' style={{backgrounColor:'black'}}>
                    <a className='vinculo-noticia' href={props.LinkPage} target="_blank" rel="noreferrer" onMouseOut={()=>setOpen(false)}>
                    <Fade in={!open}>
                        <img src={props.srcImg} alt="Switch Pro" onMouseEnter={()=>setOpen(true)} onMouseOut={()=>setOpen(false)}/>
                    </Fade>
                    <Fade in={open} className='titulo-noticia' onMouseOver={()=>setOpen(true)}>
                        <h4>{props.titulo}</h4> 
                    </Fade>
                    </a>  
                </span>
            </div>
            );
        }
        /*Formar y llenar Array de noticias listas para ser mostradas*/
        const MostrarNoticias=()=>{
            const arrayContendor=[];
            for (let i = 0; i < this.state.arrayNoticias.length; i++) {
                if(this.state.arrayNoticias[i].visible){
                arrayContendor.push(
                        <ContenidoNoticias 
                            titulo={this.state.arrayNoticias[i].titulo_noticia}
                            srcImg={this.urlServicio+'img/'+this.state.arrayNoticias[i].link_contenido}
                            LinkPage={this.state.arrayNoticias[i].url_noticia}
                        />
                    )
                }
            }
            return(
                arrayContendor 
            );
        }

    return(
    <div className='main-noticias'>
        <Navbar />
        <section  className="elementor-section elementor-top-section elementor-element elementor-element-bdd763f elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="bdd763f" data-element_type="section">
			<div id='shape-top' className="elementor-shape elementor-shape-top" data-negative="false">
			    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 20" preserveAspectRatio="none">
	                <path className="elementor-shape-fill" d="M0,0v3c0,0,393.8,0,483.4,0c9.2,0,16.6,7.4,16.6,16.6c0-9.1,7.4-16.6,16.6-16.6C606.2,3,1000,3,1000,3V0H0z"></path>
                </svg>		
            </div>
            <div className="elementor-container elementor-column-gap-default">
				<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-b43338a" data-id="b43338a" data-element_type="column">
			        <div className="elementor-widget-wrap elementor-element-populated">
				        <div className="elementor-element elementor-element-3cfed6b elementor-widget elementor-widget-heading" data-id="3cfed6b" data-element_type="widget" data-widget_type="heading.default">
				            <div className="elementor-widget-container">
			                    <h1 className="elementor-heading-title elementor-size-default">Sección de noticias</h1>
                            </div>
			            </div>
				    </div>
		        </div>
			</div>
			<div id='shape-bottom' className="elementor-shape elementor-shape-bottom" data-negative="false">
			    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 20" preserveAspectRatio="none">
	                <path className="elementor-shape-fill" d="M0,0v3c0,0,393.8,0,483.4,0c9.2,0,16.6,7.4,16.6,16.6c0-9.1,7.4-16.6,16.6-16.6C606.2,3,1000,3,1000,3V0H0z"></path>
                </svg>		
            </div>
		</section>  
        <section className="elementor-section elementor-top-section elementor-element elementor-element-1a63a0d elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="1a63a0d" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
			<div className="elementor-container elementor-column-gap-default">
				<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-55e9d7d" data-id="55e9d7d" data-element_type="column">
			        <div className="elementor-widget-wrap elementor-element-populated">
						<div className="elementor-element elementor-element-082e3a1 elementor-widget elementor-widget-widgetkit-for-elementor-portfolio" data-id="082e3a1" data-element_type="widget" data-widget_type="widgetkit-for-elementor-portfolio.default">
				            <div className="elementor-widget-container">
			                    <div className="tgx-portfolio">
                                    <div id="hover-1" className="hover-1">
                                        <div id='news' className="row">
                                            <MostrarNoticias/>
                                        </div>
                                    </div>
                                </div>		
                            </div>
                         
				        </div>
					</div>
		        </div>
			</div>
		</section>
        <Footer />
    </div>
    )};
}


export default Noticias
