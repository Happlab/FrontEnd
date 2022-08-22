import Modal from "react-bootstrap/Modal";
import React from "react";
import { Button } from "react-bootstrap";

export default class Notificacion extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>{this.props.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.mensaje}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.onclick}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

