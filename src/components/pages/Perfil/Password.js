import React from 'react'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'

class Perfil extends React.Component {
    render() {
        return (
            <div class="row">
                <Navbar1 />
                <div class="col-md-6 offset-md-3">
                    <span class="anchor" id="formChangePassword"></span>
                    <hr class="mb-5" />
                    <div class="card card-outline-secondary">
                        <div class="card-header">
                            <h3 class="mb-1">Actualizar Contraseña</h3>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off">
                                <div class="form-group">
                                    <label for="inputPasswordOld">Contraseña actual</label>
                                    <input type="password" class="form-control" id="inputPasswordOld" required />
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNew">Nueva contraseña</label>
                                    <input type="password" class="form-control" id="inputPasswordNew" required />
                                    <span class="form-text small text-muted">
                                        La contraseña debe tener al menos 8 caracteres, y <em>no</em> debe tener espacios.
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNewVerify">Verificar contraseña</label>
                                    <input type="password" class="form-control" id="inputPasswordNewVerify" required />
                                    <span class="form-text small text-muted">
                                        Para confirmar, escriba la contraseña nuevamente.
                                    </span>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-outline-primary ms-1">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr class="mb-5" />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Perfil;
