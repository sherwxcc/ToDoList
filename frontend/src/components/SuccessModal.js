import { Button, Modal, ModalBody } from "reactstrap";

const SuccessModal = (props) => {
  return (
    <div>
      {props.modalOpen ? (
        <Modal className="modal-main">
          <ModalBody>
            <div>
              <div>{props.message}</div>
              <Button className="btn-orange" onClick={props.close}>
                OK
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </div>
  );
};

export default SuccessModal;
