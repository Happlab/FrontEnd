import { useState } from "react";
import "./Alert.css";

const Alert = ({ variant, show, children }) => {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
  };

  if (dismissed || !show) {
    return null;
  }

  return (
    <div className={`alert ${variant}`}>
      <div className="alert-content">{children}</div>
      <button className="alert-dismiss" onClick={handleDismiss}>
        X
      </button>
    </div>
  );
};

export default Alert;
