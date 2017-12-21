import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ButtonLink } from 'components/button';
import { Form, Input, Label, FormGroup, Button, Row, Col } from 'reactstrap';

import { Translate } from 'components/utils';
import { Overlay } from 'components/loading';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _handleChangeInput = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
    };

    render() {
        const { isFetching } = this.props;
        return (
            <Fragment>
                <Overlay loading={isFetching} />
                <Row>
                    <Col sm={{ size: 4, offset: 4 }}>
                        <Form>
                            <FormGroup className="mb-4">
                                <Label for="email">
                                    <Translate text="emailAddress" />
                                </Label>
                                <Input required name="email" placeholder="" onChange={this._handleChangeInput} />
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Label for="password">
                                    <Translate text="password" />
                                </Label>
                                <Input required name="password" type="password" onChange={this._handleChangeInput} />
                            </FormGroup>
                            <FormGroup className="text-right mb-0">
                                <ButtonLink to="/login">
                                    <Translate text="login" />
                                </ButtonLink>
                                <Button type="submit" className="text-uppercase" style={{ marginLeft: 10 }}>
                                    <Translate text="signUp" />
                                </Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

RegisterComponent.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    commonActions: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    translate: PropTypes.func.isRequired
};

export default RegisterComponent;
