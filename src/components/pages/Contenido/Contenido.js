import React from 'react'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'
import './Contenido.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload} from '@fortawesome/free-solid-svg-icons';
import {ListGroup, Button, Form} from 'react-bootstrap'
import { Card, CardText, CardBody} from 'reactstrap';
import Rating from 'react-rating'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal';
import NotificacionContenido from '../../navegation/modal_contenido/modal_contenido'
import Notificacion from '../Admin/TemplatesAdmin/modal'
import Cookies from 'universal-cookie';
import user_services from '../../services/UserServices'
import {PeticionEnvio, PeticionGet} from '../Admin/PeticionesAdmin.js'

class Contenido extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arrayContenidos:[],
            contenidosPorTag:[],
            ListarPorTag:false,
            estadoSubirContenido:false,
            posSeleccionado:0,
            estadoTrigger: false,
            logeado:false,
            contenido:{
            "titulo":"",
            "nombre":"",
            "fecha":"",
            "resumen":"",
            "tags":""
            },
            comentarios:[],
            notificacion: false,
            notificacionContenido: false,
            tituloNotificacion: "",
            mensajeNotificacion: "",
            comentario:"",
            link:"",
            email:""
        }
        this.handleClickSubirContenido=this.handleClickSubirContenido.bind(this);
        this.descarga=this.descarga.bind(this);
        this.handleClickEstadoTrue=this.handleClickEstadoTrue.bind(this);
        this.handleClickEstadoFalse=this.handleClickEstadoFalse.bind(this);
        this.CambiarRate=this.CambiarRate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.subirContenido = this.subirContenido.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.aceptar = this.aceptar.bind(this);
        this.actualizarCredito = this.actualizarCredito.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    peticion=0;
    credito=0;
    
    handleClickSubirContenido(){
        this.setState({estadoSubirContenido: !this.state.estadoSubirContenido});
    }
    handleClick(e,tags){
        const url='http://localhost:8080/contenido/buscar/'+tags;
        const mensajeError='no hay contenidos';
        const datos=PeticionGet(url, mensajeError);
        datos.then(data =>{
            if(data!==null){
                this.setState(()=>({contenidosPorTag: Array.from(data), ListarPorTag: !this.state.ListarPorTag}));
            }
        }); 
    }
    handleChange(event) {
		let name = event.target.name;
		let value = event.target.value;
		this.setState(values => ({ ...values, [name]: value }));
	}

    PeticionGet(url, mensajeError) {
        let status = 0;
        let content;
        let contenido;
        let contenidoNoPendiente=[];
        const request_options = {
            method: 'GET',
            mode: 'cors',
            ContentType: 'application/json',
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        }
        return fetch(url, request_options)
            .then(response => {
                content = response.json(); 
                status = response.status;
                return content;
            })
            .then(data => { 
                if( status === 200 && data !== "" ){
                    contenido = Array.from(data);
                    let j=0;
                    for(let i=0;i<contenido.length;i++){
                        if(!contenido[i].pendiente){
                            if(contenido[i].visible){
                                contenidoNoPendiente[j] = contenido[i];
                                j++;
                            }
                        }
                    }
                    return contenidoNoPendiente;
                    
                }else{
                    return null;
                }
            })
            .catch(error => console.log("Error", error));
    }

    listarContenido(){
        const url='http://localhost:8080/contenido/';
        const mensajeError='no hay contenidos';
        const datos=this.PeticionGet(url, mensajeError);
        datos.then(data =>{
            if(data!==null){
                this.setState({arrayContenidos: Array.from(data)});
            }
        });  
    }

    subirContenido(){
        this.peticion=1;
        let status = 0;
        var formdata = new FormData();
        formdata.append("email_autor", this.state.email);
        console.log(this.state.email);
        formdata.append("titulo", document.getElementById("idTitulo").value);
        formdata.append("archivo", document.getElementById("idFile").files[0]);
        formdata.append("resumen", document.getElementById("idResumen").value);
        formdata.append("autores", document.getElementById("idAutores").value);
        formdata.append("tags", document.getElementById("idTags").value);
        var requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: formdata,
        };
        fetch("http://localhost:8080/contenido/create", requestOptions)
        .then(response => {
            status = response.status;
        })
        .then(data =>{
            if( status === 200 && data !== "" ){
                this.setState({notificacionContenido: true, tituloNotificacion: "Contenido", mensajeNotificacion:"Contenido subido exitosamente"});
            }else{
                this.setState({notificacionContenido: true, tituloNotificacion: "Contenido", mensajeNotificacion:"No se pudo subir el contenido"});
            }
        })
    }

    actualizarCredito(){
        const peticion = "http://localhost:8080/persona/modToken/"+this.state.email+"&"+this.credito;
        const request_options = {
            method: 'PUT',
            mode: 'cors',
            ContentType: 'application/json',
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        }
        return fetch(peticion, request_options)
            .then(response => {
                console.log("Response", response)
                if (response.status === 200) {
                    console.log(this.credito);
                }
                else{
                    console.log(this.credito);
                } 
                
            })
            .catch(error => console.log("Error", error))
    }

    descarga(contenido_link){
        this.peticion=0;
        this.setState({notificacion: true, tituloNotificacion: "Descarga de contenido", mensajeNotificacion:("¿Esta seguro que desea usar un credito para descargar este contenido? Usted posee: "+ this.credito  +" Creditos para usar")});
        this.setState({link: contenido_link})
    }

    componentDidMount(){
        const url='http://localhost:8080/contenido/';
        const mensajeError='no hay contenidos';
        const datos=this.PeticionGet(url, mensajeError);
        datos.then(data =>{
            if(data!==null){
                this.setState({arrayContenidos: Array.from(data)});
            }
        });
        const cookies= new Cookies();
        const token = cookies.get('token');
        if(token){
            const usuarios = user_services.getDataToken(token)
            this.setState({email: usuarios.email,logeado: true})
            this.credito = usuarios.tokens;
        }
    }

    aceptar(){     
        if(this.peticion===0){
            window.location.href='http://localhost:8080/contenido/download/'+this.state.link;
            this.setState({link: ""})
            this.setState({notificacion: false})
            this.credito = this.credito-1;
            this.actualizarCredito();
            
        }
        else if(this.peticion === 1){
            this.setState({estadoSubirContenido: !this.state.estadoSubirContenido});
            this.setState({notificacionContenido:false})
            this.listarContenido();
        }
        else{
            this.setState({notificacionContenido: false})
            this.listarContenido();
        }
    }

    cancelar(){
        if(this.peticion===0){
            this.setState({notificacion: false});
            this.setState({link: ""})
        }
        else{
            this.setState({notificacionContenido:false})
        }
        
    }

    handleSubmit() {
        this.peticion=2;
        const comentarioUsuario = {
            "email_persona": this.state.email,
            "valoracion": this.valoracion_usuario,
            "comentario": this.state.comentario
          }
        const url = "http://localhost:8080/contenido/comentar/" + this.state.arrayContenidos[this.state.posSeleccionado].link
		const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(comentarioUsuario)
        }
        return fetch(url, requestOptions)
            .then(response => {
                console.log("Response", response)
                if (response.status === 200){
                    this.setState({notificacionContenido: true, tituloNotificacion: "Comentario", mensajeNotificacion:"Comentario subido exitosamente"});
                }
                else{
                    this.setState({notificacionContenido: true, tituloNotificacion: "Comentario", mensajeNotificacion:"No se pudo subir el comentario"});
                } 
                
            })
            .catch(error => console.log("Error", error))
	}

    handleClickEstadoTrue(posicion,arreglo,titulo,nombreAutor,fecha,resumen,tags){
        this.setState({posSeleccionado: posicion,
            estadoTrigger: true,
            comentarios: arreglo,
            titulo:titulo,
            nombre:nombreAutor,
            fecha:fecha,
            resumen:resumen,
            tag:tags
        });
        this.valoracion_usuario=0;
      }
    
      handleClickEstadoFalse(){
        this.setState({estadoTrigger: false});
      }

    CambiarRate(rate){
        this.valoracion_usuario = rate;
    }
    valoracion_usuario = 0.0;
    render(){
        const MostrarContenido=(props)=>{
            const array2=[];
            if(!this.state.estadoSubirContenido){ 
                        //aqui va el contenido
                        if(this.state.ListarPorTag){
                            for(let i=0;i<this.state.contenidosPorTag.length;i++){
                                array2[i]=
                                <div>
                                        <Col>
                                                <Card className='card-change'>
                                                    <CardBody>
                                                    <CardText className='title-card'> {this.state.contenidosPorTag[i].titulo} </CardText>
                                                    <CardText className='subtittle-card'>{this.state.contenidosPorTag[i].id_autor.nombres}</CardText>
                                                    <CardText className='stars-card'><Rating initialRating={this.state.contenidosPorTag[i].valoracion_general} readonly fractions={2}  emptySymbol="far fa-star fa-2x"
                                                    fullSymbol="fas fa-star fa-2x" /></CardText>
                                                    <CardText className='content-card'> {this.state.contenidosPorTag[i].tags} </CardText>
                                                    </CardBody>  
                                                    <Button
                                                    color="secondary"
                                                    onClick={() => this.handleClickEstadoTrue(i,
                                                        this.state.contenidosPorTag[i].comentarios,
                                                        this.state.contenidosPorTag[i].titulo,
                                                        this.state.contenidosPorTag[i].id_autor.nombres + " " +this.state.contenidosPorTag[i].id_autor.apellidos,
                                                        this.state.contenidosPorTag[i].fecha_subida,
                                                        this.state.contenidosPorTag[i].resumen,
                                                        this.state.contenidosPorTag[i].tags[0]
                                                        )}
                                                    >
                                                    Ver mas
                                                    </Button>{" "}
                                                </Card>     
                                        </Col> 
                                </div>
                          }
                        }else{
                            for(let i=0;i<this.state.arrayContenidos.length;i++){
                                array2[i]=
                                <div>
                                        <Col>
                                                <Card className='card-change'>
                                                    <CardBody>
                                                    <CardText className='title-card'> {this.state.arrayContenidos[i].titulo} </CardText>
                                                    <CardText className='subtittle-card'>{this.state.arrayContenidos[i].id_autor.nombres}</CardText>
                                                    <CardText className='stars-card'><Rating initialRating={this.state.arrayContenidos[i].valoracion_general} readonly fractions={2}  emptySymbol="far fa-star fa-2x"
                                                    fullSymbol="fas fa-star fa-2x" /></CardText>
                                                    <CardText className='content-card'> {this.state.arrayContenidos[i].tags} </CardText>
                                                    </CardBody>  
                                                    <Button
                                                    color="secondary"
                                                    onClick={() => this.handleClickEstadoTrue(i,
                                                        this.state.arrayContenidos[i].comentarios,
                                                        this.state.arrayContenidos[i].titulo,
                                                        this.state.arrayContenidos[i].id_autor.nombres + " " +this.state.arrayContenidos[i].id_autor.apellidos,
                                                        this.state.arrayContenidos[i].fecha_subida,
                                                        this.state.arrayContenidos[i].resumen,
                                                        this.state.arrayContenidos[i].tags[0]
                                                        )}
                                                    >
                                                    Ver mas
                                                    </Button>{" "}
                                                </Card>     
                                        </Col> 
                                </div>
                          }
                        }
                        
                    return(
                        array2
                    )
            }else{
                return null;
            }
            
        }   
        
        const FormularioSubirContenido=(props)=>{
            if(this.state.estadoSubirContenido){
                return(
                            <Form className='form-contenido'>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control
                                        name="titulo"
                                        placeholder="Ingresa el titulo"
                                        id="idTitulo"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seleccione el archivo</Form.Label>
                                    <Form.Control name="archivo" id="idFile" type="file" required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Resumen</Form.Label>
                                    <textarea className="form-control" id="idResumen" name='resumen' placeholder="Ingrese un resumen del material que desea subir" rows="5" required></textarea>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Autores</Form.Label>
                                    <Form.Control name="autores" type="text" id="idAutores"  placeholder="Autores que participaron en la elaboracion" required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control name='tags' type="text" id="idTags" placeholder="Ingrese los tags separados por comas" required/>
                                </Form.Group>
                                <Button onClick={()=>this.subirContenido()}>Subir</Button>
                            </Form>
                        )
            }else{
                return null;
            }
            
        }
        return(
            <div className='main-contenido'>
                <Navbar1/>
                <Notificacion show={this.state.notificacionContenido} titulo={this.state.tituloNotificacion} mensaje={this.state.mensajeNotificacion} onclick={this.aceptar}/>
                <NotificacionContenido show={this.state.notificacion} titulo={this.state.tituloNotificacion} mensaje={this.state.mensajeNotificacion} onclick={this.aceptar} cancelar={this.cancelar}/>
                <section className='titulo'>
                    <div className='contenedor-titulo'>
                        <div className='forma' data-negative='false'>
                            <svg className='forma-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                                <path className="elementor-shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
                                <path className="elementor-shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
                                <path className="elementor-shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
                                <path className="elementor-shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
                                <path className="elementor-shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
                                <path className="elementor-shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
                                <path className="elementor-shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
                                <path className="elementor-shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
                                <path className="elementor-shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
                            </svg>
                            <div className='titulo-texto'>
                                <h2 className='texto'>
                                    Contenidos Educativos
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                <hr/>
                <section className='sec-filtros'>
                    <div  className='filtros'>
                        <ListGroup as={'ul'} variant='flush' className='lista-filtros' horizontal='lg'> 
                            <ListGroup.Item as={'li'} className='item-filtro'>
                                <h2 id='texto-filtro'>Filtros</h2>
                            </ListGroup.Item>
                            <ListGroup.Item onClick={(e)=>this.handleClick(e,'matematicas')} action className='item-filtro'>Matematicas</ListGroup.Item>
                            <ListGroup.Item onClick={(e)=>this.handleClick(e,'religion')} action className='item-filtro'>Religion</ListGroup.Item>
                            <ListGroup.Item onClick={(e)=>this.handleClick(e,'ingles')} action className='item-filtro'>Ingles</ListGroup.Item>
                            <ListGroup.Item onClick={(e)=>this.handleClick(e,'sociales')} action className='item-filtro'>Sociales</ListGroup.Item>
                            <ListGroup.Item id='boton-busqueda' className='item-filtro'>
                            {this.state.logeado ? (
                            <Button  className='btn-busqueda' onClick={this.handleClickSubirContenido} variant="outline-secondary" size='md'>
                            <FontAwesomeIcon className='fa fa-upload' icon={faUpload} fixedWidth/>
                            Subir Contenido
                            </Button>
                            ) : (
                                <div /* Este es el div 2 */ className="red2" />
                            )}
                            </ListGroup.Item> 
                        </ListGroup>
                    </div>
                </section>
                <hr/>
                <section className='sec-form'>
                    <div className='formulario'>
                        <FormularioSubirContenido/>
                    </div>
                </section>
                <section>
                <Row xs={3}>
                      <MostrarContenido/>
                </Row>
                <Modal show={this.state.estadoTrigger} size="lg" aria-labelledby="example-modal-sizes-title-lg" animation={false}>
                <Modal.Title id="example-modal-sizes-title-lg" className='Modal-Title'> 
                <h3 className='titulo-Modal'>{this.state.titulo} </h3> 
                <h4 className='titulo-Modal'>Autor: {this.state.nombre}</h4>
                <h5 className='titulo-Modal'> Fecha de subida: {this.state.fecha}</h5>
                </Modal.Title>
                <Modal.Body>
                <p>{this.state.resumen}</p>
                {this.state.logeado ? (<Button variant="info" className='btn-Descarga'  onClick={()=>this.descarga(this.state.arrayContenidos[this.state.posSeleccionado].link, this.state.tokens)}>Descarga</Button>) : (<></>)}
                <p>{this.state.tag}</p>
                <Button variant="dark" className='btn-Salir'onClick={this.handleClickEstadoFalse}>
                        Salir
                    </Button>
                {this.state.logeado ? (
                    <div>
                    <p> Dejanos tu Comentario</p>
                    <p className='estrellitas'> <Rating initialRating={this.valoracion_usuario} fractions={2}  emptySymbol="far fa-star fa-2x" fullSymbol="fas fa-star fa-2x" onChange={(rate) => this.CambiarRate(rate)}/> </p>
                    <p> <input type="text" name="comentario" onChange={this.handleChange} required/> </p>
                    <Button variant="dark" className='btn-Subir'onClick={this.handleSubmit}>
                        Subir
                    </Button>

                    </div>
                ) : (
                    <div /* Este es el div 2 */ className="red2" />
                )}
                <h4> Comentarios </h4>
                {[...Array(this.state.comentarios.length)].map((e, i) => {
                    return(
                        <Card>
                            <CardText className='stars-card'> <Rating initialRating={this.state.comentarios[i]?.valoracion} readonly fractions={2}  emptySymbol="far fa-star fa-2x" fullSymbol="fas fa-star fa-2x"/> </CardText>
                            <CardText className='content-card'> {this.state.comentarios[i]?.id_persona.nombres + " " 
                            + this.state.comentarios[i]?.id_persona.apellidos } </CardText>
                            <CardText className='content-card'> {this.state.comentarios[i]?.fecha_calificacion} </CardText>
                            <CardText className='content-card'> {this.state.comentarios[i]?.comentarios}</CardText>
                        </Card>
                    )
                })}
            </Modal.Body>
            </Modal>
                </section>
        <Footer/>
    </div>
        );
    }
}
export default Contenido
