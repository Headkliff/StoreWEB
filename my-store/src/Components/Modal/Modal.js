import React from "react";
import { Button, Modal } from "react-bootstrap";

class ModalConfirm extends React.Component { 
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you shure about your data!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" 
            onClick={()=>this.props.handleClose()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type='submit'
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
