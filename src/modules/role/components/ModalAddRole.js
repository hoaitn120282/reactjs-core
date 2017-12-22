import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { Translate } from 'components/utils';
import FullUserTypeSelect from 'components/user/FullUserTypeSelect';

class ModelAddRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const { initData } = nextProps;
        if (initData) {
            this.setState({
                data: initData
            });
        }
    }

    onChangeValue = (e, name) => {
        this.setState({
            data: Object.assign(this.state.data, {
                [name]: e.target.value
            })
        });
    };

    saveRole = () => {
        const { saveAction } = this.props;
        saveAction(this.state.data);
    };

    onInValid = () => {
        const { data } = this.state;
        return !data.name || !data.type;
    };

    render() {
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal fade isOpen={isOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    <Translate text="addRole" />
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="roleName">
                                <Translate text="roleName" />
                            </Label>
                            <Input type="text" onChange={e => this.onChangeValue(e, 'name')} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="roleDescription">
                                <Translate text="description" />
                            </Label>
                            <Input type="textarea" onChange={e => this.onChangeValue(e, 'description')} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="roleType">
                                <Translate text="type" />
                            </Label>
                            <FullUserTypeSelect onChange={e => this.onChangeValue(e, 'type')} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button role="button" color="primary" onClick={this.saveRole} disabled={this.onInValid()}>
                        <Translate text="save" />
                    </Button>{' '}
                    <Button role="button" color="secondary" onClick={toggleModal}>
                        <Translate text="cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ModelAddRole.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func.isRequired,
    saveAction: PropTypes.func.isRequired,
    initData: PropTypes.object
};

export default ModelAddRole;
