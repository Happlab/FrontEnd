import React from "react";
import { Navbar } from "../../navegation/navbar/Navbar";
import Footer from "../../navegation/footer/Footer";
import "./MainPages.css";

const MainPages = ({ color, children }) => {
  return (
    <div className={ color ? "mainpages colorpage" : "mainpages" }>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainPages;
