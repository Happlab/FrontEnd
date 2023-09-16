import Navbar from "../../navegation/navbar/Navbar";
import Footer from "../../navegation/footer/Footer";
import "./MainPages.css";

const MainPages = ({ color, children }) => {

  return (
    <div className={ color ? "main-pages colorpage" : "main-pages" }>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainPages;
