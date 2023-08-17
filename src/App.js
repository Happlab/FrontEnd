import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./components/pages/Inicio/Inicio";
import Acerca from "./components/pages/Acerca de/Acerca";
import Noticias from "./components/pages/Noticias/Noticias";
import Login from "./components/pages/Login/Login";
import Registro from "./components/pages/Registro/Registro";
import AdminUsuarios from "./components/pages/Admin/AdminUsuarios/AdminUsuarios";
import AdminNoticias from "./components/pages/Admin/AdminNoticias/AdminNoticias";
import AdminContenido from "./components/pages/Admin/AdminContenido/AdminContenido";
import AdminInicio from "./components/pages/Admin/AdminInicio/AdminInicio";
import AdminAcercaDe from "./components/pages/Admin/AdminAcercaDe/AdminAcercaDe";
import Contenido from "./components/pages/Contenido/Contenido";
import Perfil from "./components/pages/Perfil/Perfil";
import Password from "./components/pages/Password/Password";
import SobreNosotros from "./components/pages/About/SobreNosotros";
import TokenContextProvider from "./context/GlobalContext";
import "./App.css";

const App = () => {
  return (
    <TokenContextProvider>
      <Routes>
        <Route path="AdminInicio" element={<AdminInicio />} />
        <Route path="AdminNoticias" element={<AdminNoticias />} />
        <Route path="AdminContenido" element={<AdminContenido />} />
        <Route path="AdminUsuarios" element={<AdminUsuarios />} />
        <Route path="AdminAcercaDe" element={<AdminAcercaDe />} />
        <Route path="Perfil" element={<Perfil />} />
        <Route path="Password" element={<Password />} />
        <Route index element={<Inicio />} />
        <Route path="Acerca" element={<Acerca />} />
        <Route path="Noticias" element={<Noticias />} />
        <Route path="AboutUs" element={<SobreNosotros />} />
        <Route path="Login" element={<Login />} />
        <Route path="Contenido" element={<Contenido />} />
        <Route path="Registro" element={<Registro />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </TokenContextProvider>
  );
}

export default App;
