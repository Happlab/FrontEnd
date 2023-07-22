import React from 'react'
import DashboardAdminContenido from './TemplatesAdmin/DashboardAdminContenido'
import AdminMainPages from '../../wrappers/adminMainPages/AdminMainPages';

const AdminContenido = () => {
  return (
    <AdminMainPages option="contenido">
      <DashboardAdminContenido />
    </AdminMainPages>
  );
}

export default AdminContenido;
