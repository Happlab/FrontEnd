import { Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './components/pages/Inicio/Inicio';
import About from './components/pages/About';
import Acerca from './components/pages/Acerca de/Acerca';
import Noticias from './components/pages/Noticias/Noticias'
import Tecnologias from './components/pages/Tecnologias/Tecnologias'
import Login from './components/pages/Login/Login'
import Registro from './components/pages/Registro/Registro'
import Investigadores from './components/pages/Investigadores/Investigadores';
import AdminUsuarios from './components/pages/Admin/AdminUsuarios';
import AdminNoticias from './components/pages/Admin/AdminNoticias';
import AdminContenido from './components/pages/Admin/AdminContenido';
import AdminInicio from './components/pages/Admin/AdminInicio';
import AdminAcercaDe from './components/pages/Admin/AdminAcercaDe';
import Contenido from './components/pages/Contenido/Contenido'
import Perfil from './components/pages/Perfil/Perfil';
import Password from './components/pages/Perfil/Password';
import SobreNosotros from './components/pages/About/SobreNosotros';
import user_service from './components/services/UserServices';

let data = null;

const RenderServices = (verified) => {
    if(verified === "ADMIN") {
        return (
            <>
            <Route path='AdminInicio' element={<AdminInicio />}/>
            <Route path='AdminNoticias' element={<AdminNoticias/>}/>
            <Route path='AdminContenido' element={<AdminContenido/>}/>
            <Route path='AdminUsuarios' element={<AdminUsuarios/>}/>
            <Route path='AdminAcercaDe' element={<AdminAcercaDe />}/>
            </>
        );
    } else if (verified === "USER") {
        return (
            <>
            <Route path='Perfil' element={<Perfil/>}/>
            <Route path='Password' element={<Password/>}/>
            </>
        );
    }
}

function App() {
    if( user_service.getToken() !== null ) {
        data = user_service.getDataToken(user_service.getToken());
    }
    return (
    <div className="App">
        <Routes>
            <Route path='AdminInicio' element={<AdminInicio />}/>
            <Route path='AdminNoticias' element={<AdminNoticias/>}/>
            <Route path='AdminContenido' element={<AdminContenido/>}/>
            <Route path='AdminUsuarios' element={<AdminUsuarios/>}/>
            <Route path='AdminAcercaDe' element={<AdminAcercaDe />}/>
            <Route path='Perfil' element={<Perfil/>}/>
            <Route path='Password' element={<Password/>}/>
            <Route index element={<Inicio />}/>
            <Route path='About' element={<About />}/>
            <Route path='Acerca' element={<Acerca />}/>
            <Route path='Noticias' element={<Noticias />}/>
            <Route path='Tecnologias' element={<Tecnologias />}/>
            <Route path='Investigadores' element={<Investigadores />}/>
            <Route path='AboutUs' element={<SobreNosotros />}/>
            <Route path='Login' element={<Login/>}/>
            <Route path='Contenido' element={<Contenido/>}/>
            <Route path='Registro' element={<Registro/>}/>
            <Route path='*' element={<Navigate replace to="/"/>}/>
        </Routes>
    </div>
  );
}

export default App;
