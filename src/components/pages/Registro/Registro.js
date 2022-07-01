// vendors
import React, { useState } from "react";
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks'
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'
import Select from 'react-select';
import './Registro.css'

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      _id
    }
  }
`;

const initialValues = {
    name: '',
    lastName: '',
    documentId: '',
    email: '',
    repeatPassword: '',
    password: '',
    teacherType: '',
};

const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido'),
    lastName: Yup.string().required('Campo requerido'),
    documentId: Yup.number('Ingresa solo números').required('Campo requerido'),
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
    repeatPassword: Yup.string().required('Campo requerido'),
    teacherType: Yup.string().required('Campo requerido')
})

const options = [
    { value: 'primaria', label: 'Primaria' },
    { value: 'secundaria', label: 'Secundaria' },
    { value: 'universidad', label: 'Universidad' },
    { value: 'otro', label: 'Otro' }
]

const Registro = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [register] = useMutation(REGISTER);

    return (
        <div className="main-registro">
            <Navbar1 />
            <Row className="mx-auto justify-content-center">
                <Col lg="5">
                    <Alert dismissible variant="danger" onClose={() => setError(false)} show={error}>
                        Error regitrando el usuario
                    </Alert>
                    <Alert dismissible variant="success" onClose={() => setSuccess(false)} show={success}>
                        Usuario creado con éxito. Haz click <Link className="alert-link" to="/">aquí</Link> para iniciar sesión
                    </Alert>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            register({
                                variables: {
                                    input: {
                                        ...values,
                                    }
                                }
                            })
                                .then(() => {
                                    setError(false);
                                    setSuccess(true);
                                })
                                .catch(() => setError(true));
                        }}
                    >
                        {({
                            handleSubmit,
                            getFieldProps,
                            errors,
                            touched
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="name"
                                        placeholder="Ingresa tu nombre"
                                        isInvalid={touched.name && !!errors.name}
                                        {...getFieldProps('name')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="lastName"
                                        placeholder="Ingresa tu apellido"
                                        isInvalid={touched.lastName && !!errors.lastName}
                                        {...getFieldProps('lastName')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDocumentId">
                                    <Form.Label>Documento de identidad</Form.Label>
                                    <Form.Control
                                        name="documentId"
                                        type="number"
                                        placeholder="Ingresa tu documento de identidad"
                                        isInvalid={touched.documentId && !!errors.documentId}
                                        {...getFieldProps('documentId')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.documentId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Ingresa tu correo"
                                        isInvalid={touched.email && !!errors.email}
                                        {...getFieldProps('email')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formtPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        isInvalid={touched.password && !!errors.password}
                                        {...getFieldProps('password')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formtPassword">
                                    <Form.Label>Repite la Contraseña</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                        {...getFieldProps('repeatPassword')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.repeatPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formTeacherType">
                                    <Form.Label>Soy docente de</Form.Label>
                                    <Select 
                                        placeholder="Seleccione una opcion"
                                        options={options} />
                                </Form.Group>
                                <Button type="submit">Enviar</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            <hr className='hr-line-white' />
            <Footer />
        </div>
    );
};

export default Registro;
