import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
class ModalConfirm extends Component {
    toggle = () => {
        // const { openModalConfirm } = this.props;
        // openModalDetail();
    };
    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
                <ModalBody>123</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ModalConfirm.propTypes = {};

export default ModalConfirm;
