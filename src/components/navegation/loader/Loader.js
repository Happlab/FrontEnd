import React from "react";
import "./Loader.css"

class Loader extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div className="content-loader">
        <span className="loader"></span>
        <span className="message-loader">Cargando...</span>
      </div>
    )
  }
}
export default Loader;
