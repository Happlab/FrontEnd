import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./components/pages/inicio/Inicio";
import Acerca from "./components/pages/acercade/Acerca";
import Noticias from "./components/pages/noticias/Noticias";
import Login from "./components/pages/login/Login";
import Registro from "./components/pages/registro/Registro";
import AdminUsuarios from "./components/pages/admin/adminUsuarios/AdminUsuarios";
import AdminNoticias from "./components/pages/admin/adminNoticias/AdminNoticias";
import AdminContenido from "./components/pages/admin/adminContenido/AdminContenido";
import AdminInicio from "./components/pages/admin/adminInicio/AdminInicio";
import AdminAcercaDe from "./components/pages/admin/adminAcercaDe/AdminAcercaDe";
import Contenido from "./components/pages/contenido/Contenido";
import Perfil from "./components/pages/perfil/Perfil";
import Password from "./components/pages/password/Password";
import SobreNosotros from "./components/pages/about/SobreNosotros";
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
