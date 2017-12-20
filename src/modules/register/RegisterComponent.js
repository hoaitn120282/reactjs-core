import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input, Label, FormGroup, Button, Card, CardBody, Row, Col } from 'reactstrap';
import { UPLOAD_MAX_FILE_SIZE } from 'constants/config';

import Editor from 'components/form/Editor';
import Html from 'slate-html-serializer';
import Plain from 'slate-plain-serializer';

//Import Icon from lib
import { FaFolderOpen } from 'react-icons/lib/fa';
import styles from './style.scss';
import logo from 'assets/images/logo.png';
import { Radio, Checkbox } from 'antd';
import { Overlay } from 'components/loading';
import { Translate } from 'components/utils';
import { notification } from 'antd';
import rules from 'helpers/SlateRules';

const html = new Html({ rules });
const RadioGroup = Radio.Group;

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInput: { role: 'developer', description: Plain.deserialize('') },
            isValid: '',
            error: {},
            viewMore: false,
            acceptFile: 'image/jpeg, image/png, image/jpg, application/pdf'
        };
    }

    handleSubmit = () => {
        const dataSubmit = Object.assign({}, this.state.dataInput);
        dataSubmit.description = html.serialize(dataSubmit.description);
        const { onSubmit } = this.props;
        if (this._showFormErrors()) {
            onSubmit(dataSubmit);
        }
    };

    openNotification = (type, description) => {
        notification[type]({
            message: 'Notification',
            duration: 3,
            description: description
        });
    };

    _handleChangeDataInput = e => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const dataInput = this.state.dataInput;

        dataInput[name] = value;
        this.setState({ dataInput });
        this._showInputError(e.target);
    };

    _showInputError = input => {
        const name = input.name;
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            input.classList.add('active');
            const validity = input.validity;
            const label = document.getElementById(`${name}Label`).textContent.replace(': *', '');
            const error = document.getElementById(`${name}Error`);

            const isPassword = name.indexOf('password') !== -1;
            const isPasswordConfirm = name === 'confirmPassword';
            const isWebsiteAddress = name === 'websiteAddress';
            if (isPasswordConfirm) {
                if (this.state.dataInput.password !== this.state.dataInput.confirmPassword) {
                    input.setCustomValidity('Passwords do not match');
                } else {
                    input.setCustomValidity('');
                }
            }
            if (!validity.valid) {
                if (input.type === 'file') {
                    if (!this.state.dataInput.companyABNACN) {
                        error.textContent = `${label} is a required field`;
                    } else {
                        input.setCustomValidity('');
                    }
                    if (!this.state.dataInput.realEstateLicense) {
                        error.textContent = `${label} is a required field`;
                    } else {
                        input.setCustomValidity('');
                    }
                } else if (validity.valueMissing) {
                    error.textContent = `${label} is a required field`;
                } else if (validity.typeMismatch) {
                    if (isWebsiteAddress) {
                        error.textContent = `Must be URL!`;
                    } else {
                        error.textContent = `The email you put in is invalid. Please check again!`;
                    }
                } else if (isPassword && validity.patternMismatch) {
                    error.textContent = `${label} should be longer than 4 chars`;
                } else if (isPasswordConfirm && validity.customError) {
                    error.textContent = 'Passwords do not match';
                } else if (!isPassword && validity.patternMismatch) {
                    error.textContent = `${label} should be a number`;
                }
                return false;
            }
            error.textContent = '';
        }

        return true;
    };

    _showFormErrors() {
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach(input => {
            const isInputValid = this._showInputError(input);

            if (!isInputValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    _handleChangeFileInput = e => {
        let fileSelected = '';
        const files = e.target.files;
        const name = e.target.name;
        const dataInput = this.state.dataInput;
        if (files.length > 0) {
            var checkFileUpload = this._validFileUpload(e.target);
            if (checkFileUpload.flag) {
                const { commonActions: { uploadUnAuth: uploadAction } } = this.props;
                uploadAction({ file: files[0] })
                    .then(
                        res => {
                            fileSelected = res.data.data.path;
                            dataInput[name] = fileSelected;
                            this.setState({ dataInput });
                            this.openNotification('success', 'Your file has been uploaded successfully');
                        },
                        e.target.setCustomValidity(''),
                        this._showInputError(e.target)
                    )
                    .catch(err => {
                        this.openNotification(
                            'error',
                            err.data ? err.data.message : 'Your file has been uploaded unsuccessfully!'
                        );
                    });
            } else {
                e.target.setCustomValidity('File Must Be Image or PDF');
                this._showInputErrorFileType(e.target, checkFileUpload.typeError);
            }
        }
    };

    _validFileUpload = input => {
        const files = input.files;
        const arrFiles = Object.assign([], files);
        var reg = /(.*?)\.(jpg|jpeg|png|pdf)$/;
        const valid = {
            flag: true,
            typeError: ''
        };
        arrFiles.forEach(function(element) {
            var file = element.name;
            if (!file.match(reg)) {
                valid.flag = false;
                valid.typeError = 'acceptFile';
            }
        });
        if (input.files[0].size >= UPLOAD_MAX_FILE_SIZE) {
            valid.flag = false;
            valid.typeError = 'maxFileSize';
        }
        return valid;
    };

    _showInputErrorFileType = (input, typeError) => {
        const name = input.name;
        if (input.type !== 'checkbox' && input.type !== 'radio') {
            input.classList.add('active');
            const validity = input.validity;
            const error = document.getElementById(`${name}Error`);

            if (!validity.valid) {
                if (validity.customError) {
                    if (typeError === 'acceptFile') {
                        error.textContent = `The accepted files are images or .PDF`;
                    } else {
                        error.textContent =
                            `The max size for each file upload is ` + UPLOAD_MAX_FILE_SIZE / 1024 / 1024 + 'MB';
                    }
                }
                return false;
            }
            error.textContent = '';
        }

        return true;
    };

    checkEmailExits = e => {
        this._checkEmailExitsAction(e.target);
    };

    _checkEmailExitsAction = input => {
        const name = input.name;
        input.classList.add('active');
        const validity = input.validity;
        const error = document.getElementById(`${name}Error`);
        if (!validity.valueMissing && !validity.typeMismatch) {
            const { commonActions: { checkEmailExits: checkEmailExitsAction } } = this.props;
            checkEmailExitsAction({ email: input.value })
                .then(res => {
                    input.setCustomValidity('');
                    error.textContent = ``;
                })
                .catch(err => {
                    input.setCustomValidity('Email has already exits');
                    error.textContent = `Email has already exits`;
                });
        } else {
            input.setCustomValidity('');
        }
    };

    viewMore = () => {
        this.setState({ viewMore: !this.state.viewMore });
    };

    onChangeRichTextValue = ({ value }) => {
        const { dataInput } = this.state;
        dataInput.description = value;
        this.setState({ dataInput });
    };

    render() {
        const checkViewConfirm = this.state.viewMore ? '' : styles.hiddenText;
        const { acceptFile, dataInput } = this.state;
        const { isFetching, translate } = this.props;
        return (
            <div>
                <Overlay loading={isFetching} />
                <div className={styles.formRegister + ' view'}>
                    <div className="view-content view-pages view-session">
                        <Row className="justify-content-center logo">
                            <div className="logo-app">
                                <img src={logo} alt="logo-app" />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className="col-12 col-md-9">
                                <Card className="mb-3 form-container">
                                    <CardBody>
                                        <header className="mb-2">
                                            <Row>
                                                <Col className="col-12 col-sm-8 col-md-7 col-lg-6 button-back">
                                                    <p className="title">
                                                        <Translate text="createNewAccount" />
                                                    </p>
                                                </Col>
                                                <Col className="col-12 col-sm-4 col-md-5 col-lg-6 text-right">
                                                    <Button
                                                        className="button-submit"
                                                        color="default"
                                                        disabled={!this.state.dataInput.accept}
                                                        onClick={this.handleSubmit}
                                                    >
                                                        <Translate text="submit" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </header>
                                        <Form noValidate>
                                            <Row>
                                                {/* FormLeft */}
                                                <Col className="col-12 col-md-4 border-right">
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="firstNameLabel">
                                                            <Translate text="firstName" />: *
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="firstName"
                                                            required
                                                            placeholder={translate('yourFirstName')}
                                                            onChange={this._handleChangeDataInput}
                                                        />
                                                        <div className="error" id="firstNameError" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="lastNameLabel">
                                                            <Translate text="lastName" />: *
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="lastName"
                                                            required
                                                            placeholder={translate('yourLastName')}
                                                            onChange={this._handleChangeDataInput}
                                                        />
                                                        <div className="error" id="lastNameError" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="emailLabel">
                                                            <Translate text="email" />: *
                                                        </Label>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            required
                                                            placeholder={'abc@domainmail.com'}
                                                            onChange={this._handleChangeDataInput}
                                                            onBlur={this.checkEmailExits}
                                                        />
                                                        <div className="error" id="emailError" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="passwordLabel">
                                                            <Translate text="password" />: *
                                                        </Label>
                                                        <Input
                                                            type="password"
                                                            name="password"
                                                            required
                                                            placeholder={translate('typeYourPassword')}
                                                            onChange={this._handleChangeDataInput}
                                                        />
                                                        <div className="error" id="passwordError" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="confirmPasswordLabel">
                                                            <Translate text="confirmPass" />: *
                                                        </Label>
                                                        <Input
                                                            type="password"
                                                            name="confirmPassword"
                                                            required
                                                            placeholder={translate('Re-typeYourPassword')}
                                                            onChange={this._handleChangeDataInput}
                                                        />
                                                        <div className="error" id="confirmPasswordError" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="mobileLabel">
                                                            <Translate text="mobile" />: *
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="mobile"
                                                            required
                                                            pattern="[0-9\/]*"
                                                            placeholder={translate('numberOnly')}
                                                            onChange={this._handleChangeDataInput}
                                                        />
                                                        <div className="error" id="mobileError" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <Label className={styles.titleLabel} id="descriptionLabel">
                                                            <Translate text="description" />:
                                                        </Label>
                                                        <div className={styles.desStyle}>
                                                            <Editor
                                                                value={dataInput.description}
                                                                onChange={this.onChangeRichTextValue}
                                                            />
                                                        </div>
                                                        <div className={styles.error} id="descriptionError" />
                                                    </FormGroup>
                                                </Col>
                                                {/* End FormLeft */}
                                                {/* FormRight */}
                                                <Col className="col-12 col-md-8">
                                                    <Row>
                                                        <Col className="col-12 col-sm-12 col-md-6">
                                                            <FormGroup tag="fieldset" className={styles.mgb5}>
                                                                <Label className={styles.titleLabel} id="roleLabel">
                                                                    <Translate text="chooseRole" />: *
                                                                </Label>
                                                                <RadioGroup
                                                                    className={styles.fullWith}
                                                                    name="role"
                                                                    onChange={this._handleChangeDataInput}
                                                                    value={this.state.dataInput.role}
                                                                >
                                                                    <Row>
                                                                        <Col className="col-4 col-md-12 col-lg-4">
                                                                            <Radio value={'developer'}>
                                                                                <Translate text="developer" />
                                                                            </Radio>
                                                                        </Col>
                                                                        <Col className="col-4 col-md-12 col-lg-4">
                                                                            <Radio value={'seller'}>
                                                                                <Translate text="seller" />
                                                                            </Radio>
                                                                        </Col>
                                                                        <Col className="col-4 col-md-12 col-lg-4">
                                                                            <Radio value={'agent'}>
                                                                                <Translate text="agent" />
                                                                            </Radio>
                                                                        </Col>
                                                                    </Row>
                                                                </RadioGroup>
                                                                <div className="error" id="roleError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="companyNameLabel"
                                                                >
                                                                    <Translate text="companyName" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="companyName"
                                                                    required
                                                                    placeholder={translate('yourCompanyName')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="companyNameError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="companyAddressLabel"
                                                                >
                                                                    <Translate text="companyAddress" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="companyAddress"
                                                                    required
                                                                    placeholder={translate('yourCompanyAddress')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="companyAddressError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="companyPhoneLabel"
                                                                >
                                                                    <Translate text="companyPhone" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="companyPhone"
                                                                    required
                                                                    pattern="[0-9\/]*"
                                                                    placeholder={translate('numberOnly')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="companyPhoneError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="companyMobileLabel"
                                                                >
                                                                    <Translate text="companyMobile" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="companyMobile"
                                                                    required
                                                                    pattern="[0-9\/]*"
                                                                    placeholder={translate('numberOnly')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="companyMobileError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="companyFaxLabel"
                                                                >
                                                                    <Translate text="companyFax" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="companyFax"
                                                                    required
                                                                    pattern="[0-9\/]*"
                                                                    placeholder={translate('numberOnly')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="companyFaxError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="websiteAddressLabel"
                                                                >
                                                                    <Translate text="websiteAddress" />: *
                                                                </Label>
                                                                <Input
                                                                    type="url"
                                                                    name="websiteAddress"
                                                                    required
                                                                    placeholder={translate('yourWebsiteAddress')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="websiteAddressError" />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="col-12 col-sm-12 col-md-6">
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="directorNameLabel"
                                                                >
                                                                    <Translate text="directorName" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="directorName"
                                                                    required
                                                                    placeholder={translate('yourDirectorName')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="directorNameError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="directorEmailLabel"
                                                                >
                                                                    <Translate text="directorEmail" />: *
                                                                </Label>
                                                                <Input
                                                                    type="email"
                                                                    name="directorEmail"
                                                                    required
                                                                    placeholder={'abc@domainmail.com'}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="directorEmailError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="directorPhoneLabel"
                                                                >
                                                                    <Translate text="directorMobilePhone" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="directorPhone"
                                                                    required
                                                                    pattern="[0-9\/]*"
                                                                    placeholder={translate('numberOnly')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="directorPhoneError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="adminNameLabel"
                                                                >
                                                                    <Translate text="administratorName" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="adminName"
                                                                    required
                                                                    placeholder={translate('yourAdministratorName')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="adminNameError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="adminEmailLabel"
                                                                >
                                                                    <Translate text="administratorEmail" />: *
                                                                </Label>
                                                                <Input
                                                                    type="email"
                                                                    name="adminEmail"
                                                                    required
                                                                    placeholder={'abc@domainmail.com'}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="adminEmailError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="adminPhoneLabel"
                                                                >
                                                                    <Translate text="administratorMobilePhone" />: *
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="adminPhone"
                                                                    required
                                                                    pattern="[0-9\/]*"
                                                                    placeholder={translate('numberOnly')}
                                                                    onChange={this._handleChangeDataInput}
                                                                />
                                                                <div className="error" id="adminPhoneError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="companyABNACNLabel"
                                                                >
                                                                    <Translate text="companyABNACN" />: *
                                                                </Label>
                                                                <div className="box-input-file">
                                                                    <Input
                                                                        type="file"
                                                                        accept={acceptFile}
                                                                        name="companyABNACN"
                                                                        required
                                                                        id="companyABNACN"
                                                                        className="inputfile inputfile-button"
                                                                        onChange={this._handleChangeFileInput}
                                                                    />
                                                                    <Label htmlFor="companyABNACN">
                                                                        <span>
                                                                            {this.state.dataInput.companyABNACN
                                                                                ? this.state.dataInput.companyABNACN
                                                                                : translate('chooseFileToUpload')}
                                                                        </span>
                                                                        <strong>
                                                                            <FaFolderOpen height="15px" width="14px" />
                                                                        </strong>
                                                                    </Label>
                                                                </div>
                                                                <div className="error" id="companyABNACNError" />
                                                            </FormGroup>
                                                            <FormGroup className="mb-3">
                                                                <Label
                                                                    className={styles.titleLabel}
                                                                    id="realEstateLicenseLabel"
                                                                >
                                                                    <Translate text="realEstateLicense" />: *
                                                                </Label>
                                                                <div className="box-input-file">
                                                                    <Input
                                                                        type="file"
                                                                        accept={acceptFile}
                                                                        name="realEstateLicense"
                                                                        required
                                                                        id="realEstateLicense"
                                                                        className="inputfile inputfile-button"
                                                                        onChange={this._handleChangeFileInput}
                                                                    />
                                                                    <Label htmlFor="realEstateLicense">
                                                                        <span>
                                                                            {this.state.dataInput.realEstateLicense
                                                                                ? this.state.dataInput.realEstateLicense
                                                                                : translate('chooseFileToUpload')}
                                                                        </span>
                                                                        <strong>
                                                                            <FaFolderOpen height="15px" width="14px" />
                                                                        </strong>
                                                                    </Label>
                                                                </div>
                                                                <div className="error" id="realEstateLicenseError" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="col-12">
                                                            <FormGroup className="mb-3">
                                                                <Label className={styles.titleLabel}>
                                                                    <Translate text="privacyPolice" />:
                                                                </Label>
                                                                <div className={checkViewConfirm}>
                                                                    <p className={styles.textConfirm}>
                                                                        “I accept and agree to the Privacy Policy, the
                                                                        Terms of Use, and the Personal Information
                                                                        Collection Statement and acknowledge that if I
                                                                        am located outside of Australia, my information
                                                                        will be handled in accordance with Australian
                                                                        laws and regulations, which may be different
                                                                        from the laws where I am located.”“I accept and
                                                                        agree to the Privacy Policy, the Terms of Use,
                                                                        and the Personal Information Collection
                                                                        Statement and acknowledge that if I am located
                                                                        outside of Australia, my information will be
                                                                        handled in accordance with Australian laws and
                                                                        regulations, which may be different from the
                                                                        laws where I am located.”
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <span
                                                                        className={styles.viewMore}
                                                                        onClick={this.viewMore}
                                                                    >
                                                                        {this.state.viewMore ? (
                                                                            <Translate text="seeLess" />
                                                                        ) : (
                                                                            <Translate text="viewMore" />
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="col-12 item">
                                                            <Checkbox
                                                                type="checkbox"
                                                                name="accept"
                                                                onChange={this._handleChangeDataInput}
                                                            />
                                                            <label className={styles.acceptLabel} id="acceptLabel">
                                                                <span />
                                                                <Translate text="acceptAndAgree" />
                                                            </label>
                                                            <div className="error" id="acceptError" />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {/* End FormRight */}
                                            </Row>
                                            <Row>
                                                <Col className="button-back">
                                                    <Link className="link-button" to="/login">
                                                        <Translate text="backToLogin" />
                                                    </Link>
                                                </Col>
                                                <Col className="text-right">
                                                    <Button
                                                        className="button-submit"
                                                        color="default"
                                                        disabled={!this.state.dataInput.accept}
                                                        onClick={this.handleSubmit}
                                                    >
                                                        <Translate text="submit" />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
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
