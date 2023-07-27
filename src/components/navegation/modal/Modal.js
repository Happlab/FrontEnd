import React from "react";

const Modal = ({ show, children }) => {
  return (
    <div className="modal-container">
      {children}
    </div>
  );
};

export default Modal;
