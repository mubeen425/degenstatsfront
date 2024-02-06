import { Modal, Button, Form } from "react-bootstrap";

function UserProfileModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email:</Form.Label>
            <input
              className="form-control form-control-lg mb-3"
              value={props.email}
              type="text"
              placeholder="0x00000000000000000000"
              autoFocus
              disabled
            />
            <Form.Label>Whatsapp:</Form.Label>
            <input
              className="form-control form-control-lg mb-3"
              value={props.whatsapp}
              type="text"
              placeholder="0x00000000000000000000"
              autoFocus
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserProfileModal;
