import React from "react";
import "./Modal.css";

const Modal = ({ show, children }) => {
  const moveToRoot = () => {
    const backdrop = document.querySelector(".backdrop-modal-user");
    const container = document.querySelector(".container-modal-user");
    console.log(window.document.body);
    if(backdrop) document.body.appendChild(backdrop);
    if(container) document.body.appendChild(container);
  };

  return (
    <>
      <div className={show ? "backdrop-modal-user show-backdrop" : "backdrop-modal-user"}></div>
      <div className={show ? "container-modal-user show-modal-container" : "container-modal-user"}>
        <div className="dialog-modal-user">
          <div className="content-modal-user">
          {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
