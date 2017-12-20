import _ from 'lodash';
class Validation {
    constructor(id, x, y) {
        this.validationText = [
            { error: 'badInput', text: '' },
            { error: 'customError', text: '' },
            { error: 'patternMismatch', text: '' },
            { error: 'rangeOverflow', text: '' },
            { error: 'rangeUnderflow', text: '' },
            { error: 'stepMismatch', text: '' },
            { error: 'tooLong', text: '' },
            { error: 'tooShort', text: '' },
            { error: 'typeMismatch', type: 'email', text: '' },
            { error: 'valueMissing', text: '' }
        ];
    }
    validationOnChange = e => {
        const validation = [];
        _.forIn(e.validity, (val, key) => {
            if (val) {
                validation.push(key);
            }
        });
        return this.showValidation(e, validation[0]);
    };

    checkConfirmPass = obj => {
        if (obj.password !== '') {
            if (obj.confirm === '') {
                return {
                    error: true,
                    name: 'confirmedPassword',
                    text: 'This field is a required field'
                };
            } else {
                if (obj.password !== obj.confirm) {
                    return {
                        error: true,
                        name: 'confirmedPassword',
                        text: 'This field is same password'
                    };
                } else {
                    return { error: false, name: 'confirmedPassword', text: '' };
                }
            }
        } else {
            return { error: false, name: 'confirmedPassword', text: '' };
        }
    };
    validationDropFile = files => {};
    showValidation = (element, validate) => {
        switch (validate) {
            case 'typeMismatch': {
                if (element.type === 'email');
                return {
                    error: true,
                    name: element.name,
                    text: _.snakeCase(element.name).replace(/_/g, ' ') + ' should be a valid email address'
                };
            }
            case 'valueMissing': {
                return {
                    error: true,
                    name: element.name,
                    text: _.snakeCase(element.name).replace(/_/g, ' ') + ' is a required field'
                };
            }
            default: {
                return { error: false, name: element.name, text: '' };
            }
        }
    };
    updateValidationForm = (validationInput, validationForm) => {
        // console.log(validationInput);
        if (validationInput.error) {
            const objErr = _.find(validationForm, o => {
                return o.name === validationInput.name;
            });
            if (objErr === undefined) {
                validationForm[validationInput.name] = validationInput.text;
            } else {
                delete validationForm[validationInput.name];
                validationForm[validationInput.name] = validationInput.text;
            }
        } else {
            delete validationForm[validationInput.name];
        }
        return validationForm;
    };
    validationWhenSubmit = (validationMore = {}, inputs, validationForm) => {
        validationForm = {};
        for (var i = 0; i < inputs.length; i++) {
            const validationInput = this.validationOnChange(inputs[i]);
            if (validationInput.error) {
                validationForm[validationInput.name] = validationInput.text;
            }
        }
        if (!_.isEmpty(validationMore)) {
            _.forEach(validationMore, (val, key) => {
                if (val.value === '') {
                    validationForm[val.key] = _.snakeCase(val.key).replace(/_/g, ' ') + ' is a required field';
                }
            });
        }
        return validationForm;
    };
}
export default new Validation();
