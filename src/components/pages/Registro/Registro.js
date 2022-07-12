// vendors
import React, { useState } from "react";
import { Formik} from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'
import './Registro.css'

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Campo requerido'),
    lastName: Yup.string().required('Campo requerido'),
    documentId: Yup.number('Ingresa solo números').required('Campo requerido').min(999999999,'Debe tener almenos 10 caracteres'),
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&'/*'"{}=+-_()])(?=.{8,})/,
        "Debe contener almenos 8 caracteres, Una mayuscula, Una minuscula, Un numero y Un caracter Especial"
      ),
    repeatPassword: Yup.string().required('Campo requerido').oneOf([Yup.ref("password"), null], "Contraseña debe ser la misma"),
    teacherType: Yup.string().required('Campo requerido')
})

const Registro = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <Row className="mx-auto justify-content-center" >

            <Navbar1 />
            <Alert dismissible variant="danger" onClose={() => setError(true)} show={error}>
                Error regitrando el usuario, Correo electronico ya registrado.
            </Alert>
            <Alert dismissible variant="success" onClose={() => setSuccess(true)} show={success}>
                Usuario creado con éxito. Haz click <Link className="alert-link" to="/">aquí</Link> para iniciar sesión
            </Alert>
            <Col lg='5'>
                <div lg='5'>

                    <Formik
                        initialValues={{
                            name: '',
                            lastName: '',
                            documentId: '',
                            email: '',
                            repeatPassword: '',
                            password: '',
                            teacherType: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            const data = { 'email': values.email, 'password': values.password, 'cedula': values.documentId, 'nombres': values.name, 'apellidos': values.lastName, 'rol': values.teacherType, 'tokens': 0 };
                            alert(JSON.stringify(data))
                            const requestOptions = {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                },
                                body: JSON.stringify(data)
                            }
                            fetch('http://api-happlab.herokuapp.com/persona/registro', requestOptions)
                                .then(response => {
                                    console.log("Response", response)
                                    if (response.status === 200) setSuccess(true)
                                    else setError(true)
                                })
                                .catch(error => console.log("Error", error))
                        }}

                    >
                        {props => (
                            <Form onSubmit={props.handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="name"
                                        placeholder="Ingresa tu nombre"
                                        isInvalid={props.touched.name && !!props.errors.name}
                                        value={props.values.name} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="lastName"
                                        placeholder="Ingresa tu apellido"
                                        isInvalid={props.touched.lastName && !!props.errors.lastName}
                                        value={props.values.lastName} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDocumentId">
                                    <Form.Label>Documento de identidad</Form.Label>
                                    <Form.Control
                                        name="documentId"
                                        type="number"
                                        placeholder="Ingresa tu documento de identidad"
                                        isInvalid={props.touched.documentId && !!props.errors.documentId}
                                        value={props.values.documentId} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.documentId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Ingresa tu correo"
                                        isInvalid={props.touched.email && !!props.errors.email}
                                        value={props.values.email} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formtPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        isInvalid={props.touched.password && !!props.errors.password}
                                        value={props.values.password} onChange={props.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formtrepeatPassword">
                                    <Form.Label>Repite la Contraseña</Form.Label>
                                    <Form.Control
                                        name="repeatPassword"
                                        type="password"
                                        placeholder="Contraseña"
                                        isInvalid={props.touched.repeatPassword && !!props.errors.repeatPassword}
                                        value={props.values.repeatPassword} onChange={props.handleChange}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.repeatPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formTeacherType">
                                    <Form.Label>Soy docente de</Form.Label>

                                    <Form.Select
                                        name="teacherType"
                                        isInvalid={props.touched.teacherType && !!props.errors.teacherType}
                                        value={props.values.teacherType} onChange={props.handleChange}
                                    >
                                        <option hidden selected>Selecciona una opción</option>
                                        <option value= 'Docente de primaria'>Primaria</option>
                                        <option value= 'Docente de Secundaria'>Secundaria</option>
                                        <option value= 'Docente Universitario'>Universidad</option>
                                        <option value= 'Otro'>Otro</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit">Enviar</Button>
                            </Form>

                        )}
                    </Formik>
                </div>
            </Col>
            <hr className='hr-line-white' />
            <Footer />

        </Row>)
};

export default Registro;
