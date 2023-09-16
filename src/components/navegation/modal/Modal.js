import "./Modal.css";

const Modal = ({ show, children }) => {
  const quitScroll = () => {
    if(show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  };

  return (
    <>
      {quitScroll()}
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
