import { Modal, Button, Form } from "react-bootstrap";
import horizontal_blue from "../../../images/logo/horizontal_blue.png";

function WalletConnectModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          className="btn btn-primary button-md btn-block"
          onClick={props.handlelogin}>
          Connect with
          <img
            src="https://logosarchive.com/wp-content/uploads/2022/02/Metamask-logo.svg"
            width="100"
            height="20"
            alt="metamask logo"
            className="mr-2 mx-2"
          />
        </Button>
        <Button
          className="btn btn-primary button-md btn-block"
          onClick={props.handlewalletconnect}>
          Connect with
          <img
            src={horizontal_blue}
            width="100"
            height="20"
            alt="metamask logo"
            className=""
          />
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WalletConnectModal;
