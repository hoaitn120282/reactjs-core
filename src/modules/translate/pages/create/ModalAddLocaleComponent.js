import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FormFeedback,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { Translate } from 'components/utils';

class ModalAddLocaleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }
    onChangeValue = (e, name) => {
        this.setState({
            data: Object.assign(this.state.data, {
                [name]: e.target.value
            })
        });
    };

    onSubmitData = () => {
        const { onSubmit } = this.props;
        const { data } = this.state;
        onSubmit(data);
    };

    onValidField = field => {
        const { data } = this.state;
        if (data.hasOwnProperty(field)) {
            return data[field] !== '';
        }
    };

    render() {
        const { isOpen, toggle } = this.props;
        const { data } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <Translate text="addLabel" />
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>
                                <Translate text="label" /> (*)
                            </Label>
                            <Input
                                valid={this.onValidField('label')}
                                type="text"
                                onChange={e => this.onChangeValue(e, 'label')}
                            />
                            <FormFeedback>
                                <Translate text="labelMustBeRequired" />
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Translate text="description" />
                            </Label>
                            <Input type="text" onChange={e => this.onChangeValue(e, 'description')} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={!data.label} onClick={this.onSubmitData}>
                        <Translate text="save" />
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        <Translate text="cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ModalAddLocaleComponent.defaultProps = {
    toggle: () => null,
    onSubmit: () => null
};

ModalAddLocaleComponent.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    onSubmit: PropTypes.func
};

export default ModalAddLocaleComponent;
