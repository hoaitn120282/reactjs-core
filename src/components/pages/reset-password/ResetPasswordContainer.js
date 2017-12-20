import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ResetPasswordComponent from './ResetPasswordComponent';
import { connect } from 'react-redux';
import { actions } from 'redux-utils';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';
class ResetPasswordContainer extends Component {
    onSubmit = data => {
        const { forgotPasswordActions, match: { params } } = this.props;
        forgotPasswordActions
            .resetPassword(params.code, { password: data.password, confirmedPassword: data.confirmedPassword })
            .then(
                res => {
                    this.openNotification('success', res.message);
                },
                error => {
                    this.openNotification('error', error.message);
                }
            );
    };
    openNotification = (type, message) => {
        notification[type]({
            message: 'Notification',
            description: message,
            duration: 3
        });
    };
    render() {
        return (
            <div>
                <Helmet>
                    <title>Reset Password</title>
                </Helmet>
                <ResetPasswordComponent onSubmit={this.onSubmit} />
            </div>
        );
    }
}

ResetPasswordContainer.propTypes = {
    forgotPasswordActions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    const { forgotPassword } = state;
    return {
        forgotPassword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        forgotPasswordActions: bindActionCreators(actions.forgotPasswordActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
