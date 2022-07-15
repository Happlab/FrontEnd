import React from 'react'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data_user: props.location.state.data,
            inputPasswordOld: "",
            inputPasswordNew: "",
            inputPasswordVerified: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState(values => ({
            ...values, [name]: value
        }))
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.data_user);
        // alert(this.state.data_user.state);
        alert("old " + this.state.inputPasswordOld + " new " + this.state.inputPasswordNew + " verified" + this.state.inputPasswordVerified);
    }

    render() {
        return (
            <div className="row">
                <Navbar1 />
                <div className="col-md-6 offset-md-3">
                    <span className="anchor" id="formChangePassword"></span>
                    <hr className="mb-5" />
                    <div className="card card-outline-secondary">
                        <div className="header-tarjeta">
                            <h3 className="titulo-form">Actualizar Contraseña</h3>
                        </div>
                        <div className="card-body">
                            <form className="form" role="form" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordOld">Contraseña actual</label>
                                    <input name='inputPasswordOld' onChange={this.handleChange} type="password" className="form-control" id="inputPasswordOld" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordNew">Nueva contraseña</label>
                                    <input name="inputPasswordNew" onChange={this.handleChange} type="password" className="form-control" id="inputPasswordNew" required />
                                    <span className="form-text small text-muted">
                                        La contraseña debe tener al menos 8 caracteres, y <em>no</em> debe tener espacios.
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordNewVerify">Verificar contraseña</label>
                                    <input name='inputPasswordVerified' onChange={this.handleChange} type="password" className="form-control" id="inputPasswordNewVerify" required />
                                    <span className="form-text small text-muted">
                                        Para confirmar, escriba la contraseña nuevamente.
                                    </span>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-outline-primary ms-1">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr className="mb-5"/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Password;
