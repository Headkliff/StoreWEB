import React from "react";
import { Button, Modal } from "react-bootstrap";
class ModalConfirm extends React.Component { 
  render() {
    return (
      <>
      <div>Hahahaha</div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" 
            onClick={()=>this.props.handleClose()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.props.handleSubmit();
                this.props.handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalConfirm;
