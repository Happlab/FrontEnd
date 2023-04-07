import React from "react";
import "./Popup.css";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show || false,
      title: this.props.title || "",
      message: this.props.message || "",
      onMethodAccept: this.props.accept || null,
      onMethodCancel: this.props.cancel || null,
    }
    this.togglePopupAccept = this.togglePopupAccept.bind(this);
    this.togglePopupCancel = this.togglePopupCancel.bind(this);
  }

  togglePopupAccept() {
    if(this.state.onMethodAccept) this.state.onMethodAccept();
    this.setState({
      show: false,
    })
  }

  togglePopupCancel() {
    if(this.state.onMethodCancel) this.state.onMethodCancel();
    this.setState({
      show: false,
    })
  }

  render() {
    if(!this.props.show) return;
    return (
      <>
        <div className={this.props.show ? "popup-backdrop show" :  "popup-backdrop"}></div>
        <div className={this.props.show ? "popup show" : "popup"}>
          <div className="popup-dialog">
            <div className="popup-content">
              <div className="popup-header">
                <div className="popup-title">{this.props.title}</div>
              </div>
              <div className="popup-body">{this.props.message}</div>
              <div className="popup-footer">
                {this.props.onMethodCancel && <button className="btn-cancel" onClick={this.togglePopupCancel}>Cancelar</button>}
                <button className="btn-accept" onClick={this.togglePopupAccept}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
