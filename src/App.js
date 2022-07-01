//import './App.css'; #TODO: Revisar App.css genera conflictos con la plantilla de administrador
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './components/pages/Inicio/Inicio';
import About from './components/pages/About';
import Acerca from './components/pages/Acerca de/Acerca';
import Noticias from './components/pages/Noticias/Noticias'
import Tecnologias from './components/pages/Tecnologias/Tecnologias'
import Login from './components/pages/Login/Login'
import Registro from './components/pages/Registro/Registro'
import Investigadores from './components/pages/Investigadores/Investigadores';
import AdminUsuarios from './components/pages/Admin/AdminUsuarios';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route index element={<Inicio />}/>
            <Route path='About' element={<About />}/>
            <Route path='Acerca' element={<Acerca />}/>
            <Route path='Noticias' element={<Noticias />}/>
            <Route path='Tecnologias' element={<Tecnologias />}/>
            <Route path='Investigadores' element={<Investigadores />}/>
            <Route path='Login' element={<Login/>}/>
            <Route path='Registro' element={<Registro/>}/>
            <Route path='AdminUsuarios' element={<AdminUsuarios/>}/>
            <Route path='*' element={<Navigate replace to="/"/>}/>
        </Routes>
    </div>
  );
}

export default App;
