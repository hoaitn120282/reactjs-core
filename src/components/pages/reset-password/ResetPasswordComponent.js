import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input, Label, FormGroup, Button, Row, Col } from 'reactstrap';
import logo from 'assets/images/logo.png';
import Validation from '../../../helpers/Validation';
import ErrMessage from '../../errors/ErrMessage';
import _ from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataForm: {
                password: '',
                confirmedPassword: ''
            },
            validationForm: {}
        };
    }
    changeInput = (e, field) => {
        const { dataForm } = this.state;
        if (field === 'confirmedPassword') {
            //valiadation when on change confirm password
            const validationConfirm = Validation.checkConfirmPass({
                password: this.state.dataForm.password,
                confirm: e.target.value
            });
            this.setState(prevState => ({
                validationForm: Validation.updateValidationForm(validationConfirm, prevState.validationForm)
            }));
        } else {
            //update validation input
            const validationInput = Validation.validationOnChange(e.target);
            this.setState(prevState => ({
                validationForm: Validation.updateValidationForm(validationInput, prevState.validationForm)
            }));
        }
        //set data for form
        Object.asign(dataForm, { [field]: e.target.value });
        this.setState(() => ({ dataForm }));
    };
    _handleSumit = e => {
        e.preventDefault();
        e.stopPropagation();
        const { onSubmit } = this.props;
        const { validationForm: cValidationForm } = this.state;
        const inputs = document.getElementById('resetPassword').elements;
        const validationForm = Validation.validationWhenSubmit({}, inputs, cValidationForm);
        this.setState(prevState => ({ validationForm }));
        if (_.isEmpty(validationForm)) {
            onSubmit(this.state.dataForm);
        }
    };
    render() {
        // console.log(this.state.validationForm);
        return (
            <div className="view">
                <div className="view-content view-pages view-session d-flex justify-content-center page-login">
                    <div className="container-fluid">
                        <Row>
                            <Col md={{ size: 4, offset: 4 }}>
                                <div className="justify-content-center logo-login">
                                    <img className="img-fluid img-login" src={logo} alt="Logo" />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 4, offset: 4 }} className="form-login">
                                <h3 className="text-uppercase">Reset Password</h3>
                                <Form
                                    className="mt-4"
                                    name="resetPassword"
                                    onSubmit={e => this._handleSumit(e)}
                                    id="resetPassword"
                                    noValidate
                                >
                                    <FormGroup className="mb-4">
                                        <Label for="password">Password</Label>
                                        <Input
                                            name="password"
                                            required
                                            type="password"
                                            onChange={e => this.changeInput(e, 'password')}
                                            placeholder="password"
                                            className={classnames({
                                                'error-input': this.state.validationForm['password']
                                            })}
                                        />
                                        <ErrMessage name="password" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup className="mb-4">
                                        <Label for="confirmedPassword">Confirm Password</Label>
                                        <Input
                                            name="confirmedPassword"
                                            required
                                            type="password"
                                            onChange={e => this.changeInput(e, 'confirmedPassword')}
                                            placeholder="confirm password"
                                            className={classnames({
                                                'error-input': this.state.validationForm['confirmedPassword']
                                            })}
                                        />
                                        <ErrMessage name="confirmedPassword" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup className="text-right mb-0">
                                        <Button
                                            disabled={!_.isEmpty(this.state.validationForm)}
                                            className="text-uppercase btn-form btn-login float-right"
                                        >
                                            Submit
                                        </Button>
                                        <div className="clearfix" />
                                        <Link className="forgot-password float-left mb-0" to="/login">
                                            Back to login
                                        </Link>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default ResetPassword;
