import React from "react";
import AdminMainPages from "../../wrappers/adminMainPages/AdminMainPages";
import DashboardAdmNoticias from "./TemplatesAdmin/DashboardAdminNoticias";

const AdminNoticias = () => {
  return (
    <AdminMainPages option="noticia">
      <DashboardAdmNoticias />
    </AdminMainPages>
  );
};

export default AdminNoticias;
