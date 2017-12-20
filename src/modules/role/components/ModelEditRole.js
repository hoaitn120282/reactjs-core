import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';

import { Translate } from 'components/utils';
import FullUserTypeSelect from 'components/user/FullUserTypeSelect';

class ModelEditRole extends Component {
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
        const { saveAction, initData } = this.props;
        const { data } = this.state;
        saveAction({ roleId: initData.id, values: data });
    };

    toggleModal = () => {
        const { toggleModal } = this.props;
        this.setState({ data: {} }, () => {
            toggleModal();
        });
    };

    render() {
        const { isOpen } = this.props;
        const { data } = this.state;
        return (
            <Modal fade isOpen={isOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    <Translate text="editRole" />
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>
                                <Translate text="roleName" />
                            </Label>
                            <Input
                                value={_.get(data, 'name', '')}
                                type="text"
                                onChange={e => this.onChangeValue(e, 'name')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Translate text="description" />
                            </Label>
                            <Input
                                type="textarea"
                                value={_.get(data, 'description', '')}
                                onChange={e => this.onChangeValue(e, 'description')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Translate text="type" />
                            </Label>
                            <FullUserTypeSelect
                                value={_.get(data, 'type', '')}
                                onChange={e => this.onChangeValue(e, 'type')}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button role="button" color="primary" onClick={this.saveRole}>
                        <Translate text="update" />
                    </Button>{' '}
                    <Button role="button" color="secondary" onClick={this.toggleModal}>
                        <Translate text="cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ModelEditRole.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func.isRequired,
    saveAction: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    initData: PropTypes.object
};

export default ModelEditRole;
