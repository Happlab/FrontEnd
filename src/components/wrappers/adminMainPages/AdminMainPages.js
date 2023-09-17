import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../../context/GlobalContext";
import Header from "../../pages/admin/navegation/header/Header";
import Sidebar from "../../pages/admin/navegation/sidebar/Sidebar";

const AdminMainPages = ({ option, children }) => {
  const { tokenUser } = useContext(TokenContext);

  let data = tokenUser;
  if (data === null) {
    return <Navigate to="/login" state={{ data }} />;
  } else if ((data !== null) & (data.rol[0] !== "ADMIN")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header />
      <Sidebar option={option} />
      {children}
    </>
  );
};

export default AdminMainPages;
