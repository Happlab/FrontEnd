import React from 'react'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Footer from '../../navegation/footer/Footer'

class Perfil extends React.Component {
    render() {
        return (
            <div class="row">
                <Navbar1 />
                <section >
                    <div class="container h-100">
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center align-items-center">Actualizacion de contraseña</h3>
                        <form>
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="form-outline">
                                    <label for="inputEmail3" class="col-lg-6 control-label d-flex justify-content-center align-items-center">Nueva contraseña</label>
                                    <div class="col-lg-100">
                                        <input type="password" class="form-control d-flex justify-content-center align-items-center" id="inputEmail3" required placeholder="Escriba su nueva clave" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="form-outline">
                                    <label for="inputPassword3" class="col-lg-6 control-label d-flex justify-content-center align-items-center">Repetir contraseña</label>
                                    <div class="col-lg-100">
                                        <input type="password" class="form-control d-flex justify-content-center align-items-center" id="inputPassword3" required placeholder="Confirme su nueva clave" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="form-group row">
                                    <div class="col-sm-10 d-flex justify-content-center align-items-center">
                                        <button type="submit" class="btn btn-primary d-flex justify-content-center align-items-center">Guardar contraseña</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Perfil;
