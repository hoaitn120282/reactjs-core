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

class ModalAddLanguageComponent extends Component {
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
                    <Translate text="addLanguage" />
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>
                                <Translate text="language" />
                            </Label>
                            <Input
                                valid={this.onValidField('name')}
                                type="text"
                                onChange={e => this.onChangeValue(e, 'name')}
                            />
                            <FormFeedback>Name must be required</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <Translate text="code" />
                            </Label>
                            <Input
                                valid={this.onValidField('countryCode')}
                                type="text"
                                onChange={e => this.onChangeValue(e, 'countryCode')}
                            />
                            <FormFeedback>Country code must be required</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={!data.name || !data.countryCode} onClick={this.onSubmitData}>
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

ModalAddLanguageComponent.defaultProps = {
    toggle: () => null,
    onSubmit: () => null
};

ModalAddLanguageComponent.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    onSubmit: PropTypes.func
};

export default ModalAddLanguageComponent;
