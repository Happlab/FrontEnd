import "./Popup.css";

const Popup = ({ show, title, message, accept, cancel }) => {

  const togglePopupAccept = () => {
    if (accept) accept();
    show = false;
  };

  const togglePopupCancel = () => {
    if (cancel) cancel();
    show = false;
  };

  if (!show) return;

  return (
    <>
      <div
        className={show ? "popup-backdrop show" : "popup-backdrop"}
      ></div>
      <div className={show ? "popup show" : "popup"}>
        <div className="popup-dialog">
          <div className="popup-content">
            <div className="popup-header">
              <div className="popup-title">{title}</div>
            </div>
            <div className="popup-body">{message}</div>
            <div className="popup-footer">
              {cancel && (
                <button className="btn-cancel" onClick={togglePopupCancel}>
                  Cancelar
                </button>
              )}
              <button className="btn-accept" onClick={togglePopupAccept}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
